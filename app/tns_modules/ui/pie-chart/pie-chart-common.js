var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var itemsViewModule = require("ui/items-view");
var PieChart = (function (_super) {
    __extends(PieChart, _super);
    function PieChart() {
        _super.call(this);
        this.valueProperty = null;
        this.labelProperty = null;
        this.canSelect = false;
        this.showLabels = false;
    }
    Object.defineProperty(PieChart.prototype, "valueProperty", {
        get: function () {
            return this._valueProperty;
        },
        set: function (value) {
            if (this._valueProperty !== value) {
                this._valueProperty = value;
                this.refresh();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieChart.prototype, "labelProperty", {
        get: function () {
            return this._labelProperty;
        },
        set: function (value) {
            if (this._labelProperty !== value) {
                this._labelProperty = value;
                this.refresh();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieChart.prototype, "showLabels", {
        get: function () {
            return this._showLabels;
        },
        set: function (value) {
            if (this._showLabels !== value) {
                this._showLabels = value;
                this.refresh();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieChart.prototype, "canSelect", {
        get: function () {
            return this._canSelect;
        },
        set: function (value) {
            if (this._canSelect !== value) {
                this._canSelect = value;
                this.refresh();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieChart.prototype, "colors", {
        get: function () {
            return this._colors;
        },
        set: function (value) {
            if (this._colors !== value) {
                this._colors = value;
                this.refresh();
            }
        },
        enumerable: true,
        configurable: true
    });
    PieChart.prototype.onMeasure = function (widthMeasureSpec, heightMeasureSpec) {
        _super.prototype.onMeasure.call(this, widthMeasureSpec, widthMeasureSpec);
    };
    return PieChart;
})(itemsViewModule.ItemsView);
exports.PieChart = PieChart;
//# sourceMappingURL=pie-chart-common.js.map