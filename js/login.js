let remember = [];

/**
 * This function is used to initializing / loading the Login-Area and load the users JSON from the Backend.
 * 
 */
async function init_login() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    load();
    rememberload();
    render();
}

/**
 * This function is used to initializing / loading the reset_password.html and load the users JSON from the Backend.
 * 
 */
async function init_reset_passwordHTML() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}

/**
 * This function add classes to the Variables of 'login' and 'signup'. The Variable 'logo' gets a .src and .style attribute. 
 * 
 */
function render() {
    screenWidthCheck();
    let login = document.getElementById('login');
    login.classList.add('login-loaded');
    let signup = document.getElementById('sign-up');
    signup.classList.add('sign-up-loaded');
    let logo = document.getElementById('logo-mobile');
    logo.src = "./assets/img/Logo/Capa 2logo-colored-mobile.png";
    logo.style = "scale: 2"
}

/**
 * This function do a first Check of screen resolution and set .style of dependency the screen resolution.
 * 
 */
function screenWidthCheck() {
    let icon = document.getElementById('start');
    if (window.screen.width < 960 && window.screen.width > 420) {
        icon.style = "transform: translateX(-40.85%) translateY(-39.25%) scale(0.356); transition: transform 1s easy-in-out; background-color: transparent;";
    } else if (window.screen.width <= 420) {
        icon.style = "transform: translateX(-34.85%) translateY(-43.25%) scale(0.356); transition: transform 1s easy-in-out; background-color: transparent;";
    } else {
        icon.style = "transform: translateX(-44.85%) translateY(-39.25%) scale(0.356); transition: transform 1s easy-in-out; background-color: transparent;";
    }
}

/**
 * If the user exists, and the user is not the guest, then show the popup, save the user, and hide the
 * popup after 3 seconds.
 */
function showPopUpPw() {
    let inputmail = document.getElementById('forgot-email');
    let popup = document.getElementById('popup');
    let user = users.find(u => u.email == inputmail.value);
    let guest = users.find(u => u.email == 'Guest@guestemail.com');
    if (user) {
        if (user == guest) {showPopupNotFound();} else {
            popup.classList.remove('d-none');
            activeUser = [];
            activeUser.push(user);
            save();
            setTimeout(() => popup.classList.add("d-none"), 3000);
            form.action = action;
        }
    } else {showPopupNotFound();}
    inputmail.value = '';
}

/**
 * Show the popup, wait for the changePw function to finish, then hide the popup and redirect the user.
 */
async function showPopUpChangedPw() {
    let popup = document.getElementById('popup');
    popup.classList.remove('d-none');
    await changePw();
    setTimeout(() => popup.classList.add("d-none"), 3000);
    setTimeout(() => window.location.href = "../index.html", 3000);
}

/**
 * When the user clicks the close button, the popup is hidden.
 */
function closePopupNotFound() {
    let popup = document.getElementById('popup-notfound');
    popup.classList.add('d-none');
}

/**
 * When the user clicks the button, remove the class 'd-none' from the element with the id
 * 'popup-notfound'.
 */
function showPopupNotFound() {
    let popup = document.getElementById('popup-notfound');
    popup.classList.remove('d-none');
}


/* This function is used to register a new account. */
async function registNewAccount() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let popup = document.getElementById('popup');
    let colors = ['pink', 'mintgreen', 'orange', 'lightblue', 'red', 'applegreen', 'magenta', 'brightblue'];
    let color = colors[Math.floor(Math.random() * colors.length)];

    let user = users.find(u => u.email == email);
    if (user) {
        showPopUpSignUpExist();
    } else {
        popup.classList.remove('d-none');
        let account = {
            id: users.length,
            userName: name,
            email: email,
            password: password,
            color: color,
            contacts: [],
            tasks: [],
            animationCounter: 0
        };
        users.push(account);
        await backend.setItem('users', JSON.stringify(users));
        setTimeout(() => popup.classList.add("d-none"), 3000);
        clearInput();
    }
}

/**
 * When the user clicks the button with the id of 'close-popup-signup-exist', the function will add the
 * class of 'd-none' to the element with the id of 'popup-signup'.
 */
function closePopupSignUpExist() {
    let popupexist = document.getElementById('popup-signup');
    popupexist.classList.add('d-none');
}

/**
 * When the user clicks the button, remove the class 'd-none' from the element with the id
 * 'popup-signup'.
 */
function showPopUpSignUpExist() {
    let popupexist = document.getElementById('popup-signup');
    popupexist.classList.remove('d-none');
}

/**
 * It takes the values of the input fields and sets them to an empty string, after them the Checkbox for Sign UP gets unchecked.
 */
function clearInput() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let check = document.getElementById('check-for-sign-up');
    name.value = '';
    email.value = '';
    password.value = '';
    check.checked = false;
}

/**
 * Thats the Login function for registred Users.
 * It checks if the user exists in the database, if not, it shows an error message, if it does, it
 * saves the user to the activeUser array and redirects to the summary page.
 */
async function login() {
    let email = document.getElementById('login-email');
    let password = document.getElementById('login-password');
    let user = users.find(u => u.email == email.value && u.password == password.value);
    let rememberlogin = {
        "email": email.value,
        "password": password.value
    }
    let checkbox = document.getElementById('remember-me');
    if(!user) {
        wrongPw();
        let wpw = document.getElementById('wpw');
        wpw.classList.remove('d-none');
        setTimeout(() => wpw.classList.add("d-none"), 4000);
    } else if(user) {
        activeUser = [];
        activeUser.push(user);
        checkForCheckbox(checkbox, rememberlogin);
        save();
        window.location.href = "../html/summary.html"
    }
}

/**
 * If the checkbox is checked, save the login info to the remember array, otherwise clear the remember
 * array.
 * @param checkbox - the checkbox element
 * @param rememberlogin - The value of the input field.
 */
function checkForCheckbox(checkbox, rememberlogin) {
    if (checkbox.checked) {
        remember = [];
        remember.push(rememberlogin);
        remembersave();
    } else {
        remember = [];
        rememberClear();
    }
}

/**
 * This function is only for Guests without registration.
 * If the user's email and password match the email and password of a user in the users array, then the
 * activeUser array is set to the user and the user is redirected to the summary page.
 */
async function guestLogin() {
    let email = document.getElementById('login-email');
    email.value = 'Guest@guestemail.com';
    let password = document.getElementById('login-password');
    password.value = 'guest1234';
    let user = users.find(u => u.email == email.value && u.password == password.value);
    if (user) {
        activeUser = [];
        activeUser.push(user);
        save();
        window.location.href = "../html/summary.html";
    }
}

/**
 * It takes the value of the first input and the second input, compares them, and if they are the same,
 * it changes the password of the active user to the value of the first input.
 * After them, it check the activeUser and the user in Backend,  compares them, and if they are the same,
 * it changes the password of the user in Backend to the value activeUser´s password.
 */
async function changePw() {
    let input1 = document.getElementById('first-password');
    let input2 = document.getElementById('second-password');
    let currentUser = activeUser[0].email;
    if (input1.value == input2.value) {
        activeUser[0].password = input1.value;
        save();
    } else {alert('Passwordinputs are not identic')}
    input1.value = '';
    input2.value = '';
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == currentUser) {users[i].password = activeUser[0].password;}
    }
    await backend.setItem('users', JSON.stringify(users))
    remove();
}

/**
 * If the checkbox is checked, then if the remember variable is empty, return false, otherwise, set the
 * email and password values to the email and password values in the remember variable.
 * 
 */
function rememberMe() {
    let checkbox = document.getElementById('remember-me');
    let email = document.getElementById('login-email');
    let password = document.getElementById('login-password');
    if (checkbox.checked) {
        if (remember == '') {
            return false;
        } else {
            email.value = remember[0].email;
            password.value = remember[0].password;
        }
    }
    changeIcon();
}

/**
 * It takes the variable remember, which is an array, and turns it into a string, then saves it to
 * local storage.
 */
function remembersave() {
    let rememberAsText = JSON.stringify(remember);
    localStorage.setItem('remember', rememberAsText);
}

/**
 * If there is a value in localStorage with the key 'remember', then parse it as JSON and assign it to
 * the variable 'remember'.
 */
function rememberload() {
    let rememberAsText = localStorage.getItem('remember');
    if (rememberAsText) { remember = JSON.parse(rememberAsText); }
}

/**
 * It removes the localStorage item called 'remember'.
 */
function rememberClear() {
    localStorage.removeItem('remember');
}

/**
 * If the input value is not empty, add the class 'd-none' to the lock icon and remove the class
 * 'd-none' from the unvisible icon and label.
 */
function changeIcon() {
    let input = document.getElementById('login-password');
    let lock = document.getElementById('lock');
    let labelUV = document.getElementById('label-unvisible');
    let unvisible = document.getElementById('unvisible');
    if(input.value != '') {
        lock.classList.add('d-none');
        unvisible.classList.remove('d-none');
        labelUV.classList.remove('d-none');
    } else {}
}

/**
 * This function makes the password = visible.
 * If the type of the element with the id "login-password" is "password", then change the type to
 * "text", otherwise change the type to "password".
 */
function showPw() {
    let typ = document.getElementById('login-password');
    if(typ.type == "password") {
            typ.type = "text"; 
    }else {
        typ.type = "password";
    }  
}

/**
 * It clears the password field and sets the placeholder to 'Ups! Try again'.
 * 
 */
function wrongPw() {
    let place = document.getElementById('login-password');
    let email = document.getElementById('login-email');
    place.value = '';
    email.value = '';
    place.placeholder = 'Ups! Try again';
}