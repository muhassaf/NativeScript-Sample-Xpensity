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
})(view_model_base_1.ViewModelBase);
exports.PasswordRecoveryViewModel = PasswordRecoveryViewModel;
//# sourceMappingURL=password-recovery-view-model.js.map