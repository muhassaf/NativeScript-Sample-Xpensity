import { EventData } from "data/observable"
import { Page } from "ui/page";
import { PasswordRecoveryViewModel } from "./password-recovery-view-model";

export function onNavigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = new PasswordRecoveryViewModel();
}