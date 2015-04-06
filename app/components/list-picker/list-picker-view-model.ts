import observableModule = require("data/observable");

import dialogResultViewModel = require("../dialog-result-view-model");

export class ListPickerViewModel extends dialogResultViewModel.DialogResultViewModel{
    private _items: any[];
    private _selectedItem: ListItem;

    constructor(items: any[], selectedItem: any) {
        super();

        var listItems = new Array<ListItem>();
        for (var i = 0; i < items.length; i++) {
            var listItem = new ListItem(items[i]);
            if (items[i] === selectedItem) {
                this.selectItem(listItem);
            }

            listItems.push(listItem);
        }

        this.items = listItems;
    }

    get items(): ListItem[] {
        return this._items;
    }

    set items(value: ListItem[]) {
        if (this._items !== value) {
            this._items = value;
            this.notifyPropertyChanged("items", value);
        }
    }

    get selectedItem(): any {
        return this._selectedItem.data;
    }

    selectItem(item: ListItem) {
        if (this._selectedItem) {
            this._selectedItem.isSelected = false;
        }

        this._selectedItem = item;
        if (this._selectedItem) {
            this._selectedItem.isSelected = true;
        }
    }
}

export class ListItem extends observableModule.Observable {
    private _isSelected: boolean;
    private _data: any;

    constructor(data: any) {
        super();

        this.data = data;
        this.isSelected = false;
    }

    get isSelected(): boolean {
        return this._isSelected;
    }

    set isSelected(value: boolean) {
        if (this._isSelected !== value) {
            this._isSelected = value;
            this.notifyPropertyChanged("isSelected", value);
        }
    }

    get data(): boolean {
        return this._data;
    }

    set data(value: boolean) {
        if (this._data !== value) {
            this._data = value;
            this.notifyPropertyChanged("data", value);
        }
    }

    notifyPropertyChanged(propertyName: string, value: any) {
        this.notify({ object: this, eventName: observableModule.knownEvents.propertyChange, propertyName: propertyName, value: value });
    }
}