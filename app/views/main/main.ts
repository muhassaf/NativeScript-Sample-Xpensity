import { EventData } from "data/observable";
import { Page } from "ui/page";

import { MainViewModel } from "./main-view-model";

var viewModel = new MainViewModel();
export function onNavigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = viewModel;
    viewModel.refresh(); 
}