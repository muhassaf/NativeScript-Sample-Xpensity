import colorModule = require("color");

import pieChartCommonModule = require("ui/pie-chart/pie-chart-common");

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
            module palettes {
                class ChartPalette {
                    static PIE_FAMILY: string;
                }

                class PaletteEntry {
                    constructor(fill: number);

                    setStroke(value: number);
                    setStrokeWidth(value: number);
                }
            }

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

require("utils/module-merge").merge(pieChartCommonModule, exports);


export class PieChart extends pieChartCommonModule.PieChart {
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
        this._pieSeries.setLabelOffset(-50);
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

            this.updatePalette();
        }
    }

    private updatePalette() {
        if (this.items) {
            console.log("UPDATE PALETTE");

            var customPalette = this._android.getPalette().clone();
            var pieEntries = customPalette.entriesForFamily(com.telerik.widget.palettes.ChartPalette.PIE_FAMILY);
            pieEntries.clear();

            var customSelectPalette = this._android.getSelectionPalette().clone();
            var pieSelectEntries = customSelectPalette.entriesForFamily(com.telerik.widget.palettes.ChartPalette.PIE_FAMILY);
            pieSelectEntries.clear();

            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];

                console.log("ADD ITEM: " + JSON.stringify(item));
                var color = new colorModule.Color(item.Color);
                pieEntries.add(new com.telerik.widget.palettes.PaletteEntry(color.android));

                var entry = new com.telerik.widget.palettes.PaletteEntry(color.android)
                entry.setStroke(PieChart.getDarkerColor(color).android);
                entry.setStrokeWidth(3);
                pieSelectEntries.add(entry);
            }

            console.log("SET PALETTE");
            this._android.setPalette(customPalette);

            console.log("SET SELECTION PALETTE");
            this._android.setSelectionPalette(customSelectPalette);
        }
    }

    private getWrappedItems(): any {
        var result = new java.util.ArrayList();
        if (this.items) {
            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                var value = pieChartCommonModule.getPropertyValue(item, this.valueProperty);
                var label = pieChartCommonModule.getPropertyValue(item, this.labelProperty);
                
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
        var item = JSON.parse(dataPoint.getDataItem());

        return item.label + "\r\n" + item.value + "%";
    }

    drawLabelBackground(canvas: any, path: any, index: any) {
    }

    drawLabelText(canvas: android.graphics.Canvas, labelText: string, textPositionX: number, textPositionY: number) {
        var paint = new android.graphics.Paint();
        paint.setStyle(android.graphics.Paint.Style.FILL);
        paint.setColor(android.graphics.Color.BLACK);

        canvas.drawText(labelText, textPositionX, textPositionY, paint);
    }
}