function createFieldExpression(properties: string[]) {
    var expression = {};
    properties.forEach((prop) => {
        expression[prop] = 1;
    });

    return expression;
}

export var everliveKey = "jmzz4ixhsckrltg2";
export var googleApiKey = "AIzaSyAExpwSeeR-UCAauro5jf71gqnFPjpkLuE";
export var projectNumber = "948882044382";
export var defaultExpenseCategoryId = "9e6364c0-0c80-11e6-8df5-c3842d4e315d";
export var reportStatus = {
    inProgress: 0,
    submitted: 1,
    approved: 2,
    returned: 3,
    rejected: 4
}

export var expenseProperties = ["Id", "Date", "Location", "Cost", "Notes", "Title", "Picture", "Report"];
export var reportProperties = ["Id", "BusinessPurpose", "Title", "Status", "Date", "CostCenter"];
export var expenseFieldExpression = createFieldExpression(expenseProperties);
export var reportFieldExpression = createFieldExpression(reportProperties);




