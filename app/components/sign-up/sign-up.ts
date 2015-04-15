import observableModule = require("data/observable");
import actionBarModule = require("../../utils/action-bar");

import pagesModule = require("ui/page");

import signUpViewModelModule = require("./sign-up-view-model");

var viewModel = new signUpViewModelModule.SignUpViewModel();
export function pageLoaded(args: any) {
    actionBarModule.showBackNavigation();
    var page = <pagesModule.Page>args.object;
    page.bindingContext = viewModel;
}