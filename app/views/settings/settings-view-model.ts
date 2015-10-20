import { ViewModelBase } from "view-model-base";

import { service } from "../../shared/service";

export class SettingsViewModel extends ViewModelBase {
    private _name: string;
    private _offlineMode: boolean;

    constructor() {
        super();
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        if (this._name !== value) {
            this._name = value;
            this.notifyPropertyChange("name", value);
        }
    }

    get offlineMode(): boolean {
        return this._offlineMode;
    }

    set offlineMode(value: boolean) {
        if (this._offlineMode !== value) {
            this._offlineMode = value;
            this.notifyPropertyChange("offlineMode", value);
        }
    }

    logout() {
        service.logout();
    }

    refresh() {
        //this.offlineMode = applicationSettingsModule.getBoolean(constantsModule.offlineMode);
        //this.notifications = applicationSettingsModule.getBoolean(constantsModule.notifications);
        //this.beginLoading();
        //serviceModule.service.getCurrentUser().then((user) => {
        //    this.name = user.DisplayName;
        //    this.endLoading();
        //},(error) => {
        //        this.endLoading();
        //    });
    }
}