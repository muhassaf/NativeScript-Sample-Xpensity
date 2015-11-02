import applicationModule = require("application");
import { EventData } from "data/observable";
import specialPropertiesModule = require("ui/builder/special-properties");
import { Visibility } from "ui/enums";
import { ListView, ItemEventData } from "ui/list-view";

import viewsModule = require("./shared/views");
import navigationModule = require("navigation");
import { reportStatus } from "./shared/constants";

import { PaletteEntry, Palette } from "nativescript-telerik-ui/chart"

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
specialPropertiesModule.registerSpecialProperty("link", (instance, propertyValue) => {
    console.log("LINK");
    console.log("LINK");
    console.log("LINK");
    console.log("LINK: " + propertyValue);
    if (instance instanceof ListView) {
        console.log("LIST VIEW");
        var listView = <ListView>instance;
        listView.on("itemTap", (args: ItemEventData) => {
            console.log("TAP");
            console.log("TAP");
            console.log("TAP");
            console.log("TAP");
            console.log("TAP");
            console.log("TAP");
            console.log("TAP: " + propertyValue);
            navigationModule.navigateById(propertyValue, {
                item: args.view.bindingContext,
                context: (<any>instance).linkContext
            });
        });

        console.log("LIST VIEW DONE");

    }
    else {
        console.log("VIEW");
        instance.on("tap", (args: EventData) => {
            navigationModule.navigateById(propertyValue, {
                context: (<any>instance).linkContext
            });
        });

        console.log("VIEW DONE");
    }

    console.log("LINK: DONE");
});

applicationModule.cssFile = "./app.css";
applicationModule.resources = {
    formatDate: function (date: Date): string {
        return (date.getDate()) + " " + months[date.getMonth()] + ", " + date.getFullYear();
    },

    formatCurrency: function (currency: number) {
        return "$" + (Math.round(currency * 100) / 100).toFixed(2);
    },

    visibilityConverter: function (visible: boolean) {
        var result = visible ? Visibility.visible : Visibility.collapse;

        return result;
    },

    reverseVisibilityConverter: function (visible: boolean) {
        var result = !visible ? Visibility.visible : Visibility.collapse;

        return result;
    },

    reportStatusConverter: function (status: number) {
        switch (status) {
            case reportStatus.approved:
                return "Approved";

            case reportStatus.rejected:
                return "Rejected";

            case reportStatus.inProgress:
                return "In Progress";

            case reportStatus.returned:
                return "Returned";

            case reportStatus.submitted:
                return "Submitted";

            default:
                return "";
        }
    },

    editReportVisibilityConverter: function (status: number) {
        if (status === reportStatus.inProgress ||
            status === reportStatus.returned) {
            return Visibility.visible;
        }

        return Visibility.collapse;
    }, 

    titleConverter: function (tab: number) {
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

    paletteConverter: function (expensesByCategory: any[]) {
        var palette = new Palette();
        var paletteEntries: PaletteEntry[] = [];
        expensesByCategory.forEach((item: any) => {
            var entry = new PaletteEntry();
            entry.fillColor = item.Category.Color;
            paletteEntries.push(entry);
        });

        palette.entries = paletteEntries;
        
        return [ palette ];
    }
}

applicationModule.onLaunch = function (context: any) {
    var serviceModule = require("./shared/service");
    serviceModule.service.isLoggedIn().then((isLoggedIn) => {
        var view = isLoggedIn ? viewsModule.main : viewsModule.login;
        navigationModule.replace(view);
    });
}

applicationModule.mainModule = viewsModule.main;
applicationModule.start();
