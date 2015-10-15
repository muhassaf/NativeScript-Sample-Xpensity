import { ImageSource } from "image-source";
import locationModule = require("location");
import typesModule = require("utils/types");

import constantsModule = require("./constants");

var everliveModule = require("../lib/everlive");

export var ServiceRequestType = "ServiceRequest";
export var FeedbackItemType = "FeedbackItem";
export var MaintenanceTypeType = "MaintenanceType";

class Service {
    private _everlive: any;

    constructor() {
        this._everlive = everlive;
    }

    public login(username: string, password: string): Promise<any> {
        return this._everlive.authentication.login(username, password)
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

    uploadImage(imageSource: ImageSource): Promise<any> {
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

    public updateServiceRequest(serviceRequest: any): Promise<any> {
        return this.updateItem(ServiceRequestType, serviceRequest);
    }

    private createItem(typeName: string, item: any): Promise<any> {
        return this._everlive.data(typeName).create(item);
    }

    private updateItem(typeName: string, item: any): Promise<any> {
        return this._everlive.data(typeName).updateSingle(item);
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