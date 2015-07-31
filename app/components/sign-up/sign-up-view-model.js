var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var viewModelBaseModule = require("../view-model-base");
var serviceModule = require("../../utils/service");
var navigationModule = require("../../utils/navigation");
var viewsModule = require("../../utils/views");
var notificationsModule = require("../../utils/notifications");
var SignUpViewModel = (function (_super) {
    __extends(SignUpViewModel, _super);
    function SignUpViewModel() {
        _super.call(this);
        this.clear();
    }
    Object.defineProperty(SignUpViewModel.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            if (this._name != value) {
                this._name = value;
                this.notifyPropertyChanged("name", value);
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
            if (this._email != value) {
                this._email = value;
                this.notifyPropertyChanged("email", value);
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
            if (this._password != value) {
                this._password = value;
                this.notifyPropertyChanged("password", value);
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
            if (this._confirmPassword != value) {
                this._confirmPassword = value;
                this.notifyPropertyChanged("confirmPassword", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    SignUpViewModel.prototype.signUp = function () {
        var _this = this;
        if (this.validate()) {
            this.beginLoading();
            serviceModule.service.signUp(this.email, this.password, { Email: this.email, DisplayName: this.name }).then(function (data) {
                serviceModule.service.login(_this.email, _this.password).then(function (data) {
                    _this.endLoading();
                    navigationModule.navigateWitouthHistory(viewsModule.Views.main);
                }, function (error) {
                    _this.endLoading();
                });
            }, function (error) {
                _this.endLoading();
                _this.clearPassword();
            });
        }
        else {
            this.clearPassword();
        }
    };
    SignUpViewModel.prototype.login = function () {
        navigationModule.navigate(viewsModule.Views.login);
    };
    SignUpViewModel.prototype.clear = function () {
        this.name = "";
        this.email = "";
        this.password = "";
        this.confirmPassword = "";
    };
    SignUpViewModel.prototype.validate = function () {
        if (this.name === "") {
            notificationsModule.showError("Please enter your name.");
            return false;
        }
        if (this.email == "") {
            notificationsModule.showError("Please enter your email.");
            return false;
        }
        if (this.password == "") {
            notificationsModule.showError("Please enter password.");
            return false;
        }
        if (this.confirmPassword != this.password) {
            notificationsModule.showError("Passwords did not match.");
            return false;
        }
        return true;
    };
    SignUpViewModel.prototype.clearPassword = function () {
        this.password = "";
        this.confirmPassword = "";
    };
    return SignUpViewModel;
})(viewModelBaseModule.ViewModelBase);
exports.SignUpViewModel = SignUpViewModel;
