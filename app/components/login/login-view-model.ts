import localSettingsModule = require("local-settings");
import observableModule = require("data/observable");

import viewModelBaseModule = require("../view-model-base");
import constantsModule = require("../../utils/constants");
import serviceModule = require("../../utils/service");

export class LoginViewModel extends viewModelBaseModule.ViewModelBase {
    constructor() {
        super();
    }

    login() {
        alert("login");
    }

    signUp() {
        alert("signUp");
    }
}