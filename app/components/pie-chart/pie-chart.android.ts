import pieChartCommon = require("./pie-chart-common");

export class PieChart extends pieChartCommon.PieChart {
    private _android: any;

    constructor() {
        super();
    }

    get android(): any {
        return this._android;
    }

    _createUI() {
        var data = new java.util.ArrayList<java.lang.Integer>(); 
        data.add(java.lang.Integer.valueOf(12));
        data.add(java.lang.Integer.valueOf(5));
        data.add(java.lang.Integer.valueOf(10));
        data.add(java.lang.Integer.valueOf(7));

        var pieChartView = new (<any>com).telerik.widget.chart.visualization.pieChart.RadPieChartView(this._context);
        var pieSeries = new (<any>com).telerik.widget.chart.visualization.pieChart.PieSeries();
        pieSeries.setData(data);
        pieChartView.getSeries().add(pieSeries);

        this._android = pieChartView;
    }
}