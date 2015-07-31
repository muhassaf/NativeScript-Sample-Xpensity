var platformModule = require("platform");
var actionBar = require("ui/action-bar");
var mainViewModelModule = require("./main-view-model");
var editReportViewModelModule = require("../edit-report/edit-report-view-model");
var navigationModule = require("../../utils/navigation");
var viewsModule = require("../../utils/views");
var actionBarModule = require("../../utils/action-bar");
var viewModel = new mainViewModelModule.MainViewModel();
var page;
function navigatingTo(args) {
    page = args.object;
    page.bindingContext = null;
    page.bindingContext = viewModel;
    viewModel.refresh();
    updatePage(page, selectedTabViewItem, selectedTabViewIndex);
}
exports.navigatingTo = navigatingTo;
function navigatedTo(args) {
    actionBarModule.hideBackNavigation();
    actionBarModule.showApplicationBar();
}
exports.navigatedTo = navigatedTo;
function navigatedFrom(args) {
    setPageTitle(page, null);
}
exports.navigatedFrom = navigatedFrom;
var selectedTabViewItem;
var selectedTabViewIndex;
function selectedItemChanged(args) {
    selectedTabViewIndex = args.newIndex;
    var tab = page.getViewById("TabView");
    selectedTabViewItem = tab.items[selectedTabViewIndex];
    updatePage(page, selectedTabViewItem, selectedTabViewIndex);
}
exports.selectedItemChanged = selectedItemChanged;
function reportTap(args) {
    navigationModule.navigate({
        moduleName: viewsModule.Views.viewReport,
        context: args.item
    });
}
exports.reportTap = reportTap;
function addReportTap(args) {
    navigationModule.navigate({
        moduleName: viewsModule.Views.editReport,
        context: new editReportViewModelModule.EditReportViewModel()
    });
}
exports.addReportTap = addReportTap;
function logoutButtonTap(args) {
    var tabView = page.getViewById("TabView");
    tabView.selectedIndex = 0;
    viewModel.settingsViewModel.logout();
}
exports.logoutButtonTap = logoutButtonTap;
function reportsViewLoaded(args) {
    var tabItem = args.object;
    tabItem.bindingContext = viewModel.reportsViewModel;
}
exports.reportsViewLoaded = reportsViewLoaded;
function settingsViewLoaded(args) {
    var tabItem = args.object;
    tabItem.bindingContext = viewModel.settingsViewModel;
}
exports.settingsViewLoaded = settingsViewLoaded;
function updatePage(page, tabViewItem, tabViewIndex) {
    if (platformModule.device.os === platformModule.platformNames.ios && page && tabViewItem) {
        clearMenu(page);
        if (tabViewIndex === 0) {
            buildMenu(page);
        }
        setPageTitle(page, tabViewItem.title);
    }
}
function clearMenu(page) {
    if (page.actionBar) {
        var actionItems = page.actionBar.actionItems;
        var items = actionItems.getItems();
        for (var i = 0; i < items.length; i++) {
            actionItems.removeItem(items[i]);
        }
    }
}
function buildMenu(page) {
    var addReportActionItem = new actionBar.ActionItem();
    addReportActionItem.icon = "res://ic_add";
    addReportActionItem.on(actionBar.ActionItem.tapEvent, addReportTap);
    if (!page.actionBar) {
        page.actionBar = new actionBar.ActionBar();
    }
    page.actionBar.actionItems.addItem(addReportActionItem);
}
function setPageTitle(page, title) {
    if (platformModule.device.os === platformModule.platformNames.ios) {
        page.ios.title = title;
    }
}
