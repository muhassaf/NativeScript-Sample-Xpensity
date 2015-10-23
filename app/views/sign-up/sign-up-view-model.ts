import { ViewModelBase } from "view-model-base";
import { service } from "../../shared/service";

import navigationModule = require("navigation");
import validationRulesModule = require("../../shared/validation-rules");

export class SignUpViewModel extends ViewModelBase {
    private _displayName: string;
    private _email: string;
    private _password: string;
    private _confirmPassword: string;

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

    public get password(): string {
        return this._password;
    }

    public set password(value: string) {
        if (this._password !== value) {
            this._password = value;
            this.notifyPropertyChange("password", value);
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

    public signUp() {
        if (this.validate()) {
            this.execute(service.signUp(this.email, this.password, this.displayName, this.email))
                .then((success) => {
                    navigationModule.main();
                }, (error) => {
                    this.showValidationSummary(error.message);
                });
        }
    }

    protected validateOverride(): boolean {
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
    }

    protected clearOverride() {
        this.password = "";
        this.confirmPassword = "";
    }
}