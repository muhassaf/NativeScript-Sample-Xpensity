import observableModule = require("data/observable");

import pagesModule = require("ui/page");

import mainViewModelModule = require("./main-view-model");

export function pageLoaded(args: any) {
    var page = <pagesModule.Page>args.object;
    page.bindingContext = new mainViewModelModule.MainViewModel();
}