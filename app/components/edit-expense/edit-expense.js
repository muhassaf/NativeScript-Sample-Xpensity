var datePickerViewModelModule = require("../date-picker/date-picker-view-model");
var listPickerViewModelModule = require("../list-picker/list-picker-view-model");
var navigationModule = require("../../utils/navigation");
var viewsModule = require("../../utils/views");
var actionBarModule = require("../../utils/action-bar");
var serviceModule = require("../../utils/service");
function pageLoaded(args) {
    actionBarModule.showBackNavigation();
}
exports.pageLoaded = pageLoaded;
var viewModel;
function navigatedTo(args) {
    var page = args.object;
    viewModel = page.navigationContext;
    page.bindingContext = null;
    page.bindingContext = viewModel;
}
exports.navigatedTo = navigatedTo;
function datePickerTap(args) {
    navigationModule.navigate({
        moduleName: viewsModule.Views.datePicker,
        context: new datePickerViewModelModule.DatePickerViewModel(viewModel.item.Date, function (selectedDate) {
            viewModel.item.Date = selectedDate;
        })
    });
}
exports.datePickerTap = datePickerTap;
function categoryPickerTap(args) {
    navigationModule.navigate({
        moduleName: viewsModule.Views.listPicker,
        context: new listPickerViewModelModule.ListPickerViewModel(function () { return serviceModule.service.getExpenseCategories(); }, viewModel.category, function (selectedItem) {
            viewModel.category = selectedItem;
        })
    });
}
exports.categoryPickerTap = categoryPickerTap;
function doneMenuItemTap(args) {
    viewModel.save();
}
exports.doneMenuItemTap = doneMenuItemTap;
function deleteExpenseButtonTap(args) {
    viewModel.del();
}
exports.deleteExpenseButtonTap = deleteExpenseButtonTap;
