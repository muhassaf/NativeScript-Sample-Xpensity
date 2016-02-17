declare module "notifications" {
    export function showError(error: string);
    export function showInfo(message: string);
    export function confirm(title: string, message: string): Promise<boolean>;
} 