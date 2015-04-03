import observableModule = require("data/observable");

import viewModelBaseModule = require("./view-model-base");
import serviceModule = require("../utils/service");

export class ReportViewModel extends viewModelBaseModule.ViewModelBase {
    private _report: any;

    constructor(report: any) {
        super();

        this.report = report;
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

    get expensesByCategory(): any[] {
        return [
            { Category: "Food & Dining", Total: 25 },
            { Category: "Fees & Changes", Total: 25 },
            { Category: "Business Services", Total: 12.5 },
            { Category: "Personal Care", Total: 12.5 },
            { Category: "Auto & Transport", Total: 25 }
        ];
    }
}