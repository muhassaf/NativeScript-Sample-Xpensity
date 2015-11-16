function createFieldExpression(properties: string[]) {
    var expression = {};
    properties.forEach((prop) => {
        expression[prop] = 1;
    });

    return expression;
}

export var everliveKey = "hYxsMOYMwpLgdV7z";
export var googleApiKey = "AIzaSyAExpwSeeR-UCAauro5jf71gqnFPjpkLuE";
export var projectNumber = "948882044382";
export var defaultExpenseCategoryId = "82f88dd0-ee4c-11e4-bf80-a57b3cc4e475";
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




