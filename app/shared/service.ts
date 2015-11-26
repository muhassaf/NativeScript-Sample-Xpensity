import { ImageSource } from "image-source";
import locationModule = require("location");
import typesModule = require("utils/types");
import navigationModule = require("navigation");
import connectivityModule = require("connectivity");

import constantsModule = require("./constants");
import applicationSettingsModule = require("application-settings");
import { Observable, EventData } from "data/observable";

var everliveModule = require("everlive");

export var ReportTypeName = "Report";
export var ExpenseTypeName = "Expense";
export var CategoryTypeName = "ExpenseCategory";
export var NotificationMessageEvent = "notificationMessage";

export interface NotificationEventData extends EventData {
    message: string;
}

class Service extends Observable {
    private _categories: any[];
    private _categoriesMap: Map<any, any>;
    private _currentUser: any;

    public get currentUser(): any {
        return this._currentUser;
    }

    public switchOfflineMode(offlineMode: boolean) {
        return null;
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
    }

    public switchNotifications(notifications: boolean): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            resolve();
        });

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
    }

    public login(username: string, password: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            everlive.authentication.login(username, password).then(() => {
                this.getCurrentUser()
                    .then(resolve, reject);
            }, reject);
        });
    }

    public logout(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            everlive.authentication.logout()
                .then(() => {
                    this.switchNotifications(false)
                        .then(resolve, reject);
                }, reject);
        });
    }

    public signUp(username: string, password: string, displayName: string, email: string) {
        return new Promise<any>((resolve, reject) => {
            everlive.Users.register(username, password, {
                DisplayName: displayName,
                Email: email
            }).then((result) => {
                this.login(username, password)
                    .then(resolve, reject);
            }, reject);
        });
    }

    public recoverPassword(usernameOrEmail: string) {
        return new Promise<any>((resolve, reject) => {
            everlive.Users.resetPassword({ Username: usernameOrEmail })
                .then((result) => {
                    resolve(result);
                }, reject);
        });
    }

    public getUrlFromFileId(fileId: any): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            everlive.Files.getDownloadUrlById(fileId).then(url => {
                resolve(url);
            }, reject);
        });
    }

    public uploadImage(imageSource: ImageSource): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var file = {
                "Filename": "Picture.jpg",
                "ContentType": "image/jpeg",
                "base64": imageSource.toBase64String("JPEG", 100)
            };

            everlive.Files.create(file,
                function (data) {
                    resolve(data.result.Id);
                }, reject);
        });
    }

    public isLoggedIn(): Promise<boolean> {
        return new Promise<any>((resolve, reject) => {
            this.getCurrentUser()
                .then((data) => {
                    resolve(!typesModule.isNullOrUndefined(data));
                }, reject);
        });
    }

    public updateUser(user: any): Promise<any> {
        return everlive.Users.updateSingle(user);
    }

    public changePassword(username: string, password: string, newPassword: string) {
        return everlive.Users.changePassword(username, password, newPassword, true);
    }

    public createReport(report: any): Promise<any> {
        return this.createItem(ReportTypeName, report);
    }

    public updateReport(report: any): Promise<any> {
        return this.updateItem(ReportTypeName, report);
    }

    public deleteReport(report: any): Promise<any> {
        return this.deleteItem(ReportTypeName, report);
    }

    public createExpense(expense: any): Promise<any> {
        return this.createItem(ExpenseTypeName, expense);
    }

    public updateExpense(expense: any): Promise<any> {
        return this.updateItem(ExpenseTypeName, expense);
    }

    public deleteExpense(expense: any): Promise<any> {
        return this.deleteItem(ExpenseTypeName, expense);
    }

    public loadCategories(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.getItems(CategoryTypeName, null).then((data) => {
                this._categories = data;
                this._categoriesMap = new Map<any, any>();
                this._categories.forEach((item) => {
                    this._categoriesMap.set(item.Id, item);
                });

                resolve();
            }, reject);
        });
    }

    public getCategory(categoryId: any): any {
        return this._categoriesMap[categoryId];
    }

    private getCurrentUser(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            everlive.Users.currentUser()
                .then((data) => {
                    this._currentUser = data.result;
                    resolve(this.currentUser);
                }, reject);
        });
    }

    private getItems(typeName: string, filter: any): Promise<any[]> {
        return new Promise<any>((resolve, reject) => {
            return everlive.data(typeName)
                .get(filter)
                .then((data) => {
                    resolve(data.result);
                }, reject)
        });
    }

    private createItem(typeName: string, item: any): Promise<any> {
        return everlive.data(typeName).create(item);
    }

    private updateItem(typeName: string, item: any): Promise<any> {
        return everlive.data(typeName).updateSingle(item);
    }

    private deleteItem(typeName: string, item: any): Promise<any> {
        return everlive.data(typeName).destroySingle({ Id: item.Id });
    }
}

export var everlive = new everliveModule({
    apiKey: constantsModule.everliveKey,
    scheme: "https",
    authentication: {
        persist: true,
        onAuthenticationRequired: function () {
            navigationModule.login();
        }
    }, 
    //offline: {
    //    storage: {
    //        provider: everliveModule.Constants.StorageProvider.LocalStorage
    //    },
    //    encryption: {
    //        provider: everliveModule.Constants.EncryptionProvider.Default
    //    },

    //}
});

export var service = new Service();