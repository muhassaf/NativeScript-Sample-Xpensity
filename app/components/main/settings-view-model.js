var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var applicationSettingsModule = require("application-settings");
var viewModelBaseModule = require("../view-model-base");
var constantsModule = require("../../utils/constants");
var serviceModule = require("../../utils/service");
var navigationModule = require("../../utils/navigation");
var viewsModule = require("../../utils/views");
var SettingsViewModel = (function (_super) {
    __extends(SettingsViewModel, _super);
    function SettingsViewModel() {
        _super.call(this);
    }
    Object.defineProperty(SettingsViewModel.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            if (this._name !== value) {
                this._name = value;
                this.notifyPropertyChanged("name", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsViewModel.prototype, "offlineMode", {
        get: function () {
            return applicationSettingsModule.getBoolean(constantsModule.offlineMode);
        },
        set: function (value) {
            if (applicationSettingsModule.getBoolean(constantsModule.offlineMode) !== value) {
                applicationSettingsModule.setBoolean(constantsModule.offlineMode, value);
                this.notifyPropertyChanged("offlineMode", value);
                serviceModule.service.clearEverlive();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsViewModel.prototype, "notifications", {
        get: function () {
            return applicationSettingsModule.getBoolean(constantsModule.notifications);
        },
        set: function (value) {
            if (applicationSettingsModule.getBoolean(constantsModule.notifications) !== value) {
                applicationSettingsModule.setBoolean(constantsModule.notifications, value);
                this.notifyPropertyChanged("notifications", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    SettingsViewModel.prototype.logout = function () {
        serviceModule.service.logout();
        navigationModule.navigateWitouthHistory(viewsModule.Views.login);
    };
    SettingsViewModel.prototype.refresh = function () {
        var _this = this;
        this.offlineMode = applicationSettingsModule.getBoolean(constantsModule.offlineMode);
        this.notifications = applicationSettingsModule.getBoolean(constantsModule.notifications);
        this.beginLoading();
        serviceModule.service.getCurrentUser().then(function (user) {
            _this.name = user.DisplayName;
            _this.endLoading();
        }, function (error) {
            _this.endLoading();
        });
    };
    return SettingsViewModel;
})(viewModelBaseModule.ViewModelBase);
exports.SettingsViewModel = SettingsViewModel;
