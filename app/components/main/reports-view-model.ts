import observableModule = require("data/observable");

import viewModelBaseModule = require("../view-model-base");
import viewReportViewModelModule = require("../view-report/view-report-view-model");
import serviceModule = require("../../utils/service");

export class ReportsViewModel extends viewModelBaseModule.ViewModelBase {
    private _reports: Array<viewReportViewModelModule.ViewReportViewModel>;

    constructor() {
        super();
    }

    get reports(): Array<viewReportViewModelModule.ViewReportViewModel> {
        console.log("GET REPORTS");
        return this._reports;
    }

    set reports(value: Array<viewReportViewModelModule.ViewReportViewModel>) {
        if (this._reports !== value) {
            this._reports = value;
            this.notifyPropertyChanged("reports", value);
        }
    }

    refresh() {
        this.beginLoading();
        serviceModule.service.getReports().then((data: any[]) => {
            console.log("REPORTS: " + data.length);
            var reports = new Array<viewReportViewModelModule.ViewReportViewModel>();
            for (var i = 0; i < data.length; i++) {
                reports.push(new viewReportViewModelModule.ViewReportViewModel(data[i]));
            }

            this.reports = reports;
            this.endLoading();
        },(error: any) => {
                this.endLoading();
            });
    }
}