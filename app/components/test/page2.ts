import observableModule = require("data/observable");

import frameModule = require("ui/frame");
import pageModule = require("ui/page");

export function navigatedTo(args: observableModule.EventData) {
    var page = <pageModule.Page>args.object;
    page.bindingContext = page.navigationContext;
}

export function doneMenuItemTap(args: observableModule.EventData) {
    frameModule.topmost().navigate("components/test/page1");
}
