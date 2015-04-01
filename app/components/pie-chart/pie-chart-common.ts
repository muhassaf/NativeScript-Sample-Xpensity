import itemsViewModule = require("../items-view/items-view");
import definitionModule = require("pie-chart");

export class PieChart extends itemsViewModule.ItemsView implements definitionModule.PieChart {
    private _valueProperty: string;

    constructor() {
        super();

        this.valueProperty = null;
    }

    get valueProperty(): string {
        return this._valueProperty;
    }
    
    set valueProperty(value: string) {
        if (this._valueProperty !== value) {
            this._valueProperty = value;
            this.refresh();
        }
    }
}