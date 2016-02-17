import { EditViewModelBase } from "edit-view-model-base";
import { service } from "../../data/service";
import { ViewReportViewModel } from "../view-report/view-report-view-model";
import validationRulesModule = require("validation-rules");
import navigationModule = require("navigation");
import viewsModule = require("../../shared/views");
import constantsModule = require("../../shared/constants");
import cameraModule = require("camera");

import { everlive, CategoryTypeName } from "../../data/service";

import { DataSource, DataSourceOptions } from "data-source";

export class EditExpenseViewModel extends EditViewModelBase {
    private _report: any;
    private _categories: DataSource;
    private _category: any;
    private _picture: any;
    private _isUrl: boolean;

    constructor(report: any, expense?: any) {
        this._report = report;

        super(expense, constantsModule.expenseProperties);

        var options = new DataSourceOptions();
        options.typeName = CategoryTypeName;
        this._categories = new DataSource(everlive, options);
        this._isUrl = false;
        this._picture = null;
        this._category = expense ? expense.ExpenseCategory.Id : constantsModule.defaultExpenseCategoryId;
        this.refresh();
    }

    public get picture(): any {
        return this._picture;
    }

    public set picture(value: any) {
        if (this._picture !== value) {
            this._picture = value;
            this.notifyPropertyChange("picture", value);
        }
    }

    public get categories() {
        return this._categories;
    }

    public get category(): any {
        return this._category;
    }

    public set category(value: any) {
        if (this._category !== value) {
            this._category = value;
            this.notifyPropertyChange("category", value);
        }
    }

    public refresh() {
        this.execute(this._categories.reload());
        if (this.item.Picture) {
            this.execute(service.getUrlFromFileId(this.item.Picture))
                .then((url) => {
                    this.picture = url;
                    this._isUrl = true;
                });
        }
    }

    public takePicture() {
        cameraModule.takePicture({ width: 320, height: 230, keepAspectRatio: true })
            .then((picture) => {
                this.picture = picture;
                this._isUrl = false;
            });
    }

    public removePicture() {
        this.picture = undefined;
    }

    protected createItem(): any {
        var item = super.createItem();
        item.Date = new Date();
        item.Report = this._report.Id;

        return item;
    }

    protected addItem(item: any): Promise<any> {
        return service.createExpense(item);
    }

    protected updateItem(item: any): Promise<any> {
        return service.updateExpense(item);
    }

    protected deleteItem(item: any): Promise<any> {
        return service.deleteExpense(item);
    }

    protected validateOverride(): boolean {
        if (!validationRulesModule.isRequiredValid(this.item.Title)) {
            this.setErrorMessage("Please enter title.");

            return false;
        }

        if (isNaN(this.item.Cost) || !validationRulesModule.isRequiredValid(this.item.Cost)) {
            this.setErrorMessage("Please enter cost.");

            return false;
        }

        if (this.item.Cost <= 0) {
            this.setErrorMessage("The cost must be greater than 0.");

            return false;
        }

        return true;
    }

    protected onSaving(item: any): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            item.Category = this._category;
            if (this._picture) {
                if (!this._isUrl) {
                    service.uploadImage(this._picture)
                        .then(id => {
                            item.Picture = id;
                            resolve(false);
                        }, reject);
                }
                else {
                    resolve(false);
                }
            }
            else {
                item.Picture = null;
                resolve(false);
            }
        });
    }
}