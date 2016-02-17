import { EventData } from "data/observable";
import { Page } from "ui/page";

import { EditReportViewModel } from "./edit-report-view-model";

var viewModel: EditReportViewModel;
export function onNavigatingTo(args: EventData) {
    var page = <Page>args.object;
    viewModel = page.navigationContext ? new EditReportViewModel(page.navigationContext.context) : new EditReportViewModel();
    page.bindingContext = viewModel;
} 

export function onDoneTap(args: EventData) {
    viewModel.save();
}