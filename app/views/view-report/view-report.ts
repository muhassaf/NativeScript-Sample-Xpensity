import { EventData } from "data/observable";
import { Page } from "ui/page";

import { ViewReportViewModel } from "./view-report-view-model";

var viewModel: ViewReportViewModel;
export function onNavigatedTo(args: EventData) {
    var page = <Page>args.object;
    viewModel = <ViewReportViewModel>page.navigationContext.context;
    page.bindingContext = null;
    page.bindingContext = viewModel;
    viewModel.refresh();
} 

export function onSubmitTap() {
    viewModel.submit();
}