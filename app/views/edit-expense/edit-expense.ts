import { EventData } from "data/observable";
import { Page, NavigatedData } from "ui/page";

import { EditExpenseViewModel } from "./edit-expense-view-model";

var viewModel: EditExpenseViewModel;
export function onNavigatingTo(args: NavigatedData) {
    if (!args.isBackNavigation) {
        var page = <Page>args.object;
        viewModel = page.navigationContext ? new EditExpenseViewModel(page.navigationContext.context, page.navigationContext.item) :
            new EditExpenseViewModel({ Id: "234" });
        page.bindingContext = viewModel;
    }
} 

export function onDoneTap(args: EventData) {
    viewModel.save();
}

export function onTakePictureTap(args: EventData) {
    viewModel.takePicture();
}