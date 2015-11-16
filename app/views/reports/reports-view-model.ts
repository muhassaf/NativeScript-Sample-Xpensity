import observableModule = require("data/observable");
import { DataSource, DataSourceOptions } from "data-source";

import { ViewModelBase } from "view-model-base";
import { ViewReportViewModel } from "../view-report/view-report-view-model";
import { everlive, ReportTypeName } from "../../shared/service";
import constantsModule = require("../../shared/constants");

export class ReportsViewModel extends ViewModelBase {
    private _reports: DataSource;

    constructor() {
        super();

        var options = new DataSourceOptions();
        options.typeName = ReportTypeName;
        options.extendFunc = (reports: any[]) => {
            var result = [];
            for (var i = 0; i < reports.length; i++) {
                var viewModel = new ViewReportViewModel(reports[i])
                viewModel.refresh();
                result.push(viewModel);
            }

            return result;
        }

        this._reports = new DataSource(everlive, options);
    }

    get reports(): DataSource {
        return this._reports;
    }

    refresh() {
        this.execute(this._reports.reload());
    }
}