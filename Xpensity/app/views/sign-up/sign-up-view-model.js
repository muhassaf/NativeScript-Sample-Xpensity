"use strict";
var view_model_base_1 = require("view-model-base");
var service_1 = require("../../data/service");
var navigationModule = require("navigation");
var validationRulesModule = require("validation-rules");
var SignUpViewModel = (function (_super) {
    __extends(SignUpViewModel, _super);
    function SignUpViewModel() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(SignUpViewModel.prototype, "displayName", {
        get: function () {
            return this._displayName;
        },
        set: function (value) {
            if (this._displayName !== value) {
                this._displayName = value;
                this.notifyPropertyChange("displayName", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignUpViewModel.prototype, "email", {
        get: function () {
            return this._email;
        },
        set: function (value) {
            if (this._email !== value) {
                this._email = value;
                this.notifyPropertyChange("email", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignUpViewModel.prototype, "password", {
        get: function () {
            return this._password;
        },
        set: function (value) {
            if (this._password !== value) {
                this._password = value;
                this.notifyPropertyChange("password", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignUpViewModel.prototype, "confirmPassword", {
        get: function () {
            return this._confirmPassword;
        },
        set: function (value) {
            if (this._confirmPassword !== value) {
                this._confirmPassword = value;
                this.notifyPropertyChange("confirmPassword", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    SignUpViewModel.prototype.signUp = function () {
        var _this = this;
        if (this.validate()) {
            this.execute(service_1.service.signUp(this.email, this.password, this.displayName, this.email))
                .then(function (success) {
                navigationModule.main();
            }, function (error) {
                _this.showValidationSummary(error.message);
            });
        }
    };
    SignUpViewModel.prototype.validateOverride = function () {
        if (!validationRulesModule.isRequiredValid(this.email)) {
            this.setErrorMessage("Please enter email.");
            return false;
        }
        if (!validationRulesModule.isRequiredValid(this.password)) {
            this.setErrorMessage("Please enter password.");
            return false;
        }
        if (this.password !== this.confirmPassword) {
            this.setErrorMessage("Password doesn't match.");
            return false;
        }
        return true;
    };
    SignUpViewModel.prototype.clearOverride = function () {
        this.password = "";
        this.confirmPassword = "";
    };
    return SignUpViewModel;
}(view_model_base_1.ViewModelBase));
exports.SignUpViewModel = SignUpViewModel;
//# sourceMappingURL=sign-up-view-model.js.map