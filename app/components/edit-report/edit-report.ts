import observableModule = require("data/observable");

import pagesModule = require("ui/page");

import editReportViewModelModule = require("./edit-report-view-model");
import actionBarModule = require("../../utils/action-bar");

export function pageLoaded(args: any) {
    actionBarModule.showBackNavigation();
}

export function navigatedTo(args: observableModule.EventData) {
    var page = <pagesModule.Page>args.object;
    page.bindingContext = page.navigationContext;
}