import { EventData, Observable } from "data/observable";
import { Page } from "ui/page";
import { ItemEventData } from "ui/list-view";
import navigationModule = require("navigation");
import { service } from "../../shared/service";

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

        service.getCurrentUser().then((user) => {
            this.set("text", user.DisplayName);
        });

        setTimeout(() => {
            this.set("text", "Kamen Velikov");
        }, 1000);


        this.set("isVisible", false);
        this.set("text", "Ala bala");
    }

    public toggle() {
        this.set("isVisible", !this.get("isVisible"));
    }
}

export function onNavigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = new ViewModel();
}
