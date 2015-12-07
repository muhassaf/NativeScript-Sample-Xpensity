var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
var everliveModule = require("everlive");
var DataSourceOptions = (function () {
    function DataSourceOptions(json) {
        if (json) {
            this.typeName = json.typeName;
            this.fields = json.fields;
            this.expand = json.expand;
            this.extendFunc = json.extendFunc;
        }
    }
    return DataSourceOptions;
})();
exports.DataSourceOptions = DataSourceOptions;
var DataSource = (function (_super) {
    __extends(DataSource, _super);
    function DataSource(everlive, options) {
        _super.call(this);
        this._everlive = everlive;
        this._options = options;
        this._filterDescriptors = new Array();
        this._sortDescriptors = new Array();
    }
    DataSource.prototype.reload = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._everlive.data(_this._options.typeName).get(_this.buildQuery())
                .then(function (result) {
                _this.length = 0;
                _this.push(_this._options.extendFunc ? _this._options.extendFunc(result.result) : result.result);
                _this.onReloaded();
                resolve();
            }, reject);
        });
    };
    DataSource.prototype.clear = function () {
        this.length = 0;
        this.notify({
            eventName: observable_array_1.ObservableArray.changeEvent,
            object: this
        });
    };
    DataSource.prototype.clearFilterDescriptors = function () {
        for (var i = 0; i < this._filterDescriptors.length; i++) {
            var filterDescriptor = this._filterDescriptors.pop();
            this.detachFromFilterDescriptorEvents(filterDescriptor);
        }
    };
    DataSource.prototype.clearSortDescriptors = function () {
        for (var i = 0; i < this._sortDescriptors.length; i++) {
            var sortDescriptor = this._sortDescriptors.pop();
            this.detachFromSortDescriptorEvents(sortDescriptor);
        }
    };
    DataSource.prototype.addFilterDescriptor = function (filterDescriptor) {
        this.attachToFilterDescriptorEvents(filterDescriptor);
        this._filterDescriptors.push(filterDescriptor);
    };
    DataSource.prototype.addSortDescriptor = function (sortDescriptor) {
        this.attachToSortDescriptorEvents(sortDescriptor);
        this._sortDescriptors.push(sortDescriptor);
    };
    DataSource.prototype.sum = function (property) {
        var sum = 0;
        for (var i = 0; i < this.length; i++) {
            var item = this.getItem(i);
            var value = item[property];
            if (!isNaN(value)) {
                sum += +value;
            }
        }
        return sum;
    };
    DataSource.prototype.groupBy = function (property, groupingFunc) {
        var map = new Map();
        for (var i = 0; i < this.length; i++) {
            var item = this.getItem(i);
            var header = item[property];
            var key = groupingFunc ? groupingFunc(header) : header;
            var groupItems;
            if (!map.has(key)) {
                groupItems = [];
                map.set(key, {
                    Header: header,
                    Items: groupItems
                });
            }
            else {
                groupItems = map.get(key).Items;
            }
            groupItems.push(item);
        }
        var result = [];
        map.forEach(function (value) {
            result.push(new GroupDescriptor(value.Header, value.Items));
        });
        return result;
    };
    DataSource.prototype.attachToFilterDescriptorEvents = function (filterDescriptor) {
        var _this = this;
        if (filterDescriptor) {
            filterDescriptor.on("propertyChange", function (data) {
                // TODO: Use timer for optimization. Think about client side filtering.
                _this.reload();
            });
        }
    };
    DataSource.prototype.attachToSortDescriptorEvents = function (sortDescriptor) {
        var _this = this;
        if (sortDescriptor) {
            sortDescriptor.on("propertyChange", function (data) {
                // TODO: Use timer for optimization. Think about client side sorting.
                _this.reload();
            });
        }
    };
    DataSource.prototype.detachFromFilterDescriptorEvents = function (filterDescriptor) {
        var _this = this;
        if (filterDescriptor) {
            filterDescriptor.off("propertyChange", function (data) {
                // TODO: Use timer for optimization. Think about client side filtering.
                _this.reload();
            });
        }
    };
    DataSource.prototype.detachFromSortDescriptorEvents = function (sortDescriptor) {
        var _this = this;
        if (sortDescriptor) {
            sortDescriptor.off("propertyChange", function (data) {
                // TODO: Use timer for optimization. Think about client side sorting.
                _this.reload();
            });
        }
    };
    DataSource.prototype.buildQuery = function () {
        var query = new everliveModule.Query();
        if (this._options.fields) {
            query = query.select(this._options.fields);
        }
        var filter = buildFilterObject(this._filterDescriptors);
        if (filter) {
            query = query.where(filter);
        }
        if (this._options.expand) {
            query = query.expand(this._options.expand);
        }
        for (var i = 0; i < this._sortDescriptors.length; i++) {
            query = this._sortDescriptors[i].order(query);
        }
        return query;
    };
    DataSource.prototype.onReloaded = function () {
        this.notify({
            eventName: "loaded",
            object: this
        });
    };
    return DataSource;
})(observable_array_1.ObservableArray);
exports.DataSource = DataSource;
var GroupDescriptor = (function (_super) {
    __extends(GroupDescriptor, _super);
    function GroupDescriptor(header, items) {
        _super.call(this);
        this._header = header;
        this._items = items;
    }
    Object.defineProperty(GroupDescriptor.prototype, "header", {
        get: function () {
            return this._header;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupDescriptor.prototype, "items", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    return GroupDescriptor;
})(observable_1.Observable);
exports.GroupDescriptor = GroupDescriptor;
var FilterDescriptorBase = (function (_super) {
    __extends(FilterDescriptorBase, _super);
    function FilterDescriptorBase() {
        _super.apply(this, arguments);
    }
    FilterDescriptorBase.prototype.isEmpty = function () {
        return false;
    };
    FilterDescriptorBase.prototype.build = function () {
        return null;
    };
    return FilterDescriptorBase;
})(observable_1.Observable);
exports.FilterDescriptorBase = FilterDescriptorBase;
var FilterDescriptor = (function (_super) {
    __extends(FilterDescriptor, _super);
    function FilterDescriptor(property, operator, value) {
        _super.call(this);
        this._property = property;
        this._operator = operator;
        this._value = value;
    }
    Object.defineProperty(FilterDescriptor.prototype, "property", {
        get: function () {
            return this._property;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterDescriptor.prototype, "operator", {
        get: function () {
            return this._operator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterDescriptor.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (this._value !== value) {
                this._value = value;
                this.notifyPropertyChange("value", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    FilterDescriptor.prototype.isEmpty = function () {
        return this._value === undefined;
    };
    FilterDescriptor.prototype.build = function () {
        var operator = buildOperator(this._operator, this._value);
        var filter = {};
        filter[this._property] = operator;
        return filter;
    };
    return FilterDescriptor;
})(FilterDescriptorBase);
exports.FilterDescriptor = FilterDescriptor;
var SortDescriptorBase = (function (_super) {
    __extends(SortDescriptorBase, _super);
    function SortDescriptorBase() {
        _super.apply(this, arguments);
    }
    SortDescriptorBase.prototype.order = function (query) {
        return null;
    };
    return SortDescriptorBase;
})(observable_1.Observable);
exports.SortDescriptorBase = SortDescriptorBase;
var SortDescriptor = (function (_super) {
    __extends(SortDescriptor, _super);
    function SortDescriptor(property, direction) {
        _super.call(this);
        if (!direction) {
            direction = SortDirection.ascending;
        }
        this._property = property;
        this._direction = direction;
    }
    SortDescriptor.prototype.order = function (query) {
        if (this._direction === SortDirection.ascending) {
            return query.order(this._property);
        }
        else {
            return query.orderDesc(this._property);
        }
    };
    Object.defineProperty(SortDescriptor.prototype, "property", {
        get: function () {
            return this._property;
        },
        set: function (value) {
            if (this._property !== value) {
                this._property = value;
                this.notifyPropertyChange("property", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SortDescriptor.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        set: function (value) {
            if (this._direction !== value) {
                this._direction = value;
                this.notifyPropertyChange("direction", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    return SortDescriptor;
})(SortDescriptorBase);
exports.SortDescriptor = SortDescriptor;
var Operators;
(function (Operators) {
    Operators.equals = 0;
    Operators.startsWith = 10;
})(Operators = exports.Operators || (exports.Operators = {}));
var SortDirection;
(function (SortDirection) {
    SortDirection.ascending = "asc";
    SortDirection.descending = "desc";
})(SortDirection = exports.SortDirection || (exports.SortDirection = {}));
function buildFilterObject(filterDescriptors) {
    var filters = [];
    for (var i = 0; i < filterDescriptors.length; i++) {
        var filterDescriptor = filterDescriptors[i];
        if (!filterDescriptor.isEmpty()) {
            filters.push(filterDescriptor.build());
        }
    }
    var filter = null;
    if (filters.length == 1) {
        filter = filters[0];
    }
    else if (filters.length > 1) {
        filter = {
            "$and": filters
        };
    }
    return filter;
}
function isRegex(operator) {
    switch (operator) {
        case Operators.startsWith: return true;
        default: return false;
    }
}
function buildOperator(operator, value) {
    var operatorString = getOperatorString(operator);
    var operand = isRegex(operator) ? buildRegex(operator, value) : value;
    var result = {};
    result[operatorString] = operand;
    return result;
}
function getOperatorString(operator) {
    if (isRegex(operator)) {
        return "$regex";
    }
    switch (operator) {
        case Operators.equals: return "$eq";
    }
}
function buildRegex(operator, value) {
    var regex;
    switch (operator) {
        case Operators.startsWith:
            regex = new RegExp("^" + value);
            break;
    }
    return regex.source;
}
//# sourceMappingURL=data-source.js.map