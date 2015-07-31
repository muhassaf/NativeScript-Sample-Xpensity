var platformModule = require("platform");
var enumsModule = require("ui/enums");
var actionBar = require("ui/action-bar");
var actionBarModule = require("../../utils/action-bar");
var reportStatusModule = require("../../utils/report-status");
function pageLoaded(args) {
    actionBarModule.showBackNavigation();
    var margin = 0;
    if (platformModule.device.os == platformModule.platformNames.android) {
        margin = 70;
    }
    else if (platformModule.device.os == platformModule.platformNames.ios) {
        margin = 30;
    }
    var page = args.object;
    var chart = page.getViewById("PieChart");
    chart.marginLeft = margin;
    chart.marginRight = margin;
}
exports.pageLoaded = pageLoaded;
var viewModel;
function navigatedTo(args) {
    var page = args.object;
    viewModel = page.navigationContext;
    page.bindingContext = null;
    page.bindingContext = viewModel;
    buildMenu(page);
    viewModel.refresh();
}
exports.navigatedTo = navigatedTo;
function addExpenseTap(args) {
    viewModel.addExpense();
}
exports.addExpenseTap = addExpenseTap;
function expenseTap(args) {
    if (viewModel.report.Status === reportStatusModule.New ||
        viewModel.report.Status === reportStatusModule.Returned) {
        viewModel.editExpense(args.view.bindingContext.expense);
    }
}
exports.expenseTap = expenseTap;
function buildMenu(page) {
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
                infoActionItem.on(actionBar.ActionItem.tapEvent, function (args) {
                    viewModel.showReportInfo();
                });
                page.actionBar.actionItems.addItem(infoActionItem);
            }
            var submitActionItem = new actionBar.ActionItem();
            submitActionItem.icon = "res://ic_submit";
            submitActionItem.on(actionBar.ActionItem.tapEvent, function (args) {
                viewModel.submit();
            });
            page.actionBar.actionItems.addItem(submitActionItem);
            var editMenuItem = new actionBar.ActionItem();
            editMenuItem.icon = "res://ic_edit";
            setAndroidPosition(editMenuItem, enumsModule.AndroidActionItemPosition.actionBar);
            editMenuItem.on(actionBar.ActionItem.tapEvent, function (args) {
                viewModel.edit();
            });
            page.actionBar.actionItems.addItem(editMenuItem);
            break;
    }
}
function clearMenu(page) {
    if (page.actionBar) {
        var actionItems = page.actionBar.actionItems;
        var items = actionItems.getItems();
        for (var i = 0; i < items.length; i++) {
            page.actionBar.actionItems.removeItem(items[i]);
        }
    }
}
function setAndroidPosition(menuItem, position) {
    if (platformModule.device.os == platformModule.platformNames.android) {
        menuItem.android.position = position;
    }
}
