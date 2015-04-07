import platformModule = require("platform");

import frameModule = require("ui/frame");

export function showBackNavigation() {
    if (platformModule.device.os == platformModule.platformNames.android) {
        var topmost = frameModule.topmost();
        topmost.android.actionBar.setDisplayHomeAsUpEnabled(true);
        //topmost.android.on(frameModule.knownEvents.android.optionSelected, androidOptionSelected);
    }
}

export function hideBackNavigation() {
    if (platformModule.device.os == platformModule.platformNames.android) {
        var topmost = frameModule.topmost();
        topmost.android.actionBar.setDisplayHomeAsUpEnabled(false);
    }
}

function androidOptionSelected(args: frameModule.AndroidOptionEventData) {
    alert("Option");
}