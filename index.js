import * as handleJWT from './handleJWT.js';

const OPEN_SIDEBAR_BUTTON = document.getElementById('openSidebarButton');
const SIDEBAR = document.getElementById('sidebar');
const OPTIONS_CONTAINER = document.getElementById('optionsContainer');

const INVITE_BUTTON = document.getElementById('inviteButton');
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

INVITE_BUTTON.onclick = () => {
    inviteUser().then().then(d => console.log(d)).catch();
}