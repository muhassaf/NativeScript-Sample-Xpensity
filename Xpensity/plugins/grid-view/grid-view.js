var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var observableModule = require("data/observable");
var dependencyObservableModule = require("ui/core/dependency-observable");
var proxyModule = require("ui/core/proxy");
var gridLayoutModule = require("ui/layouts/grid-layout");
var builderModule = require("ui/builder");
var labelModule = require("ui/label");
var knownTemplates;
(function (knownTemplates) {
    knownTemplates.itemTemplate = ITEM_TEMPLATE;
})(knownTemplates = exports.knownTemplates || (exports.knownTemplates = {}));
var CHANGE = "change";
var ITEMS = "items";
var ITEM_TEMPLATE = "itemTemplate";
var GRID_COLUMNS = "gridColumns";
var GRID_VIEW = "GridView";
var GridView = (function (_super) {
    __extends(GridView, _super);
    function GridView() {
        var _this = this;
        _super.call(this);
        this._itemsChanged = function () {
            _this.refresh();
        };
    }
    Object.defineProperty(GridView.prototype, "items", {
        get: function () {
            return this._getValue(GridView.itemsProperty);
        },
        set: function (value) {
            this._setValue(GridView.itemsProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridView.prototype, "itemTemplate", {
        get: function () {
            return this._getValue(GridView.itemTemplateProperty);
        },
        set: function (value) {
            this._setValue(GridView.itemTemplateProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridView.prototype, "gridColumns", {
        get: function () {
            return this._getValue(GridView.gridColumnsProperty);
        },
        set: function (value) {
            this._setValue(GridView.gridColumnsProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    GridView.prototype.refresh = function () {
        this.clear();
        if (this.items && this.items.length && this.gridColumns) {
            for (var i = 0; i < this.gridColumns; i++) {
                this.addColumn(new gridLayoutModule.ItemSpec(1, gridLayoutModule.GridUnitType.star));
            }
            var rows = Math.floor(this.items.length / this.gridColumns);
            if (this.items.length % this.gridColumns) {
                rows++;
            }
            for (var i = 0; i < rows; i++) {
                this.addRow(new gridLayoutModule.ItemSpec(1, gridLayoutModule.GridUnitType.star));
            }
            for (var i = 0; i < this.items.length; i++) {
                var templateView = this.getItemTemplateContent(i);
                var row = Math.floor(i / this.gridColumns);
                var col = i % this.gridColumns;
                gridLayoutModule.GridLayout.setRow(templateView, row);
                gridLayoutModule.GridLayout.setColumn(templateView, col);
                this.addChild(templateView);
            }
        }
    };
    GridView.onItemsPropertyChanged = function (data) {
        var gridView = data.object;
        if (data.oldValue instanceof observableModule.Observable) {
            data.oldValue.off(CHANGE, gridView._itemsChanged);
        }
        if (data.newValue instanceof observableModule.Observable) {
            data.newValue.on(CHANGE, gridView._itemsChanged);
        }
        gridView.refresh();
    };
    GridView.onItemTemplatePropertyChanged = function (data) {
        var gridView = data.object;
        gridView.refresh();
    };
    GridView.onGridColumnsPropertyChanged = function (data) {
        var gridView = data.object;
        gridView.refresh();
    };
    GridView.prototype.getItemTemplateContent = function (index) {
        var templateView;
        if (this.itemTemplate && this.items) {
            templateView = builderModule.parse(this.itemTemplate, this);
            this.prepareItem(templateView, index);
        }
        else {
            templateView = this.getDefaultItemContent(index);
        }
        return templateView;
    };
    GridView.prototype.prepareItem = function (item, index) {
        if (item) {
            var dataItem = this.getDataItem(index);
            item.bindingContext = dataItem;
        }
    };
    GridView.prototype.getDefaultItemContent = function (index) {
        var lbl = new labelModule.Label();
        lbl.text = this.getDataItem(index) + "";
        return lbl;
    };
    GridView.prototype.getDataItem = function (index) {
        return this.items.getItem ? this.items.getItem(index) : this.items[index];
    };
    GridView.prototype.clear = function () {
        while (this.getChildrenCount()) {
            this.removeChild(this.getChildAt(0));
        }
        var columns = this.getColumns();
        for (var i = 0; i < columns.length; i++) {
            this.removeColumn(columns[i]);
        }
        var rows = this.getRows();
        for (var i = 0; i < rows.length; i++) {
            this.removeRow(rows[i]);
        }
    };
    GridView.itemsProperty = new dependencyObservableModule.Property(ITEMS, GRID_VIEW, new proxyModule.PropertyMetadata(undefined, dependencyObservableModule.PropertyMetadataSettings.AffectsLayout, GridView.onItemsPropertyChanged));
    GridView.itemTemplateProperty = new dependencyObservableModule.Property(ITEM_TEMPLATE, GRID_VIEW, new proxyModule.PropertyMetadata(undefined, dependencyObservableModule.PropertyMetadataSettings.AffectsLayout, GridView.onItemTemplatePropertyChanged));
    GridView.gridColumnsProperty = new dependencyObservableModule.Property(GRID_COLUMNS, GRID_VIEW, new proxyModule.PropertyMetadata(1, dependencyObservableModule.PropertyMetadataSettings.AffectsLayout, GridView.onGridColumnsPropertyChanged));
    return GridView;
})(gridLayoutModule.GridLayout);
exports.GridView = GridView;
//# sourceMappingURL=grid-view.js.map