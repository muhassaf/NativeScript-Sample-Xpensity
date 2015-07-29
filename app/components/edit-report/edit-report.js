var actionBarModule = require("../../utils/action-bar");
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
function doneMenuItemTap(args) {
    viewModel.save();
}
exports.doneMenuItemTap = doneMenuItemTap;
function deleteReportButtonTap(args) {
    viewModel.del();
}
exports.deleteReportButtonTap = deleteReportButtonTap;
