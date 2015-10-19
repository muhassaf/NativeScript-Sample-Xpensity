import { EventData } from "data/observable";
import { Page } from "ui/page";

import { ViewReportViewModel } from "./view-report-view-model";

export function onNavigatedTo(args: EventData) {
    var page = <Page>args.object;
    var viewModel = page.navigationContext ? <ViewReportViewModel>page.navigationContext : new ViewReportViewModel({
        Title: "Boston Trip",
        BusinessPurpose: "Client visit",
        Date: new Date(),
        Data: [
            { Brand: "Audi", Amount: 10 },
            { Brand: "Mercedes", Amount: 76 },
            { Brand: "Fiat", Amount: 60 },
            { Brand: "BMW", Amount: 24 },
            { Brand: "Crysler", Amount: 40 }
        ]
    });

    page.bindingContext = viewModel;
    viewModel.refresh();
} 