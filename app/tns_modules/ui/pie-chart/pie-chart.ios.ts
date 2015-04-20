import pieChartCommon = require("ui/pie-chart/pie-chart-common");

declare var exports;
require("utils/module-merge").merge(pieChartCommon, exports);

declare var TKChart: any;
declare var TKChartDataPoint: any;
declare var TKChartData: any;
declare var TKChartPieSeries: any;
declare class TKChartDelegate { };

var TKChartSeriesSelectionModeDataPoint = 2;
var TKChartPieSeriesLabelDisplayModeOutside = 1;

export class PieChart extends pieChartCommon.PieChart {
    private _ios: any;

    constructor() {
        super();

        this._ios = TKChart.new()
    }

    get ios(): any {
        return this._ios;
    }

    refresh() {
        if (this.items) {
            super.refresh();
            var pieSeries = TKChartPieSeries.alloc().initWithItems(PieChart.wrapItems(this.items, this.valueProperty));
            pieSeries.rotationEnabled = false;
            if (this.canSelect) {
                pieSeries.selectionMode = TKChartSeriesSelectionModeDataPoint;
                pieSeries.expandRadius = 1.1;
            }

            if (this.showLabels) {
                pieSeries.labelDisplayMode = TKChartPieSeriesLabelDisplayModeOutside;
                pieSeries.style.pointLabelStyle.textHidden = false;
                //pieSeries.style.pointLabelStyle.labelOffset = new UIOffset({ 10, 10});
                this._ios.delegate = new LabelConverter();
            }

            this._ios.addSeries(pieSeries);
        }
    }

    private static wrapItems(items: any, valueProperty: string): any {
        var data = NSMutableArray.new();
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

                data.addObject(TKChartDataPoint.alloc().initWithNameValue("T" + i, value));
            }
        }

        return data;
    }
}

export class LabelConverter extends TKChartDelegate {
    textForLabelAtPointInSeriesAtIndex(dataPoint: any, series: any, index: any): string {
        return "Label";
    }
}