import pieChartCommonModule = require("ui/pie-chart/pie-chart-common");

declare var exports;
require("utils/module-merge").merge(pieChartCommonModule, exports);

declare var TKChart: any;
declare var TKChartDataPoint: any;
declare var TKChartData: any;
declare var TKChartPieSeries: any;
declare var TKChartDelegate: any;

interface TKChartDelegate { };

var TKChartSeriesSelectionModeDataPoint = 2;
var TKChartPieSeriesLabelDisplayModeOutside = 1;

export class PieChart extends pieChartCommonModule.PieChart {
    private _ios: any;
    private _pieSeries: any;
    private _delegate;

    constructor() {
        super();

        this._ios = TKChart.new()
        this._delegate = LabelConverter.new();
    }

    get ios(): any {
        return this._ios;
    }

    refresh() {
        if (this.items) {
            super.refresh();

            if (this._pieSeries) {
                this._ios.removeSeries(this._pieSeries);
            }

            this._pieSeries = TKChartPieSeries.alloc().initWithItems(this.getWrappedItems());
            this._pieSeries.rotationEnabled = false;
            if (this.canSelect) {
                this._pieSeries.selectionMode = TKChartSeriesSelectionModeDataPoint;
                this._pieSeries.expandRadius = 1.1;
            }

            if (this.showLabels) {
                this._pieSeries.labelDisplayMode = TKChartPieSeriesLabelDisplayModeOutside;
                this._pieSeries.radiusInset = 50;
                this._pieSeries.style.pointLabelStyle.textHidden = false;
                this._pieSeries.style.pointLabelStyle.labelOffset = { horizontal: 20, vertical: 20 };
                this._pieSeries.style.pointLabelStyle.font = UIFont.systemFontOfSize(10);
                this._ios.delegate = this._delegate;
            }

            this._ios.addSeries(this._pieSeries);
        }
    }

    private getWrappedItems(): any {
        var result = NSMutableArray.new();
        if (this.items) {
            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                var value = pieChartCommonModule.getPropertyValue(item, this.valueProperty);
                var label = pieChartCommonModule.getPropertyValue(item, this.labelProperty);

                result.addObject(TKChartDataPoint.alloc().initWithNameValue(label, value));
            }
        }

        return result;
    }
}

export class LabelConverter extends NSObject implements TKChartDelegate {
    public static ObjCProtocols = [TKChartDelegate];

    static new(): LabelConverter {
        return <LabelConverter>super.new();
    }

    chartTextForLabelAtPointInSeriesAtIndex(chart: any, dataPoint: any, series: any, index: any): string {
        return dataPoint.dataName() + "\r\n" + dataPoint.dataXValue() + "%";
    }
}