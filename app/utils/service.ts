import localSettingsModule = require("local-settings");

import constantsModule = require("./constants");
import notificationsModule = require("./notifications");

var everliveModule = require("../lib/everlive");

var REPORT = "Report";

export class Service {
    get isAuthenticated(): boolean {
        return localSettingsModule.hasKey(constantsModule.authenticationTokenKey);
    }

    login(username: string, password: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = new everliveModule(constantsModule.telerikApiKey);
            everlive.Users.login(username, password,(data: any) => {
                localSettingsModule.setString(constantsModule.authenticationTokenKey, data.result.access_token);
                // TODO: Get DisplayName
                this.setupLocalSettings("Kamen Velikov", data.result.access_token);
                // TODO: Setup everlive offline mode.
                resolve(data);
            }, reject)
        });
    }

    logout() {
        this.clearLocalSettings();
    }

    signUp(username: string, password: string, additionalData: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = new everliveModule(constantsModule.telerikApiKey);
            everlive.Users.register(username, password, additionalData, resolve, error => {
                Service.showErrorAndReject(error, reject);
            })
        });
    }

    getReports(): Promise<any> {
        return new Promise<any[]>((resolve, reject) => {
            var everlive = Service.createEverlive();
            everlive.data(REPORT).get().then(data => {
                resolve(<any[]>data.result);
            }, error => {
                    Service.showErrorAndReject(error, reject);
                })
        });
    }

    createReport(report: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = Service.createEverlive();
            everlive.data(REPORT).create(report, resolve, error => {
                Service.showErrorAndReject(error, reject);
            })
        });
    }

    updateReport(report: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = Service.createEverlive();
            everlive.data(REPORT).updateSingle(report, resolve, error => {
                Service.showErrorAndReject(error, reject);
            })
        });
    }

    deleteReport(report: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = Service.createEverlive();
            everlive.data(REPORT).destroySingle({ Id: report.Id }, resolve, error => {
                Service.showErrorAndReject(error, reject);
            })
        });
    }

    private static createEverlive(): any {
        return new everliveModule({ apiKey: constantsModule.telerikApiKey, token: localSettingsModule.getString(constantsModule.authenticationTokenKey) })
    }

    private static showErrorAndReject(error: any, reject: (e: any) => void) {
        notificationsModule.showError(error.message);
        reject(error);
    }

    private setupLocalSettings(name: string, authenticationTokenKey: string) {
        localSettingsModule.setString(constantsModule.name, name);
        localSettingsModule.setString(constantsModule.authenticationTokenKey, authenticationTokenKey);
        localSettingsModule.setBoolean(constantsModule.offlineMode, true);
        localSettingsModule.setBoolean(constantsModule.notifications, false);
    }

    private clearLocalSettings() {
        localSettingsModule.remove(constantsModule.authenticationTokenKey);
        localSettingsModule.remove(constantsModule.name);
        localSettingsModule.remove(constantsModule.notifications);
        localSettingsModule.remove(constantsModule.offlineMode);
    }
}

export var service = new Service();