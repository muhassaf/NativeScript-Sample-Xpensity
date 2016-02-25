"use strict";
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
}(view_model_base_1.ViewModelBase));
exports.EditProfileViewModel = EditProfileViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1wcm9maWxlLXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlZGl0LXByb2ZpbGUtdmlldy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsZ0NBQThCLGlCQUFpQixDQUFDLENBQUE7QUFDaEQsd0JBQXdCLG9CQUFvQixDQUFDLENBQUE7QUFFN0MsSUFBTyxxQkFBcUIsV0FBVyxrQkFBa0IsQ0FBQyxDQUFDO0FBQzNELElBQU8sZ0JBQWdCLFdBQVcsWUFBWSxDQUFDLENBQUM7QUFDaEQsSUFBTyxXQUFXLFdBQVcsYUFBYSxDQUFDLENBQUM7QUFLNUM7SUFBMEMsd0NBQWE7SUFRbkQ7UUFDSSxpQkFBTyxDQUFDO1FBRVIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxzQkFBVyw2Q0FBVzthQUF0QjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7YUFFRCxVQUF1QixLQUFhO1lBQ2hDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDcEQsQ0FBQztRQUNMLENBQUM7OztPQVBBO0lBU0Qsc0JBQVcsdUNBQUs7YUFBaEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDO2FBRUQsVUFBaUIsS0FBYTtZQUMxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNwQixJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzlDLENBQUM7UUFDTCxDQUFDOzs7T0FQQTtJQVNELHNCQUFXLDZDQUFXO2FBQXRCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDN0IsQ0FBQzthQUVELFVBQXVCLEtBQWE7WUFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDMUIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNwRCxDQUFDO1FBQ0wsQ0FBQzs7O09BUEE7SUFTRCxzQkFBVyw2Q0FBVzthQUF0QjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7YUFFRCxVQUF1QixLQUFhO1lBQ2hDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDcEQsQ0FBQztRQUNMLENBQUM7OztPQVBBO0lBU0Qsc0JBQVcsaURBQWU7YUFBMUI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ2pDLENBQUM7YUFFRCxVQUEyQixLQUFhO1lBQ3BDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO2dCQUM5QixJQUFJLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDeEQsQ0FBQztRQUNMLENBQUM7OztPQVBBO0lBU00sbUNBQUksR0FBWDtRQUFBLGlCQW9CQztRQW5CRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQU8sQ0FBQyxVQUFVLENBQUM7Z0JBQzVCLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDaEIsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZO2FBQ2pDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDTCxpQkFBTyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQztnQkFDcEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZHLEtBQUksQ0FBQyxPQUFPLENBQUMsaUJBQU8sQ0FBQyxjQUFjLENBQUMsS0FBSSxDQUFDLE1BQU0sRUFBRSxLQUFJLENBQUMsWUFBWSxFQUFFLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzt5QkFDbEYsSUFBSSxDQUFDO3dCQUNGLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUM5QixDQUFDLEVBQUUsVUFBQyxLQUFLO3dCQUNMLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzlDLENBQUMsQ0FBQyxDQUFDO2dCQUNYLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLENBQUM7b0JBQ0YsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQzlCLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDO0lBRU0sc0NBQU8sR0FBZDtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxXQUFXLEdBQUcsaUJBQU8sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO1FBQ25ELElBQUksQ0FBQyxLQUFLLEdBQUcsaUJBQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO0lBQzNDLENBQUM7SUFFUywrQ0FBZ0IsR0FBMUI7UUFDSSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RyxFQUFFLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLENBQUMsZUFBZSxDQUFDLDRCQUE0QixDQUFDLENBQUM7Z0JBQ25ELE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDakIsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNELElBQUksQ0FBQyxlQUFlLENBQUMsNEJBQTRCLENBQUMsQ0FBQztnQkFDbkQsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqQixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2dCQUNuRCxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2pCLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLENBQUMsZUFBZSxDQUFDLHlCQUF5QixDQUFDLENBQUM7Z0JBRWhELE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDakIsQ0FBQztRQUNMLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTCwyQkFBQztBQUFELENBQUMsQUEzSEQsQ0FBMEMsK0JBQWEsR0EySHREO0FBM0hZLDRCQUFvQix1QkEySGhDLENBQUEifQ==