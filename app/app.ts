import applicationModule = require("application");

import viewsModule = require("./utils/views");

applicationModule.mainModule = viewsModule.Views.main;

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
applicationModule.resources = {
    formatDate: function (date: Date): string {
        return date.getDay() + " " + months[date.getMonth() - 1] + ", " + date.getFullYear();
    },

    formatCurrency: function (currency: number) {
        return "$" + (Math.round(currency * 100) / 100).toFixed(2);
    }
}

applicationModule.start();
