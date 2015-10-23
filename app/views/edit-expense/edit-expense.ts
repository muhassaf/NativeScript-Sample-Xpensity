import { EventData } from "data/observable";
import { Page, NavigatedData } from "ui/page";

import { EditExpenseViewModel } from "./edit-expense-view-model";

var viewModel: EditExpenseViewModel;
export function onNavigatedTo(args: NavigatedData) {
    console.log("NAVIGATED");
    console.log("NAVIGATED");
    console.log("NAVIGATED");
    console.log("NAVIGATED");
    console.log("NAVIGATED: " + args.context);
    var page = <Page>args.object;
    page.bindingContext = new EditExpenseViewModel(page.navigationContext.context, page.navigationContext.item);;
} 

export function onDoneTap(args: EventData) {
    viewModel.save();
}