import observableModule = require("data/observable");

import pagesModule = require("ui/page");

import datePickerViewModelModule = require("./date-picker-view-model");

export function navigatedTo(args: observableModule.EventData) {
    var page = <pagesModule.Page>args.object;
    page.bindingContext = page.navigationContext;
}
