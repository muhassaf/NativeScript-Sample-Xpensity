import { EventData, Observable } from "data/observable";
import { Page } from "ui/page";
import { ItemEventData } from "ui/list-view";

var everliveModule = require("everlive");

var pushPlugin = require('nativescript-push-notifications');

class ViewModel extends Observable {
    private _selectedItem: Observable;
    private _items: Observable[];

    constructor() {
        super();

        var item1 = new Observable();
        item1.set("value", "Item 1");

        var item2 = new Observable();
        item2.set("value", "Item 2");

        this._items = [item1, item2];
    }

    public get items(): Observable[] {
        return this._items;
    }

    public selectItem(item: any) {
        if (this._selectedItem) {
            this._selectedItem.set("isSelected", false);
        }

        this._selectedItem = item;

        if (this._selectedItem) {
            this._selectedItem.set("isSelected", true);
        }
    }
}

var viewModel: ViewModel;
var everlive = new everliveModule("hYxsMOYMwpLgdV7z");

export function onNavigatedTo(args: EventData) {
    
}

export function onTap(args: ItemEventData) {
    console.log("EVERLIVE");
    console.log("EVERLIVE" + everlive);
    console.log("EVERLIVE" + everlive);

    console.log("REGISTER");
    everlive.push.register({
        android: {
            projectNumber: "948882044382"
        },
        notificationCallbackAndroid: function (data) {
            console.log("DATA");
            console.log("DATA");
            console.log("DATA");
            console.log("DATA");
            console.log("DATA" + JSON.stringify(data));
        }
    }, function (success) {
        console.log("SUCCESS");
        console.log("SUCCESS");
        console.log("SUCCESS");
        console.log("SUCCESS");
    }, function (error) {
        console.log("FAIL");
        console.log("FAIL");
        console.log("FAIL");
        console.log("FAIL" + error.message);
    });

    console.log("REGISTERED");
}