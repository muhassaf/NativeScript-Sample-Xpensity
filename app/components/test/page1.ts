import observableModule = require("data/observable");

import frameModule = require("ui/frame");
import pageModule = require("ui/page");

import page1ViewModelModule = require("./page1-view-model");
import page2ViewModelModule = require("./page2-view-model");

var viewModel = new page1ViewModelModule.Page1ViewModel();
export function pageLoaded(args: observableModule.EventData) {
    var page = <pageModule.Page>args.object;
    page.bindingContext = viewModel;
}


export function editMenuItemTap(args: observableModule.EventData) {
    frameModule.topmost().navigate({
        moduleName: "components/test/page2",
        context: new page2ViewModelModule.Page2ViewModel(viewModel.item)
    });
}
