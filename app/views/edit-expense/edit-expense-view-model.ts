import { EditViewModelBase } from "../../shared/edit-view-model-base";
import { service } from "../../shared/service";
import { ViewReportViewModel } from "../view-report/view-report-view-model";
import validationRulesModule = require("../../shared/validation-rules");
import navigationModule = require("navigation");
import viewsModule = require("../../shared/views");

export class EditExpenseViewModel extends EditViewModelBase {
    private _report: any;
    private _category: any;

    constructor(report: any, expense?: any) {
        this._report = report;
        super(expense);
        this.refresh();
    }

    public refresh() {
        //this.loadCategory();
    }

    public get category(): any {
        return this._category;
    }

    public set category(value: any) {
        if (this._category !== value) {
            this._category = value;
            this.item.Category = this._category.Id;
            this.notifyPropertyChange("category", value);
        }
    }

    protected createItem(): any {
        var item = super.createItem();
        item.Date = new Date();
        //item.Category = constantsModule.defaultExpenseCategoryId;
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

        return super.validate();
    }

    //private loadCategory() {
    //    this.beginLoading();
    //    serviceModule.service.getExpenseCategory(this.item.Category).then((category) => {
    //        this.category = category;
    //        this.endLoading();
    //    },(error) => {
    //            this.endLoading();
    //        });
    //}
}