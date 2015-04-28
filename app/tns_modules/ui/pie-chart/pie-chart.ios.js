var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var colorModule = require("color");
var pieChartCommonModule = require("ui/pie-chart/pie-chart-common");
require("utils/module-merge").merge(pieChartCommonModule, exports);
;
var TKChartSeriesSelectionModeDataPoint = 2;
var TKChartPieSeriesLabelDisplayModeOutside = 1;
var PieChart = (function (_super) {
    __extends(PieChart, _super);
    function PieChart() {
        _super.call(this);
        this._ios = TKChart.new();
        this._delegate = LabelConverter.new();
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
            this._ios.userInteractionEnabled = this.canSelect;
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
            this.updatePalette();
            this._ios.addSeries(this._pieSeries);
        }
    };
    PieChart.prototype.updatePalette = function () {
        if (this.items) {
            var palette = TKChartPalette.new();
            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                var color = new colorModule.Color(item.Color);
                var paletteItem = TKChartPaletteItem.alloc().initWithFill(TKSolidFill.solidFillWithColor(color.ios));
                palette.addPaletteItem(paletteItem);
            }
            this._pieSeries.style.palette = palette;
        }
        return palette;
    };
    PieChart.prototype.getWrappedItems = function () {
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
    };
    return PieChart;
})(pieChartCommonModule.PieChart);
exports.PieChart = PieChart;
var LabelConverter = (function (_super) {
    __extends(LabelConverter, _super);
    function LabelConverter() {
        _super.apply(this, arguments);
    }
    LabelConverter.new = function () {
        return _super.new.call(this);
    };
    LabelConverter.prototype.chartTextForLabelAtPointInSeriesAtIndex = function (chart, dataPoint, series, index) {
        return pieChartCommonModule.getLabelText(dataPoint.dataName(), dataPoint.dataXValue());
    };
    LabelConverter.ObjCProtocols = [TKChartDelegate];
    return LabelConverter;
})(NSObject);
exports.LabelConverter = LabelConverter;
//# sourceMappingURL=pie-chart.ios.js.map