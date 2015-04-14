import localSettingsModule = require("local-settings");
import observableModule = require("data/observable");
import dialogsModule = require("ui/dialogs");

import editViewModelBaseModule = require("../edit-view-model-base");
import viewReportViewModelModule = require("../view-report/view-report-view-model");

import constantsModule = require("../../utils/constants");
import serviceModule = require("../../utils/service");
import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");

export class EditExpenseViewModel extends editViewModelBaseModule.EditViewModelBase {
    private _report: any;
    private _category: any;

    constructor(report: any, expense?: any) {
        this._report = report;
        super(expense);
        this.refresh();
    }

    get category(): any {
        return this._category;
    }

    set category(value: any) {
        if (this._category !== value) {
            this._category = value;
            this.item.Category = this._category.Id;
            this.notifyPropertyChanged("category", value);
        }
    }

    createItem(): any {
        var item = super.createItem();
        item.Date = new Date();
        item.Category = constantsModule.defaultExpenseCategoryId;
        item.Report = this._report.Id;

        return item;
    }

    addItem(item: any): Promise<any> {
        return serviceModule.service.createExpense(item);
    }

    updateItem(item: any): Promise<any> {
        return serviceModule.service.updateExpense(item);
    }

    deleteItem(item: any): Promise<any> {
        return serviceModule.service.deleteExpense(item);
    }

    refresh() {
        this.loadCategory();
    }

    private loadCategory() {
        this.beginLoading();
        serviceModule.service.getExpenseCategory(this.item.Category).then((category) => {
            this.category = category;
            this.endLoading();
        },(error) => {
                this.endLoading();
            });
    }
}