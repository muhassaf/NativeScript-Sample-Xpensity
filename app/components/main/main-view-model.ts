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
            new reportViewModelModule.ReportViewModel({ Title: "Dinner with Daniel Smith", BussinessPurpose: "Clients visit", Date: "Apr 13, 2015" }),
            new reportViewModelModule.ReportViewModel({ Title: "Lunch with clients", BussinessPurpose: "Clients visit", Date: "Apr 13, 2015" }),
            new reportViewModelModule.ReportViewModel({ Title: "Boston Trip", BussinessPurpose: "Clients visit", Date: "Mar 14, 2015" }),
            new reportViewModelModule.ReportViewModel({ Title: "Boston Trip", BussinessPurpose: "Clients visit", Date: "Jan 18, 2015" }),
            new reportViewModelModule.ReportViewModel({ Title: "Boston Trip", BussinessPurpose: "Clients visit", Date: "Apr 21, 2015" }),
            new reportViewModelModule.ReportViewModel({ Title: "Boston Trip", BussinessPurpose: "Clients visit", Date: "Apr 23, 2015" })
        ];
    }

    addReport() {
        alert("Add report");
    }

    viewReport(report: any) {
        alert("View report");
    }
}