import platformModule = require("platform");

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
import serviceModule = require("../../utils/service");

var viewModel = new mainViewModelModule.MainViewModel();
export function pageLoaded(args: observableModule.EventData) {
    if (platformModule.device.os == platformModule.platformNames.android) {
        checkIfLoggedIn(args);
    }
}

export function navigatedTo(args: observableModule.EventData) {
    if (platformModule.device.os == platformModule.platformNames.ios) {
        checkIfLoggedIn(args);
    }
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

export function logoutButtonTap(args: observableModule.EventData) {
    viewModel.settingsViewModel.logout();
}

export function reportsViewLoaded(args: observableModule.EventData) {
    var tabItem = <viewModule.View>args.object;
    tabItem.bindingContext = viewModel.reportsViewModel;
}

export function settingsViewLoaded(args: observableModule.EventData) {
    var tabItem = <viewModule.View>args.object;
    tabItem.bindingContext = viewModel.settingsViewModel;
}

function checkIfLoggedIn(args: observableModule.EventData) {
    actionBarModule.hideBackNavigation();
    actionBarModule.showApplicationBar();
    if (!serviceModule.service.isAuthenticated) {
        navigationModule.navigateWitouthHistory(viewsModule.Views.login);
    }
    else {
        var page = <pageModule.Page>args.object;
        page.bindingContext = null;
        page.bindingContext = viewModel;
        viewModel.refresh();
        buildMenu(page);
    }
}

function clearMenu(page: pageModule.Page) {
    var menuItems = page.optionsMenu.getItems()
    for (var i = 0; i < menuItems.length; i++) {
        page.optionsMenu.removeItem(menuItems[i]);
    }
}

function buildMenu(page: pageModule.Page) {
    if (platformModule.device.os == platformModule.platformNames.ios) {
        clearMenu(page);
        var addReportMenuItem = new pageModule.MenuItem();
        addReportMenuItem.icon = "ic_add";
        addReportMenuItem.on(pageModule.knownEvents.tap, addReportTap);

        page.optionsMenu.addItem(addReportMenuItem);
    }
}
