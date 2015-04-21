import applicationSettingsModule = require("application-settings");

import observableModule = require("data/observable");
import observableArrayModule = require("data/observable-array");

import dialogsModule = require("ui/dialogs");

import editViewModelBaseModule = require("../edit-view-model-base");
import viewReportViewModelModule = require("../view-report/view-report-view-model");

import constantsModule = require("../../utils/constants");
import serviceModule = require("../../utils/service");
import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");
import reportStatusModule = require("../../utils/report-status");

export class EditReportViewModel extends editViewModelBaseModule.EditViewModelBase {
    constructor(report?: any) {
        super(report);
    }

    createItem(): any {
        var item = super.createItem();
        item.Status = reportStatusModule.New;
        item.Date = new Date();

        return item;
    }

    addItem(item: any): Promise<any> {
        return serviceModule.service.createReport(item);
    }

    updateItem(item: any): Promise<any> {
        return serviceModule.service.updateReport(item);
    }

    deleteItem(item: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            serviceModule.service.deleteReport(item).then((data) => {
                resolve(data);
                navigationModule.goBack();
            }, reject);
        });
    }
}