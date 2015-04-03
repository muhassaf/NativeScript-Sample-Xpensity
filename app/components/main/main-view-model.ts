import observableModule = require("data/observable");

import viewModelBaseModule = require("../view-model-base");
import reportViewModelModule = require("../report-view-model");
import serviceModule = require("../../utils/service");

export class MainViewModel extends viewModelBaseModule.ViewModelBase {
    constructor() {
        super();
    }

    get reports(): reportViewModelModule.ReportViewModel[] {
        return [
            new reportViewModelModule.ReportViewModel({ Title: "Dinner with Daniel Smith", CreatedOn: "Apr 13, 2015" }),
            new reportViewModelModule.ReportViewModel({ Title: "Lunch with clients", CreatedOn: "Apr 13, 2015" }),
            new reportViewModelModule.ReportViewModel({ Title: "Boston Trip", CreatedOn: "Mar 14, 2015" }),
            new reportViewModelModule.ReportViewModel({ Title: "Boston Trip", CreatedOn: "Jan 18, 2015" }),
            new reportViewModelModule.ReportViewModel({ Title: "Boston Trip", CreatedOn: "Apr 21, 2015" }),
            new reportViewModelModule.ReportViewModel({ Title: "Boston Trip", CreatedOn: "Apr 23, 2015" })
        ];
    }

    addReport() {
        alert("Add report");
    }

    viewReport(report: any) {
        alert("View report");
    }
}