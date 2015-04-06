import viewModelBaseModule = require("./view-model-base");

import navigationModule = require("../utils/navigation");

export class DialogResultViewModel extends viewModelBaseModule.ViewModelBase {
    private _dialogResult: boolean;

    constructor() {
        super();

        this.dialogResult = null;
    }

    get dialogResult(): boolean {
        return this._dialogResult;
    }

    set dialogResult(value: boolean) {
        if (this._dialogResult !== value) {
            this._dialogResult = value;
            this.notifyPropertyChanged("dialogResult", value);
        }
    }

    done() {
        this.dialogResult = true;
        navigationModule.goBack();
    }
}