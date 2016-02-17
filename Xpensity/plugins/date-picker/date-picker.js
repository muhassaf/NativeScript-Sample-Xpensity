var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var proxyModule = require("ui/core/proxy");
var dependencyObservableModule = require("ui/core/dependency-observable");
var custom_control_1 = require("custom-control");
var view_model_base_1 = require("view-model-base");
var navigationModule = require("navigation");
var HEADER = "header";
var SELECTED_DATE = "selectedDate";
var DATE_PICKER = "DatePicker";
var SELECT = "Select date...";
var DatePicker = (function (_super) {
    __extends(DatePicker, _super);
    function DatePicker() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(DatePicker.prototype, "header", {
        get: function () {
            return this._getValue(DatePicker.headerProperty);
        },
        set: function (value) {
            this._setValue(DatePicker.headerProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePicker.prototype, "selectedDate", {
        get: function () {
            return this._getValue(DatePicker.selectedDateProperty);
        },
        set: function (value) {
            this._setValue(DatePicker.selectedDateProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePicker.prototype, "path", {
        get: function () {
            return "~/tns_modules/date-picker";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePicker.prototype, "templateName", {
        get: function () {
            return "date-picker";
        },
        enumerable: true,
        configurable: true
    });
    DatePicker.prototype.onDatePickerTap = function () {
        var _this = this;
        navigationModule.navigate("tns_modules/date-picker/date-picker-popup", new DatePickerViewModel(this.selectedDate, function (selectedDate) {
            _this.selectedDate = selectedDate;
        }));
    };
    DatePicker.headerProperty = new dependencyObservableModule.Property(HEADER, DATE_PICKER, new proxyModule.PropertyMetadata(undefined, dependencyObservableModule.PropertyMetadataSettings.AffectsLayout));
    DatePicker.selectedDateProperty = new dependencyObservableModule.Property(SELECTED_DATE, DATE_PICKER, new proxyModule.PropertyMetadata(new Date(), dependencyObservableModule.PropertyMetadataSettings.AffectsLayout));
    return DatePicker;
})(custom_control_1.CustomControl);
exports.DatePicker = DatePicker;
var DatePickerViewModel = (function (_super) {
    __extends(DatePickerViewModel, _super);
    function DatePickerViewModel(selectedDate, callback) {
        _super.call(this);
        this.day = selectedDate.getDate();
        this.month = selectedDate.getMonth() + 1;
        this.year = selectedDate.getFullYear();
        this._callback = callback;
    }
    Object.defineProperty(DatePickerViewModel.prototype, "day", {
        get: function () {
            return this._day;
        },
        set: function (value) {
            if (this._day !== value) {
                this._day = value;
                this.notifyPropertyChange("day", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerViewModel.prototype, "month", {
        get: function () {
            return this._month;
        },
        set: function (value) {
            if (this._month !== value) {
                this._month = value;
                this.notifyPropertyChange("month", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerViewModel.prototype, "year", {
        get: function () {
            return this._year;
        },
        set: function (value) {
            if (this._year !== value) {
                this._year = value;
                this.notifyPropertyChange("year", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    DatePickerViewModel.prototype.done = function () {
        this._callback(new Date(this.year, this.month - 1, this.day, 0, 0, 0, 0));
        navigationModule.goBack();
    };
    return DatePickerViewModel;
})(view_model_base_1.ViewModelBase);
exports.DatePickerViewModel = DatePickerViewModel;
//# sourceMappingURL=date-picker.js.map