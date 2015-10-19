import { EventData } from "data/observable";
import { Page } from "ui/page";

import { EditExpenseViewModel } from "./edit-expense-view-model";

export function onNavigatedTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = new EditExpenseViewModel(page.navigationContext.context, page.navigationContext.item);
} 