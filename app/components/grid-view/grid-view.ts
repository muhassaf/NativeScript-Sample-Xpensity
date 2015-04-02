import observableModule = require("data/observable");

import dependencyObservableModule = require("ui/core/dependency-observable");
import proxyModule = require("ui/core/proxy");
import viewModule = require("ui/core/view");
import gridLayoutModule = require("ui/layouts/grid-layout");
import builderModule = require("ui/builder");
import labelModule = require("ui/label");

import definitionModule = require("grid-view");

var CHANGE = "change";
var ITEMS = "items";
var ITEM_TEMPLATE = "itemTemplate";
var GRID_COLUMNS = "gridColumns";
var GRID_VIEW = "GridView";
var ITEMS_CHANGED = "_itemsChanged";


export module knownTemplates {
    export var itemTemplate = ITEM_TEMPLATE;
}

export class GridView extends gridLayoutModule.GridLayout implements definitionModule.GridView {
    public static itemsProperty = new dependencyObservableModule.Property(
        ITEMS,
        GRID_VIEW,
        new proxyModule.PropertyMetadata(
            undefined,
            dependencyObservableModule.PropertyMetadataSettings.AffectsLayout,
            GridView.onItemsPropertyChanged
            )
        );

    public static itemTemplateProperty = new dependencyObservableModule.Property(
        ITEM_TEMPLATE,
        GRID_VIEW,
        new proxyModule.PropertyMetadata(
            undefined,
            dependencyObservableModule.PropertyMetadataSettings.AffectsLayout,
            GridView.onItemTemplatePropertyChanged
            )
        );

    public static gridColumnsProperty = new dependencyObservableModule.Property(
        GRID_COLUMNS,
        GRID_VIEW,
        new proxyModule.PropertyMetadata(
            1,
            dependencyObservableModule.PropertyMetadataSettings.AffectsLayout,
            GridView.onGridColumnsPropertyChanged
            )
        );

    private _itemsChanged: (args: observableModule.EventData) => void;

    constructor() {
        super();
    }

    get items(): any {
        return this._getValue(GridView.itemsProperty);
    }

    set items(value: any) {
        this._setValue(GridView.itemsProperty, value);
    }

    get itemTemplate(): string {
        return this._getValue(GridView.itemTemplateProperty);
    }

    set itemTemplate(value: string) {
        this._setValue(GridView.itemTemplateProperty, value);
    }

    get gridColumns(): number {
        return this._getValue(GridView.gridColumnsProperty);
    }

    set gridColumns(value: number) {
        this._setValue(GridView.gridColumnsProperty, value);
    }

    public refresh() {
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

            console.log("Rows: " + rows + " Columns: " + this.gridColumns);

            for (var i = 0; i < this.items.length; i++) {
                var templateView = this.getItemTemplateContent(i);
                var row = Math.floor(i / this.gridColumns);
                var col = i % this.gridColumns;

                console.log("Row: " + row + " Column: " + col);

                gridLayoutModule.GridLayout.setRow(templateView, row);
                gridLayoutModule.GridLayout.setColumn(templateView, col);
                this.addChild(templateView);
            }
        }
    }

    private static onItemsPropertyChanged(data: dependencyObservableModule.PropertyChangeData) {
        var wrapListView = <GridView>data.object;

        if (data.oldValue instanceof observableModule.Observable) {
            (<observableModule.Observable>data.oldValue).off(CHANGE, wrapListView._itemsChanged);
        }

        if (data.newValue instanceof observableModule.Observable) {
            (<observableModule.Observable>data.newValue).on(CHANGE, wrapListView._itemsChanged);
        }

        wrapListView.refresh();
    }

    private static onItemTemplatePropertyChanged(data: dependencyObservableModule.PropertyChangeData) {
        var wrapListView = <GridView>data.object;
        wrapListView.refresh();
    }

    private static onGridColumnsPropertyChanged(data: dependencyObservableModule.PropertyChangeData) {
        var wrapListView = <GridView>data.object;
        wrapListView.refresh();
    }

    private getItemTemplateContent(index: number): viewModule.View {
        var templateView;

        if (this.itemTemplate && this.items) {
            templateView = builderModule.parse(this.itemTemplate, getExports(this));
            this.prepareItem(templateView, index);
        }
        else {
            templateView = this.getDefaultItemContent(index);
        }

        return templateView;
    }

    private prepareItem(item: viewModule.View, index: number) {
        if (item) {
            item.bindingContext = this.getDataItem(index);
        }
    }

    private getDefaultItemContent(index: number): viewModule.View {
        var lbl = new labelModule.Label();
        lbl.text = this.getDataItem(index) + "";

        return lbl;
    }

    private getDataItem(index: number): any {
        return this.items.getItem ? this.items.getItem(index) : this.items[index];
    }

    private clear() {
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
    }
}

function getExports(instance: viewModule.View): any {
    var parent = instance.parent;

    while (parent && (<any>parent).exports === undefined) {
        parent = parent.parent;
    }

    return (<any>parent).exports;
}