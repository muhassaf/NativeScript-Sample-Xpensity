"use strict";
var service_1 = require("../../data/service");
var observable_array_1 = require("data/observable-array");
var view_model_base_1 = require("view-model-base");
var applicationSettingsModule = require("application-settings");
var NOTIFICATION_MESSAGES = "notification_messages";
var NotificationsViewModel = (function (_super) {
    __extends(NotificationsViewModel, _super);
    function NotificationsViewModel() {
        var _this = this;
        _super.call(this);
        this._notifications = new observable_array_1.ObservableArray();
        service_1.service.on(service_1.NotificationMessageEvent, function (args) {
            _this._notifications.unshift({
                Message: args.message,
                Date: new Date()
            });
            _this.serialize();
        });
    }
    Object.defineProperty(NotificationsViewModel.prototype, "notifications", {
        get: function () {
            return this._notifications;
        },
        enumerable: true,
        configurable: true
    });
    NotificationsViewModel.prototype.refresh = function () {
        this._notifications.length = 0;
        this._notifications.push(this.deserialize());
    };
    NotificationsViewModel.prototype.clear = function () {
        this._notifications.length = 0;
        this._notifications.notify({
            eventName: observable_array_1.ObservableArray.changeEvent,
            object: this._notifications
        });
        this.serialize();
    };
    NotificationsViewModel.prototype.deserialize = function () {
        var messages = JSON.parse(applicationSettingsModule.getString(NOTIFICATION_MESSAGES, "[]"));
        var result = [];
        messages.forEach(function (item) {
            result.push({
                Message: item.Message,
                Date: new Date(item.Date)
            });
        });
        return result;
    };
    NotificationsViewModel.prototype.serialize = function () {
        var items = [];
        this._notifications.forEach(function (item) {
            items.push(item);
        });
        applicationSettingsModule.setString(NOTIFICATION_MESSAGES, JSON.stringify(items));
    };
    return NotificationsViewModel;
}(view_model_base_1.ViewModelBase));
exports.NotificationsViewModel = NotificationsViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9ucy12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibm90aWZpY2F0aW9ucy12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx3QkFBeUUsb0JBQW9CLENBQUMsQ0FBQTtBQUM5RixpQ0FBZ0MsdUJBQXVCLENBQUMsQ0FBQTtBQUN4RCxnQ0FBOEIsaUJBQWlCLENBQUMsQ0FBQTtBQUNoRCxJQUFPLHlCQUF5QixXQUFXLHNCQUFzQixDQUFDLENBQUM7QUFFbkUsSUFBSSxxQkFBcUIsR0FBRyx1QkFBdUIsQ0FBQztBQUVwRDtJQUE0QywwQ0FBYTtJQUdyRDtRQUhKLGlCQTBEQztRQXRETyxpQkFBTyxDQUFDO1FBRVIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGtDQUFlLEVBQU8sQ0FBQztRQUVqRCxpQkFBTyxDQUFDLEVBQUUsQ0FBQyxrQ0FBd0IsRUFBRSxVQUFDLElBQTJCO1lBQzdELEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO2dCQUN4QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ3JCLElBQUksRUFBRSxJQUFJLElBQUksRUFBRTthQUNuQixDQUFDLENBQUM7WUFFSCxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsc0JBQVcsaURBQWE7YUFBeEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUMvQixDQUFDOzs7T0FBQTtJQUVNLHdDQUFPLEdBQWQ7UUFDSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVNLHNDQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUM7WUFDdkIsU0FBUyxFQUFFLGtDQUFlLENBQUMsV0FBVztZQUN0QyxNQUFNLEVBQUUsSUFBSSxDQUFDLGNBQWM7U0FDOUIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTyw0Q0FBVyxHQUFuQjtRQUNJLElBQUksUUFBUSxHQUFVLElBQUksQ0FBQyxLQUFLLENBQUMseUJBQXlCLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkcsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFTO1lBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ1IsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUNyQixJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUM1QixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVPLDBDQUFTLEdBQWpCO1FBQ0ksSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFTO1lBQ2xDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7UUFFSCx5QkFBeUIsQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFDTCw2QkFBQztBQUFELENBQUMsQUExREQsQ0FBNEMsK0JBQWEsR0EwRHhEO0FBMURZLDhCQUFzQix5QkEwRGxDLENBQUEifQ==