import { ViewModelBase } from "view-model-base";
import { service } from "../../shared/service";
import { ViewReportViewModel } from "../view-report/view-report-view-model";
import validationRulesModule = require("../../shared/validation-rules");
import navigationModule = require("navigation");
import typesModule = require("utils/types");

import viewsModule = require("../../shared/views");


export class EditProfileViewModel extends ViewModelBase {
    private _userId: any;
    private _displayName: string;
    private _email: string;
    private _oldPassword: string;
    private _newPassword: string;
    private _confirmPassword: string;

    constructor() {
        super();

        this.refresh();
    }

    public get displayName(): string {
        return this._displayName;
    }

    public set displayName(value: string) {
        if (this._displayName !== value) {
            this._displayName = value;
            this.notifyPropertyChange("displayName", value);
        }
    }

    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        if (this._email !== value) {
            this._email = value;
            this.notifyPropertyChange("email", value);
        }
    }

    public get oldPassword(): string {
        return this._oldPassword;
    }

    public set oldPassword(value: string) {
        if (this._oldPassword !== value) {
            this._oldPassword = value;
            this.notifyPropertyChange("oldPassword", value);
        }
    }

    public get newPassword(): string {
        return this._newPassword;
    }

    public set newPassword(value: string) {
        if (this._newPassword !== value) {
            this._newPassword = value;
            this.notifyPropertyChange("newPassword", value);
        }
    }

    public get confirmPassword(): string {
        return this._confirmPassword;
    }

    public set confirmPassword(value: string) {
        if (this._confirmPassword !== value) {
            this._confirmPassword = value;
            this.notifyPropertyChange("confirmPassword", value);
        }
    }

    public save() {
        if (this.validate()) {
            this.execute(service.updateUser({
                Id: this._userId,
                DisplayName: this._displayName
            })).then(() => {
                if (!typesModule.isNullOrUndefined(this.oldPassword) || !typesModule.isNullOrUndefined(this.newPassword)) {
                    this.execute(service.changePassword(this._email, this._oldPassword, this._newPassword))
                        .then(() => {
                            navigationModule.goBack();
                        }, (error) => {
                            this.showValidationSummary(error.message);
                        });
                }
                else {
                    navigationModule.goBack();
                }
            });
        }
    }

    public refresh() {
        this.execute(service.getCurrentUser()).then((user) => {
            this._userId = user.Id;
            this.displayName = user.DisplayName;
            this.email = user.Email;
        });
    }

    protected validateOverride(): boolean {
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
    }
}