import platformModule = require("platform");
import observableModule = require("data/observable");
import enumsModule = require("ui/enums");

import serviceModule = require("../utils/service");

export class ViewModelBase extends observableModule.Observable {
    private _loadingCount: number;
    private _isLoading: boolean;
    private _service: serviceModule.IService;

    constructor() {
        super();

        this._loadingCount = 0;
        this._service = serviceModule.service;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    set isLoading(value: boolean) {
        if (this._isLoading != value) {
            this._isLoading = value;
            this.notifyPropertyChanged("isLoading", value);
        }
    }

    get service(): serviceModule.IService {
        return this._service;
    }

    get androidVisibility(): string {
        if (platformModule.device.os === "Android") {
            return enumsModule.Visibility.visible;
        }

        return enumsModule.Visibility.collapsed;
    }

    get iosVisibility(): string {
        if (platformModule.device.os === "iOS") {
            return enumsModule.Visibility.visible;
        }

        return enumsModule.Visibility.collapsed;
    }

    beginLoading() {
        if (!this._loadingCount) {
            this.isLoading = true;
        }

        this._loadingCount++;
    }

    endLoading() {
        if (this._loadingCount > 0) {
            this._loadingCount--;
            if (!this._loadingCount) {
                this.isLoading = false;
            }
        }
    }

    notifyPropertyChanged(propertyName: string, value: any) {
        this.notify({ object: this, eventName: observableModule.knownEvents.propertyChange, propertyName: propertyName, value: value });
    }
}