import {getCookie} from './cookies.js';
import { decodeJWT } from './handleJWT.js';

const LOGIN_FORM = document.getElementById('loginForm'); 
const LOGIN_BUTTON = document.getElementById('loginButton')
const USERNAME_INPUT = document.getElementById('username');
const PASSWORD_INPUT = document.getElementById('password');
const API_URL = 'http://localhost:8000/apiV1';

let authSuccess = false;

async function authenticate(username, password) {
    try{
        const res = await fetch(`${API_URL}/auth/login`, {
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            method: "POST",
            body: JSON.stringify({'username' : username, 'password': password})
        });

        return res.json();
    }
    catch (err){
        console.error(err);
    }
    
}

LOGIN_BUTTON.onclick = () => {
    authenticate(USERNAME_INPUT.value, PASSWORD_INPUT.value).then().then(data => {
        authSuccess = data['success'];
        let access = decodeJWT(getCookie('access_tkn'));
        let refresh = decodeJWT(getCookie('refresh_tkn'));

        if (data['success']){
            document.cookie = `access_tkn=${d['data']['access_tkn']};expires=${access['exp']}`;
            document.cookie = `refresh_tkn=${d['data']['refresh_tkn']};expires=${refresh['exp']}`;
            LOGIN_FORM.submit();
            authSuccess = false; 
        }
        else{
            alert('A felhasználónév és jelszó páros nem létezik!');
        }
    }).catch();
}

LOGIN_FORM.addEventListener('submit', e => {
    if (!authSuccess){
        e.preventDefault();
    }
});