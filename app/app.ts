import applicationModule = require("application");

import viewsModule = require("./utils/views");

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
applicationModule.resources = {
    formatDate: function (date: Date): string {
        return (date.getDate()) + " " + months[date.getMonth()] + ", " + date.getFullYear();
    },

    formatCurrency: function (currency: number) {
        return "$" + (Math.round(currency * 100) / 100).toFixed(2);
    }
}

applicationModule.onLaunch = function (context: any) {
    var serviceModule = require("./utils/service");
    if (serviceModule.service.isAuthenticated) {
        applicationModule.mainModule = viewsModule.Views.main;
    }
    else {
        applicationModule.mainModule = viewsModule.Views.login;
    }
}

applicationModule.start();
