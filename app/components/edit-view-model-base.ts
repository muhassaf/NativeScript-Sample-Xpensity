import platformModule = require("platform");
import enumsModule = require("ui/enums");

import viewModelBaseModule = require("./view-model-base");
import navigationModule = require("../utils/navigation");

export class EditViewModelBase extends viewModelBaseModule.ViewModelBase {
    private _item: any;
    private _isAdd: boolean;

    constructor(item?: any) {
        super();

        if (item) {
            this._isAdd = false
            this.item = item;
        }
        else {
            this._isAdd = true;
            this.item = {};
        }
    }

    get item(): any {
        return this._item;
    }

    set item(value: any) {
        if (this._item !== value) {
            this._item = value;
            this.notifyPropertyChanged("item", value);
        }
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

    get createMethod(): (item: any) => Promise<any> {
        return null;
    }

    get updateMethod(): (item: any) => Promise<any> {
        return null;
    }


    save() {
        this.beginLoading();
        if (this._isAdd) {
            this.create();
        }
        else {
            this.update();
        }
    }

    create() {
        this.createMethod(this.item).then((data) => {
            this.endLoading();
            navigationModule.goBack();
        }, error => {
                this.endLoading();
            });
    }

    update() {
        this.updateMethod(this.item).then((data) => {
            this.endLoading();
            navigationModule.goBack();
        }, error => {
                this.endLoading();
            });
    }
} 
