import { EventData } from "data/observable";
import { Page } from "ui/page";
import { ItemEventData } from "ui/list-view";

import { ViewReportViewModel } from "./view-report-view-model";

var viewModel: ViewReportViewModel;
export function onNavigatingTo(args: EventData) {
    var page = <Page>args.object;
    viewModel = <ViewReportViewModel>page.navigationContext.context;
    page.bindingContext = null;
    page.bindingContext = viewModel;

    viewModel.refresh();
} 

export function onSubmitTap() {
    viewModel.submit();
}

export function onItemTap(args: ItemEventData) {
    viewModel.itemTap(args.view.bindingContext);
}