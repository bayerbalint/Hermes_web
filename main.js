import * as handleJWT from './modules/handleJWT.js';
import { getCookie } from './modules/cookies.js';

const OPEN_SIDEBAR_BUTTON = document.getElementById('openSidebarButton');
const SIDEBAR = document.getElementById('sidebar');
const OPTIONS_CONTAINER = document.getElementById('optionsContainer');

const INVITE_BUTTON = document.getElementById('inviteButton');
const COPY_INVITE_LINK_BUTTON = document.getElementById('copyInviteLink');
const INVITE_JWT = document.getElementById('inviteJWT');

const API_URL = 'http://localhost:8000/apiV1';

const SIDEBAR_STATES = {
    'open' : {
        'containerVisibility' : 'visible',
        'sidebarWidth' : '50vmin',
        'mainLeft' : '50vmin',
    },
    'close' : {
        'containerVisibility' : 'hidden',
        'sidebarWidth' : '10vmin',
        'mainLeft' : '5vmin',
    },
}

let sidebarOpened = false;

handleJWT.setJWTRefreshSchedule();

OPEN_SIDEBAR_BUTTON.onclick = () => {
    OPEN_SIDEBAR_BUTTON.disabled = true;
    sidebarOpened = !sidebarOpened;
    changeSidebar(sidebarOpened ? 'open' : 'close');
    setTimeout(() => {
        OPEN_SIDEBAR_BUTTON.disabled = false;
        if (sidebarOpened === false){
            OPTIONS_CONTAINER.style.visibility = 'hidden';
        }
    }, 500);
}

function changeSidebar(state){
    if (state === 'open'){
        OPTIONS_CONTAINER.style.visibility = SIDEBAR_STATES[state]['containerVisibility'];
    }
    SIDEBAR.style.width = SIDEBAR_STATES[state]['sidebarWidth'];
}

async function inviteUser(){
    try{
        const res = await fetch(`${API_URL}/invite/new_user`, {
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('access_tkn')}`
            }),
            method: "POST",
            body: JSON.stringify({'prv_level' : 'Consumer'})
        })

        return res.json();
    }
    catch (err){
        console.error(err);
    }
}

COPY_INVITE_LINK_BUTTON.onclick = () => {
    console.log('asd');
    navigator.clipboard.writeText(INVITE_JWT.value).then(() => alert('Successfully copied link')).catch(() => alert('Something went wrong!'));
}

INVITE_BUTTON.onclick = () => {
    inviteUser().then().then(data => {
        if (data['success']){
            INVITE_JWT.value = `${window.location.origin}/sign_up.html?signUpToken=${data['data']['jwt']}`;
        }
        else{
            alert(data['msg']);
        }
    }).catch();
}