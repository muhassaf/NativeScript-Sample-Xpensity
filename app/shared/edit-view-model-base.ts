import { ViewModelBase } from "view-model-base";
import navigationModule = require("navigation");

import notificationsModule = require("./notifications");

export class EditViewModelBase extends ViewModelBase {
    private _item: any;
    private _originalItem: any;
    private _isAdd: boolean;

    constructor(item?: any) {
        super();

        if (item) {
            this._isAdd = false
            this._originalItem = item;
            this.item = clone(item);
        }
        else {
            this._isAdd = true;
            this.item = this.createItem();
        }
    }

    public get item(): any {
        return this._item;
    }

    public set item(value: any) {
        if (this._item !== value) {
            this._item = value;
            this.notifyPropertyChange("item", value);
        }
    }

    public get isAdd(): boolean {
        return this._isAdd;
    }

    public get canDelete(): boolean {
        return !this._isAdd;
    }

    public save() {
        if (this.validate()) {
            this.beginLoading();
            if (this._isAdd) {
                this.add();
            }
            else {
                this.update();
            }
        }
    }

    public delete() {
        notificationsModule.confirm("Delete Item", "Do you want to delete the item?")
            .then((value: boolean) => {
                if (value) {
                    this.beginLoading();
                    this.deleteItem(this.item).then((data) => {
                        this.onItemDeleted(this.item);
                        this.endLoading();
                    }, (error) => {
                        this.endLoading();
                    });
                }
            });
    }

    protected createItem(): any {
        return {};
    }

    protected addItem(item: any): Promise<any> {
        return null;
    }

    protected updateItem(item: any): Promise<any> {
        return null;
    }

    protected deleteItem(item: any): Promise<any> {
        return null;
    }

    protected onItemAdded(item: any) {
        navigationModule.goBack();
    }

    protected onItemDeleted(item: any) {
        navigationModule.goBack();
    }

    private add() {
        this.addItem(this.item).then((data) => {
            this.item.Id = data.result.Id;
            this.onItemAdded(this.item);
            this.endLoading();
        }, error => {
            this.endLoading();
        });
    }

    private update() {
        this.updateItem(this.item).then((data) => {
            copy(this.item, this._originalItem);
            this.endLoading();
            navigationModule.goBack();
        }, error => {
            this.endLoading();
        });
    }
}

function clone(item: any): any {
    var clone = {};
    copy(item, clone);

    return clone;
}

function copy(fromItem: any, toItem: any) {
    for (var prop in fromItem) {
        if (fromItem.hasOwnProperty(prop)) {
            toItem[prop] = fromItem[prop];
        }
    }
}
