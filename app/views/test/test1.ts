import { EventData, Observable } from "data/observable";
import { Page } from "ui/page";
import { ItemEventData } from "ui/list-view";
import navigationModule = require("navigation");

class ViewModel extends Observable {
    constructor() {
        super();

        this.set("isVisible", true);
    }

    public toggle() {
        this.set("isVisible", !this.get("isVisible"));
    }

    public tap() {
        navigationModule.navigate("views/test/test2");
    }
}

export function onNavigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = new ViewModel();
}
