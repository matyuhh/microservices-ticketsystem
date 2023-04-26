export interface CurrentUser {
    email: string;
}
export interface User {
    currentUser?: CurrentUser,
}