var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var viewModelBaseModule = require("../view-model-base");
var reportsViewModelModule = require("./reports-view-model");
var notificationsViewModelModule = require("./notifications-view-model");
var settingsViewModelModule = require("./settings-view-model");
var MainViewModel = (function (_super) {
    __extends(MainViewModel, _super);
    function MainViewModel() {
        _super.call(this);
    }
    Object.defineProperty(MainViewModel.prototype, "reportsViewModel", {
        get: function () {
            if (!this._reportsViewModel) {
                this._reportsViewModel = new reportsViewModelModule.ReportsViewModel();
            }
            return this._reportsViewModel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainViewModel.prototype, "notificationsViewModel", {
        get: function () {
            if (!this._notificationsViewModel) {
                this._notificationsViewModel = new notificationsViewModelModule.NotificationsViewModel();
            }
            return this._notificationsViewModel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainViewModel.prototype, "settingsViewModel", {
        get: function () {
            if (!this._settingsViewModel) {
                this._settingsViewModel = new settingsViewModelModule.SettingsViewModel();
            }
            return this._settingsViewModel;
        },
        enumerable: true,
        configurable: true
    });
    MainViewModel.prototype.refresh = function () {
        this.reportsViewModel.refresh();
        this.notificationsViewModel.refresh();
        this.settingsViewModel.refresh();
    };
    return MainViewModel;
})(viewModelBaseModule.ViewModelBase);
exports.MainViewModel = MainViewModel;
