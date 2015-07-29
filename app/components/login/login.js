var loginViewModelModule = require("./login-view-model");
var navigationModule = require("../../utils/navigation");
var viewsModule = require("../../utils/views");
var actionBarModule = require("../../utils/action-bar");
var viewModel = new loginViewModelModule.LoginViewModel();
function pageLoaded(args) {
    actionBarModule.hideBackNavigation();
    var page = args.object;
    page.bindingContext = viewModel;
}
exports.pageLoaded = pageLoaded;
function navigatedTo(args) {
    viewModel.clear();
}
exports.navigatedTo = navigatedTo;
function signUpMenuItemTap(args) {
    navigationModule.navigate(viewsModule.Views.signUp);
}
exports.signUpMenuItemTap = signUpMenuItemTap;
