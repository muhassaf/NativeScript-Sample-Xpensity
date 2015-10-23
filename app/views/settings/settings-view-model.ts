import { ViewModelBase } from "view-model-base";

import { service } from "../../shared/service";
import navigationModule = require("navigation");
import applicationSettingsModule = require("application-settings");

var OFFLINE_MODE = "offlineMode";
var NOTIFICATIONS = "notifications";

export class SettingsViewModel extends ViewModelBase {
    private _name: string;
    private _offlineMode: boolean;
    private _notifications: boolean;

    constructor() {
        super();

        this._offlineMode = applicationSettingsModule.getBoolean(OFFLINE_MODE, false);
        this._notifications = applicationSettingsModule.getBoolean(NOTIFICATIONS, true);
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        if (this._name !== value) {
            this._name = value;
            this.notifyPropertyChange("name", value);
        }
    }

    public get offlineMode(): boolean {
        return this._offlineMode;
    }

    public set offlineMode(value: boolean) {
        if (this._offlineMode !== value) {
            this._offlineMode = value;
            
            this.notifyPropertyChange("offlineMode", value);
        }
    }

    public get notifications(): boolean {
        return this._notifications;
    }

    public set notifications(value: boolean) {
        if (this._notifications !== value) {
            this._notifications = value;
            this.notifyPropertyChange("notifications", value);
        }
    }

    public logout() {
        service.logout();
        navigationModule.login();
    }

    public refresh() {
        this.execute(service.getCurrentUser())
            .then((user) => {
                this.name = user.DisplayName;
            });
    }
}

function switchOfflineMode(offlineMode: boolean) {
    applicationSettingsModule.setBoolean(OFFLINE_MODE, offlineMode);
    service.switchOfflineMode(offlineMode);
}

function switchNotifications(notifications: boolean) {
    applicationSettingsModule.setBoolean(NOTIFICATIONS, notifications);
    service.switchNotifications(notifications);
}
