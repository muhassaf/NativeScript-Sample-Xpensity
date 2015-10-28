import { EventData, Observable } from "data/observable";
import { Page } from "ui/page";
import { ItemEventData } from "ui/list-view";

class ViewModel extends Observable {
    constructor() {
        super();

        this.set("pieSource",
            [
                { Brand: "Audi", Amount: 10 },
                { Brand: "Mercedes", Amount: 76 },
                { Brand: "Fiat", Amount: 60 },
                { Brand: "BMW", Amount: 24 },
                { Brand: "Crysler", Amount: 40 }
            ]);
    }
}

export function onNavigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = new ViewModel();
}
