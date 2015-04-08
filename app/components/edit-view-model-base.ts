import platformModule = require("platform");
import enumsModule = require("ui/enums");

import viewModelBaseModule = require("./view-model-base");

export class EditViewModelBase extends viewModelBaseModule.ViewModelBase{
    private _isAdd: boolean;

    constructor(isAdd: boolean) {
        super();

        this._isAdd = isAdd;
    }

    get addVisibility(): string {
        if (this._isAdd) {
            return enumsModule.Visibility.visible;
        }

        return enumsModule.Visibility.collapsed;
    }

    get editVisibility(): string {
        console.log("IS ADD: " + this._isAdd);
        if (this._isAdd) {
            return enumsModule.Visibility.collapsed;
        }

        return enumsModule.Visibility.visible;
    }

    get mode(): string {
        if (this._isAdd) {
            return EditModes.Add;
        }

        return EditModes.Edit;
    }
} 

export module EditModes {
    export var Add = "Add";
    export var Edit = "Edit";
}