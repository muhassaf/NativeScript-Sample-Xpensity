var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var pieChartCommon = require("ui/pie-chart/pie-chart-common");
require("utils/module-merge").merge(pieChartCommon, exports);
;
var TKChartSeriesSelectionModeDataPoint = 2;
var TKChartPieSeriesLabelDisplayModeOutside = 1;
var PieChart = (function (_super) {
    __extends(PieChart, _super);
    function PieChart() {
        _super.call(this);
        this._ios = TKChart.new();
    }
    Object.defineProperty(PieChart.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    PieChart.prototype.refresh = function () {
        if (this.items) {
            _super.prototype.refresh.call(this);
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
                this._ios.delegate = LabelConverter.new();
            }
            this._ios.addSeries(pieSeries);
        }
    };
    PieChart.wrapItems = function (items, valueProperty) {
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
    };
    return PieChart;
})(pieChartCommon.PieChart);
exports.PieChart = PieChart;
var LabelConverter = (function (_super) {
    __extends(LabelConverter, _super);
    function LabelConverter() {
        _super.apply(this, arguments);
    }
    LabelConverter.new = function () {
        return _super.new.call(this);
    };
    LabelConverter.prototype.textForLabelAtPointInSeriesAtIndex = function (dataPoint, series, index) {
        return "Label";
    };
    LabelConverter.ObjCProtocols = [TKChartDelegate];
    return LabelConverter;
})(NSObject);
exports.LabelConverter = LabelConverter;
//# sourceMappingURL=pie-chart.ios.js.map