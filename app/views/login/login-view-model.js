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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tdmlldy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvZ2luLXZpZXctbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGdDQUE4QixpQkFBaUIsQ0FBQyxDQUFBO0FBRWhELElBQU8sZ0JBQWdCLFdBQVcsWUFBWSxDQUFDLENBQUM7QUFDaEQsSUFBTyxxQkFBcUIsV0FBVyxrQkFBa0IsQ0FBQyxDQUFDO0FBQzNELHdCQUF3QixvQkFBb0IsQ0FBQyxDQUFBO0FBRTdDO0lBQW9DLGtDQUFhO0lBSTdDO1FBQ0ksaUJBQU8sQ0FBQztJQUNaLENBQUM7SUFFRCxzQkFBVyxvQ0FBUTthQUFuQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7YUFFRCxVQUFvQixLQUFhO1lBQzdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDakQsQ0FBQztRQUNMLENBQUM7OztPQVBBO0lBU0Qsc0JBQVcsb0NBQVE7YUFBbkI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDO2FBRUQsVUFBb0IsS0FBYTtZQUM3QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUN2QixJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2pELENBQUM7UUFDTCxDQUFDOzs7T0FQQTtJQVNNLDhCQUFLLEdBQVo7UUFBQSxpQkFTQztRQVJHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDcEQsSUFBSSxDQUFDO2dCQUNGLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO1lBQzVCLENBQUMsRUFBRSxVQUFDLEtBQUs7Z0JBQ0wsS0FBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QyxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUM7SUFDTCxDQUFDO0lBRU0sNkNBQW9CLEdBQTNCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyx1QkFBdUIsQ0FBQztRQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVTLHlDQUFnQixHQUExQjtRQUNJLEVBQUUsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBRTVDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBRS9DLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVTLHNDQUFhLEdBQXZCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQWxFRCxDQUFvQywrQkFBYSxHQWtFaEQ7QUFsRVksc0JBQWMsaUJBa0UxQixDQUFBIn0=