import itemsViewModule = require("ui/items-view");
import definitionModule = require("ui/pie-chart");
import utilsModule = require("utils/utils");

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

    onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void {
        super.onMeasure(widthMeasureSpec, widthMeasureSpec);
    }
}