const STORAGE_TOKEN = '95EI500XAI6O6E54SZ91QWQF8312TGEEM3NXYY3N';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

let users = [{
id: 0,
userName: 'Guest User',
email: 'guest@guestemail.com',
password: 'guest1234',
color:'',
animationCounter: 0
}];
let activeUser = [];


/**
 * It downloads the users from the server, then it loads the users from the local storage, then it
 * includes the HTML.
 */
async function init() {
    // await downloadFromServer();
    // await loadItem('users');
    // users = await getItem('users')
    load();
    includeHTML();
}

async function setItem(key, input) {
    let value = JSON.stringify(input);
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}

/**
 * This function loads user data from local storage or initializes an empty array if no data is found.
 */
async function loadItem(item) {
    try {
    return JSON.parse(await getItem(item));
    } catch(e){
        console.error('Loading error:', e);
    }
}

/**
 * This function loads user data from local storage or initializes an empty array if no data is found.
 */
async function saveItem(item) {
    return JSON.parse(backend.setItem(item));
}

// function saveUsers() {
//     setItem('users', JSON.stringify(users))
// }

// function saveTasks() {
//     setItem('tasks',JSON.stringify(tasks));
// }

// function saveTasks() {
//     setItem('tasks',JSON.stringify(tasks));
// }



/**
 * This function adds the Header & Footer HTML.
 * For each element with the attribute w3-include-html, fetch the file specified by the attribute, and
 * replace the element's innerHTML with the file's contents.
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
    selectGuestIcon();
}


/**
 * If the active user is a guest, display the guest icon, otherwise display the user's initials.
 */
function selectGuestIcon() {
    let usersicon = document.getElementById('click-new');
    let usersIconName = document.getElementById('click-new-name');
    if(activeUser[0].email == 'guest@guestemail.com') {
       usersicon.innerHTML = `<img style="width: 40px; height: 40px;" src="../assets/img/Group 13person-icon.svg">`;
    } else {
        let firstletterAU = activeUser[0].userName;
        let acronymAU = firstletterAU.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '');
        usersIconName.innerHTML = `${acronymAU}`;
        usersicon.classList.add(activeUser[0].color)
    }
}


/**
 * It takes the activeUser object and converts it to a string, then saves it to local storage.
 */
function save() {
    let userActiveAsText = JSON.stringify(activeUser);
    localStorage.setItem('activeUser', userActiveAsText);
}

/**
 * If there is a user in local storage, then parse it and set it to the activeUser variable.
 */
function load() {
    let userActiveAsText = localStorage.getItem('activeUser');
    if (userActiveAsText) {
        activeUser = JSON.parse(userActiveAsText);
    }
}

/**
 * It removes the activeUser from localStorage.
 */
function remove() {
    localStorage.removeItem('activeUser')
}

/**
 * If you click the Logout Button,
 * It removes the user's data from the local storage and then redirects the user to the index page.
 */
async function logOut() {
    remove();
    window.location.href='../index.html';
}

/**
 * When the user clicks the button "Auf Deutsch anzeigen" on the Legal Notice Page.
 * This function changes the Language of the LegalNotice Page from english to german.
 * If the element with the id 'legalgerman' has the class 'd-none', remove it. If the element with the
 * id 'legalenglish' does not have the class 'd-none', add it.
 */
function showLegalDE() {
    document.getElementById('legalgerman').classList.remove('d-none');
    document.getElementById('legalenglish').classList.add('d-none');
}

/**
 * When the user clicks the button "Show in English" on the Legal Notice Page.
 * This function changes the Language of the LegalNotice Page from german to english.
 * the element with the id of 'legalenglish' will have the class of 'd-none' removed from it, and the element with the id of
 * 'legalgerman' will have the class of 'd-none' added to it.
 */
function showLegalEN() {
    document.getElementById('legalenglish').classList.remove('d-none');
    document.getElementById('legalgerman').classList.add('d-none');
}