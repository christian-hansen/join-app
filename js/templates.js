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
 * It returns a string of HTML that contains two buttons, one that cancels the deletion of a task, and one that deletes the task.
 * @param i - the index of the task in the array
 * @returns A string of HTML.
 */
function renderContactDeleteBtns(i) {
    return `<div>Are you sure you want to delete this contact?</div>
    <div class="deletemsgbtns"><div onclick="cancelContactDeletion()">No</div><div class="alerthover" onclick="deleteContact(${i})">Yes</div></div>`
  }
