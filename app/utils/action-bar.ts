import platformModule = require("platform");

import frameModule = require("ui/frame");
import navigationModule = require("./navigation");

var attached = false;
export function attachToActionBarEvents() {
    if (!attached) {
        if (platformModule.device.os == platformModule.platformNames.android) {
            var topmost = frameModule.topmost();
            topmost.android.on(frameModule.knownEvents.android.optionSelected, androidOptionSelected);
        }

        attached = true;
    }
}

export function showBackNavigation() {
    if (platformModule.device.os == platformModule.platformNames.android) {
        attachToActionBarEvents();
        var topmost = frameModule.topmost();
        topmost.android.actionBar.setDisplayHomeAsUpEnabled(true);
    }
}

export function hideBackNavigation() {
    if (platformModule.device.os == platformModule.platformNames.android) {
        var topmost = frameModule.topmost();
        topmost.android.actionBar.setDisplayHomeAsUpEnabled(false);
    }
}

function androidOptionSelected(args: frameModule.AndroidOptionEventData) {
    if (args.item.getItemId() === (<any>android).R.id.home) {
        navigationModule.goBack();
        args.handled = true;
    }
}