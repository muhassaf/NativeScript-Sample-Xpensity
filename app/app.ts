import applicationModule = require("application");

import viewsModule = require("./utils/views");

applicationModule.mainModule = viewsModule.Views.main;
applicationModule.start();
