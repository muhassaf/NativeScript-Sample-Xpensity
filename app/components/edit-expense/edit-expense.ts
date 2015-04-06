import observableModule = require("data/observable");

import pagesModule = require("ui/page");

import editExpenseViewModelModule = require("./edit-expense-view-model");

// TODO: This method is for test purposes only. Remove it later.
export function pageLoaded(args: any) {
    var page = <pagesModule.Page>args.object;
    page.bindingContext = new editExpenseViewModelModule.EditExpenseViewModel({ Title: "Dinner", Cost: 100, Date: new Date(Date.now()), Category: "Auto & Transport" });
}

export function navigatedTo(args: observableModule.EventData) {
    var page = <pagesModule.Page>args.object;
    page.bindingContext = page.navigationContext;
}