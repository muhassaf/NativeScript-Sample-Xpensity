import localSettingsModule = require("local-settings");
import observableModule = require("data/observable");
import dialogsModule = require("ui/dialogs");

import viewModelBaseModule = require("../view-model-base");

import constantsModule = require("../../utils/constants");
import serviceModule = require("../../utils/service");
import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");

export class SettingsViewModel extends viewModelBaseModule.ViewModelBase {
    private _name: string;
    private _offlineMode: boolean;
    private _notifications: boolean;

    constructor() {
        super();
    }

    get name(): string {
        return localSettingsModule.getString(constantsModule.name);
    }

    get offlineMode(): boolean {
        return localSettingsModule.getBoolean(constantsModule.offlineMode);
    }

    set offlineMode(value: boolean) {
        if (localSettingsModule.getBoolean(constantsModule.offlineMode) !== value) {
            localSettingsModule.setBoolean(constantsModule.offlineMode, value);
            this.notifyPropertyChanged("offlineMode", value);
        }
    }

    get notifications(): boolean {
        return localSettingsModule.getBoolean(constantsModule.notifications);
    }

    set notifications(value: boolean) {
        if (localSettingsModule.getBoolean(constantsModule.notifications) !== value) {
            localSettingsModule.setBoolean(constantsModule.notifications, value);
            this.notifyPropertyChanged("notifications", value);
        }
    }

    logout() {
        serviceModule.service.logout();
        navigationModule.navigateWitouthHistory(viewsModule.Views.login);
    }
}