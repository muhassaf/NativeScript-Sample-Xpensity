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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi11cC12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2lnbi11cC12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxnQ0FBOEIsaUJBQWlCLENBQUMsQ0FBQTtBQUNoRCx3QkFBd0Isb0JBQW9CLENBQUMsQ0FBQTtBQUU3QyxJQUFPLGdCQUFnQixXQUFXLFlBQVksQ0FBQyxDQUFDO0FBQ2hELElBQU8scUJBQXFCLFdBQVcsa0JBQWtCLENBQUMsQ0FBQztBQUUzRDtJQUFxQyxtQ0FBYTtJQUFsRDtRQUFxQyw4QkFBYTtJQXVGbEQsQ0FBQztJQWpGRyxzQkFBVyx3Q0FBVzthQUF0QjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7YUFFRCxVQUF1QixLQUFhO1lBQ2hDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDcEQsQ0FBQztRQUNMLENBQUM7OztPQVBBO0lBU0Qsc0JBQVcsa0NBQUs7YUFBaEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDO2FBRUQsVUFBaUIsS0FBYTtZQUMxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNwQixJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzlDLENBQUM7UUFDTCxDQUFDOzs7T0FQQTtJQVNELHNCQUFXLHFDQUFRO2FBQW5CO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIs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