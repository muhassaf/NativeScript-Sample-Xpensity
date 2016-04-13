var view_model_base_1 = require("view-model-base");
var service_1 = require("../../data/service");
var validationRulesModule = require("validation-rules");
var navigationModule = require("navigation");
var typesModule = require("utils/types");
var EditProfileViewModel = (function (_super) {
    __extends(EditProfileViewModel, _super);
    function EditProfileViewModel() {
        _super.call(this);
        this.refresh();
    }
    Object.defineProperty(EditProfileViewModel.prototype, "displayName", {
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
    Object.defineProperty(EditProfileViewModel.prototype, "email", {
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
    Object.defineProperty(EditProfileViewModel.prototype, "oldPassword", {
        get: function () {
            return this._oldPassword;
        },
        set: function (value) {
            if (this._oldPassword !== value) {
                this._oldPassword = value;
                this.notifyPropertyChange("oldPassword", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditProfileViewModel.prototype, "newPassword", {
        get: function () {
            return this._newPassword;
        },
        set: function (value) {
            if (this._newPassword !== value) {
                this._newPassword = value;
                this.notifyPropertyChange("newPassword", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditProfileViewModel.prototype, "confirmPassword", {
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
    EditProfileViewModel.prototype.save = function () {
        var _this = this;
        if (this.validate()) {
            this.execute(service_1.service.updateUser({
                Id: this._userId,
                DisplayName: this._displayName
            })).then(function () {
                service_1.service.currentUser.DisplayName = _this._displayName;
                if (!typesModule.isNullOrUndefined(_this.oldPassword) || !typesModule.isNullOrUndefined(_this.newPassword)) {
                    _this.execute(service_1.service.changePassword(_this._email, _this._oldPassword, _this._newPassword))
                        .then(function () {
                        navigationModule.goBack();
                    }, function (error) {
                        _this.showValidationSummary(error.message);
                    });
                }
                else {
                    navigationModule.goBack();
                }
            });
        }
    };
    EditProfileViewModel.prototype.refresh = function () {
        this._userId = service_1.service.currentUser.Id;
        this.displayName = service_1.service.currentUser.DisplayName;
        this.email = service_1.service.currentUser.Email;
    };
    EditProfileViewModel.prototype.validateOverride = function () {
        if (!typesModule.isNullOrUndefined(this.oldPassword) || !typesModule.isNullOrUndefined(this.newPassword)) {
            if (!validationRulesModule.isRequiredValid(this.oldPassword)) {
                this.setErrorMessage("Please enter old password.");
                return false;
            }
            if (!validationRulesModule.isRequiredValid(this.newPassword)) {
                this.setErrorMessage("Please enter new password.");
                return false;
            }
            if (!validationRulesModule.isRequiredValid(this.oldPassword)) {
                this.setErrorMessage("Please enter old password.");
                return false;
            }
            if (this.newPassword !== this.confirmPassword) {
                this.setErrorMessage("Password doesn't match.");
                return false;
            }
        }
        return true;
    };
    return EditProfileViewModel;
})(view_model_base_1.ViewModelBase);
exports.EditProfileViewModel = EditProfileViewModel;
//# sourceMappingURL=edit-profile-view-model.js.map