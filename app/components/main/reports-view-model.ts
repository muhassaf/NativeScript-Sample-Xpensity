import observableModule = require("data/observable");

import viewModelBaseModule = require("../view-model-base");
import viewReportViewModelModule = require("../view-report/view-report-view-model");
import serviceModule = require("../../utils/service");

export class ReportsViewModel extends viewModelBaseModule.ViewModelBase {
    constructor() {
        super();
    }

    get reports(): viewReportViewModelModule.ReportViewModel[] {
        return [
            new viewReportViewModelModule.ReportViewModel({ Title: "Dinner with Daniel Smith", BussinessPurpose: "Clients visit", Date: "Apr 13, 2015", Status: "New" }),
            new viewReportViewModelModule.ReportViewModel({ Title: "Lunch with clients", BussinessPurpose: "Clients visit", Date: "Apr 13, 2015", Status: "Returned", Info: "Limit exceeded!" }),
            new viewReportViewModelModule.ReportViewModel({ Title: "Boston Trip", BussinessPurpose: "Clients visit", Date: "Mar 14, 2015" }),
            new viewReportViewModelModule.ReportViewModel({ Title: "Boston Trip", BussinessPurpose: "Clients visit", Date: "Jan 18, 2015" }),
            new viewReportViewModelModule.ReportViewModel({ Title: "Boston Trip", BussinessPurpose: "Clients visit", Date: "Apr 21, 2015" }),
            new viewReportViewModelModule.ReportViewModel({ Title: "Boston Trip", BussinessPurpose: "Clients visit", Date: "Apr 23, 2015" })
        ];
    }
}