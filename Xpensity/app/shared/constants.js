function createFieldExpression(properties) {
    var expression = {};
    properties.forEach(function (prop) {
        expression[prop] = 1;
    });
    return expression;
}
exports.everliveKey = "jmzz4ixhsckrltg2";
exports.googleApiKey = "AIzaSyAExpwSeeR-UCAauro5jf71gqnFPjpkLuE";
exports.projectNumber = "948882044382";
exports.defaultExpenseCategoryId = "9e6364c0-0c80-11e6-8df5-c3842d4e315d";
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
//# sourceMappingURL=constants.js.map