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
    private _viewReportViewModel: viewReportViewModelModule.ViewReportViewModel;

    constructor(viewReportViewModel: viewReportViewModelModule.ViewReportViewModel, expense?: any) {
        super(expense);
        this._viewReportViewModel = viewReportViewModel;
    }

    get expense(): any {
        return this.item;
    }

    set expense(value: any) {
        if (this.item !== value) {
            this.item = value;
            this.notifyPropertyChanged("expense", value);
        }
    }

    saveExpense() {
        alert("saved");
        navigationModule.goBack();
    }

    deleteExpense() {
        dialogsModule.confirm({
            title: "Delete Expense",
            message: "Do you want to delete the expense?",
            okButtonText: "YES",
            cancelButtonText: "NO"
        }).then((value: boolean) => {
            if (value) {
                alert("deleted");
                navigationModule.goBack();
            }
        });
    }
}