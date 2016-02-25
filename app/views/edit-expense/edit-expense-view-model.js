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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1leHBlbnNlLXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlZGl0LWV4cGVuc2Utdmlldy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUNBQWtDLHNCQUFzQixDQUFDLENBQUE7QUFDekQsd0JBQXdCLG9CQUFvQixDQUFDLENBQUE7QUFFN0MsSUFBTyxxQkFBcUIsV0FBVyxrQkFBa0IsQ0FBQyxDQUFDO0FBRzNELElBQU8sZUFBZSxXQUFXLHdCQUF3QixDQUFDLENBQUM7QUFDM0QsSUFBTyxZQUFZLFdBQVcsUUFBUSxDQUFDLENBQUM7QUFFeEMsd0JBQTJDLG9CQUFvQixDQUFDLENBQUE7QUFFaEUsNEJBQThDLGFBQWEsQ0FBQyxDQUFBO0FBRTVEO0lBQTBDLHdDQUFpQjtJQU92RCw4QkFBWSxNQUFXLEVBQUUsT0FBYTtRQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUV0QixrQkFBTSxPQUFPLEVBQUUsZUFBZSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFbEQsSUFBSSxPQUFPLEdBQUcsSUFBSSwrQkFBaUIsRUFBRSxDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsMEJBQWdCLENBQUM7UUFDcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHdCQUFVLENBQUMsa0JBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUsR0FBRyxlQUFlLENBQUMsd0JBQXdCLENBQUM7UUFDakcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxzQkFBVyx5Q0FBTzthQUFsQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFD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