var actionBarModule = require("../../utils/action-bar");
var signUpViewModelModule = require("./sign-up-view-model");
var viewModel = new signUpViewModelModule.SignUpViewModel();
function pageLoaded(args) {
    actionBarModule.showBackNavigation();
    var page = args.object;
    page.bindingContext = viewModel;
}
exports.pageLoaded = pageLoaded;
function navigatedTo(args) {
    viewModel.clear();
}
exports.navigatedTo = navigatedTo;
