export function validateLogin() {
    var username = localStorage.getItem('username') || undefined;
    return username;

}