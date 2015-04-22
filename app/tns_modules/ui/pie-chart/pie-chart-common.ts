import colorModule = require("color");
import itemsViewModule = require("ui/items-view");
import definitionModule = require("ui/pie-chart");
import utilsModule = require("utils/utils");

export class PieChart extends itemsViewModule.ItemsView implements definitionModule.PieChart {
    private static DARK_FACTOR = 50;

    private _valueProperty: string;
    private _labelProperty: string;
    private _showLabels: boolean;
    private _canSelect: boolean;
    private _colors: string[];

    constructor() {
        super();

        this.valueProperty = null;
        this.labelProperty = null;
        this.canSelect = false;
        this.showLabels = false;
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

    get labelProperty(): string {
        return this._labelProperty;
    }

    set labelProperty(value: string) {
        if (this._labelProperty !== value) {
            this._labelProperty = value;
            this.refresh();
        }
    }

    get showLabels(): boolean {
        return this._showLabels;
    }

    set showLabels(value: boolean) {
        if (this._showLabels !== value) {
            this._showLabels = value;
            this.refresh();
        }
    }

    get canSelect(): boolean {
        return this._canSelect;
    }

    set canSelect(value: boolean) {
        if (this._canSelect !== value) {
            this._canSelect = value;
            this.refresh();
        }
    }

    get colors(): string[] {
        return this._colors;
    }

    set colors(value: string[]) {
        if (this._colors !== value) {
            this._colors = value;
            this.refresh();
        }
    }

    static getDarkerColor(color: colorModule.Color): colorModule.Color {
        return new colorModule.Color(color.a, Math.max(0, color.r - PieChart.DARK_FACTOR), Math.max(0, color.g - PieChart.DARK_FACTOR), Math.max(0, color.b - PieChart.DARK_FACTOR))
    }

    onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void {
        super.onMeasure(widthMeasureSpec, widthMeasureSpec);
    }
}

export function getPropertyValue(item: any, property: string): any {
    var value = item;
    if (item) {
        if (property) {
            if (item.getValue) {
                value = item.getValue(property);
            }
            else {
                value = item[property];
            }
        }
    }

    return value;
} 