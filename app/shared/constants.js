"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uc3RhbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrQkFBK0IsVUFBb0I7SUFDL0MsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO1FBQ3BCLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsVUFBVSxDQUFDO0FBQ3RCLENBQUM7QUFFVSxtQkFBVyxHQUFHLGtCQUFrQixDQUFDO0FBQ2pDLG9CQUFZLEdBQUcseUNBQXlDLENBQUM7QUFDekQscUJBQWEsR0FBRyxjQUFjLENBQUM7QUFDL0IsZ0NBQXdCLEdBQUcsc0NBQXNDLENBQUM7QUFDbEUsb0JBQVksR0FBRztJQUN0QixVQUFVLEVBQUUsQ0FBQztJQUNiLFNBQVMsRUFBRSxDQUFDO0lBQ1osUUFBUSxFQUFFLENBQUM7SUFDWCxRQUFRLEVBQUUsQ0FBQztJQUNYLFFBQVEsRUFBRSxDQUFDO0NBQ2QsQ0FBQTtBQUVVLHlCQUFpQixHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzlGLHdCQUFnQixHQUFHLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ3RGLDhCQUFzQixHQUFHLHFCQUFxQixDQUFDLHlCQUFpQixDQUFDLENBQUM7QUFDbEUsNkJBQXFCLEdBQUcscUJBQXFCLENBQUMsd0JBQWdCLENBQUMsQ0FBQyJ9