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
        this._renderer = new CustomPieLabelRenderer(this, this._pieSeries);
        this._pieSeries.setLabelRenderer(this._renderer);
        this._pieSeries.setLabelFillColor(android.graphics.Color.TRANSPARENT);
        this._pieSeries.setLabelStrokeColor(android.graphics.Color.TRANSPARENT);
        this._pieSeries.setLabelTextColor(android.graphics.Color.BLACK);
        this._pieSeries.setLabelOffset(-50);
        this._pieSeries.setLabelSize(16);
        this._android.getSeries().add(this._pieSeries);
        this.refresh();
    };
    PieChart.prototype.refresh = function () {
        if (this._pieSeries && this.items) {
            _super.prototype.refresh.call(this);
            var that = this;
            this._pieSeries.setValueBinding(new com.telerik.widget.chart.engine.databinding.GenericDataPointBinding(new com.telerik.android.common.Function({
                apply: function (arg) {
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
    };
    PieChart.prototype.getWrappedItems = function () {
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
    };
    return PieChart;
})(pieChartCommon.PieChart);
exports.PieChart = PieChart;
var CustomPieLabelRenderer = (function (_super) {
    __extends(CustomPieLabelRenderer, _super);
    function CustomPieLabelRenderer(owner, series) {
        _super.call(this, series);
        this._owner = owner;
    }
    CustomPieLabelRenderer.prototype.getLabelText = function (dataPoint) {
        console.log("GET LABEL: " + dataPoint.getDataItem());
        var item = JSON.parse(dataPoint.getDataItem());
        return item.label;
    };
    return CustomPieLabelRenderer;
})(com.telerik.widget.chart.visualization.pieChart.PieSeriesLabelRenderer);
exports.CustomPieLabelRenderer = CustomPieLabelRenderer;
var Data = (function (_super) {
    __extends(Data, _super);
    function Data(label, value) {
        _super.call(this);
        this._label = label;
        this._value = value;
    }
    Data.prototype.getLabel = function () {
        return this._label;
    };
    Data.prototype.getValue = function () {
        return this._value;
    };
    Data.convert = function (value) {
        return java.lang.Double.valueOf(value);
    };
    Data.prototype.toString = function () {
        return "1";
    };
    return Data;
})(java.lang.Object);
exports.Data = Data;
function getPropertyValue(item, property) {
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
//# sourceMappingURL=pie-chart.android.js.map