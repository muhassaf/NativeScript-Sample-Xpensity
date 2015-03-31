import localSettingsModule = require("local-settings");
import observableModule = require("data/observable");

import viewModelBaseModule = require("../view-model-base");

import constantsModule = require("../../utils/constants");
import serviceModule = require("../../utils/service");
import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");

export class LoginViewModel extends viewModelBaseModule.ViewModelBase {
    private _username: string;
    private _password: string;

    constructor() {
        super();

        this.username = "";
        this.password = "";
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        if (this._username != value) {
            this._username = value;
            this.notifyPropertyChanged("username", value);
        }
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        if (this._password != value) {
            this._password = value;
            this.notifyPropertyChanged("password", value);
        }
    }

    login() {
        if (this.validate()) {
            this.beginLoading();
            serviceModule.service.login(this.username, this.password,(data: any) => {
                this.endLoading();
                navigationModule.navigateWitouthHistory(viewsModule.Views.main);
            },(error: any) => {
                    this.clearPassword();
                    this.endLoading();
                    this.notifyOnError(error.message);
                });
        }
        else {
            this.clearPassword();
        }
    }

    signUp() {
        navigationModule.navigate(viewsModule.Views.signUp);
    }

    private validate(): boolean {
        if (this.username === "") {
            this.notifyOnError("Please enter username.");
            return false;
        }

        if (this.password === "") {
            this.notifyOnError("Please enter password.");
            return false;
        }

        return true;
    }

    private clearPassword() {
        this.password = "";
    }
}