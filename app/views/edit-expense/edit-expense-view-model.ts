import { EditViewModelBase } from "edit-view-model-base";
import { service } from "../../shared/service";
import { ViewReportViewModel } from "../view-report/view-report-view-model";
import validationRulesModule = require("../../shared/validation-rules");
import navigationModule = require("navigation");
import viewsModule = require("../../shared/views");
import constantsModule = require("../../shared/constants");

import { everlive, CategoryTypeName } from "../../shared/service";

import { DataSource, DataSourceOptions } from "data-source";

export class EditExpenseViewModel extends EditViewModelBase {
    private _report: any;
    private _categories: DataSource;

    constructor(report: any, expense?: any) {
        this._report = report;

        super(expense);

        this._categories = new DataSource(everlive, new DataSourceOptions(CategoryTypeName));
        this.refresh();
    }

    public get categories() {
        return this._categories;
    }

    public refresh() {
        this.execute(this._categories.reload());
    }

    protected createItem(): any {
        var item = super.createItem();
        item.Date = new Date();
        item.Category = constantsModule.defaultExpenseCategoryId;
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

        if (isNaN(this.item.Cost)) {
            this.setErrorMessage("Please enter cost.");

            return false;
        }

        return true;
    }
}