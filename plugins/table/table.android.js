var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var commonModule = require("./table-common");
global.moduleMerge(commonModule, exports);
var Table = (function (_super) {
    __extends(Table, _super);
    function Table() {
        _super.apply(this, arguments);
    }
    return Table;
})(commonModule.Table);
exports.Table = Table;
//# sourceMappingURL=table.android.js.map