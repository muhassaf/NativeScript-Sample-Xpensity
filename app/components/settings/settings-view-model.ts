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

        this.offlineMode = true;
        this.name = "Darren Chriss";
    }

    get name(): any {
        return this._name;
    }

    set name(value: any) {
        if (this._name !== value) {
            this._name = value;
            this.notifyPropertyChanged("name", value);
        }
    }

    get offlineMode(): any {
        return this._offlineMode;
    }

    set offlineMode(value: any) {
        if (this._offlineMode !== value) {
            this._offlineMode = value;
            this.notifyPropertyChanged("offlineMode", value);
        }
    }

    get notifications(): any {
        return this._notifications;
    }

    set notifications(value: any) {
        if (this._notifications !== value) {
            this._notifications = value;
            this.notifyPropertyChanged("notifications", value);
        }
    }

    logout() {
        alert("logout");
    }
}