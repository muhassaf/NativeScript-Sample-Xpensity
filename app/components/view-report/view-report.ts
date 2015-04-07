import observableModule = require("data/observable");

import pagesModule = require("ui/page");

import gridViewModule = require("grid-view");

import editExpenseViewModelModule = require("../edit-expense/edit-expense-view-model");
import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");
import actionBarModule = require("../../utils/action-bar");

export function pageLoaded(args: observableModule.EventData) {
    actionBarModule.showBackNavigation();
}

export function navigatedTo(args: observableModule.EventData) {
    var page = <pagesModule.Page>args.object;
    page.bindingContext = page.navigationContext;
}

export function addExpenseTap(args: observableModule.EventData) {
    navigationModule.navigate({
        moduleName: viewsModule.Views.editExpense,
        context: new editExpenseViewModelModule.EditExpenseViewModel()
    });
}