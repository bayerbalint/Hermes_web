const CORE_HTML_ELEMENTS = [];
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
let OPEN_SIDEBAR_BUTTON;
let SIDEBAR;
let optionsContainer;


function includeHTML() {
    var z, i, elmnt, file, xhttp;

        /* Loop through a collection of all HTML elements: */
        z = document.getElementsByTagName("*");

    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}

window.onload = () => {
    includeHTML();
    OPEN_SIDEBAR_BUTTON = document.getElementById('openSidebarButton');
    SIDEBAR = document.getElementById('sidebar');
    optionsContainer = document.getElementById('optionsContainer');

    OPEN_SIDEBAR_BUTTON.onclick = () => {
        OPEN_SIDEBAR_BUTTON.disabled = true;
        sidebarOpened = !sidebarOpened;
        changeSidebar(sidebarOpened ? 'open' : 'close');
        setTimeout(() => {
            OPEN_SIDEBAR_BUTTON.disabled = false;
            if (sidebarOpened === false){
                optionsContainer.style.visibility = 'hidden';
            }
        }, 500);
    }
};

function changeSidebar(state){
    if (state === 'open'){
        optionsContainer.style.visibility = SIDEBAR_STATES[state]['containerVisibility'];
    }
    SIDEBAR.style.width = SIDEBAR_STATES[state]['sidebarWidth'];
}


// webpage creator
function getAllCoreElements(){
    
}