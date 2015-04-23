import platformModule = require("platform");

import observableModule = require("data/observable");

import viewModule = require("ui/core/view");
import pageModule = require("ui/page");
import listViewModule = require("ui/list-view");
import enumsModule = require("ui/enums");

import viewReportViewModelModule = require("./view-report-view-model");
import actionBarModule = require("../../utils/action-bar");
import reportStatusModule = require("../../utils/report-status");

export function pageLoaded(args: observableModule.EventData) {
    actionBarModule.showBackNavigation();

    if (platformModule.device.os == platformModule.platformNames.android) {
        var page = <pageModule.Page>args.object;
        var chart = page.getViewById<viewModule.View>("PieChart");
        chart.marginLeft = 50;
        chart.marginRight = 50;
    }
}

var viewModel: viewReportViewModelModule.ViewReportViewModel;
export function navigatedTo(args: observableModule.EventData) {
    var page = <pageModule.Page>args.object;
    viewModel = <viewReportViewModelModule.ViewReportViewModel>page.navigationContext;
    buildMenu(page);
    page.bindingContext = null;
    page.bindingContext = viewModel;
    viewModel.refresh();
}

export function addExpenseTap(args: observableModule.EventData) {
    viewModel.addExpense();
}

export function expenseTap(args: listViewModule.ItemEventData) {
    viewModel.editExpense(args.view.bindingContext.expense);
}

function buildMenu(page: pageModule.Page) {
    clearMenu(page);
    switch (viewModel.report.Status) {
        case reportStatusModule.Returned:
        case reportStatusModule.New:
            if (viewModel.report.Status === reportStatusModule.Returned) {
                var infoMenuItem = new pageModule.MenuItem();
                infoMenuItem.icon = "ic_info";
                setAndroidPosition(infoMenuItem, enumsModule.MenuItemPosition.actionBar);
                infoMenuItem.on(pageModule.knownEvents.tap,(args: observableModule.EventData) => {
                    viewModel.showReportInfo();
                });

                page.optionsMenu.addItem(infoMenuItem);
            }

            var submitMenuItem = new pageModule.MenuItem();
            submitMenuItem.icon = "ic_submit";
            submitMenuItem.on(pageModule.knownEvents.tap,(args: observableModule.EventData) => {
                viewModel.submit().then((data) => {
                    buildMenu(page);
                });
            });

            page.optionsMenu.addItem(submitMenuItem);

            var editMenuItem = new pageModule.MenuItem();
            editMenuItem.icon = "ic_edit";
            setAndroidPosition(editMenuItem, enumsModule.MenuItemPosition.actionBar);
            editMenuItem.on(pageModule.knownEvents.tap,(args: observableModule.EventData) => {
                viewModel.edit();
            });

            page.optionsMenu.addItem(editMenuItem);

            break;
    }
}

function clearMenu(page: pageModule.Page) {
    var menuItems = page.optionsMenu.getItems()
    for (var i = 0; i < menuItems.length; i++) {
        page.optionsMenu.removeItem(menuItems[i]);
    }
}

function setAndroidPosition(menuItem: pageModule.MenuItem, position: string) {
    if (platformModule.device.os == platformModule.platformNames.android) {
        menuItem.android.position = position;
    }
}