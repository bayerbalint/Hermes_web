import * as API from './modules/APICalls.js';
import { getCookie, setCookie } from './modules/cookies.js';
import { decodeJWT } from './modules/handleJWT.js';

const LOGIN_FORM = document.getElementById('loginForm'); 
const LOGIN_BUTTON = document.getElementById('loginButton')
const USERNAME_INPUT = document.getElementById('username');
const PASSWORD_INPUT = document.getElementById('password');

let authSuccess = false;

LOGIN_BUTTON.onclick = () => {
    let body = {
        'username' : USERNAME_INPUT.value,
        'password' : PASSWORD_INPUT.value
    };

    API.POSTRequest("/auth/login", body).then().then(data => {
        authSuccess = data['success'];
        
        if (authSuccess){
            let access = data['data']['token_data']['access_tkn'];
            let refresh = data['data']['token_data']['refresh_tkn'];

            setCookie('access_tkn', access, decodeJWT(access)['exp']);
            setCookie('refresh_tkn', refresh, decodeJWT(refresh)['exp']);
            setCookie(data['data']['user_data']['username'], data['data']['user_data']['id']);

            LOGIN_FORM.submit();
            authSuccess = false; 
        }
        else{
            alert(data['msg']);
        }
    }).catch(e => console.log(e));
}

LOGIN_FORM.addEventListener('submit', e => {
    if (!authSuccess){
        e.preventDefault();
    }
});