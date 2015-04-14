import observableModule = require("data/observable");

export class Report extends observableModule.Observable {
    private _title: string;
    constructor(json: any) {
        super(json);
    }
}