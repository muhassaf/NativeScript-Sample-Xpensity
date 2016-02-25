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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1yZXBvcnQtdmlldy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZpZXctcmVwb3J0LXZpZXctbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGdDQUE4QixpQkFBaUIsQ0FBQyxDQUFBO0FBRWhELDRCQUEyRSxhQUFhLENBQUMsQ0FBQTtBQUV6Rix3QkFBbUQsb0JBQW9CLENBQUMsQ0FBQTtBQUN4RSxJQUFPLG1CQUFtQixXQUFXLGVBQWUsQ0FBQyxDQUFDO0FBQ3RELElBQU8sZ0JBQWdCLFdBQVcsWUFBWSxDQUFDLENBQUM7QUFDaEQsMEJBQTZCLHdCQUF3QixDQUFDLENBQUE7QUFDdEQsSUFBTyxXQUFXLFdBQVcsb0JBQW9CLENBQUMsQ0FBQztBQUduRDtJQUF5Qyx1Q0FBYTtJQU9sRCw2QkFBWSxNQUFXO1FBUDNCLGlCQWlHQztRQXpGTyxpQkFBTyxDQUFDO1FBRVIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFFdEIsSUFBSSxPQUFPLEdBQUcsSUFBSSwrQkFBaUIsRUFBRSxDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxRQUFRLEdBQUcseUJBQWUsQ0FBQztRQUNuQyxPQUFPLENBQUMsTUFBTSxHQUFHO1lBQ2IsUUFBUSxFQUFFO2dCQUNOLGNBQWMsRUFBRSxpQkFBaUI7Z0JBQ2pDLFFBQVEsRUFBRSxpQkFBaUI7YUFDOUI7U0FDSixDQUFDO1FBRUYsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLHdCQUFVLENBQUMsa0JBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLElBQUksOEJBQWdCLENBQUMsUUFBUSxFQUFFLHVCQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0RyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBQyxJQUFlO1lBQ3hDLEtB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