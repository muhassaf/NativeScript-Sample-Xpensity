import { EventData } from "data/observable";
import { Page } from "ui/page";

import { EditReportViewModel } from "./edit-report-view-model";

export function onNavigatedTo(args: EventData) {
    var page = <Page>args.object;
    var viewModel = page.navigationContext ? new EditReportViewModel(page.navigationContext.context) : new EditReportViewModel();
    page.bindingContext = viewModel;
} 