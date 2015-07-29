var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observableModule = require("data/observable");
var dependencyObservableModule = require("ui/core/dependency-observable");
var proxyModule = require("ui/core/proxy");
var viewModule = require("ui/core/view");
var CHANGE = "change";
var ITEMS = "items";
var ITEMS_VIEW = "ItemsView";
var ITEMS_CHANGED = "_itemsChanged";
var ItemsView = (function (_super) {
    __extends(ItemsView, _super);
    function ItemsView() {
        _super.call(this);
    }
    Object.defineProperty(ItemsView.prototype, "items", {
        get: function () {
            return this._getValue(ItemsView.itemsProperty);
        },
        set: function (value) {
            this._setValue(ItemsView.itemsProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ItemsView.onItemsPropertyChanged = function (data) {
        var itemsView = data.object;
        if (data.oldValue instanceof observableModule.Observable) {
            data.oldValue.off(CHANGE, itemsView._itemsChanged);
        }
        if (data.newValue instanceof observableModule.Observable) {
            data.newValue.on(CHANGE, itemsView._itemsChanged);
        }
        itemsView.refresh();
    };
    ItemsView.prototype.refresh = function () {
    };
    ItemsView.itemsProperty = new dependencyObservableModule.Property(ITEMS, ITEMS_VIEW, new proxyModule.PropertyMetadata(undefined, dependencyObservableModule.PropertyMetadataSettings.AffectsLayout, ItemsView.onItemsPropertyChanged));
    return ItemsView;
})(viewModule.View);
exports.ItemsView = ItemsView;
