"use strict";
var view_model_base_1 = require("view-model-base");
var navigationModule = require("navigation");
var validationRulesModule = require("validation-rules");
var service_1 = require("../../data/service");
var LoginViewModel = (function (_super) {
    __extends(LoginViewModel, _super);
    function LoginViewModel() {
        _super.call(this);
    }
    Object.defineProperty(LoginViewModel.prototype, "username", {
        get: function () {
            return this._username;
        },
        set: function (value) {
            if (this._username != value) {
                this._username = value;
                this.notifyPropertyChange("username", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginViewModel.prototype, "password", {
        get: function () {
            return this._password;
        },
        set: function (value) {
            if (this._password != value) {
                this._password = value;
                this.notifyPropertyChange("password", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    LoginViewModel.prototype.login = function () {
        var _this = this;
        if (this.validate()) {
            this.execute(service_1.service.login(this.username, this.password))
                .then(function () {
                navigationModule.main();
            }, function (error) {
                _this.showValidationSummary(error.message);
            });
        }
    };
    LoginViewModel.prototype.loginWithTestAccount = function () {
        this.username = "test@nativescript.org";
        this.password = "test";
        this.login();
    };
    LoginViewModel.prototype.validateOverride = function () {
        if (!validationRulesModule.isRequiredValid(this.username)) {
            this.setErrorMessage("Please enter email.");
            return false;
        }
        if (!validationRulesModule.isRequiredValid(this.password)) {
            this.setErrorMessage("Please enter password.");
            return false;
        }
        return true;
    };
    LoginViewModel.prototype.clearOverride = function () {
        this.password = "";
    };
    return LoginViewModel;
}(view_model_base_1.ViewModelBase));
exports.LoginViewModel = LoginViewModel;
//# sourceMappingURL=login-view-model.js.map