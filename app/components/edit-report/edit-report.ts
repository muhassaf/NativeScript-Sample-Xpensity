import observableModule = require("data/observable");

import pagesModule = require("ui/page");

import editReportViewModelModule = require("./edit-report-view-model");

// TODO: This method is for test purposes only. Remove it later.
export function pageLoaded(args: any) {
    var page = <pagesModule.Page>args.object;
    page.bindingContext = new editReportViewModelModule.EditReportViewModel({ Title: "Boston Trip", BusinessPurpose: "Meeting with clients", CostCenter: "Sofia" });
}

export function navigatedTo(args: observableModule.EventData) {
    var page = <pagesModule.Page>args.object;
    page.bindingContext = page.navigationContext;
}