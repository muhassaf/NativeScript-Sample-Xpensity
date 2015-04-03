import localSettingsModule = require("local-settings");
import observableModule = require("data/observable");
import dialogsModule = require("ui/dialogs");

import editViewModelBaseModule = require("../edit-view-model-base");

import constantsModule = require("../../utils/constants");
import serviceModule = require("../../utils/service");
import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");

export class EditReportViewModel extends editViewModelBaseModule.EditViewModelBase {
    private _report: any;

    constructor(report?: any) {
        if (report) {
            super(false);
            this.report = report;
        }
        else {
            super(true);
            this.report = {};
        }
    }

    get report(): any {
        return this._report;
    }

    set report(value: any) {
        if (this._report !== value) {
            this._report = value;
            this.notifyPropertyChanged("report", value);
        }
    }

    deleteReport() {
        dialogsModule.confirm({
            title: "Delete Report",
            message: "Do you want to delete the report?",
            okButtonText: "YES",
            cancelButtonText: "NO"
        }).then((value: boolean) => {
            if (value) {
                alert("deleted");
            }
        });
    }
}