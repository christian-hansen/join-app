/* Declaring variables. */
let contacts = [];
let alphabet = [];
let colors = ['orange', 'red', 'applegreen', 'magenta', 'lightblue', 'mintgreen', 'pink', 'brightblue'];


/** 
 * This function sort the array by the way with case-sensitive comparison 
 * If a is less than b, return -1. If a is greater than b, return 1. Otherwise, return 0.
 * @param a - The first string to compare.
 * @param b - The second string to compare.
 * @returns -1, 0, or 1
 */
function compareStrings(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return (a < b) ? -1 : (a > b) ? 1 : 0;
}


/**
 * It downloads the data from the server, parses it, and then renders the contact list.
 * @returns the result of the function compareStrings.
 */
async function renderContacts() {
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('contacts')) || [];
    categories = JSON.parse(backend.getItem('categories')) || [];
    prios = JSON.parse(backend.getItem('prios')) || [];
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    load();
    includeHTML();
    contacts.sort(function (a, b) {
        return compareStrings(a.contactName, b.contactName);
    })
    renderContactList();
}


/**
 * We're looping through the contacts array, and for each contact, we're getting the first letter of
 * the contact's name, and if that letter isn't already in the alphabet array, we're adding it to the
 * alphabet array
 */
function renderContactList() {
    alphabet.length = 0;
    saveContactData();
    let contactListItem = document.getElementById('listContacts');
    contactListItem.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        let singleContact = contacts[i];
        let firstLetter = singleContact['contactName'].charAt(0).toUpperCase();

        if (!alphabet.includes(firstLetter)) {
            alphabet.push(firstLetter);
        }
    }
    renderContactListItems(contactListItem);
}


/**
 * For each letter in the alphabet, add a letter to the contact list, then for each contact in the
 * contacts array, if the first letter of the contact's name matches the current letter in the
 * alphabet, add the contact to the contact list
 * @param contactListItem - the element that will contain the list of contacts
 */
function renderContactListItems(contactListItem) {
    for (let h = 0; h < alphabet.length; h++) {
        let alphabetLetter = alphabet[h];
        contactListItem.innerHTML += alphabetLettersTemp(alphabetLetter);

        for (let i = 0; i < contacts.length; i++) {
            let singleContact = contacts[i];
            let firstLetters = singleContact['contactName'];
            let firstLetter = firstLetters[0].toUpperCase();
            let letters = firstLetters.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '');
            let acronym = letters.toUpperCase();

            if (firstLetter === alphabetLetter) {
                contactListItem.innerHTML += contactListBox(i, singleContact, acronym);
            }
        }
    }
}


/**
 * It takes the index of the contact in the array, and then uses that index to get the contact object
 * from the array. It then splits the contact name into an array of words, and then uses the reduce
 * method to get the first letter of each word, and then joins them together into a string. It then
 * converts that string to uppercase, and then uses that string to create the HTML for the contact
 * details box
 * @param i - the index of the contact in the contacts array
 */
function renderContactDetails(i) {
    let singleContact = contacts[i];
    let firstLetters = singleContact['contactName'];
    let letters = firstLetters.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '');
    let acronym = letters.toUpperCase();
    let contactInfoBox = document.getElementById('singleData');
    contactInfoBox.innerHTML = '';
    contactInfoBox.innerHTML += contactDetailsBox(i, singleContact, acronym);
}


/**
 * It takes a single contact object, adds it to the contacts array, saves the contacts array to local
 * storage, closes the modal, renders the contacts, and shows a success message
 * @param singleContact - the contact object that was created in the newContact function
 */
async function newContactRender(singleContact) {
    contacts.push(singleContact);
    await backend.setItem('contacts', JSON.stringify(contacts));
    closeModal();
    renderContacts();
    showSuccess();
} 



/**
 * It takes the values from the input fields, creates a new object with those values, and then calls
 * the function newContactRender() with the new object as an argument
 */
function newContact() {
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    let fullName = document.getElementById('newContactName');
    let mail = document.getElementById('newMail');
    let mobile = document.getElementById('newPhone');
    let singleContact = {
        'id': contacts.length,
        'contactName': fullName.value,
        'email': mail.value,
        'phone': mobile.value,
        'tasks': [],
        'color': `${randomColor}`
    };
    newContactRender(singleContact);
}


/**
 * It takes the index of the contact to be edited, gets the contact from the contacts array, gets the
 * values from the input fields, updates the contact with the new values, saves the contacts array to
 * the backend, closes the modal and renders the contacts
 * @param i - The index of the contact in the contacts array.
 */
async function editContact(i) {
    let singleContact = contacts[i];
    let fullName = document.getElementById(`editNameInput${i}`);
    let mail = document.getElementById(`editMailInput${i}`);
    let mobile = document.getElementById(`editPhoneInput${i}`);

    singleContact['contactName'] = fullName.value;
    singleContact['email'] = mail.value;
    singleContact['phone'] = mobile.value;

    await backend.setItem('contacts', JSON.stringify(contacts));
    closeModal();
    renderContacts();
    renderContactDetails(i);
}


/**
 * It deletes a contact from the contacts array, clears the singleData div, and then re-renders the
 * contact list
 * @param i - The index of the contact to delete.
 */
async function deleteContact(i) {
    contacts.splice(i, 1);
    document.getElementById('singleData').innerHTML = '';
    renderContactList();
}


/**
 * It saves the contacts array to the browser's local storage
 */
async function saveContactData() {
    await backend.setItem('contacts', JSON.stringify(contacts));
}


/**
 * It removes the class 'd-none' from the element with the id 'listAllContacts' and removes the class
 * 'block' from the element with the id 'descriptionContainer'
 */
function backToList() {
    document.getElementById('listAllContacts').classList.remove('d-none');
    document.getElementById('descriptionContainer').classList.remove('block');
    document.documentElement.style.overflow = "hidden";
}


/**
 * It removes the class 'contactSelected' from all contacts, then adds it to the contact with the index i
 * @param i - the index of the contact in the contacts array
 */
function markSelectedContact(i) {
    for (let j = 0; j < contacts.length; j++) {
        document.getElementById(`contactName${j}`).classList.remove('contactSelected');
    }
    document.getElementById(`contactName${i}`).classList.add('contactSelected');
}


/**
 * It renders the contact details of the selected contact and marks it as selected
 * @param i - the index of the contact in the array
 */
function contactShowDetails(i) {
    showScroll();
    if (window.innerWidth < 768) {
        document.getElementById('listAllContacts').classList.add('d-none');
        document.getElementById('descriptionContainer').classList.add('block');
        document.getElementById('singleData').classList.add('block');
        renderContactDetails(i);
        markSelectedContact(i);
    } else {
        document.getElementById('singleData').classList.add('block');
        renderContactDetails(i);
        markSelectedContact(i);
    }
}


/**
 * It takes the index of the contact in the contacts array, and then uses that index to get the contact
 * object from the array. It then takes the contact name and splits it into an array of words, and then
 * uses the reduce method to create an acronym of the contact's name. It then removes the class of
 * d-none from the dialog div, and then sets the innerHTML of the dialog div to the modalEditContact
 * function, which is passed the index of the contact, the contact object, and the acronym. It then
 * focuses on the input field.
 * @param i - the index of the contact in the contacts array
 */
function openEditContact(i) {
    let singleContact = contacts[i];
    let firstLetters = singleContact['contactName'];
    let acronym = firstLetters.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '');
    document.getElementById('dialog').classList.remove('d-none');
    document.getElementById('dialog').innerHTML = '';
    document.getElementById('dialog').innerHTML += modalEditContact(i, singleContact, acronym);
    document.getElementById(`editNameInput${i}`).focus();
}


function openNewContact() { // TODO: Animation hinzufügen
    document.getElementById('dialog').classList.remove('d-none');
    document.getElementById('dialog').innerHTML = '';
    document.getElementById('dialog').innerHTML += modalNewContact();
    /*  document.getElementById('newContactName').focus(); */
    focusInput();
}


/**
 * When the page loads, focus the cursor in the text box.
 */
function focusInput() {
    document.getElementById('newContactName').focus();
}


/**
 * `showSuccess()` is a function that removes the `d-none` class from the `dialog` element, clears the
 * `dialog` element's innerHTML, and then adds the `showSuccessBlock()` function's return value to the
 * `dialog` element's innerHTML
 */
function showSuccess() {
    document.getElementById('dialog').classList.remove('d-none');
    document.getElementById('dialog').innerHTML = '';
    document.getElementById('dialog').innerHTML += showSuccessBlock();
}


/**
 * If the user presses the enter key while in the name field, the focus is moved to the email field.
 * @param event - The event object is automatically passed to the function by the browser.
 * @returns false.
 */
function handleKeqUpName(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById('newMail').focus();
        return false;
    }
}

/**
 * If the user presses the enter key, prevent the default action of the enter key, and focus on the
 * next input field.
 * @param event - The event object is a JavaScript object that contains information about the event
 * that occurred.
 * @returns false.
 */
function handleKeqUpMail(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById('newPhone').focus();
        return false;
    }
}

/**
 * If the user presses the enter key, then prevent the default action of the enter key, and focus on
 * the create button.
 * @param event - The event object is a JavaScript object that contains useful information about the
 * event, such as the element that the event occurred on, the x and y coordinates of the event, and
 * more.
 * @returns false.
 */
function handleKeqUpPhone(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById('create').focus();
        return false;
    }
}

/**
 * If the user presses the enter key, don't do anything
 * @param event - The event object.
 * @returns false.
 */
function handleKeqUpCreate(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        return false;
    }
}


/**
 * When the user clicks the close button, add the class 'd-none' to the dialog element.
 */
function closeModal() {
    document.getElementById('dialog').classList.add('d-none');
}


/**
 * If the window height is less than 750px, then show the scrollbar. Otherwise, hide it
 */
function showScroll() {
    if (window.innerHeight < 750) {
        document.documentElement.style.overflow = 'scroll';
        document.body.scroll = "yes";
    } else {
        document.documentElement.style.overflow = 'hidden';
        document.body.scroll = "no";
    }
}


/**
 * "If the user clicks on the dropdown menu, don't close the menu."
 * 
 * The event.stopPropagation() method stops the event from bubbling up the DOM tree, preventing any
 * parent handlers from being notified of the event
 * @param event - The event object.
 */
function doNotClose(event) {
    event.stopPropagation();
}