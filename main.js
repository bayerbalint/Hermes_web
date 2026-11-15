import * as API from './modules/APICalls.js';
import * as handleJWT from './modules/handleJWT.js';
import { getCookie, setCookie } from './modules/cookies.js';

const INVITE_BUTTON = document.getElementById('inviteButton');
const COPY_INVITE_LINK_BUTTON = document.getElementById('copyInviteLink');
const INVITE_JWT = document.getElementById('inviteJWT');

const USER_ID_INPUT = document.getElementById('userID');
const SEND_FRIEND_REQUEST_BUTTON = document.getElementById('sendFriendRequest');

handleJWT.setJWTRefreshSchedule();
console.log(getCookie('asd'));

API.GETRequest('/relation/invite/initial', getCookie('access_tkn')).then(res => {
    console.log(res);
}).catch();

COPY_INVITE_LINK_BUTTON.onclick = () => {
    if (INVITE_JWT.value.trim() == ""){
        alert('Nothing to copy');
    }
    else{
        navigator.clipboard.writeText(INVITE_JWT.value)
        .then(() => alert('Successfully copied link'))
        .catch(() => alert('Something went wrong!'));
    }
}

INVITE_BUTTON.onclick = () => {
    API.POSTRequest('/invite/new_user', {'prv_level' : 'Consumer'}, getCookie('access_tkn')).then(data => {
        if (data['success']){
            INVITE_JWT.value = `${window.location.origin}/sign_up.html?signUpToken=${data['data']['jwt']}`;
        }
        else{
            alert(data['msg']);
        }
    }).catch();
}

SEND_FRIEND_REQUEST_BUTTON.onclick = () => {
    if (USER_ID_INPUT.value.trim() != ""){
        API.POSTRequest(`/relation/${USER_ID_INPUT.value.trim()}/invite`, {}, getCookie('access_tkn')).then(
            res => {
                console.log(res);
            }
        ).catch();
    }
}