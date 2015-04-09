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
        super(expense);

        this._report = report;
        this.refresh();
    }

    get createMethod(): (expense: any) => Promise<any> {
        return serviceModule.service.createExpense;
    }

    get updateMethod(): (expense: any) => Promise<any> {
        return serviceModule.service.updateExpense;
    }

    get expenseCategory(): any {
        return this._category;
    }

    set category(value: any) {
        if (this._category !== value) {
            this._category = value;
            this.item.CategoryId = this._category.Id;
            this.notifyPropertyChanged("category", value);
        }
    }

    createItem(): any {
        var item = super.createItem();
        item.Date = new Date();
        item.ExpenseCategoryId = constantsModule.defaultExpenseCategoryId;

        return item;
    }

    deleteExpense() {
        dialogsModule.confirm({
            title: "Delete Expense",
            message: "Do you want to delete the expense?",
            okButtonText: "YES",
            cancelButtonText: "NO"
        }).then((value: boolean) => {
            if (value) {
                this.beginLoading();
                serviceModule.service.deleteExpense(this.item).then((data) => {
                    this.endLoading();
                    navigationModule.goBack();
                },(error) => {
                        this.endLoading();
                    });
            }
        });
    }

    refresh() {
        this.loadExpenseCategory();
    }

    private loadExpenseCategory() {
        this.beginLoading();
        serviceModule.service.getExpenseCategory(this.item.ExpenseCategoryId).then((category) => {
            this.expenseCategory = category;
            this.endLoading();
        },(error) => {
                this.endLoading();
            });
    }
}