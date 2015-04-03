import observableModule = require("data/observable");

import viewModule = require("ui/core/view");
import pagesModule = require("ui/page");

import gridViewModule = require("grid-view");

import mainViewModelModule = require("./main-view-model");

var viewModel: mainViewModelModule.MainViewModel;
export function pageLoaded(args: observableModule.EventData) {
    var page = <pagesModule.Page>args.object;
    viewModel = new mainViewModelModule.MainViewModel();
    page.bindingContext = viewModel;
}

export function reportTap(args: gridViewModule.ItemEventData) {
    viewModel.viewReport(args.item);
}

export function addReportTap(args: observableModule.EventData) {
    viewModel.addReport();
}