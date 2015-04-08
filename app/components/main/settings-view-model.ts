import localSettingsModule = require("local-settings");
import observableModule = require("data/observable");
import dialogsModule = require("ui/dialogs");

import viewModelBaseModule = require("../view-model-base");

import constantsModule = require("../../utils/constants");
import serviceModule = require("../../utils/service");
import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");

var NAME = "name";
var OFFLINE_MODE = "offlineMode";
var NOTIFICATIONS = "notifications";

export class SettingsViewModel extends viewModelBaseModule.ViewModelBase {
    private _name: string;
    private _offlineMode: boolean;
    private _notifications: boolean;

    constructor() {
        super();
    }

    get name(): string {
        return localSettingsModule.getString(NAME, "");
    }

    get offlineMode(): boolean {
        return localSettingsModule.getBoolean(OFFLINE_MODE, false);
    }

    set offlineMode(value: boolean) {
        if (localSettingsModule.getBoolean(OFFLINE_MODE) !== value) {
            localSettingsModule.setBoolean(OFFLINE_MODE, value);
            this.notifyPropertyChanged("offlineMode", value);
        }
    }

    get notifications(): boolean {
        return localSettingsModule.getBoolean(NOTIFICATIONS, false);
    }

    set notifications(value: boolean) {
        if (localSettingsModule.getBoolean(NOTIFICATIONS) !== value) {
            localSettingsModule.setBoolean(NOTIFICATIONS, value);
            this.notifyPropertyChanged("notifications", value);
        }
    }

    logout() {
        alert("logout");
    }
}