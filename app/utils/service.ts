import localSettingsModule = require("local-settings");

import constantsModule = require("./constants");

var everliveModule = require("../lib/everlive");

export class Service {
    get isAuthenticated(): boolean {
        return localSettingsModule.hasKey(constantsModule.authenticationTokenKey);
    }

    login(username: string, password: string, success: (data: any) => void, fail: (error: any) => void) {
        var everlive = new everliveModule(constantsModule.telerikApiKey);
        everlive.Users.login(username, password,(data: any) => {
            success(data);
            localSettingsModule.setString(constantsModule.authenticationTokenKey, data.result.access_token);
        }, fail);
    }

    signUp(username: string, password: string, additionalData: any, success: (data: any) => void, fail: (error: any) => void) {
        var everlive = new everliveModule(constantsModule.telerikApiKey);
        everlive.Users.register(username, password, additionalData, success, fail);
    }
}

export var service = new Service();