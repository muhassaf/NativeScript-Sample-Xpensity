var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var view_model_base_1 = require("view-model-base");
var navigationModule = require("navigation");
var notificationsModule = require("notifications");
var EditViewModelBase = (function (_super) {
    __extends(EditViewModelBase, _super);
    function EditViewModelBase(item, properties) {
        _super.call(this);
        this._properties = properties;
        if (item) {
            this._isAdd = false;
            this._originalItem = item;
            this.item = view_model_base_1.clone(item, this._properties);
        }
        else {
            this._isAdd = true;
            this.item = this.createItem();
        }
    }
    Object.defineProperty(EditViewModelBase.prototype, "item", {
        get: function () {
            return this._item;
        },
        set: function (value) {
            if (this._item !== value) {
                this._item = value;
                this.notifyPropertyChange("item", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditViewModelBase.prototype, "isAdd", {
        get: function () {
            return this._isAdd;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditViewModelBase.prototype, "canDelete", {
        get: function () {
            return !this._isAdd;
        },
        enumerable: true,
        configurable: true
    });
    EditViewModelBase.prototype.save = function () {
        var _this = this;
        if (this.validate()) {
            this.beginLoading();
            this.onSaving(this._item).then(function (cancel) {
                if (!cancel) {
                    if (_this._isAdd) {
                        _this.add();
                    }
                    else {
                        _this.update();
                    }
                }
            });
        }
    };
    EditViewModelBase.prototype.delete = function () {
        var _this = this;
        notificationsModule.confirm("Delete Item", "Do you want to delete the item?")
            .then(function (value) {
            if (value) {
                _this.beginLoading();
                _this.deleteItem(_this.item).then(function (data) {
                    _this.onItemDeleted(_this.item);
                    _this.endLoading();
                }, function (error) {
                    _this.endLoading();
                });
            }
        });
    };
    EditViewModelBase.prototype.createItem = function () {
        return {};
    };
    EditViewModelBase.prototype.addItem = function (item) {
        return null;
    };
    EditViewModelBase.prototype.updateItem = function (item) {
        return null;
    };
    EditViewModelBase.prototype.deleteItem = function (item) {
        return null;
    };
    EditViewModelBase.prototype.onItemAdded = function (item) {
        navigationModule.goBack();
    };
    EditViewModelBase.prototype.onItemDeleted = function (item) {
        navigationModule.goBack();
    };
    EditViewModelBase.prototype.onSaving = function (item) {
        return new Promise(function (resolve, reject) {
            resolve(false);
        });
    };
    EditViewModelBase.prototype.add = function () {
        var _this = this;
        this.addItem(this.item).then(function (data) {
            _this.item.Id = data.result.Id;
            _this.onItemAdded(_this.item);
            _this.endLoading();
        }, function (error) {
            _this.endLoading();
        });
    };
    EditViewModelBase.prototype.update = function () {
        var _this = this;
        this.updateItem(this.item).then(function (data) {
            view_model_base_1.copy(_this.item, _this._originalItem, _this._properties);
            _this.endLoading();
            navigationModule.goBack();
        }, function (error) {
            _this.endLoading();
        });
    };
    return EditViewModelBase;
})(view_model_base_1.ViewModelBase);
exports.EditViewModelBase = EditViewModelBase;
//# sourceMappingURL=edit-view-model-base.js.map