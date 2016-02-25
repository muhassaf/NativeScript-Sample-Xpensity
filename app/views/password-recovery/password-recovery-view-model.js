"use strict";
var view_model_base_1 = require("view-model-base");
var service_1 = require("../../data/service");
var navigationModule = require("navigation");
var validationRulesModule = require("validation-rules");
var PasswordRecoveryViewModel = (function (_super) {
    __extends(PasswordRecoveryViewModel, _super);
    function PasswordRecoveryViewModel() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(PasswordRecoveryViewModel.prototype, "usernameOrEmail", {
        get: function () {
            return this._usernameOrEmail;
        },
        set: function (value) {
            if (this._usernameOrEmail !== value) {
                this._usernameOrEmail = value;
                this.notifyPropertyChange("usernameOrEmail", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    PasswordRecoveryViewModel.prototype.recoverPassword = function () {
        var _this = this;
        if (this.validate()) {
            this.execute(service_1.service.recoverPassword(this.usernameOrEmail))
                .then(function (success) {
                navigationModule.goBack();
            }, function (error) {
                _this.showValidationSummary("User not found.");
            });
        }
    };
    PasswordRecoveryViewModel.prototype.validateOverride = function () {
        if (!validationRulesModule.isRequiredValid(this._usernameOrEmail)) {
            this.setErrorMessage("Please enter email.");
            return false;
        }
        return true;
    };
    return PasswordRecoveryViewModel;
}(view_model_base_1.ViewModelBase));
exports.PasswordRecoveryViewModel = PasswordRecoveryViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQtcmVjb3Zlcnktdmlldy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhc3N3b3JkLXJlY292ZXJ5LXZpZXctbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGdDQUE4QixpQkFBaUIsQ0FBQyxDQUFBO0FBQ2hELHdCQUF3QixvQkFBb0IsQ0FBQyxDQUFBO0FBRTdDLElBQU8sZ0JBQWdCLFdBQVcsWUFBWSxDQUFDLENBQUM7QUFDaEQsSUFBTyxxQkFBcUIsV0FBVyxrQkFBa0IsQ0FBQyxDQUFDO0FBRTNEO0lBQStDLDZDQUFhO0lBQTVEO1FBQStDLDhCQUFhO0lBa0M1RCxDQUFDO0lBL0JHLHNCQUFXLHNEQUFlO2FBQTFCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqQyxDQUFDO2FBRUQsVUFBMkIsS0FBYTtZQUNwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztnQkFDOUIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3hELENBQUM7UUFDTCxDQUFDOzs7T0FQQTtJQVNNLG1EQUFlLEdBQXRCO1FBQUEsaUJBU0M7UUFSRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2lCQUN0RCxJQUFJLENBQUMsVUFBQyxPQUFPO2dCQUNWLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzlCLENBQUMsRUFBRSxVQUFDLEtBQUs7Z0JBQ0wsS0FBSSxDQUFDLHFCQUFxQixDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO0lBQ0wsQ0FBQztJQUVTLG9EQUFnQixHQUExQjtRQUNJLEVBQUUsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsZUFBZSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFFNUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0wsZ0NBQUM7QUFBRCxDQUFDLEFBbENELENBQStDLCtCQUFhLEdBa0MzRDtBQWxDWSxpQ0FBeUIsNEJBa0NyQyxDQUFBIn0=