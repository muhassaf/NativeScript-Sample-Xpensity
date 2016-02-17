import { ViewModelBase } from "view-model-base";
import { service } from "../../data/service";

import navigationModule = require("navigation");
import validationRulesModule = require("validation-rules");

export class PasswordRecoveryViewModel extends ViewModelBase {
    private _usernameOrEmail: string;

    public get usernameOrEmail(): string {
        return this._usernameOrEmail;
    }

    public set usernameOrEmail(value: string) {
        if (this._usernameOrEmail !== value) {
            this._usernameOrEmail = value;
            this.notifyPropertyChange("usernameOrEmail", value);
        }
    }

    public recoverPassword() {
        if (this.validate()) {
            this.execute(service.recoverPassword(this.usernameOrEmail))
                .then((success) => {
                    navigationModule.goBack();
                }, (error) => {
                    this.showValidationSummary("User not found.");
                });
        }
    }

    protected validateOverride(): boolean {
        if (!validationRulesModule.isRequiredValid(this._usernameOrEmail)) {
            this.setErrorMessage("Please enter email.");

            return false;
        }

        return true;
    }
}