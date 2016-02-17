import { EventData } from "data/observable";
import { Page } from "ui/page";

import { LoginViewModel } from "./login-view-model";


export function onNavigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = new LoginViewModel();
}
