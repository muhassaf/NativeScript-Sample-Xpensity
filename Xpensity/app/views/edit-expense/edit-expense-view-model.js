"use strict";
var edit_view_model_base_1 = require("edit-view-model-base");
var service_1 = require("../../data/service");
var validationRulesModule = require("validation-rules");
var constantsModule = require("../../shared/constants");
var cameraModule = require("camera");
var service_2 = require("../../data/service");
var data_source_1 = require("data-source");
var EditExpenseViewModel = (function (_super) {
    __extends(EditExpenseViewModel, _super);
    function EditExpenseViewModel(report, expense) {
        this._report = report;
        _super.call(this, expense, constantsModule.expenseProperties);
        var options = new data_source_1.DataSourceOptions();
        options.typeName = service_2.CategoryTypeName;
        this._categories = new data_source_1.DataSource(service_2.everlive, options);
        this._isUrl = false;
        this._picture = null;
        this._category = expense ? expense.ExpenseCategory.Id : constantsModule.defaultExpenseCategoryId;
        this.refresh();
    }
    Object.defineProperty(EditExpenseViewModel.prototype, "picture", {
        get: function () {
            return this._picture;
        },
        set: function (value) {
            if (this._picture !== value) {
                this._picture = value;
                this.notifyPropertyChange("picture", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditExpenseViewModel.prototype, "categories", {
        get: function () {
            return this._categories;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditExpenseViewModel.prototype, "category", {
        get: function () {
            return this._category;
        },
        set: function (value) {
            if (this._category !== value) {
                this._category = value;
                this.notifyPropertyChange("category", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    EditExpenseViewModel.prototype.refresh = function () {
        var _this = this;
        this.execute(this._categories.reload());
        if (this.item.Picture) {
            this.execute(service_1.service.getUrlFromFileId(this.item.Picture))
                .then(function (url) {
                _this.picture = url;
                _this._isUrl = true;
            });
        }
    };
    EditExpenseViewModel.prototype.takePicture = function () {
        var _this = this;
        cameraModule.takePicture({ width: 320, height: 230, keepAspectRatio: true })
            .then(function (picture) {
            _this.picture = picture;
            _this._isUrl = false;
        });
    };
    EditExpenseViewModel.prototype.removePicture = function () {
        this.picture = undefined;
    };
    EditExpenseViewModel.prototype.createItem = function () {
        var item = _super.prototype.createItem.call(this);
        item.Date = new Date();
        item.Report = this._report.Id;
        return item;
    };
    EditExpenseViewModel.prototype.addItem = function (item) {
        return service_1.service.createExpense(item);
    };
    EditExpenseViewModel.prototype.updateItem = function (item) {
        return service_1.service.updateExpense(item);
    };
    EditExpenseViewModel.prototype.deleteItem = function (item) {
        return service_1.service.deleteExpense(item);
    };
    EditExpenseViewModel.prototype.validateOverride = function () {
        if (!validationRulesModule.isRequiredValid(this.item.Title)) {
            this.setErrorMessage("Please enter title.");
            return false;
        }
        if (isNaN(this.item.Cost) || !validationRulesModule.isRequiredValid(this.item.Cost)) {
            this.setErrorMessage("Please enter cost.");
            return false;
        }
        if (this.item.Cost <= 0) {
            this.setErrorMessage("The cost must be greater than 0.");
            return false;
        }
        return true;
    };
    EditExpenseViewModel.prototype.onSaving = function (item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            item.Category = _this._category;
            if (_this._picture) {
                if (!_this._isUrl) {
                    service_1.service.uploadImage(_this._picture)
                        .then(function (id) {
                        item.Picture = id;
                        resolve(false);
                    }, reject);
                }
                else {
                    resolve(false);
                }
            }
            else {
                item.Picture = null;
                resolve(false);
            }
        });
    };
    return EditExpenseViewModel;
}(edit_view_model_base_1.EditViewModelBase));
exports.EditExpenseViewModel = EditExpenseViewModel;
//# sourceMappingURL=edit-expense-view-model.js.map