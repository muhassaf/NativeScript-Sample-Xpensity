import platformModule = require("platform");

import frameModule = require("ui/frame");

export function showBackNavigation() {
    if (platformModule.device.os == platformModule.platformNames.android) {
        var topmost = frameModule.topmost();
        //topmost.android.actionBar.setDisplayHomeAsUpEnabled(true);
    }
}

export function hideBackNavigation() {
    if (platformModule.device.os == platformModule.platformNames.android) {
        var topmost = frameModule.topmost();
        //topmost.android.actionBar.setDisplayHomeAsUpEnabled(false);
    }
}