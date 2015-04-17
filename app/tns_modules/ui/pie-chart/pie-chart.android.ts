import pieChartCommon = require("ui/pie-chart/pie-chart-common");

declare var exports;

declare module com {
    module telerik {
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

    constructor() {
        super();
    }

    get android(): any {
        return this._android;
    }

    _createUI() {
        this._android = new com.telerik.widget.chart.visualization.pieChart.RadPieChartView(this._context);
        this._pieSeries = new com.telerik.widget.chart.visualization.pieChart.PieSeries();
        this._pieSeries.setLabelRenderer(new CustomPieLabelRenderer(this._pieSeries));
        this._android.getSeries().add(this._pieSeries);

        this.refresh();
    }

    refresh() {
        if (this._pieSeries && this.items) {
            super.refresh();
            this._pieSeries.setData(PieChart.wrapItems(this.items, this.valueProperty));
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

    private static wrapItems(items: any, valueProperty: string): any {
        var data = new java.util.ArrayList();
        if (items) {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var value = item;
                if (item) {
                    if (valueProperty) {
                        if (item.getValue) {
                            value = item.getValue(valueProperty);
                        }
                        else {
                            value = item[valueProperty];
                        }
                    }
                }

                data.add(PieChart.convert(value));
            }
        }

        return data;
    }

    private static convert(value: any): any {
        return java.lang.Double.valueOf(value);
    }
}

export class CustomPieLabelRenderer extends com.telerik.widget.chart.visualization.pieChart.PieSeriesLabelRenderer {
    constructor(owner: any) {
        super(owner);
    }

    getLabelText(dataPoint: any): string {
        return "Label";
    }
}