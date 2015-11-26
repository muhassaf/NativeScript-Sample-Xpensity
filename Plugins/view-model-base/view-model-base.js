var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var observable_1 = require("data/observable");
var ViewModelBase = (function (_super) {
    __extends(ViewModelBase, _super);
    function ViewModelBase() {
        _super.call(this);
        this._loadingCount = 0;
        this._isLoading = false;
        this._isValidationSummaryVisible = false;
    }
    Object.defineProperty(ViewModelBase.prototype, "isLoading", {
        get: function () {
            return this._isLoading;
        },
        set: function (value) {
            if (this._isLoading != value) {
                this._isLoading = value;
                this.notifyPropertyChange("isLoading", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewModelBase.prototype, "isValidationSummaryVisible", {
        get: function () {
            return this._isValidationSummaryVisible;
        },
        set: function (value) {
            if (this._isValidationSummaryVisible != value) {
                this._isValidationSummaryVisible = value;
                this.notifyPropertyChange("isValidationSummaryVisible", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewModelBase.prototype, "errorMessage", {
        get: function () {
            return this._errorMessage;
        },
        set: function (value) {
            if (this._errorMessage != value) {
                this._errorMessage = value;
                this.notifyPropertyChange("errorMessage", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    ViewModelBase.prototype.beginLoading = function () {
        if (!this._loadingCount) {
            this.isLoading = true;
        }
        this._loadingCount++;
    };
    ViewModelBase.prototype.endLoading = function () {
        if (this._loadingCount > 0) {
            this._loadingCount--;
            if (!this._loadingCount) {
                this.isLoading = false;
            }
        }
    };
    ViewModelBase.prototype.execute = function (promise) {
        var _this = this;
        this.beginLoading();
        return new Promise(function (resolve, reject) {
            return promise.then(function (result) {
                resolve(result);
                _this.endLoading();
            }, function (error) {
                reject(error);
                _this.endLoading();
            });
        });
    };
    ViewModelBase.prototype.hideValidationSummary = function () {
        this.isValidationSummaryVisible = false;
        this.errorMessage = "";
    };
    ViewModelBase.prototype.setErrorMessage = function (message) {
        this.errorMessage = message;
    };
    ViewModelBase.prototype.showValidationSummary = function (message) {
        this.setErrorMessage(message);
        this.isValidationSummaryVisible = true;
    };
    ViewModelBase.prototype.validate = function () {
        var isValid = this.validateOverride();
        this.isValidationSummaryVisible = !isValid;
        if (!isValid) {
            this.clear();
        }
        return isValid;
    };
    ViewModelBase.prototype.clear = function () {
        this.clearOverride();
    };
    ViewModelBase.prototype.validateOverride = function () {
        return true;
    };
    ViewModelBase.prototype.clearOverride = function () {
    };
    return ViewModelBase;
})(observable_1.Observable);
exports.ViewModelBase = ViewModelBase;
//# sourceMappingURL=view-model-base.js.map