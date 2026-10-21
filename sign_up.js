import { API_URL } from "./modules/settings.js";

const USERNAME_INPUT = document.getElementById('username');
const NICKNAME_INPUT = document.getElementById('nickname');
const PASSWORD_INPUT = document.getElementById('password');
const SIGN_UP_FORM = document.getElementById('signUpForm');
const SIGN_UP_BUTTON = document.getElementById('signUpButton');

let userCreated = false;

async function signUp(token, username, nickname, password){
    try{
        const res = await fetch(`${API_URL}/auth/sign_up`, {
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }),
            method: "POST",
            body: JSON.stringify({'username' : username, 'nickname' : nickname, 'password': password})
        });

        return res.json();
    }
    catch (err){
        console.error(err);
    }
}

SIGN_UP_BUTTON.onclick = () => {
    let token = new URL(window.location.href).searchParams.get('signUpToken');

    signUp(token, USERNAME_INPUT.value, NICKNAME_INPUT.value, PASSWORD_INPUT.value).then().then(data => {
            // userCreated = data['success'];
            
            if (userCreated){
                // let access = data['data']['token_data']['access_tkn'];
                // let refresh = data['data']['token_data']['refresh_tkn'];
    
                // document.cookie = `access_tkn=${access};expires=${decodeJWT(access)['exp']}`;
                // document.cookie = `refresh_tkn=${refresh};expires=${decodeJWT(refresh)['exp']}`;
                // LOGIN_FORM.submit();
                // userCreated = false; 
                SIGN_UP_FORM.submit();
                console.log(data);
            }
            else{
                alert(data['msg']);
            }
        }).catch(e => console.log(e));
}

SIGN_UP_FORM.addEventListener('submit', e => {
    e.preventDefault();
})