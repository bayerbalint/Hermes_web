import { getCookie } from './modules/cookies.js';
import { decodeJWT } from './modules/handleJWT.js';
import { API_URL } from './modules/settings.js';

const LOGIN_FORM = document.getElementById('loginForm'); 
const LOGIN_BUTTON = document.getElementById('loginButton')
const USERNAME_INPUT = document.getElementById('username');
const PASSWORD_INPUT = document.getElementById('password');

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
        
        if (authSuccess){
            let access = data['data']['token_data']['access_tkn'];
            let refresh = data['data']['token_data']['refresh_tkn'];

            document.cookie = `access_tkn=${access};expires=${decodeJWT(access)['exp']}`;
            document.cookie = `refresh_tkn=${refresh};expires=${decodeJWT(refresh)['exp']}`;
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