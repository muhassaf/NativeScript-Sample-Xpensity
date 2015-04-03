import observableModule = require("data/observable");

import pagesModule = require("ui/page");

import gridViewModule = require("grid-view");

import reportViewModelModule = require("../report-view-model");

// TODO: This method is for test purpose. Remove later.
export function pageLoaded(args: observableModule.EventData) {
    var page = <pagesModule.Page>args.object;
    page.bindingContext = new reportViewModelModule.ReportViewModel({ Title: "Dinner with Daniel Smith", BussinessPurpose: "Clients visit", Date: "Apr 13, 2015" });
}

export function navigatedTo(args: observableModule.EventData) {
    var page = <pagesModule.Page>args.object;
    page.bindingContext = page.navigationContext;
}