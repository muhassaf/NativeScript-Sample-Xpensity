import { EventData } from "data/observable";
import { Page, NavigatedData } from "ui/page";

import { EditExpenseViewModel } from "./edit-expense-view-model";

var viewModel: EditExpenseViewModel;
export function onNavigatingTo(args: NavigatedData) {
    var page = <Page>args.object;
    viewModel = new EditExpenseViewModel(page.navigationContext.context, page.navigationContext.item);
    page.bindingContext = viewModel;
} 

export function onDoneTap(args: EventData) {
    viewModel.save();
}

export function onTakePhotoTap(args: EventData) {
    viewModel.takePicture();
}