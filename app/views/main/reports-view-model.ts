import observableModule = require("data/observable");

import { ViewModelBase } from "view-model-base";
//import viewReportViewModelModule = require("../view-report/view-report-view-model");
//import serviceModule = require("../../utils/service");

export class ReportsViewModel extends ViewModelBase {
    private _reports: any[];

    constructor() {
        super();

        this._reports = [{
            report: {
                Title: "Item 1",
                Date: new Date(),
                Data: [
                    { Brand: "Audi", Amount: 10 },
                    { Brand: "Mercedes", Amount: 76 },
                    { Brand: "Fiat", Amount: 60 },
                    { Brand: "BMW", Amount: 24 },
                    { Brand: "Crysler", Amount: 40 }
                ]
            }
        }, {
                report: {
                    Title: "Item 1",
                    Date: new Date(),
                    Data: [
                        { Brand: "Audi", Amount: 10 },
                        { Brand: "Mercedes", Amount: 76 },
                        { Brand: "Fiat", Amount: 60 },
                        { Brand: "BMW", Amount: 24 },
                        { Brand: "Crysler", Amount: 40 }
                    ]
                }
            }, {
                report: {
                    Title: "Item 1",
                    Date: new Date(),
                    Data: [
                        { Brand: "Audi", Amount: 10 },
                        { Brand: "Mercedes", Amount: 76 },
                        { Brand: "Fiat", Amount: 60 },
                        { Brand: "BMW", Amount: 24 },
                        { Brand: "Crysler", Amount: 40 }
                    ]
                }
            }, {
                report: {
                    Title: "Item 1",
                    Date: new Date(),
                    Data: [
                        { Brand: "Audi", Amount: 10 },
                        { Brand: "Mercedes", Amount: 76 },
                        { Brand: "Fiat", Amount: 60 },
                        { Brand: "BMW", Amount: 24 },
                        { Brand: "Crysler", Amount: 40 }
                    ]
                }
            }, {
                report: {
                    Title: "Item 1",
                    Date: new Date(),
                    Data: [
                        { Brand: "Audi", Amount: 10 },
                        { Brand: "Mercedes", Amount: 76 },
                        { Brand: "Fiat", Amount: 60 },
                        { Brand: "BMW", Amount: 24 },
                        { Brand: "Crysler", Amount: 40 }
                    ]
                }
            }];
    }

    get reports(): any[] {
        return this._reports;
    }

    //set reports(value: Array<viewReportViewModelModule.ViewReportViewModel>) {
    //    if (this._reports !== value) {
    //        this._reports = value;
    //        this.notifyPropertyChanged("reports", value);
    //    }
    //}

    refresh() {
        //this.beginLoading();
        //serviceModule.service.getReports().then((data: any[]) => {
        //    var reports = new Array<viewReportViewModelModule.ViewReportViewModel>();
        //    for (var i = 0; i < data.length; i++) {
        //        reports.push(new viewReportViewModelModule.ViewReportViewModel(data[i]));
        //    }

        //    this.reports = reports;
        //    this.endLoading();
        //},(error: any) => {
        //        this.endLoading();
        //    });
    }
}