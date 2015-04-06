import observableModule = require("data/observable");

import viewModule = require("ui/core/view");
import listViewModule = require("ui/list-view");
import pageModule = require("ui/page");

import listPickerViewModelModule = require("./list-picker-view-model");

// TODO: This method is for test purposes only. Remove it later.
var viewModel: listPickerViewModelModule.ListPickerViewModel;
export function pageLoaded(args: observableModule.EventData) {
    viewModel = new listPickerViewModelModule.ListPickerViewModel(["Ala", "Bala", "Nica"], "Bala");
    var page = <pageModule.Page>args.object;
    page.bindingContext = viewModel;
}

export function itemTap(args: listViewModule.ItemEventData) {
    var view = <viewModule.View>args.view;
    viewModel.selectItem(<listPickerViewModelModule.ListItem>view.bindingContext);
}
