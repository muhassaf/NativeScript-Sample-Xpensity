import applicationSettingsModule = require("application-settings");
import observableModule = require("data/observable");
import dialogsModule = require("ui/dialogs");

import viewModelBaseModule = require("../view-model-base");

import constantsModule = require("../../utils/constants");
import serviceModule = require("../../utils/service");
import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");

export class NotificationsViewModel extends viewModelBaseModule.ViewModelBase {
    private _reportsForApproval: number;

    constructor() {
        super();
    }

    get reportsForApproval(): number {
        return this._reportsForApproval;
    }

    set reportsForApproval(value: number) {
        if (this._reportsForApproval !== value) {
            this._reportsForApproval = value;
            this.notifyPropertyChanged("reportsForApproval", value);
        }
    }

    refresh() {
        this.beginLoading();
        serviceModule.service.getReportsForApproval().then(reportsForApproval => {
            this.reportsForApproval = reportsForApproval;
            this.endLoading();
        }, error => {
                this.endLoading();
            });
    }
}