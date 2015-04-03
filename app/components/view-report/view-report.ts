import observableModule = require("data/observable");

import pagesModule = require("ui/page");

import gridViewModule = require("grid-view");

export function navigatedTo(args: observableModule.EventData) {
    var page = <pagesModule.Page>args.object;
    page.bindingContext = page.navigationContext;
}