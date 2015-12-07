var typesModule = require("utils/types");
function isRequiredValid(value) {
    return !typesModule.isNullOrUndefined(value) && (typesModule.isNumber(value) || value);
}
exports.isRequiredValid = isRequiredValid;