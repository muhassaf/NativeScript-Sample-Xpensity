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
            this.item = this.createItem();
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

    createItem(): any {
        return {};
    }

    save() {
        console.log("LOADING");
        this.beginLoading();
        if (this._isAdd) {
            this.add();
        }
        else {
            this.update();
        }
    }

    add() {
        console.log("CREATE");
        this.addItem(this.item).then((data) => {
            console.log("CREATED");
            this.endLoading();
            navigationModule.goBack();
        }, error => {
                this.endLoading();
            });
    }

    update() {
        this.updateItem(this.item).then((data) => {
            this.endLoading();
            navigationModule.goBack();
        }, error => {
                this.endLoading();
            });
    }

    addItem(item: any): Promise<any> {
        return null;
    }

    updateItem(item: any): Promise<any> {
        return null;
    }
} 
