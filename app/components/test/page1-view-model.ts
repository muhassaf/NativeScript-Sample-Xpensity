import observableModule = require("data/observable");

export class Page1ViewModel extends observableModule.Observable {
    private _items: any[];

    constructor() {
        super();

        this.items = [
            { Category: "Alabala", TotalCost: 30, Color: "#FF0000" },
            { Category: "Test", TotalCost: 50, Color: "#0000FF" },
            { Category: "Test 2", TotalCost: 8, Color: "#00FF00" }
        ]
    }

    get items(): any {
        return this._items;
    }

    set items(value: any) {
        if (this._items !== value) {
            this._items = value;
            this.notifyPropertyChanged("items", value);
        }
    }

    notifyPropertyChanged(propertyName: string, value: any) {
        this.notify({ object: this, eventName: observableModule.knownEvents.propertyChange, propertyName: propertyName, value: value });
    }
}