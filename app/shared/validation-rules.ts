import typesModule = require("utils/types");

export function isRequiredValid(value: any): boolean {
    return !typesModule.isNullOrUndefined(value) && (typesModule.isNumber(value) || value);
}