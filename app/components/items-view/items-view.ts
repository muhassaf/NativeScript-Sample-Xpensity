import observableModule = require("data/observable");

import dependencyObservableModule = require("ui/core/dependency-observable");
import proxyModule = require("ui/core/proxy");
import viewModule = require("ui/core/view");

import definitionModule = require("items-view");

var CHANGE = "change";
var ITEMS = "items";
var ITEMS_VIEW = "ItemsView";
var ITEMS_CHANGED = "_itemsChanged";

export class ItemsView extends viewModule.View implements definitionModule.ItemsView {
    public static itemsProperty = new dependencyObservableModule.Property(
        ITEMS,
        ITEMS_VIEW,
        new proxyModule.PropertyMetadata(
            undefined,
            dependencyObservableModule.PropertyMetadataSettings.AffectsLayout,
            ItemsView.onItemsPropertyChanged
            )
        );

    private _itemsChanged: (args: observableModule.EventData) => void;

    constructor() {
        super();
    }

    get items(): any {
        return this._getValue(ItemsView.itemsProperty);
    }

    set items(value: any) {
        this._setValue(ItemsView.itemsProperty, value);
    }

    private static onItemsPropertyChanged(data: dependencyObservableModule.PropertyChangeData) {
        var itemsView = <ItemsView>data.object;

        if (data.oldValue instanceof observableModule.Observable) {
            (<observableModule.Observable>data.oldValue).off(CHANGE, itemsView._itemsChanged);
        }

        if (data.newValue instanceof observableModule.Observable) {
            (<observableModule.Observable>data.newValue).on(CHANGE, itemsView._itemsChanged);
        }

        itemsView.refresh();
    }

    refresh() {
    }
}