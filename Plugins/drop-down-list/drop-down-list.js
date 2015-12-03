var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
var dependencyObservableModule = require("ui/core/dependency-observable");
var proxyModule = require("ui/core/proxy");
var typesModule = require("utils/types");
var view_model_base_1 = require("view-model-base");
var custom_control_1 = require("custom-control");
var navigationModule = require("navigation");
var HEADER = "header";
var ITEMS = "items";
var SELECTED_VALUE = "selectedValue";
var DROP_DOWN_LIST = "DropDownList";
var SELECT = "Select...";
var DropDownList = (function (_super) {
    __extends(DropDownList, _super);
    function DropDownList() {
        var _this = this;
        _super.call(this);
        this._hint = SELECT;
        this._itemsChanged = function () {
            _this.refresh();
        };
    }
    Object.defineProperty(DropDownList.prototype, "displayName", {
        get: function () {
            return this._displayName;
        },
        set: function (value) {
            if (this._displayName !== value) {
                this._displayName = value;
                this.notifyPropertyChange("displayName", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownList.prototype, "valueName", {
        get: function () {
            return this._valueName;
        },
        set: function (value) {
            if (this._valueName !== value) {
                this._valueName = value;
                this.notifyPropertyChange("valueName", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownList.prototype, "displayText", {
        get: function () {
            return this._displayText;
        },
        set: function (value) {
            if (this._displayText !== value) {
                this._displayText = value;
                this.notifyPropertyChange("displayText", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownList.prototype, "hint", {
        get: function () {
            return this._hint;
        },
        set: function (value) {
            if (this._hint !== value) {
                this._hint = value;
                this.notifyPropertyChange("hint", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownList.prototype, "showClearButton", {
        get: function () {
            return this._showClearButton;
        },
        set: function (value) {
            if (this._showClearButton !== value) {
                this._showClearButton = value;
                this.notifyPropertyChange("showClearButton", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownList.prototype, "header", {
        get: function () {
            return this._getValue(DropDownList.headerProperty);
        },
        set: function (value) {
            this._setValue(DropDownList.headerProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownList.prototype, "selectedValue", {
        get: function () {
            return this._getValue(DropDownList.selectedValueProperty);
        },
        set: function (value) {
            this._setValue(DropDownList.selectedValueProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownList.prototype, "items", {
        get: function () {
            return this._getValue(DropDownList.itemsProperty);
        },
        set: function (value) {
            this._setValue(DropDownList.itemsProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownList.prototype, "path", {
        get: function () {
            return "~/tns_modules/drop-down-list";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownList.prototype, "templateName", {
        get: function () {
            return "drop-down-list";
        },
        enumerable: true,
        configurable: true
    });
    DropDownList.onSelectedValuePropertyChanged = function (data) {
        var dropDownList = data.object;
        dropDownList.refresh();
    };
    DropDownList.onItemsPropertyChanged = function (data) {
        var dropDownList = data.object;
        if (data.oldValue instanceof observable_1.Observable) {
            data.oldValue.off(observable_array_1.ObservableArray.changeEvent, dropDownList._itemsChanged);
        }
        if (data.newValue instanceof observable_1.Observable) {
            data.newValue.on(observable_array_1.ObservableArray.changeEvent, dropDownList._itemsChanged);
        }
        dropDownList.refresh();
    };
    DropDownList.prototype.refresh = function () {
        var displayText;
        var selectedValue = this.selectedValue;
        if (this.items && !typesModule.isNullOrUndefined(selectedValue)) {
            this._selectedItem = getSelectedItem(this.items, selectedValue, this._valueName);
            displayText = getValue(this._selectedItem, this.displayName);
        }
        this.displayText = typesModule.isNullOrUndefined(displayText) ? this._hint : displayText;
    };
    DropDownList.prototype.onDropDownListTap = function () {
        var _this = this;
        navigationModule.navigate("tns_modules/drop-down-list/drop-down-list-popup", new DropDownListViewModel(this.displayName, this.items, this._selectedItem, this._showClearButton, this._hint, function (selectedItem) {
            var selectedValue = getValue(selectedItem, _this._valueName);
            _this.selectedValue = selectedValue;
            _this._selectedItem = selectedItem;
        }));
    };
    DropDownList.headerProperty = new dependencyObservableModule.Property(HEADER, DROP_DOWN_LIST, new proxyModule.PropertyMetadata(undefined, dependencyObservableModule.PropertyMetadataSettings.AffectsLayout));
    DropDownList.selectedValueProperty = new dependencyObservableModule.Property(SELECTED_VALUE, DROP_DOWN_LIST, new proxyModule.PropertyMetadata(undefined, dependencyObservableModule.PropertyMetadataSettings.AffectsLayout, DropDownList.onSelectedValuePropertyChanged));
    DropDownList.itemsProperty = new dependencyObservableModule.Property(ITEMS, DROP_DOWN_LIST, new proxyModule.PropertyMetadata(undefined, dependencyObservableModule.PropertyMetadataSettings.AffectsLayout, DropDownList.onItemsPropertyChanged));
    return DropDownList;
})(custom_control_1.CustomControl);
exports.DropDownList = DropDownList;
var DropDownListViewModel = (function (_super) {
    __extends(DropDownListViewModel, _super);
    function DropDownListViewModel(displayName, items, selectedItem, showClearButton, clearButtonText, selectItemCallback) {
        _super.call(this);
        this._showClearButton = showClearButton;
        this._clearButtonText = clearButtonText;
        this._selectItemCallback = selectItemCallback;
        this.items = this.createListItems(items, selectedItem, displayName);
    }
    Object.defineProperty(DropDownListViewModel.prototype, "showClearButton", {
        get: function () {
            return this._showClearButton;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListViewModel.prototype, "clearButtonText", {
        get: function () {
            return this._clearButtonText;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListViewModel.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (value) {
            if (this._items !== value) {
                this._items = value;
                this.notifyPropertyChange("items", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListViewModel.prototype, "selectedItem", {
        get: function () {
            if (this._selectedItem) {
                return this._selectedItem.data;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    DropDownListViewModel.prototype.selectItem = function (item) {
        if (this._selectedItem) {
            this._selectedItem.isSelected = false;
        }
        this._selectedItem = item;
        if (this._selectedItem) {
            this._selectedItem.isSelected = true;
        }
    };
    DropDownListViewModel.prototype.clear = function () {
        this.selectItem(null);
    };
    DropDownListViewModel.prototype.done = function () {
        this._selectItemCallback(this._selectedItem.data);
        navigationModule.goBack();
    };
    DropDownListViewModel.prototype.createListItems = function (items, selectedItem, displayName) {
        if (items) {
            var listItems = new Array();
            for (var i = 0; i < items.length; i++) {
                var item = getItem(items, i);
                var listItem = new ListItem(item, displayName);
                if (!typesModule.isNullOrUndefined(selectedItem) && item === selectedItem) {
                    this.selectItem(listItem);
                }
                listItems.push(listItem);
            }
        }
        return listItems;
    };
    return DropDownListViewModel;
})(view_model_base_1.ViewModelBase);
exports.DropDownListViewModel = DropDownListViewModel;
var ListItem = (function (_super) {
    __extends(ListItem, _super);
    function ListItem(data, display) {
        _super.call(this);
        this._data = data;
        this._value = getValue(data, display);
        this.isSelected = false;
    }
    Object.defineProperty(ListItem.prototype, "isSelected", {
        get: function () {
            return this._isSelected;
        },
        set: function (value) {
            if (this._isSelected !== value) {
                this._isSelected = value;
                this.notifyPropertyChange("isSelected", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListItem.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListItem.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    return ListItem;
})(observable_1.Observable);
exports.ListItem = ListItem;
function getValue(item, property) {
    if (item) {
        if (property) {
            return item[property];
        }
        else {
            return item;
        }
    }
    return null;
}
function getSelectedItem(items, selectedValue, valueName) {
    for (var i = 0; i < items.length; i++) {
        var item = getItem(items, i);
        var value = getValue(item, valueName);
        if (value === selectedValue) {
            return item;
        }
    }
    return null;
}
function getItem(items, index) {
    if (items.getItem) {
        return items.getItem(index);
    }
    return items[index];
}
//# sourceMappingURL=drop-down-list.js.map