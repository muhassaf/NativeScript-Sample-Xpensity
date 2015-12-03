import { EventData } from "data/observable";
import { Page, NavigatedData } from "ui/page";
import { ItemEventData } from "ui/list-view";

import { ViewReportViewModel } from "./view-report-view-model";

var viewModel: ViewReportViewModel;
export function onNavigatingTo(args: NavigatedData) {
    if (!args.isBackNavigation) {
        var page = <Page>args.object;
        viewModel = new ViewReportViewModel(page.navigationContext.context.report);
        page.bindingContext = viewModel;
    }

    viewModel.refresh();
} 

export function onItemTap(args: ItemEventData) {
    viewModel.itemTap(args.view.bindingContext);
}