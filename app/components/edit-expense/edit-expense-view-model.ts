import localSettingsModule = require("local-settings");
import observableModule = require("data/observable");
import dialogsModule = require("ui/dialogs");

import editViewModelBaseModule = require("../edit-view-model-base");

import constantsModule = require("../../utils/constants");
import serviceModule = require("../../utils/service");
import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");

export class EditExpenseViewModel extends editViewModelBaseModule.EditViewModelBase{
    private _expense: any;

    constructor(expense?: any) {
        if (expense) {
            super(false);
            this.expense = expense;
        }
        else {
            super(true);
            this.expense = {};
        }
    }

    get expense(): any {
        return this._expense;
    }

    set expense(value: any) {
        if (this._expense !== value) {
            this._expense = value;
            this.notifyPropertyChanged("expense", value);
        }
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
            }
        });
    }
}