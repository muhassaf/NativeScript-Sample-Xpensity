import observableModule = require("data/observable");

import pageModule = require("ui/page");
import enumsModule = require("ui/enums");

import gridViewModule = require("grid-view");

import viewReportViewModelModule = require("./view-report-view-model");
import actionBarModule = require("../../utils/action-bar");

export function pageLoaded(args: observableModule.EventData) {
    actionBarModule.showBackNavigation();
}

var viewModel: viewReportViewModelModule.ReportViewModel;
export function navigatedTo(args: observableModule.EventData) {
    var page = <pageModule.Page>args.object;
    viewModel = <viewReportViewModelModule.ReportViewModel>page.navigationContext;
    buildMenu(page);
    page.bindingContext = viewModel;
}

export function addExpenseTap(args: observableModule.EventData) {
    viewModel.addExpense();
}

function buildMenu(page: pageModule.Page) {
    clearMenu(page); 
    switch (viewModel.report.Status) {
        case viewReportViewModelModule.ReportStatus.Returned:
        case viewReportViewModelModule.ReportStatus.New:
            if (viewModel.report.Status === viewReportViewModelModule.ReportStatus.Returned) {
                var infoMenuItem = new pageModule.MenuItem();
                infoMenuItem.icon = "ic_info";
                infoMenuItem.android.position = enumsModule.MenuItemPosition.actionBar;
                infoMenuItem.on(pageModule.knownEvents.tap,(args: observableModule.EventData) => {
                    viewModel.showReportInfo();
                });

                page.optionsMenu.addItem(infoMenuItem);
            }

            var submitMenuItem = new pageModule.MenuItem();
            submitMenuItem.icon = "ic_submit";
            submitMenuItem.android.position = enumsModule.MenuItemPosition.actionBar;
            submitMenuItem.on(pageModule.knownEvents.tap,(args: observableModule.EventData) => {
                viewModel.submit();
            });

            page.optionsMenu.addItem(submitMenuItem);

            var editMenuItem = new pageModule.MenuItem();
            editMenuItem.icon = "ic_edit";
            editMenuItem.android.position = enumsModule.MenuItemPosition.actionBar;
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