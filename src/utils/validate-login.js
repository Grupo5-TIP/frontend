export function validateLogin() {
    var username = localStorage.getItem('username') || undefined;
    console.log("username localstorage", username)
    return username;

}