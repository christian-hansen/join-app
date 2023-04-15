/**
 * If the login menu has the class 'd-none', remove it. Otherwise, add it
 */
function subMenu() {
    let menu = document.getElementById('logMenue');
    
    if (menu.classList.contains('d-none')) {
        menu.classList.remove('d-none');
    } else {
        menu.classList.add('d-none');
    }
}

/**
 * It changes the location of the window to the contacts.html page, and adds the class
 * 'navSelectedSidebar' to the element with the id 'linkContacts'
 */
function selectContacts() {
    window.location.href="../html/contacts.html";
    document.getElementById('linkContacts').classList.add('navSelectedSidebar');
    document.getElementById('imgContacts').src="../assets/img/contact-active.png";

    document.getElementById('linkDatenschutz').classList.remove('navSelectedSidebar');
    document.getElementById('linkImpressum').classList.remove('navSelectedSidebar');
    document.getElementById('linkTasks').classList.remove('navSelectedSidebar');
    document.getElementById('linkBoard').classList.remove('navSelectedSidebar');
    document.getElementById('linkSummary').classList.remove('navSelectedSidebar');

    document.getElementById('imgTasks').src="../assets/img/add-task.png";
    document.getElementById('imgBoard').src="../assets/img/board.png";
    document.getElementById('imgSummary').src="../assets/img/summary.png";
}

/**
 * It changes the location of the window to the summary.html page, and adds the class
 * 'navSelectedSidebar' to the element with the id 'linkSummary'
*/
function selectSummary() {
    window.location.href="../html/summary.html";
    document.getElementById('linkSummary').classList.add('navSelectedSidebar');
    document.getElementById('imgSummary').src="../assets/img/summary-active.png";

    document.getElementById('linkDatenschutz').classList.remove('navSelectedSidebar');
    document.getElementById('linkImpressum').classList.remove('navSelectedSidebar');
    document.getElementById('linkTasks').classList.remove('navSelectedSidebar');
    document.getElementById('linkBoard').classList.remove('navSelectedSidebar');
    document.getElementById('linkContacts').classList.remove('navSelectedSidebar');

    document.getElementById('imgTasks').src="../assets/img/add-task.png";
    document.getElementById('imgBoard').src="../assets/img/board.png";
    document.getElementById('imgContacts').src="../assets/img/contacts.png";
}


/**
 * It changes the location of the window to the board.html page, and it changes the class of the
 * linkBoard element to navSelectedSidebar
 */
function selectBoard() {
    window.location.href="../html/board.html";
    document.getElementById('linkBoard').classList.add('navSelectedSidebar');
    document.getElementById('imgBoard').src="../assets/img/board-active.png";

    document.getElementById('linkDatenschutz').classList.remove('navSelectedSidebar');
    document.getElementById('linkImpressum').classList.remove('navSelectedSidebar');
    document.getElementById('linkTasks').classList.remove('navSelectedSidebar');
    document.getElementById('linkSummary').classList.remove('navSelectedSidebar');
    document.getElementById('linkContacts').classList.remove('navSelectedSidebar');

    document.getElementById('imgTasks').src="../assets/img/add-task.png";
    document.getElementById('imgSummary').src="../assets/img/summary.png";
    document.getElementById('imgContacts').src="../assets/img/contacts.png";    
}

/**
 * It changes the URL to the addtask.html page, and changes the image and class of the selected sidebar
 * item
 */
function selectTasks() {
    window.location.href="../html/addtask.html";
    document.getElementById('linkTasks').classList.add('navSelectedSidebar');
    document.getElementById('imgTasks').src="../assets/img/add-task-active.png";

    document.getElementById('linkDatenschutz').classList.remove('navSelectedSidebar');
    document.getElementById('linkImpressum').classList.remove('navSelectedSidebar');
    document.getElementById('linkBoard').classList.remove('navSelectedSidebar');
    document.getElementById('linkSummary').classList.remove('navSelectedSidebar');
    document.getElementById('linkContacts').classList.remove('navSelectedSidebar');

    document.getElementById('imgBoard').src="../assets/img/add-task.png";
    document.getElementById('imgSummary').src="../assets/img/summary.png";
    document.getElementById('imgContacts').src="../assets/img/contacts.png";    
}

/**
 * It changes the location of the window to the legal notice page and adds the class
 * 'navSelectedSidebar' to the link 'linkImpressum'
 */
function selectLegalNotice() {
    window.location.href="../html/legal_notice.html";
    document.getElementById('linkImpressum').classList.add('navSelectedSidebar');

    document.getElementById('linkDatenschutz').classList.remove('navSelectedSidebar');
    document.getElementById('linkTasks').classList.remove('navSelectedSidebar');
    document.getElementById('linkBoard').classList.remove('navSelectedSidebar');
    document.getElementById('linkSummary').classList.remove('navSelectedSidebar');
    document.getElementById('linkContacts').classList.remove('navSelectedSidebar');

    document.getElementById('imgTasks').src="../assets/img/add-task.png";
    document.getElementById('imgBoard').src="../assets/img/add-task.png";
    document.getElementById('imgSummary').src="../assets/img/summary.png";
    document.getElementById('imgContacts').src="../assets/img/contacts.png";    
}


