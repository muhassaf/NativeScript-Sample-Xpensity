import observableModule = require("data/observable");

import pagesModule = require("ui/page");

import editExpenseViewModelModule = require("./edit-expense-view-model");
import datePickerViewModelModule = require("../date-picker/date-picker-view-model");
import listPickerViewModelModule = require("../list-picker/list-picker-view-model");

import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");

var viewModel: editExpenseViewModelModule.EditExpenseViewModel;
export function navigatedTo(args: observableModule.EventData) {
    var page = <pagesModule.Page>args.object;
    viewModel = <editExpenseViewModelModule.EditExpenseViewModel>page.navigationContext;
    page.bindingContext = viewModel;
}

export function datePickerTap(args: observableModule.EventData) {
    navigationModule.navigate({
        moduleName: viewsModule.Views.datePicker,
        context: new datePickerViewModelModule.DatePickerViewModel(viewModel.expense.Date,(selectedDate: Date) => {
            viewModel.expense.Date = selectedDate;
        })
    });
}

export function categoryPickerTap(args: observableModule.EventData) {
    navigationModule.navigate({
        moduleName: viewsModule.Views.listPicker,
        context: new listPickerViewModelModule.ListPickerViewModel(["Auto & Transport", "Ala", "Bala", "Other"], viewModel.expense.Category, (selectedItem: any) => {
            viewModel.expense.Category = selectedItem;
        })
    });
}