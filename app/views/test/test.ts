import { EventData } from "data/observable";
import { Page } from "ui/page";

export function onNavigatedTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = {
        Title: "My title", 
        IsAdd: true,
        test: function () {
            alert("Test");
        }
    };
} 