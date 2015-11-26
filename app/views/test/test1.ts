import { EventData, Observable } from "data/observable";
import { Page } from "ui/page";
import { ItemEventData } from "ui/list-view";
import navigationModule = require("navigation");

export class ViewModel1 extends Observable {
    private _data: any[];

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

    public get text(): string {
        return "Test MS";
    }

    public refresh() {
        setTimeout(() => {
            this.set("pieSource",
                [
                    { Brand: "Audi", Amount: 10 },
                    { Brand: "Mercedes", Amount: 76 },
                    { Brand: "Fiat", Amount: 60 },
                    { Brand: "BMW", Amount: 24 },
                    { Brand: "Crysler", Amount: 40 }
                ])
        }, 200);
    }

}

export function onNavigatingTo(args: EventData) {
    var page = <Page>args.object;
    var viewModel = page.navigationContext;
    page.bindingContext = viewModel;
    viewModel.refresh();
}
