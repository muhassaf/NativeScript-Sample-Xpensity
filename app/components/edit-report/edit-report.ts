import observableModule = require("data/observable");

import pagesModule = require("ui/page");

import editReportViewModelModule = require("./edit-report-view-model");
import actionBarModule = require("../../utils/action-bar");

export function pageLoaded(args: any) {
    actionBarModule.showBackNavigation();
}

var viewModel: editReportViewModelModule.EditReportViewModel;
export function navigatedTo(args: observableModule.EventData) {
    var page = <pagesModule.Page>args.object;
    viewModel = <editReportViewModelModule.EditReportViewModel>page.navigationContext;
    page.bindingContext = null;
    page.bindingContext = viewModel;
}

export function doneMenuItemTap(args: observableModule.EventData) {
    viewModel.save();
}

export function deleteReportButtonTap(args: observableModule.EventData) {
    viewModel.del();
}