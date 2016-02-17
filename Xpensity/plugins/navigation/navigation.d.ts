declare module "navigation" {
    function navigate(view: string, context?: any);
    function replace(view: string, context?: any);
    function navigateById(viewId: string, context);
    function main();
    function login();
    export function goBack();
}