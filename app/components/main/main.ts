import observableModule = require("data/observable");

import viewModule = require("ui/core/view");
import pageModule = require("ui/page");

import gridViewModule = require("grid-view");

import mainViewModelModule = require("./main-view-model");
import reportsViewModelModule = require("./reports-view-model");
import settingsViewModelModule = require("./settings-view-model");
import editReportViewModelModule = require("../edit-report/edit-report-view-model");
import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");
import actionBarModule = require("../../utils/action-bar");

export function pageLoaded(args: observableModule.EventData) {
    actionBarModule.hideBackNavigation();
    var page = <pageModule.Page>args.object;
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
        context: new editReportViewModelModule.EditReportViewModel()
    });
}

export function reportsViewLoaded(args: observableModule.EventData) {
    var tabItem = <viewModule.View>args.object;
    tabItem.bindingContext = new reportsViewModelModule.ReportsViewModel();
}

export function settingsViewLoaded(args: observableModule.EventData) {
    var tabItem = <viewModule.View>args.object;
    tabItem.bindingContext = new settingsViewModelModule.SettingsViewModel();
}