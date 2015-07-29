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

    constructor() {
        super();
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        if (this._name !== value) {
            this._name = value;
            this.notifyPropertyChanged("name", value);
        }
    }

    get offlineMode(): boolean {
        return applicationSettingsModule.getBoolean(constantsModule.offlineMode);
    }

    set offlineMode(value: boolean) {
        if (applicationSettingsModule.getBoolean(constantsModule.offlineMode) !== value) {
            applicationSettingsModule.setBoolean(constantsModule.offlineMode, value);
            this.notifyPropertyChanged("offlineMode", value);
            serviceModule.service.clearEverlive();
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
        serviceModule.service.logout();
        navigationModule.navigateWitouthHistory(viewsModule.Views.login);
    }

    refresh() {
        this.offlineMode = applicationSettingsModule.getBoolean(constantsModule.offlineMode);
        this.notifications = applicationSettingsModule.getBoolean(constantsModule.notifications);
        this.beginLoading();
        serviceModule.service.getCurrentUser().then((user) => {
            this.name = user.DisplayName;
            this.endLoading();
        },(error) => {
                this.endLoading();
            });
    }
}