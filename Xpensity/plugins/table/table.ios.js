var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var commonModule = require("./table-common");
var grid_layout_1 = require("ui/layouts/grid-layout");
global.moduleMerge(commonModule, exports);
var Table = (function (_super) {
    __extends(Table, _super);
    function Table() {
        _super.apply(this, arguments);
    }
    Table.prototype.addChild = function (view) {
        if (this.getChildrenCount() > 0) {
            var separator = new grid_layout_1.GridLayout();
            separator.cssClass = "table-separator";
            _super.prototype.addChild.call(this, separator);
        }
        _super.prototype.addChild.call(this, view);
    };
    return Table;
})(commonModule.Table);
exports.Table = Table;
//# sourceMappingURL=table.ios.js.map