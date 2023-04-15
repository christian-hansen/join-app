/**
 * The function alphabetLettersTemp() takes in a parameter called alphabetLetter and returns a string
 * of HTML code that contains the alphabet letter
 * @param alphabetLetter - This is the letter that will be displayed in the div.
 * @returns the html code for the alphabet letters.
 */
function alphabetLettersTemp(alphabetLetter) {
    return /*html*/ `
    <div id="letter" class="singleLetter">
    <div>
    <div id="sortLetter" class="firstLetter">${alphabetLetter}</div>
    </div>
    </div>
    `;
}


/**
 * It returns a string of HTML code that contains a div element with an id, a class, and an onclick
 * event it is used to generate a contact in the contact list 
 * @param i - the index of the contact in the array
 * @param singleContact - This is the object that contains all the information about the contact.
 * @param acronym - The first letter of the contact's name.
 * @returns A string of HTML code.
 */
function contactListBox(i, singleContact, acronym) {
    return /*html*/ `
        <div id="contactName${i}" class="contactNames" onclick="contactShowDetails(${i}); markSelectedContact(${i});">
            <div class="circleLayout ${singleContact['color']}">
                <div id="circleName${i}" class="circleName">${acronym}</div>
            </div>
            <div>
                <div id="nameList${i}" class="nameLayout">${singleContact['contactName']}</div>
                <div class="contactMail">
                    <a id="emailList${i}">${singleContact['email']}</a>
                </div>
            </div>
        </div>          
    `;
}


/**
 * It returns a string of HTML code that is used to display the contact details
 * @param i - the index of the contact in the array
 * @param singleContact - This is the contact object that is being passed in.
 * @param acronym - The first letter of the contact's first name and the first letter of the contact's
 * last name.
 * @returns A string of HTML code.
 */
function contactDetailsBox(i, singleContact, acronym) {
    return /*html*/ `
        <div id="animation" class="contactNamesDetails" width="100px" height="100px">
            <div class="circleLayoutDetails ${singleContact['color']}">
                <div id="circleNameDetails${i}" class="circleNameDetails">${acronym}</div>
            </div>
            <div>
                <div id="nameListDetails${i}" class="nameLayoutDetails">${singleContact['contactName']}</div>
                <div class="addTaskContacts klickable" onclick="openAddTaskForm()">
                    <img src="../assets/img/plus-blue.png">
                    <span class="addTaskLayout">Add Task</span>
                </div>
            </div>
        </div>
        <div class="contactInfo">
            <div class="contactInfoHeader">Contact Information</div>
            <div class="editContacts klickable" onclick="openEditContact(${i})">
                <img class="widthPen" src="../assets/img/pen-black.png">
                <span class="editContactLayout">Edit Contact</span>
            </div>
            <form class="deleteDesktop klickable" onclick="deleteContact(${i}); return false;">
                <button class="trashIconButton" type="submit">
                        <img class="trashIcon" src="../assets/img/trash-icon.png">
                </button>
            </form>
        </div>
        <div class="fontContactDetails">Email</div>
        <div class="spaceBottom contactMailDetails">
            <a id="emailContactDetails${i}" href="mailto:${singleContact['email']}">${singleContact['email']}</a>
        </div>
        <div class="fontContactDetails">Phone</div>
        <div class="contactMailDetails">
            <a id="mobileContactDetails${i}" href="tel:${singleContact['phone']}">${singleContact['phone']}</a>
        </div>
        <div class="buttonsMobile">
            <form class="deleteContactMobile klickable" onclick="deleteContact(${i}); return false;">
                    <button class="trashButtonMobile" type="submit">
                            <img class="trashIcon" src="../assets/img/trash-icon-white.png">
                    </button>
            </form class="contactForm">
            <div class="editButtonMobile klickable" onclick="openEditContact(${i})">
                <img class="editButtonSize" src="../assets/img/edit.png">
            </div> 
        </div>                      
    `;
}


/**
 * It creates a modal for editing selected contact data.
 * @param i - The index of the contact in the array.
 * @param singleContact - This is the contact object that is being edited.
 * @param acronym - The first letter of the contact's name.
 * @returns A string of HTML code.
 */
function modalEditContact(i, singleContact, acronym) {
    return /*html*/ `
    <div id="dialogContact" class="dialog-bg" onclick="closeModal()">
        <div id="modalContainerEdit" class="editContainer" onclick="doNotClose(event)">
            <div class="editHeaderContainer">
                <div class="closeButton klickable" onclick="closeModal()">
                    <img src="../assets/img/close-white.png">
                </div>
                <div class="logoJoinContact">
                    <img class="logoJoinContactSize" src="../assets/img/Logo/Join-logo-white.png">
                </div>
                <h1 class="contacts">Edit Contact</h1>
                <div class="borderBlueEdit"></div>
            </div>
            <div class="imgContact">
                <div class="circlePerson circleLayoutDetails ${singleContact['color']}">
                    <div id="circleNameDetails${i}" class="circleNameDetails">${acronym}</div>
                </div>
            </div>
            <div class="editFormContainer">
                <div class="closeButtonDesktop klickable" onclick="closeModal()">
                    <img src="../assets/img/close-black.png">
                </div>
                <form class="contactForm" onsubmit="editContact(${i}); return false;">
                    <input required id="editNameInput${i}" class="contactForms editFormName" type="text" minlength="5" value="${singleContact['contactName']}">
                    <input required id="editMailInput${i}" class="contactForms editFormMail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" value="${singleContact['email']}">
                    <input required id="editPhoneInput${i}" class="contactForms editFormPhone" type="tel" minlength="8" value="${singleContact['phone']}">
                    <div class="buttonArrange">
                        <button id="save" type="submit" class="editButtonSave">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `;
}


/**
 * It returns a string of HTML code that is used to create a modal window for new contacts.
 * @returns A string of HTML code.
 */
function modalNewContact() {
    return /*html*/ `
    <div id="dialogContact" class="dialog-bg" onclick="closeModal()">
        <div id="modalContainerNew" class="editContainer" onclick="doNotClose(event)">
            <div class="editHeaderContainer">
                <div class="closeButton klickable" onclick="closeModal()">
                    <img src="../assets/img/close-white.png">
                </div>
                <div class="logoJoinContact">
                    <img class="logoJoinContactSize" src="../assets/img/Logo/Join-logo-white.png">
                </div>
                <h1 class="contacts">Add Contact</h1>
                <div class="subeadNewContact">Tasks are better with a team!</div>
                <div class="borderBlueEdit"></div>
            </div>
            <div class="imgContact">
                <div class="circlePerson circleLayoutDetails blackgray">
                    <img class="personSize" src="../assets/img/default-person.png">
                </div>
            </div>
            <div class="editFormContainer">
                <div class="closeButtonDesktop klickable" onclick="closeModal()">
                    <img src="../assets/img/close-black.png">
                </div>
                <form class="contactForm" onsubmit="newContact(); return false;">
                    <input required onkeydown="handleKeqUpName(event)" id="newContactName" class="contactForms editFormName" type="text" minlength="5" placeholder="Name" autofocus>
                    <input required onkeydown="handleKeqUpMail(event)" id="newMail" class="contactForms editFormMail" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" placeholder="Email">
                    <input required onkeydown="handleKeqUpPhone(event)" id="newPhone" class="contactForms editFormPhone" type="tel" minlength="8" placeholder="Phone">
                    <div class="buttonArrange">
                        <button class="editButtonCancel" onclick="closeModal()">Cancel</button>
                        <button id="create" onkeydown="handleKeqUpCreate(event)" type="submit" class="editButtonCreate">Create Contact</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `;
}

/**
 * It returns a string of HTML code that is used to display a success message to the user
 * @returns A string of HTML code.
 */
function showSuccessBlock() {
    return /*html*/ `
     <div id="dialogContact" class="dialog-bg" onclick="closeModal()">
        <div id="sucessInfo" class="sucessInfoContainer">
            <div class="successInfoText">
                <span>Contact sucessfully created</span>
            </div>
        </div>
    </div>
    `;
}
