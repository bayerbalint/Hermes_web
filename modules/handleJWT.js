import { getCookie } from "./cookies.js";

export async function getNewJWT(){
    try{
        const res = await fetch(`http://localhost:8000/apiV1/auth/refresh`, {
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
            method: "POST",
            body: JSON.stringify({'refresh_tkn': getCookie('refresh_tkn')})
        })

        return res.json();
    }
    catch(err){
        console.error(err);
    }
}

export function setJWTRefreshSchedule(){
    let access = decodeJWT(getCookie('access_tkn'));
    let refresh = decodeJWT(getCookie('refresh_tkn'));
    setTimeout(() => {
        getNewJWT().then()
        .then(d => {
            document.cookie = `access_tkn=${d['data']['access_tkn']};expires=${access['exp']}`;
            document.cookie = `refresh_tkn=${d['data']['refresh_tkn']};expires=${refresh['exp']}`;
        })
        .catch(e => {
            console.error(e);
        });
    }, access['exp'] * 1000 - Date.now());
}

export function decodeJWT(token){
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}