var applicationSettingsModule = require("application-settings");
var constantsModule = require("./constants");
var notificationsModule = require("./notifications");
var reportStatusModule = require("./report-status");
var everliveModule = require("../lib/everlive");
var REPORT = "Report";
var EXPENSE = "Expense";
var EXPENSE_CATEGORY = "ExpenseCategory";
var Service = (function () {
    function Service() {
    }
    Object.defineProperty(Service.prototype, "isAuthenticated", {
        get: function () {
            return applicationSettingsModule.hasKey(constantsModule.authenticationTokenKey);
        },
        enumerable: true,
        configurable: true
    });
    Service.prototype.login = function (username, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = new everliveModule(constantsModule.telerikApiKey);
            everlive.Users.login(username, password, function (data) {
                _this.setupLocalSettings(data.result.access_token);
                resolve(data);
            }, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.logout = function () {
        this.clearLocalSettings();
        this.clearEverlive();
    };
    Service.prototype.signUp = function (username, password, additionalData) {
        return new Promise(function (resolve, reject) {
            var everlive = new everliveModule(constantsModule.telerikApiKey);
            everlive.Users.register(username, password, additionalData, resolve, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.getCurrentUser = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.Users.currentUser().then(function (data) {
                resolve(data.result);
            }, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.getReports = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.data(REPORT).get().then(function (data) {
                resolve(data.result);
            }, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.getReportsForApproval = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.data(REPORT).get({ Status: reportStatusModule.ForApproval }).then(function (data) {
                resolve(data.result.length);
            }, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.createReport = function (report) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.data(REPORT).create(report, resolve, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.updateReport = function (report) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.data(REPORT).updateSingle(report, resolve, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.deleteReport = function (report) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.data(REPORT).destroySingle({ Id: report.Id }, resolve, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.getExpenses = function (report) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.data(EXPENSE).get({ Report: report.Id }).then(function (data) {
                resolve(data.result);
            }, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.getExpensesByCategory = function (report) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.data(EXPENSE).get().then(function (data) {
                resolve(data.result);
            }, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.createExpense = function (expense) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.data(EXPENSE).create(expense, resolve, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.updateExpense = function (expense) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.data(EXPENSE).updateSingle(expense, resolve, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.deleteExpense = function (expense) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.data(EXPENSE).destroySingle({ Id: expense.Id }, resolve, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.getExpenseCategories = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this._categories) {
                var everlive = _this.createEverlive();
                everlive.data(EXPENSE_CATEGORY).get().then(function (data) {
                    _this._categories = data.result;
                    resolve(_this._categories);
                }, function (error) {
                    Service.showErrorAndReject(error, reject);
                });
            }
            else {
                resolve(_this._categories);
            }
        });
    };
    Service.prototype.getExpenseCategory = function (categoryId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.data(EXPENSE_CATEGORY).getById(categoryId).then(function (data) {
                resolve(data.result);
            }, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.getColorByExpenseCategory = function (categoryId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getExpenseCategories().then(function (categories) {
                for (var i = 0; i < categories.length; i++) {
                    var category = categories[i];
                    if (category.Id == categoryId) {
                        resolve(category.Color);
                        break;
                    }
                }
            }, reject);
        });
    };
    Service.prototype.clearEverlive = function () {
        if (this._everlive) {
            //this._everlive.offlineStorage.purgeAll();
            this._everlive = null;
        }
    };
    Service.prototype.createEverlive = function () {
        if (!this._everlive) {
            this._everlive = new everliveModule({
                apiKey: constantsModule.telerikApiKey,
                token: applicationSettingsModule.getString(constantsModule.authenticationTokenKey)
            });
        }
        return this._everlive;
    };
    Service.showErrorAndReject = function (error, reject) {
        notificationsModule.showError(error.message);
        reject(error);
    };
    Service.prototype.setupLocalSettings = function (authenticationTokenKey) {
        applicationSettingsModule.setString(constantsModule.authenticationTokenKey, authenticationTokenKey);
        applicationSettingsModule.setBoolean(constantsModule.offlineMode, true);
        applicationSettingsModule.setBoolean(constantsModule.notifications, false);
    };
    Service.prototype.clearLocalSettings = function () {
        applicationSettingsModule.remove(constantsModule.authenticationTokenKey);
        applicationSettingsModule.remove(constantsModule.notifications);
        applicationSettingsModule.remove(constantsModule.offlineMode);
    };
    return Service;
})();
exports.Service = Service;
exports.service = new Service();
