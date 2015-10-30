import { EventData } from "data/observable";
import { Page, NavigatedData } from "ui/page";

import { ViewExpenseViewModel } from "./view-expense-view-model";

var viewModel: ViewExpenseViewModel;
export function onNavigatingTo(args: NavigatedData) {
    var page = <Page>args.object;
    viewModel = new ViewExpenseViewModel(page.navigationContext.item);
    page.bindingContext = viewModel;
}