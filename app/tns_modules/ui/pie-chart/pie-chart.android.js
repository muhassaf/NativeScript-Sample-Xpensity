var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var pieChartCommon = require("ui/pie-chart/pie-chart-common");
require("utils/module-merge").merge(pieChartCommon, exports);
var PieChart = (function (_super) {
    __extends(PieChart, _super);
    function PieChart() {
        _super.call(this);
    }
    Object.defineProperty(PieChart.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    PieChart.prototype._createUI = function () {
        this._android = new com.telerik.widget.chart.visualization.pieChart.RadPieChartView(this._context);
        this._pieSeries = new com.telerik.widget.chart.visualization.pieChart.PieSeries();
        this._android.getSeries().add(this._pieSeries);
        this.refresh();
    };
    PieChart.prototype.refresh = function () {
        if (this._pieSeries && this.items) {
            _super.prototype.refresh.call(this);
            this._pieSeries.setData(PieChart.wrapItems(this.items, this.valueProperty));
        }
    };
    PieChart.wrapItems = function (items, valueProperty) {
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
    };
    PieChart.convert = function (value) {
        return java.lang.Double.valueOf(value);
    };
    return PieChart;
})(pieChartCommon.PieChart);
exports.PieChart = PieChart;
//# sourceMappingURL=pie-chart.android.js.map