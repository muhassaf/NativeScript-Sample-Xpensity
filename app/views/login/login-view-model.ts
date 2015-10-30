import { ViewModelBase } from "view-model-base";

import navigationModule = require("navigation");
import validationRulesModule = require("../../shared/validation-rules");
import { service } from "../../shared/service";

export class LoginViewModel extends ViewModelBase {
    private _username: string;
    private _password: string;

    constructor() {
        super();

        this._username = "kamen.velikov@telerik.com";
        this._password = "123";
    }

    public get username(): string {
        return this._username;
    }

    public set username(value: string) {
        if (this._username != value) {
            this._username = value;
            this.notifyPropertyChange("username", value);
        }
    }

    public get password(): string {
        return this._password;
    }

    public set password(value: string) {
        if (this._password != value) {
            this._password = value;
            this.notifyPropertyChange("password", value);
        }
    }

    public login() {
        if (this.validate()) {
            this.execute(service.login(this.username, this.password))
                .then(() => {
                    navigationModule.main();
                }, (error) => {
                    this.showValidationSummary(error.message);
                });
        }
    }

    protected validateOverride(): boolean {
        if (!validationRulesModule.isRequiredValid(this.username)) {
            this.setErrorMessage("Please enter username.");

            return false;
        }

        if (!validationRulesModule.isRequiredValid(this.password)) {
            this.setErrorMessage("Please enter password.");

            return false;
        }

        return true;
    }

    protected clearOverride() {
        this.password = "";
    }
}