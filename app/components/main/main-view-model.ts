import observableModule = require("data/observable");

import viewModelBaseModule = require("../view-model-base");
import serviceModule = require("../../utils/service");

export class MainViewModel extends viewModelBaseModule.ViewModelBase {
    constructor() {
        super();
    }

    get data(): any {
        return [{ Data: 1 }, { Data: 2 }, { Data: 8 }];
    }
}