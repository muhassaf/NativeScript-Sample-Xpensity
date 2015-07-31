var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var enumsModule = require("ui/enums");
var viewExpenseViewModelModule = require("./view-expense-view-model");
var editExpenseViewModelModule = require("../edit-expense/edit-expense-view-model");
var editReportViewModelModule = require("../edit-report/edit-report-view-model");
var viewModelBaseModule = require("../view-model-base");
var serviceModule = require("../../utils/service");
var navigationModule = require("../../utils/navigation");
var viewsModule = require("../../utils/views");
var notificationsModule = require("../../utils/notifications");
var reportStatusModule = require("../../utils/report-status");
var ViewReportViewModel = (function (_super) {
    __extends(ViewReportViewModel, _super);
    function ViewReportViewModel(report) {
        _super.call(this);
        this._report = report;
        this.refresh();
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
                this.notifyPropertyChanged("expensesByCategory", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewReportViewModel.prototype, "expenses", {
        get: function () {
            return this._expenses;
        },
        set: function (value) {
            if (this._expenses !== value) {
                this._expenses = value;
                this.notifyPropertyChanged("expenses", value);
            }
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
                this.notifyPropertyChanged("totalCost", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewReportViewModel.prototype, "fabVisibility", {
        get: function () {
            if (this.report.Status === reportStatusModule.ForApproval ||
                this.report.Status === reportStatusModule.Approved) {
                return enumsModule.Visibility.collapsed;
            }
            return this.androidVisibility;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewReportViewModel.prototype, "addExpenseButtonVisibility", {
        get: function () {
            if (this.report.Status === reportStatusModule.ForApproval ||
                this.report.Status === reportStatusModule.Approved) {
                return enumsModule.Visibility.collapsed;
            }
            return this.iosVisibility;
        },
        enumerable: true,
        configurable: true
    });
    ViewReportViewModel.prototype.showReportInfo = function () {
        notificationsModule.showInfo(this.report.Info);
    };
    ViewReportViewModel.prototype.submit = function () {
        var _this = this;
        notificationsModule.confirm("Submit report", "Do you want to submit the report?").then(function (value) {
            if (value) {
                _this.beginLoading();
                _this.report.Status = reportStatusModule.ForApproval;
                serviceModule.service.updateReport(_this.report).then(function (data) {
                    navigationModule.goBack();
                    _this.endLoading();
                }, function (error) {
                    _this.endLoading();
                });
            }
        });
    };
    ViewReportViewModel.prototype.edit = function () {
        navigationModule.navigate({
            moduleName: viewsModule.Views.editReport,
            context: new editReportViewModelModule.EditReportViewModel(this.report)
        });
    };
    ViewReportViewModel.prototype.addExpense = function () {
        navigationModule.navigate({
            moduleName: viewsModule.Views.editExpense,
            context: new editExpenseViewModelModule.EditExpenseViewModel(this.report)
        });
    };
    ViewReportViewModel.prototype.editExpense = function (expense) {
        navigationModule.navigate({
            moduleName: viewsModule.Views.editExpense,
            context: new editExpenseViewModelModule.EditExpenseViewModel(this.report, expense)
        });
    };
    ViewReportViewModel.prototype.refresh = function () {
        this.loadExpenses();
    };
    ViewReportViewModel.prototype.loadExpenses = function () {
        var _this = this;
        this.beginLoading();
        serviceModule.service.getExpenses(this.report).then(function (data) {
            var expenses = new Array();
            for (var i = 0; i < data.length; i++) {
                expenses.push(new viewExpenseViewModelModule.ViewExpenseViewModel(data[i]));
            }
            _this.expenses = expenses;
            _this.loadExpensesByCategory();
            _this.endLoading();
        }, function (error) {
            _this.endLoading();
        });
    };
    ViewReportViewModel.prototype.loadExpensesByCategory = function () {
        var _this = this;
        if (this.expenses) {
            this.beginLoading();
            serviceModule.service.getExpenseCategories().then(function (categories) {
                var expenses = {};
                var totalCost = 0;
                for (var i = 0; i < _this.expenses.length; i++) {
                    var expense = _this.expenses[i].expense;
                    if (expense.Cost && !isNaN(expense.Cost)) {
                        if (!expenses[expense.Category]) {
                            expenses[expense.Category] = 0;
                        }
                        expenses[expense.Category] += (+expense.Cost);
                        totalCost += (+expense.Cost);
                    }
                }
                var expensesByCategory = [];
                for (var i = 0; i < categories.length; i++) {
                    var category = categories[i];
                    if (expenses[category.Id]) {
                        expensesByCategory.push({ Category: category.Title, Percent: getPercent(totalCost, expenses[category.Id]), Color: category.Color });
                    }
                }
                _this.expensesByCategory = expensesByCategory;
                _this.totalCost = totalCost;
                _this.endLoading();
            }, function (error) {
                _this.endLoading();
            });
        }
    };
    return ViewReportViewModel;
})(viewModelBaseModule.ViewModelBase);
exports.ViewReportViewModel = ViewReportViewModel;
function getPercent(totalCost, cost) {
    return (cost / totalCost) * 100;
}
