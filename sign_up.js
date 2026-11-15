import * as API from "./modules/APICalls.js";
import { getCookie, setCookie } from './modules/cookies.js';
import { decodeJWT } from './modules/handleJWT.js';

const USERNAME_INPUT = document.getElementById('username');
const NICKNAME_INPUT = document.getElementById('nickname');
const PASSWORD_INPUT = document.getElementById('password');
const SIGN_UP_FORM = document.getElementById('signUpForm');
const SIGN_UP_BUTTON = document.getElementById('signUpButton');

let userCreated = false;

SIGN_UP_BUTTON.onclick = () => {
    let token = new URL(window.location.href).searchParams.get('signUpToken');
    let body = {
        'username' : USERNAME_INPUT.value,
        'nickname' : NICKNAME_INPUT.value,
        'password': PASSWORD_INPUT.value
    };

    API.POSTRequest('/auth/sign_up', body, token).then().then(data => {
            userCreated = data['success'];
            
            if (userCreated){
                let access = data['data']['token_data']['access_tkn'];
                let refresh = data['data']['token_data']['refresh_tkn'];
    
                setCookie('access_tkn', access, decodeJWT(access)['exp']);
                setCookie('refresh_tkn', refresh, decodeJWT(refresh)['exp']);

                SIGN_UP_FORM.submit();
                userCreated = false; 
            }
            else{
                alert(data['msg']);
            }
        }).catch(e => console.log(e));
}

SIGN_UP_FORM.addEventListener('submit', e => {
    e.preventDefault();
})