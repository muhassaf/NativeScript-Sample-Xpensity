import observableModule = require("data/observable");

import pagesModule = require("ui/page");

import loginViewModelModule = require("./login-view-model");

export function pageLoaded(args: observableModule.EventData) {
    var page = <pagesModule.Page>args.object;
    page.bindingContext = new loginViewModelModule.LoginViewModel();
} 