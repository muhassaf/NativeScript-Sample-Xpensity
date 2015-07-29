var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var editViewModelBaseModule = require("../edit-view-model-base");
var constantsModule = require("../../utils/constants");
var serviceModule = require("../../utils/service");
var notificationsModule = require("../../utils/notifications");
var EditExpenseViewModel = (function (_super) {
    __extends(EditExpenseViewModel, _super);
    function EditExpenseViewModel(report, expense) {
        this._report = report;
        _super.call(this, expense);
        this.refresh();
    }
    Object.defineProperty(EditExpenseViewModel.prototype, "category", {
        get: function () {
            return this._category;
        },
        set: function (value) {
            if (this._category !== value) {
                this._category = value;
                this.item.Category = this._category.Id;
                this.notifyPropertyChanged("category", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    EditExpenseViewModel.prototype.createItem = function () {
        var item = _super.prototype.createItem.call(this);
        item.Date = new Date();
        item.Category = constantsModule.defaultExpenseCategoryId;
        item.Report = this._report.Id;
        return item;
    };
    EditExpenseViewModel.prototype.addItem = function (item) {
        return serviceModule.service.createExpense(item);
    };
    EditExpenseViewModel.prototype.updateItem = function (item) {
        return serviceModule.service.updateExpense(item);
    };
    EditExpenseViewModel.prototype.deleteItem = function (item) {
        return serviceModule.service.deleteExpense(item);
    };
    EditExpenseViewModel.prototype.refresh = function () {
        this.loadCategory();
    };
    EditExpenseViewModel.prototype.validate = function () {
        if (!this.item.Title || this.item.Title === "") {
            notificationsModule.showError("Please enter title.");
            return false;
        }
        if (isNaN(this.item.Cost)) {
            notificationsModule.showError("Please enter cost.");
            return false;
        }
        return _super.prototype.validate.call(this);
    };
    EditExpenseViewModel.prototype.loadCategory = function () {
        var _this = this;
        this.beginLoading();
        serviceModule.service.getExpenseCategory(this.item.Category).then(function (category) {
            _this.category = category;
            _this.endLoading();
        }, function (error) {
            _this.endLoading();
        });
    };
    return EditExpenseViewModel;
})(editViewModelBaseModule.EditViewModelBase);
exports.EditExpenseViewModel = EditExpenseViewModel;
