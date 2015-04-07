import observableModule = require("data/observable");

import pageModule = require("ui/page");
import enumsModule = require("ui/enums");

import gridViewModule = require("grid-view");

import editExpenseViewModelModule = require("../edit-expense/edit-expense-view-model");
import viewReportViewModelModule = require("./view-report-view-model");
import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");
import actionBarModule = require("../../utils/action-bar");

export function pageLoaded(args: observableModule.EventData) {
    actionBarModule.showBackNavigation();
}

export function navigatedTo(args: observableModule.EventData) {
    var page = <pageModule.Page>args.object;
    var viewModel = <viewReportViewModelModule.ReportViewModel>page.navigationContext;
    buildPageMenu(page, viewModel);
    page.bindingContext = viewModel;
}

export function addExpenseTap(args: observableModule.EventData) {
    navigationModule.navigate({
        moduleName: viewsModule.Views.editExpense,
        context: new editExpenseViewModelModule.EditExpenseViewModel()
    });
}

function buildPageMenu(page: pageModule.Page, viewModel: viewReportViewModelModule.ReportViewModel) {
    switch (viewModel.report.Status) {
        case viewReportViewModelModule.ReportStatus.Returned:
        case viewReportViewModelModule.ReportStatus.New:
            if (viewModel.report.Status === viewReportViewModelModule.ReportStatus.Returned) {
                var submitMenuItem = new pageModule.MenuItem();
                submitMenuItem.icon = "ic_info";
                submitMenuItem.android.position = enumsModule.MenuItemPosition.actionBar;
                page.optionsMenu.addItem(submitMenuItem);
            }

            var submitMenuItem = new pageModule.MenuItem();
            submitMenuItem.icon = "ic_submit";
            submitMenuItem.android.position = enumsModule.MenuItemPosition.actionBar;
            page.optionsMenu.addItem(submitMenuItem);

            var submitMenuItem = new pageModule.MenuItem();
            submitMenuItem.icon = "ic_edit";
            submitMenuItem.android.position = enumsModule.MenuItemPosition.actionBar;
            page.optionsMenu.addItem(submitMenuItem);

            break;
    }
}