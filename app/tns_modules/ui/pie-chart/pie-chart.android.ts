import pieChartCommon = require("ui/pie-chart/pie-chart-common");

declare var exports;
require("utils/module-merge").merge(pieChartCommon, exports);

export class PieChart extends pieChartCommon.PieChart {
    private _android: any;
    private _pieSeries: any;

    constructor() {
        super();
    }

    get android(): any {
        return this._android;
    }

    _createUI() {
        this._android = new (<any>com).telerik.widget.chart.visualization.pieChart.RadPieChartView(this._context);
        this._pieSeries = new (<any>com).telerik.widget.chart.visualization.pieChart.PieSeries();
        this._android.getSeries().add(this._pieSeries);

        this.refresh();
    }

    refresh() {
        if (this._pieSeries && this.items) {
            super.refresh();
            this._pieSeries.setData(PieChart.wrapItems(this.items, this.valueProperty));
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