import { EventData } from "data/observable"
import { Page } from "ui/page";
import { SignUpViewModel } from "./sign-up-view-model";

export function onNavigatedTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = new SignUpViewModel();
}