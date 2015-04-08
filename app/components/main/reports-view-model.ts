import observableModule = require("data/observable");

import viewModelBaseModule = require("../view-model-base");
import viewReportViewModelModule = require("../view-report/view-report-view-model");
import serviceModule = require("../../utils/service");

export class ReportsViewModel extends viewModelBaseModule.ViewModelBase {
    constructor() {
        super();
    }

    get reports(): viewReportViewModelModule.ViewReportViewModel[] {
        return [
            new viewReportViewModelModule.ViewReportViewModel({ Title: "Dinner with Daniel Smith", BussinessPurpose: "Clients visit", Date: new Date(Date.now()), Status: "New" }),
            new viewReportViewModelModule.ViewReportViewModel({ Title: "Lunch with clients", BussinessPurpose: "Clients visit", Date: new Date(Date.now()), Status: "Returned", Info: "Limit exceeded!" }),
            new viewReportViewModelModule.ViewReportViewModel({ Title: "Boston Trip", BussinessPurpose: "Clients visit", Date: new Date(Date.now()) }),
            new viewReportViewModelModule.ViewReportViewModel({ Title: "Boston Trip", BussinessPurpose: "Clients visit", Date: new Date(Date.now()) }),
            new viewReportViewModelModule.ViewReportViewModel({ Title: "Boston Trip", BussinessPurpose: "Clients visit", Date: new Date(Date.now()) }),
            new viewReportViewModelModule.ViewReportViewModel({ Title: "Boston Trip", BussinessPurpose: "Clients visit", Date: new Date(Date.now()) })
        ];
    }
}