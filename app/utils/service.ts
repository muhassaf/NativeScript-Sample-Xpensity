import localSettingsModule = require("local-settings");

import constantsModule = require("./constants");

export interface IService {
    isAuthenticated: boolean;
}

export class Service implements IService {
    get isAuthenticated(): boolean {
        return localSettingsModule.hasKey(constantsModule.authenticationTokenKey);
    }
}

export var service = new Service();