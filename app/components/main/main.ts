import platformModule = require("platform");

import observableModule = require("data/observable");

import viewModule = require("ui/core/view");
import pageModule = require("ui/page");
import tabViewModule = require("ui/tab-view");

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
var page: pageModule.Page;
export function navigatingTo(args: observableModule.EventData) {
    page = <pageModule.Page>args.object;
    page.bindingContext = null;
    page.bindingContext = viewModel;
    viewModel.refresh();

    updatePage(page, selectedTabViewItem, selectedTabViewIndex);
}

export function navigatedTo(args: observableModule.EventData) {
    actionBarModule.hideBackNavigation();
    actionBarModule.showApplicationBar();
}

export function navigatedFrom(args: observableModule.EventData) {
    setPageTitle(page, null);
}

var selectedTabViewItem: tabViewModule.TabViewItem;
var selectedTabViewIndex: number;
export function selectedItemChanged(args: tabViewModule.SelectedItemChangedEventData) {
    selectedTabViewItem = args.tabViewItem;
    selectedTabViewIndex = args.index;

    updatePage(page, selectedTabViewItem, selectedTabViewIndex);
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
    var tabView = <tabViewModule.TabView>page.getViewById("TabView");
    tabView.selectedIndex = 0;
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

function updatePage(page: pageModule.Page, tabViewItem: tabViewModule.TabViewItem, tabViewIndex: number) {
    if (platformModule.device.os === platformModule.platformNames.ios && page && tabViewItem) {
        clearMenu(page);
        if (tabViewIndex === 0) {
            buildMenu(page);
        }

        setPageTitle(page, tabViewItem.title);
    }
}

function clearMenu(page: pageModule.Page) {
    var menuItems = page.optionsMenu.getItems()
    for (var i = 0; i < menuItems.length; i++) {
        page.optionsMenu.removeItem(menuItems[i]);
    }
}

function buildMenu(page: pageModule.Page) {
    var addReportMenuItem = new pageModule.MenuItem();
    addReportMenuItem.icon = "ic_add";
    addReportMenuItem.on(pageModule.MenuItem.tapEvent, addReportTap);

    page.optionsMenu.addItem(addReportMenuItem);
}

function setPageTitle(page: pageModule.Page, title: string) {
    if (platformModule.device.os === platformModule.platformNames.ios) {
        page.ios.title = title;
    }
}
