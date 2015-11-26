import { EventData, Observable } from "data/observable";
import { Page } from "ui/page";
import { topmost, NavigationEntry } from "ui/frame";
import { ItemEventData } from "ui/list-view";
import { service } from "../../shared/service";

import { ViewModel1 } from "./test1";

class ViewModel extends Observable {
    constructor() {
        super();
    }

    public navigate() {
        topmost().navigate({
            moduleName: "views/test/test1",
            context: new ViewModel1(),
        });
    }
}

export function onNavigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = new ViewModel();
}
