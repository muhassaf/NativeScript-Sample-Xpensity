import applicationModule = require("application");

import serviceModule = require("./utils/service");
import viewsModule = require("./utils/views");
import actionBarModule = require("./utils/action-bar");

applicationModule.mainModule = viewsModule.Views.main;
applicationModule.start();
