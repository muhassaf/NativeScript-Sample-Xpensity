"use strict";
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
}(observable_1.Observable));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLElBQU8sV0FBVyxXQUFXLGFBQWEsQ0FBQyxDQUFDO0FBQzVDLElBQU8sZ0JBQWdCLFdBQVcsWUFBWSxDQUFDLENBQUM7QUFHaEQsSUFBTyxlQUFlLFdBQVcscUJBQXFCLENBQUMsQ0FBQztBQUV4RCwyQkFBc0MsaUJBQWlCLENBQUMsQ0FBQTtBQUV4RCxJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFFOUIsc0JBQWMsR0FBRyxRQUFRLENBQUM7QUFDMUIsdUJBQWUsR0FBRyxTQUFTLENBQUM7QUFDNUIsd0JBQWdCLEdBQUcsaUJBQWlCLENBQUM7QUFDckMsZ0NBQXdCLEdBQUcscUJBQXFCLENBQUM7QUFNNUQ7SUFBc0IsMkJBQVU7SUFBaEM7UUFBc0IsOEJBQVU7SUF1T2hDLENBQUM7SUFsT0csc0JBQVcsZ0NBQVc7YUFBdEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM3QixDQUFDOzs7T0FBQTtJQUVNLG1DQUFpQixHQUF4QixVQUF5QixXQUFvQjtRQUN6QyxvQkFBb0I7UUFDcEIsOEZBQThGO1FBQzlGLHNDQUFzQztRQUN0QywwREFBMEQ7UUFDMUQscUNBQXFDO1FBRXJDLHdCQUF3QjtRQUN4QiwwREFBMEQ7UUFDMUQsNERBQTREO1FBQzVELG9DQUFvQztRQUNwQyxrQ0FBa0M7UUFFbEMsd0JBQXdCO1FBQ3hCLFdBQVc7UUFDWCxTQUFTO1FBQ1QsR0FBRztRQUNILFFBQVE7UUFDUiwwQ0FBMEM7UUFDMUMseUNBQXlDO1FBQ3pDLHdCQUF3QjtRQUN4QixHQUFHO1FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0scUNBQW1CLEdBQTFCLFVBQTJCLGFBQXNCO1FBQzdDLHNCQUFzQjtRQUN0QixvREFBb0Q7UUFDcEQsa0NBQWtDO1FBQ2xDLG9C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