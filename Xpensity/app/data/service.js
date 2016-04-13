var typesModule = require("utils/types");
var navigationModule = require("navigation");
var constantsModule = require("../shared/constants");
var observable_1 = require("data/observable");
var everliveModule = require("everlive");
exports.ReportTypeName = "Report";
exports.ExpenseTypeName = "Expense";
exports.CategoryTypeName = "ExpenseCategory";
exports.NotificationMessageEvent = "notificationMessage";
var Service = (function (_super) {
    __extends(Service, _super);
    function Service() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Service.prototype, "currentUser", {
        get: function () {
            return this._currentUser;
        },
        enumerable: true,
        configurable: true
    });
    Service.prototype.switchOfflineMode = function (offlineMode) {
        //if (offlineMode) {
        //    connectivityModule.startMonitoring(function onConnectionTypeChanged(newConnectionType) {
        //        switch (newConnectionType) {
        //            case connectivityModule.connectionType.none:
        //                everlive.offline();
        //                break;
        //            case connectivityModule.connectionType.wifi:
        //            case connectivityModule.connectionType.mobile:
        //                everlive.online();
        //                everlive.sync();
        //                break;
        //        }
        //    });
        //}
        //else {
        //    connectivityModule.stopMonitoring();
        //    everlive.offlineStorage.purgeAll();
        //    everlive.online();
        //}
        return null;
    };
    Service.prototype.switchNotifications = function (notifications) {
        //if (notifications) {
        //    return new Promise<any>((resolve, reject) => {
        //        everlive.push.register({
        //            iOS: {
        //                badge: true,
        //                sound: true,
        //                alert: true
        //            },
        //            notificationCallbackIOS: (data) => {
        //                this.notify<NotificationEventData>({
        //                    object: this,
        //                    eventName: NotificationMessageEvent,
        //                    message: data.alert
        //                })
        //            },
        //            android: {
        //                projectNumber: constantsModule.projectNumber
        //            },
        //            notificationCallbackAndroid: (data) => {
        //                this.notify<NotificationEventData>({
        //                    object: this,
        //                    eventName: NotificationMessageEvent,
        //                    message: data
        //                })
        //            }
        //        }, resolve, reject);
        //    });
        //}
        //else {
        //    return new Promise<any>((resolve, reject) => {
        //        everlive.push.unregister(resolve, reject);
        //    });
        //}
        return new Promise(function (resolve, reject) {
            resolve();
        });
    };
    Service.prototype.login = function (username, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            exports.everlive.authentication.login(username, password).then(function () {
                _this.getCurrentUser()
                    .then(resolve, reject);
            }, reject);
        });
    };
    Service.prototype.logout = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            exports.everlive.authentication.logout()
                .then(function () {
                _this.switchNotifications(false)
                    .then(resolve, reject);
            }, reject);
        });
    };
    Service.prototype.signUp = function (username, password, displayName, email) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            exports.everlive.Users.register(username, password, {
                DisplayName: displayName,
                Email: email
            }).then(function (result) {
                _this.login(username, password)
                    .then(resolve, reject);
            }, reject);
        });
    };
    Service.prototype.recoverPassword = function (usernameOrEmail) {
        return new Promise(function (resolve, reject) {
            exports.everlive.Users.resetPassword({ Username: usernameOrEmail })
                .then(function (result) {
                resolve(result);
            }, reject);
        });
    };
    Service.prototype.getUrlFromFileId = function (fileId) {
        return new Promise(function (resolve, reject) {
            exports.everlive.Files.getDownloadUrlById(fileId).then(function (url) {
                resolve(url);
            }, reject);
        });
    };
    Service.prototype.uploadImage = function (imageSource) {
        return new Promise(function (resolve, reject) {
            var file = {
                "Filename": "Picture.jpg",
                "ContentType": "image/jpeg",
                "base64": imageSource.toBase64String("JPEG", 100)
            };
            exports.everlive.Files.create(file, function (data) {
                resolve(data.result.Id);
            }, reject);
        });
    };
    Service.prototype.isLoggedIn = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getCurrentUser()
                .then(function (data) {
                resolve(!typesModule.isNullOrUndefined(data));
            }, reject);
        });
    };
    Service.prototype.updateUser = function (user) {
        return exports.everlive.Users.updateSingle(user);
    };
    Service.prototype.changePassword = function (username, password, newPassword) {
        return exports.everlive.Users.changePassword(username, password, newPassword, true);
    };
    Service.prototype.createReport = function (report) {
        return this.createItem(exports.ReportTypeName, report);
    };
    Service.prototype.updateReport = function (report) {
        return this.updateItem(exports.ReportTypeName, report);
    };
    Service.prototype.deleteReport = function (report) {
        return this.deleteItem(exports.ReportTypeName, report);
    };
    Service.prototype.createExpense = function (expense) {
        return this.createItem(exports.ExpenseTypeName, expense);
    };
    Service.prototype.updateExpense = function (expense) {
        return this.updateItem(exports.ExpenseTypeName, expense);
    };
    Service.prototype.deleteExpense = function (expense) {
        return this.deleteItem(exports.ExpenseTypeName, expense);
    };
    Service.prototype.loadCategories = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getItems(exports.CategoryTypeName, null).then(function (data) {
                _this._categories = data;
                _this._categoriesMap = new Map();
                _this._categories.forEach(function (item) {
                    _this._categoriesMap.set(item.Id, item);
                });
                resolve();
            }, reject);
        });
    };
    Service.prototype.getCategory = function (categoryId) {
        return this._categoriesMap[categoryId];
    };
    Service.prototype.getCurrentUser = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            exports.everlive.Users.currentUser()
                .then(function (data) {
                _this._currentUser = data.result;
                resolve(_this.currentUser);
            }, reject);
        });
    };
    Service.prototype.getItems = function (typeName, filter) {
        return new Promise(function (resolve, reject) {
            return exports.everlive.data(typeName)
                .get(filter)
                .then(function (data) {
                resolve(data.result);
            }, reject);
        });
    };
    Service.prototype.createItem = function (typeName, item) {
        return exports.everlive.data(typeName).create(item);
    };
    Service.prototype.updateItem = function (typeName, item) {
        return exports.everlive.data(typeName).updateSingle(item);
    };
    Service.prototype.deleteItem = function (typeName, item) {
        return exports.everlive.data(typeName).destroySingle({ Id: item.Id });
    };
    return Service;
})(observable_1.Observable);
exports.everlive = new everliveModule({
    apiKey: constantsModule.everliveKey,
    scheme: "https",
    authentication: {
        persist: true,
        onAuthenticationRequired: function () {
            navigationModule.login();
        }
    },
});
exports.service = new Service();
//# sourceMappingURL=service.js.map