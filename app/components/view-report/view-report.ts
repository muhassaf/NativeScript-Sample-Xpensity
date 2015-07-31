import platformModule = require("platform");

import observableModule = require("data/observable");

import viewModule = require("ui/core/view");
import pageModule = require("ui/page");
import listViewModule = require("ui/list-view");
import enumsModule = require("ui/enums");

import actionBar = require("ui/action-bar");

import viewReportViewModelModule = require("./view-report-view-model");
import actionBarModule = require("../../utils/action-bar");
import reportStatusModule = require("../../utils/report-status");

export function pageLoaded(args: observableModule.EventData) {
    actionBarModule.showBackNavigation();

    var margin = 0;
    if (platformModule.device.os == platformModule.platformNames.android) {
        margin = 70;
    }
    else if (platformModule.device.os == platformModule.platformNames.ios) {
        margin = 30;
    }

    var page = <pageModule.Page>args.object;
    var chart = page.getViewById<viewModule.View>("PieChart");
    chart.marginLeft = margin;
    chart.marginRight = margin;
}

var viewModel: viewReportViewModelModule.ViewReportViewModel;
export function navigatedTo(args: observableModule.EventData) {
    var page = <pageModule.Page>args.object;
    viewModel = <viewReportViewModelModule.ViewReportViewModel>page.navigationContext;
    page.bindingContext = null;
    page.bindingContext = viewModel;
    buildMenu(page);

    viewModel.refresh();
}

export function addExpenseTap(args: observableModule.EventData) {
    viewModel.addExpense();
}

export function expenseTap(args: listViewModule.ItemEventData) {
    if (viewModel.report.Status === reportStatusModule.New ||
        viewModel.report.Status === reportStatusModule.Returned) {
        viewModel.editExpense(args.view.bindingContext.expense);
    }
}

function buildMenu(page: pageModule.Page) {
    clearMenu(page);
    switch (viewModel.report.Status) {
        case reportStatusModule.Returned:
        case reportStatusModule.New:
            if (!page.actionBar) {
                page.actionBar = new actionBar.ActionBar();
            }

            if (viewModel.report.Status === reportStatusModule.Returned) {
                var infoActionItem = new actionBar.ActionItem();
                infoActionItem.icon = "res://ic_info";
                setAndroidPosition(infoActionItem, enumsModule.AndroidActionItemPosition.actionBar);
                infoActionItem.on(actionBar.ActionItem.tapEvent, (args: observableModule.EventData) => {
                    viewModel.showReportInfo();
                });
                page.actionBar.actionItems.addItem(infoActionItem);
            }

            var submitActionItem = new actionBar.ActionItem();
            submitActionItem.icon = "res://ic_submit";
            submitActionItem.on(actionBar.ActionItem.tapEvent, (args: observableModule.EventData) => {
                viewModel.submit();
            });
            page.actionBar.actionItems.addItem(submitActionItem);

            var editMenuItem = new actionBar.ActionItem();
            editMenuItem.icon = "res://ic_edit";
            setAndroidPosition(editMenuItem, enumsModule.AndroidActionItemPosition.actionBar);
            editMenuItem.on(actionBar.ActionItem.tapEvent, (args: observableModule.EventData) => {
                viewModel.edit();
            });

            page.actionBar.actionItems.addItem(editMenuItem);

            break;
    }
}

function clearMenu(page: pageModule.Page) {
    if (page.actionBar) {
        var actionItems = page.actionBar.actionItems;
        var items = actionItems.getItems();
        for (var i = 0; i < items.length; i++) {
            page.actionBar.actionItems.removeItem(items[i]);
        }
    }
}

function setAndroidPosition(menuItem: actionBar.ActionItem, position: string) {
    if (platformModule.device.os == platformModule.platformNames.android) {
        menuItem.android.position = position;
    }
}