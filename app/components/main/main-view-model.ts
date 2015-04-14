import observableModule = require("data/observable");

import viewModelBaseModule = require("../view-model-base");
import reportsViewModelModule = require("./reports-view-model");
import settingsViewModelModule = require("./settings-view-model");

export class MainViewModel extends viewModelBaseModule.ViewModelBase {
    private _reportsViewModel: reportsViewModelModule.ReportsViewModel;
    private _settingsViewModel: settingsViewModelModule.SettingsViewModel;

    constructor() {
        super();
    }

    get reportsViewModel(): reportsViewModelModule.ReportsViewModel {
        if (!this._reportsViewModel) {
            this._reportsViewModel = new reportsViewModelModule.ReportsViewModel();
        }

        return this._reportsViewModel;
    }

    get settingsViewModel(): settingsViewModelModule.SettingsViewModel {
        if (!this._settingsViewModel) {
            this._settingsViewModel = new settingsViewModelModule.SettingsViewModel();
        }

        return this._settingsViewModel;
    }

    refresh() {
        this.reportsViewModel.refresh();
        this.settingsViewModel.refresh();
    }
}