"use strict";
var view_model_base_1 = require("view-model-base");
var data_source_1 = require("data-source");
var service_1 = require("../../data/service");
var notificationsModule = require("notifications");
var navigationModule = require("navigation");
var constants_1 = require("../../shared/constants");
var viewsModule = require("../../shared/views");
var ViewReportViewModel = (function (_super) {
    __extends(ViewReportViewModel, _super);
    function ViewReportViewModel(report) {
        var _this = this;
        _super.call(this);
        this._report = report;
        var options = new data_source_1.DataSourceOptions();
        options.typeName = service_1.ExpenseTypeName;
        options.expand = {
            Category: {
                TargetTypeName: "ExpenseCategory",
                ReturnAs: "ExpenseCategory"
            }
        };
        this._expenses = new data_source_1.DataSource(service_1.everlive, options);
        this._expenses.addFilterDescriptor(new data_source_1.FilterDescriptor("Report", data_source_1.Operators.equals, this._report.Id));
        this._expenses.on("loaded", function (args) {
            _this.totalCost = _this._expenses.sum("Cost");
            var expensesByCategory = [];
            _this._expenses.groupBy("ExpenseCategory", function (category) {
                return category.Id;
            }).forEach(function (group, index, groupDescriptors) {
                var cost = sum(group.items, "Cost");
                expensesByCategory.push({
                    Category: group.header,
                    Percent: getPercent(_this._totalCost, cost)
                });
            });
            _this.expensesByCategory = expensesByCategory;
        });
    }
    Object.defineProperty(ViewReportViewModel.prototype, "report", {
        get: function () {
            return this._report;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewReportViewModel.prototype, "expensesByCategory", {
        get: function () {
            return this._expensesByCategory;
        },
        set: function (value) {
            if (this._expensesByCategory !== value) {
                this._expensesByCategory = value;
                this.notifyPropertyChange("expensesByCategory", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewReportViewModel.prototype, "expenses", {
        get: function () {
            return this._expenses;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewReportViewModel.prototype, "totalCost", {
        get: function () {
            return this._totalCost;
        },
        set: function (value) {
            if (this._totalCost !== value) {
                this._totalCost = value;
                this.notifyPropertyChange("totalCost", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    ViewReportViewModel.prototype.submit = function () {
        var _this = this;
        notificationsModule.confirm("Submit report", "Do you want to submit the report?")
            .then(function (value) {
            if (value) {
                _this.execute(service_1.service.updateReport({
                    Id: _this._report.Id,
                    Status: constants_1.reportStatus.submitted
                })).then(function () {
                    navigationModule.goBack();
                });
            }
        });
    };
    ViewReportViewModel.prototype.refresh = function () {
        this.execute(this.expenses.reload());
    };
    ViewReportViewModel.prototype.itemTap = function (item) {
        var view = (this._report.Status === constants_1.reportStatus.inProgress || this._report.Status === constants_1.reportStatus.returned) ?
            viewsModule.editExpense : viewsModule.viewExpense;
        navigationModule.navigate(view, {
            item: item,
            context: this._report
        });
    };
    return ViewReportViewModel;
}(view_model_base_1.ViewModelBase));
exports.ViewReportViewModel = ViewReportViewModel;
function getPercent(totalCost, cost) {
    return (cost / totalCost) * 100;
}
function sum(items, property) {
    var sum = 0;
    items.forEach(function (item, index, i) {
        var value = item[property];
        if (!isNaN(value)) {
            sum += +value;
        }
    });
    return sum;
}
//# sourceMappingURL=view-report-view-model.js.map