import applicationSettingsModule = require("application-settings");
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
        return applicationSettingsModule.getString(constantsModule.name);
    }

    get offlineMode(): boolean {
        return applicationSettingsModule.getBoolean(constantsModule.offlineMode);
    }

    set offlineMode(value: boolean) {
        if (applicationSettingsModule.getBoolean(constantsModule.offlineMode) !== value) {
            applicationSettingsModule.setBoolean(constantsModule.offlineMode, value);
            this.notifyPropertyChanged("offlineMode", value);
        }
    }

    get notifications(): boolean {
        return applicationSettingsModule.getBoolean(constantsModule.notifications);
    }

    set notifications(value: boolean) {
        if (applicationSettingsModule.getBoolean(constantsModule.notifications) !== value) {
            applicationSettingsModule.setBoolean(constantsModule.notifications, value);
            this.notifyPropertyChanged("notifications", value);
        }
    }

    logout() {
        console.log("LOGOUT");
        serviceModule.service.logout();
        console.log("NAVIGATE");
        navigationModule.navigateWitouthHistory(viewsModule.Views.login);
    }

    refresh() {
    }
}