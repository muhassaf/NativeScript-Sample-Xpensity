import observableModule = require("data/observable");
import { DataSource, DataSourceOptions } from "data-source";

import { ViewModelBase } from "view-model-base";
import { ViewReportViewModel } from "../view-report/view-report-view-model";
import { everlive, ReportTypeName } from "../../shared/service";

export class ReportsViewModel extends ViewModelBase {
    private _reports: DataSource;

    constructor() {
        super();

        this._reports = new DataSource(everlive, new DataSourceOptions(ReportTypeName, undefined, (reports: any[]) => {
            var result = [];
            for (var i = 0; i < reports.length; i++) {
                var viewModel = new ViewReportViewModel(reports[i])
                viewModel.refresh();
                result.push(viewModel);
            }

            return result;
        }));
    }

    get reports(): DataSource {
        return this._reports;
    }

    refresh() {
        this.execute(this._reports.reload());
    }
}