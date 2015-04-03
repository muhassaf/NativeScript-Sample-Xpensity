import observableModule = require("data/observable");

import viewModule = require("ui/core/view");
import pagesModule = require("ui/page");

import gridViewModule = require("grid-view");

import mainViewModelModule = require("./main-view-model");
import editReportViewModelModule = require("../edit-report/edit-report-view-model");
import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");

export function pageLoaded(args: observableModule.EventData) {
    var page = <pagesModule.Page>args.object;
    page.bindingContext = new mainViewModelModule.MainViewModel();
}

export function reportTap(args: gridViewModule.ItemEventData) {
    navigationModule.navigate({
        moduleName: viewsModule.Views.viewReport,
        context: args.item
    });
}

export function addReportTap(args: observableModule.EventData) {
    navigationModule.navigate({
        moduleName: viewsModule.Views.editReport,
        context: new editReportViewModelModule.EditReportViewModel({ Title: "", BusinessPurpose: "", CostCenter: "" })
    });
}