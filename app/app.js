var applicationModule = require("application");
var specialPropertiesModule = require("ui/builder/special-properties");
var enums_1 = require("ui/enums");
var list_view_1 = require("ui/list-view");
var viewsModule = require("./shared/views");
var navigationModule = require("navigation");
var constants_1 = require("./shared/constants");
var chart_1 = require("nativescript-telerik-ui/chart");
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
specialPropertiesModule.registerSpecialProperty("link", function (instance, propertyValue) {
    console.log("LINK");
    console.log("LINK");
    console.log("LINK");
    console.log("LINK: " + propertyValue);
    if (instance instanceof list_view_1.ListView) {
        console.log("LIST VIEW");
        var listView = instance;
        listView.on("itemTap", function (args) {
            console.log("TAP");
            console.log("TAP");
            console.log("TAP");
            console.log("TAP");
            console.log("TAP");
            console.log("TAP");
            console.log("TAP: " + propertyValue);
            navigationModule.navigateById(propertyValue, {
                item: args.view.bindingContext,
                context: instance.linkContext
            });
        });
        console.log("LIST VIEW DONE");
    }
    else {
        console.log("VIEW");
        instance.on("tap", function (args) {
            navigationModule.navigateById(propertyValue, {
                context: instance.linkContext
            });
        });
        console.log("VIEW DONE");
    }
    console.log("LINK: DONE");
});
applicationModule.cssFile = "./app.css";
applicationModule.resources = {
    formatDate: function (date) {
        return (date.getDate()) + " " + months[date.getMonth()] + ", " + date.getFullYear();
    },
    formatCurrency: function (currency) {
        return "$" + (Math.round(currency * 100) / 100).toFixed(2);
    },
    visibilityConverter: function (visible) {
        var result = visible ? enums_1.Visibility.visible : enums_1.Visibility.collapse;
        return result;
    },
    reverseVisibilityConverter: function (visible) {
        var result = !visible ? enums_1.Visibility.visible : enums_1.Visibility.collapse;
        return result;
    },
    reportStatusConverter: function (status) {
        switch (status) {
            case constants_1.reportStatus.approved:
                return "Approved";
            case constants_1.reportStatus.rejected:
                return "Rejected";
            case constants_1.reportStatus.inProgress:
                return "In Progress";
            case constants_1.reportStatus.returned:
                return "Returned";
            case constants_1.reportStatus.submitted:
                return "Submitted";
            default:
                return "";
        }
    },
    editReportVisibilityConverter: function (status) {
        if (status === constants_1.reportStatus.inProgress ||
            status === constants_1.reportStatus.returned) {
            return enums_1.Visibility.visible;
        }
        return enums_1.Visibility.collapse;
    },
    titleConverter: function (tab) {
        switch (tab) {
            case 0:
                return "Reports";
            case 1:
                return "Notifications";
            case 2:
                return "Settings";
            default:
                return "";
        }
    },
    paletteConverter: function (expensesByCategory) {
        var palette = new chart_1.Palette();
        var paletteEntries = [];
        expensesByCategory.forEach(function (item) {
            var entry = new chart_1.PaletteEntry();
            entry.fillColor = item.Category.Color;
            paletteEntries.push(entry);
        });
        palette.entries = paletteEntries;
        return [palette];
    }
};
applicationModule.onLaunch = function (context) {
    var serviceModule = require("./shared/service");
    serviceModule.service.isLoggedIn().then(function (isLoggedIn) {
        var view = isLoggedIn ? viewsModule.main : viewsModule.login;
        navigationModule.replace(view);
    });
};
applicationModule.mainModule = viewsModule.main;
applicationModule.start();
//# sourceMappingURL=app.js.map