import localSettingsModule = require("local-settings");
import observableModule = require("data/observable");
import dialogsModule = require("ui/dialogs");

import editViewModelBaseModule = require("../edit-view-model-base");

import constantsModule = require("../../utils/constants");
import serviceModule = require("../../utils/service");
import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");
import reportStatusModule = require("../../utils/report-status");

export class EditReportViewModel extends editViewModelBaseModule.EditViewModelBase {
    constructor(report?: any) {
        super(report);
    }

    addItem(item: any): Promise<any> {
        console.log("Adding");
        return serviceModule.service.createReport(item);
    }

    updateItem(item: any): Promise<any> {
        return serviceModule.service.updateReport(item);
    }

    createItem(): any {
        var item = super.createItem();
        item.Status = reportStatusModule.New;
        item.Date = new Date();

        return item;
    }

    deleteReport() {
        dialogsModule.confirm({
            title: "Delete Report",
            message: "Do you want to delete the report?",
            okButtonText: "YES",
            cancelButtonText: "NO"
        }).then((value: boolean) => {
            if (value) {
                this.beginLoading();
                serviceModule.service.deleteReport(this.item).then((data) => {
                    this.endLoading();
                    navigationModule.goBack();
                    navigationModule.goBack();
                },(error) => {
                        this.endLoading();
                    });
            }
        });
    }
}