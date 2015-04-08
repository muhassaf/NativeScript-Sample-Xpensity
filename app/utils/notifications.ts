import dialogsModule = require("ui/dialogs");

export function showError(error: string) {
    dialogsModule.alert({ title: "Error", message: error, okButtonText: "Close" });
}

export function showInfo(message: string) {
    dialogsModule.alert({ title: "Info", message: message, okButtonText: "OK" });
}
