let users = [];
let activeUser = [];



function save() {
    let userActiveAsText = JSON.stringify(activeUser);
    localStorage.setItem('activeUser', userActiveAsText);
}

function load() {
    let userActiveAsText = localStorage.getItem('activeUser');
    if (userActiveAsText) {
        activeUser = JSON.parse(userActiveAsText);
    }
}
function remove() {
    localStorage.removeItem('activeUser')
}

async function logOut() {
    remove();
    window.location.href='../index.html';
}