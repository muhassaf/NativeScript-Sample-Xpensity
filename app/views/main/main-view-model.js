"use strict";
var view_model_base_1 = require("view-model-base");
var reports_view_model_1 = require("../reports/reports-view-model");
var notifications_view_model_1 = require("../notifications/notifications-view-model");
var settings_view_model_1 = require("../settings/settings-view-model");
var MainViewModel = (function (_super) {
    __extends(MainViewModel, _super);
    function MainViewModel() {
        _super.call(this);
        this._selectedTab = 0;
        this._reportsViewModel = new reports_view_model_1.ReportsViewModel();
        this._notificationsViewModel = new notifications_view_model_1.NotificationsViewModel();
        this._settingsViewModel = new settings_view_model_1.SettingsViewModel(this);
    }
    Object.defineProperty(MainViewModel.prototype, "selectedTab", {
        get: function () {
            return this._selectedTab;
        },
        set: function (value) {
            if (this._selectedTab !== value) {
                this._selectedTab = value;
                this.notifyPropertyChange("selectedTab", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainViewModel.prototype, "reportsViewModel", {
        get: function () {
            return this._reportsViewModel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainViewModel.prototype, "notificationsViewModel", {
        get: function () {
            return this._notificationsViewModel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainViewModel.prototype, "settingsViewModel", {
        get: function () {
            return this._settingsViewModel;
        },
        enumerable: true,
        configurable: true
    });
    MainViewModel.prototype.clearNotification = function () {
        this._notificationsViewModel.clear();
    };
    MainViewModel.prototype.refresh = function () {
        this._reportsViewModel.refresh();
        this._notificationsViewModel.refresh();
        this._settingsViewModel.refresh();
    };
    return MainViewModel;
}(view_model_base_1.ViewModelBase));
exports.MainViewModel = MainViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxnQ0FBOEIsaUJBQWlCLENBQUMsQ0FBQTtBQUVoRCxtQ0FBaUMsK0JBQStCLENBQUMsQ0FBQTtBQUNqRSx5Q0FBdUMsMkNBQTJDLENBQUMsQ0FBQTtBQUNuRixvQ0FBa0MsaUNBQWlDLENBQUMsQ0FBQTtBQUdwRTtJQUFtQyxpQ0FBYTtJQU01QztRQUNJLGlCQUFPLENBQUM7UUFFUixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxxQ0FBZ0IsRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLGlEQUFzQixFQUFFLENBQUM7UUFDNUQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksdUNBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELHNCQUFXLHNDQUFXO2FBQXRCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDN0IsQ0FBQzthQUVELFVBQXVCLEtBQWE7WUFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDMUIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNwRCxDQUFDO1FBQ0wsQ0FBQzs7O09BUEE7SUFTRCxzQkFBVywyQ0FBZ0I7YUFBM0I7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQ2xDLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsaURBQXNCO2FBQWpDO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQztRQUN4QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDRDQUFpQjthQUE1QjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDbkMsQ0FBQzs7O09BQUE7SUFFTSx5Q0FBaUIsR0FBeEI7UUFDSSxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVNLCtCQUFPLEdBQWQ7UUFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQUFDLEFBL0NELENBQW1DLCtCQUFhLEdBK0MvQztBQS9DWSxxQkFBYSxnQkErQ3pCLENBQUEifQ==