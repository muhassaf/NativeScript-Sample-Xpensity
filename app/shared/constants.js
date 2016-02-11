function createFieldExpression(properties) {
    var expression = {};
    properties.forEach(function (prop) {
        expression[prop] = 1;
    });
    return expression;
}
exports.everliveKey = "hYxsMOYMwpLgdV7z";
exports.googleApiKey = "AIzaSyAExpwSeeR-UCAauro5jf71gqnFPjpkLuE";
exports.projectNumber = "948882044382";
exports.defaultExpenseCategoryId = "82f88dd0-ee4c-11e4-bf80-a57b3cc4e475";
exports.reportStatus = {
    inProgress: 0,
    submitted: 1,
    approved: 2,
    returned: 3,
    rejected: 4
};
exports.expenseProperties = ["Id", "Date", "Location", "Cost", "Notes", "Title", "Picture", "Report"];
exports.reportProperties = ["Id", "BusinessPurpose", "Title", "Status", "Date", "CostCenter"];
exports.expenseFieldExpression = createFieldExpression(exports.expenseProperties);
exports.reportFieldExpression = createFieldExpression(exports.reportProperties);
