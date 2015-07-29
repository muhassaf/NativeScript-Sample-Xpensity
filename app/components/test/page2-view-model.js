var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observableModule = require("data/observable");
var Page2ViewModel = (function (_super) {
    __extends(Page2ViewModel, _super);
    function Page2ViewModel(item) {
        _super.call(this);
        this.item = item;
    }
    Object.defineProperty(Page2ViewModel.prototype, "item", {
        get: function () {
            return this._item;
        },
        set: function (value) {
            if (this._item !== value) {
                this._item = value;
                this.notifyPropertyChanged("item", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Page2ViewModel.prototype.notifyPropertyChanged = function (propertyName, value) {
        this.notify({ object: this, eventName: observableModule.Observable.propertyChangeEvent, propertyName: propertyName, value: value });
    };
    return Page2ViewModel;
})(observableModule.Observable);
exports.Page2ViewModel = Page2ViewModel;
