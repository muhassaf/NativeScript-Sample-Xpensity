import pieChartCommon = require("ui/pie-chart/pie-chart-common");

declare var exports;

declare module com {
    module telerik {
        module android {
            module common {
                interface Function {
                    apply(arg: any): any
                }
            }
        }

        module widget {
            module chart {
                module visualization {
                    module pieChart {
                        class RadPieChartView {
                            constructor(context: any);
                        }

                        class PieSeries { }
                        class PieSeriesLabelRenderer {
                            constructor(owner: any);
                        }
                    }

                    module behaviors {
                        class ChartSelectionBehavior {
                        }
                    }
                }

                module engine {
                    module dataPoints {
                        class DataPoint { }
                    }

                    module databinding {
                        class GenericDataPointBinding {
                            constructor(valueSelector: any);
                        }
                    }
                }
            }
        }
    }
}

require("utils/module-merge").merge(pieChartCommon, exports);


export class PieChart extends pieChartCommon.PieChart {
    private _android: any;
    private _pieSeries: any;
    private _selectionBehavior: any;
    private _renderer: CustomPieLabelRenderer;

    constructor() {
        super();
    }

    get android(): any {
        return this._android;
    }

    _createUI() {
        this._android = new com.telerik.widget.chart.visualization.pieChart.RadPieChartView(this._context);
        this._pieSeries = new com.telerik.widget.chart.visualization.pieChart.PieSeries();
        this._renderer = new CustomPieLabelRenderer(this, this._pieSeries);
        this._pieSeries.setLabelRenderer(this._renderer);
        this._pieSeries.setLabelFillColor(android.graphics.Color.TRANSPARENT);
        this._pieSeries.setLabelStrokeColor(android.graphics.Color.TRANSPARENT);
        this._pieSeries.setLabelTextColor(android.graphics.Color.BLACK);
        this._pieSeries.setLabelOffset(-50);
        this._pieSeries.setLabelSize(16);
        this._android.getSeries().add(this._pieSeries);

        this.refresh();
    }

    refresh() {
        if (this._pieSeries && this.items) {
            super.refresh();
            var that = this;
            this._pieSeries.setValueBinding(new com.telerik.widget.chart.engine.databinding.GenericDataPointBinding(new (<any>com).telerik.android.common.Function({
                apply: function (arg: any): any {
                    console.log("APPLY: " + arg);
                    var item = JSON.parse(arg);

                    return item.value;
                }
            })));

            this._pieSeries.setData(this.getWrappedItems());
            this._pieSeries.setShowLabels(this.showLabels);
            if (this.canSelect) {
                this._selectionBehavior = new com.telerik.widget.chart.visualization.behaviors.ChartSelectionBehavior();
                this._android.getBehaviors().add(this._selectionBehavior);
            }
            else if (this._selectionBehavior) {
                this._android.getBehaviors().remove(this._selectionBehavior);
                this._selectionBehavior = null;
            }
        }
    }

    private getWrappedItems(): any {
        var result = new java.util.ArrayList();
        if (this.items) {
            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                console.log("ADD ITEM " + JSON.stringify(item));
                console.log("VALUE PROPERTY" + this.valueProperty);
                console.log("LABEL PROPERTY" + this.labelProperty);

                var value = getPropertyValue(item, this.valueProperty);
                var label = getPropertyValue(item, this.labelProperty);

                console.log("VALUE PROPERTY" + value);
                console.log("LABEL PROPERTY" + label);
                
                result.add(java.lang.String.valueOf(JSON.stringify({ value: value, label: label })));
            }
        }

        return result;
    }
}

export class CustomPieLabelRenderer extends com.telerik.widget.chart.visualization.pieChart.PieSeriesLabelRenderer {
    private _owner: PieChart;

    constructor(owner: PieChart, series: any) {
        super(series);

        this._owner = owner;
    }

    getLabelText(dataPoint: any): string {
        console.log("GET LABEL: " + dataPoint.getDataItem());
        var item = JSON.parse(dataPoint.getDataItem());

        return item.label;
    }
}

export class Data extends java.lang.Object {
    private _label: string;
    private _value: number;

    constructor(label: string, value: number) {
        super();

        this._label = label;
        this._value = value;
    }

    getLabel(): string {
        return this._label;
    }

    getValue(): number {
        return this._value;
    }

    private static convert(value: any): any {
        return java.lang.Double.valueOf(value);
    }

    toString() {
        return "1";
    }
}

function getPropertyValue(item: any, property: string): any {
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