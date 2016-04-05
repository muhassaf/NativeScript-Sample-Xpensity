var view_model_base_1 = require("view-model-base");
var service_1 = require("../../data/service");
var ViewExpenseViewModel = (function (_super) {
    __extends(ViewExpenseViewModel, _super);
    function ViewExpenseViewModel(expense) {
        _super.call(this);
        this._expense = expense;
        this.refresh();
    }
    Object.defineProperty(ViewExpenseViewModel.prototype, "expense", {
        get: function () {
            return this._expense;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewExpenseViewModel.prototype, "pictureUrl", {
        get: function () {
            return this._pictureUrl;
        },
        set: function (value) {
            if (this._pictureUrl !== value) {
                this._pictureUrl = value;
                this.notifyPropertyChange("pictureUrl", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    ViewExpenseViewModel.prototype.refresh = function () {
        var _this = this;
        if (this._expense.Picture) {
            this.execute(service_1.service.getUrlFromFileId(this._expense.Picture))
                .then(function (url) {
                _this.pictureUrl = url;
            });
        }
    };
    return ViewExpenseViewModel;
})(view_model_base_1.ViewModelBase);
exports.ViewExpenseViewModel = ViewExpenseViewModel;
//# sourceMappingURL=view-expense-view-model.js.map