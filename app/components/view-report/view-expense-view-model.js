var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var viewModelBaseModule = require("../view-model-base");
var serviceModule = require("../../utils/service");
var ViewExpenseViewModel = (function (_super) {
    __extends(ViewExpenseViewModel, _super);
    function ViewExpenseViewModel(expense) {
        _super.call(this);
        this._expense = expense;
        this.loadCategoryColor();
    }
    Object.defineProperty(ViewExpenseViewModel.prototype, "expense", {
        get: function () {
            return this._expense;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewExpenseViewModel.prototype, "categoryColor", {
        get: function () {
            return this._categoryColor;
        },
        set: function (value) {
            if (this._categoryColor !== value) {
                this._categoryColor = value;
                this.notifyPropertyChanged("categoryColor", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    ViewExpenseViewModel.prototype.loadCategoryColor = function () {
        var _this = this;
        serviceModule.service.getColorByExpenseCategory(this.expense.Category).then(function (color) {
            _this.categoryColor = color;
        });
    };
    return ViewExpenseViewModel;
})(viewModelBaseModule.ViewModelBase);
exports.ViewExpenseViewModel = ViewExpenseViewModel;
