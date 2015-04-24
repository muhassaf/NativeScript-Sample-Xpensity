import observableModule = require("data/observable");

import pagesModule = require("ui/page");

import loginViewModelModule = require("./login-view-model");
import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");
import actionBarModule = require("../../utils/action-bar");

var viewModel = new loginViewModelModule.LoginViewModel();
export function pageLoaded(args: observableModule.EventData) {
    actionBarModule.hideBackNavigation();
    var page = <pagesModule.Page>args.object;
    page.bindingContext = viewModel;
}

export function navigatedTo(args: observableModule.EventData) {
    viewModel.clear();
}

export function signUpMenuItemTap(args: observableModule.EventData) {
    navigationModule.navigate(viewsModule.Views.signUp);
}