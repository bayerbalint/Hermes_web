import * as API from "./APICalls.js";
import { getCookie, setCookie } from "./cookies.js";

export function setJWTRefreshSchedule(){
    setTimeout(() => {
        API.POSTRequest("/auth/refresh", {'refresh_tkn': getCookie('refresh_tkn')}).then()
        .then(d => {
            let access = d['data']['access_tkn'];
            let refresh = d['data']['refresh_tkn']

            setCookie('access_tkn', access, decodeJWT(access)['exp']);
            setCookie('refresh_tkn', refresh, decodeJWT(refresh)['exp']);
        })
        .catch(e => {
            console.error(e);
        });
    }, decodeJWT(getCookie('access_tkn'))['exp'] * 1000 - Date.now());
}

export function decodeJWT(token){
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}