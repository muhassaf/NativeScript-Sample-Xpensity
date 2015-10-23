import { ImageSource } from "image-source";
import locationModule = require("location");
import typesModule = require("utils/types");

import constantsModule = require("./constants");

var everliveModule = require("everlive");

export var ReportTypeName = "Report";
export var ExpenseTypeName = "Expense";
export var CategoryTypeName = "ExpenseCategory";

class Service {
    private _everlive: any;

    constructor() {
        this._everlive = everlive;
    }

    public switchOfflineMode(offlineMode: boolean) {
    }

    public switchNotifications(notification: boolean) {
    }

    public login(username: string, password: string): Promise<any> {
        return this._everlive.authentication.login(username, password)
    }

    public logout() {
    }

    public signUp(username: string, password: string, displayName: string, email: string) {
        return new Promise<any>((resolve, reject) => {
            this._everlive.Users.register(username, password, {
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
            this._everlive.Users.resetPassword({ Username: usernameOrEmail })
                .then((result) => {
                    resolve(result);
                }, reject);
        });
    }

    public getUrlFromFileId(fileId: any): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this._everlive.Files.getDownloadUrlById(fileId).then(url => {
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

            this._everlive.Files.create(file,
                function (data) {
                    resolve(data.result.Id);
                }, reject);
        });
    }

    public isLoggedIn(): Promise<boolean> {
        return new Promise<any>((resolve, reject) => {
            this.getCurrentUser().then((user) => {
                resolve(!typesModule.isNullOrUndefined(user));
            }, reject);
        });
    }

    public getCurrentUser(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this._everlive.Users.currentUser()
                .then((data) => {
                    resolve(data.result);
                }, reject);
        });
    }

    public updateUser(user: any): Promise<any> {
        return this._everlive.Users.updateSingle(user);
    }

    public changePassword(username: string, password: string, newPassword: string) {
        return this._everlive.Users.changePassword(username, password, newPassword, true);
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

    private createItem(typeName: string, item: any): Promise<any> {
        return this._everlive.data(typeName).create(item);
    }

    private updateItem(typeName: string, item: any): Promise<any> {
        return this._everlive.data(typeName).updateSingle(item);
    }

    private deleteItem(typeName: string, item: any): Promise<any> {
        return this._everlive.data(typeName).destroySingle({ Id: item.Id });
    }
}

export var everlive = new everliveModule({
    apiKey: constantsModule.everliveKey,
    scheme: "https",
    authentication: {
        persist: true,
        onAuthenticationRequired: function () {
            //navigation.login();
        }
    },
    //offlineStorage: {
    //    storage: {
    //        provider: everliveModule.Constants.StorageProvider.LocalStorage
    //    },

    //    encryption: {
    //        provider: everliveModule.Constants.EncryptionProvider.Default
    //    }
    //}
});

export var service = new Service();