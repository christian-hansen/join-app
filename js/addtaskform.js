/**
 * This function renders the categories, contacts, subtasks, and today's date to the form.
 */
async function initForm() {
  renderCategoriesToForm();
  renderContactsToForm();
  renderSubTasksList();
  renderTodayDueDate();
}


/**
 * It takes the categories array and renders it to the form.
 */
function renderCategoriesToForm() {
  let categorySelect = document.getElementById("categorySelect");
  categorySelect.innerHTML = "";
  categorySelect.innerHTML += addNewCategoryHTML();

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];

    categorySelect.innerHTML += categoryListItemHTML(category);
  }
}


/**
 * For each contact in the contacts array, add a new option to the assigneeSelect element.
 */
function renderContactsToForm() {
  let assigneeSelect = document.getElementById("assigneeSelect");
  assigneeSelect.innerHTML = "";

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    assigneeSelect.innerHTML += assigneeListItemHTML(contact);
  }
}


/**
 * It takes the currentSubTasks array and loops through it, adding each subtask to the subtasks-list div. So the subtask list will be rendered to the form.
 */
function renderSubTasksList() {
  let subtasksList = document.getElementById("subtasks-list");
  subtasksList.innerHTML = "";

  for (let i = 0; i < currentSubTasks.length; i++) {
    const subtask = currentSubTasks[i];
    subtasksList.innerHTML += addNewSubTaskHTML(subtask, i);
  }
}


/**
 * When the user clicks the "Add New Category" button, the dropdown menu disappears and the input field appears.
 */
function openNewCategoryInput() {
  document.getElementById("categories-dropdown").classList.add("d-none");
  document.getElementById("category-input").classList.remove("d-none");
}


/**
 * It closes the input box for a new category, resets the input box, and resets the color picker.
 */
function closeNewCategoryInput() {
  document.getElementById("category-input").classList.add("d-none");
  document.getElementById("category-color-btn").classList.add("d-none");
  document.getElementById("category-color-select-desktop").classList.add("d-none");
  document.getElementById("category-color-selector").classList.add("d-none");
  document.getElementById("category-preview-box").classList.add("d-none");
  document.getElementById("categories-dropdown").classList.remove("d-none");
  document.getElementById("category-inputbox").value = "";
  document.getElementById("newcategoryerror").classList.add("d-none");
  resetNewCategory();
}


/**
 * When the user clicks the button, the button is hidden and the color selector is shown
 */
function openCategoryColorSelector() {
  document.getElementById("category-color-btn").classList.add("d-none");
  document.getElementById("category-color-selector").classList.remove("d-none");
}


/**
 * When the user clicks the button, the input box is hidden, the preview box is shown, the color button is shown, and the color select box is shown.
 */
function openNewCategoryColorBtn() {
  document.getElementById("category-input").classList.add("d-none");
  document.getElementById("category-preview-box").classList.remove("d-none");
  document.getElementById("category-color-btn").classList.remove("d-none");
  document.getElementById("category-color-select-desktop").classList.remove("d-none");
}


/**
 * When the user clicks on the "Add Subtask" button, the placeholder text disappears and the input box appears.
 */
function openSubtaskInput() {
  document.getElementById("subtask-placeholder").classList.add("d-none");
  document.getElementById("subtask-input").classList.remove("d-none");
  document.getElementById("subtask-inputbox").focus();
}


/**
 * It toggles the checkbox of the subtask at the given index.
 * @param i - the index of the subtask in the currentSubTasks array
 */
function toggleSubtaskCheckbox(i) {
  if (!currentSubTasks[i].checked) {
    checkBox("subtaskbox", i);
    currentSubTasks[i].checked = true;
  } else {
    uncheckBox("subtaskbox", i);
    currentSubTasks[i].checked = false;
  }
  renderSubTasksList();
}


/**
 * It adds the class "d-none" to the element with the id "subtask-input" and removes the class "d-none" from the element with the id "subtask-placeholder". It also resets the value in the input.
 */
function closeSubtaskInput() {
  document.getElementById("subtask-input").classList.add("d-none");
  document.getElementById("subtask-placeholder").classList.remove("d-none");
  document.getElementById("subtask-inputbox").value = "";
}

// Supporting functions

/**
 * If the user presses the Enter key, call the openFunctionName function. If the user presses the
 * Escape key, call the closeFunctionName function.
 * @param evt - the event object
 * @param openFunctionName - The name of the function that opens the input.
 * @param closeFunctionName - The name of the function that closes the input.
 */
function openCloseInput(evt, openFunctionName, closeFunctionName) {
  if (evt.code == "Enter") {
    openFunctionName();
  }
  if (evt.code == "Escape") {
    closeFunctionName();
  }
}


/**
 * Function to differ between checking the assignee checkboxes and the subtask checkboxes. If the id is assigneebox", then the checkicon is "../assets/img/checkbutton-active.png". If the id is "subtaskbox", then the checkicon is "../assets/img/checkbox-checked.png". Then, the src of the element with the id of id + i is set to checkicon.
 * @param id - the id of the image
 * @param i - the index of the element in the array
 */
function checkBox(id, i) {
  let checkicon;
  if (id == "assigneebox") {
    checkicon = "../assets/img/checkbutton-active.png";
  }
  if (id == "subtaskbox") {
    checkicon = "../assets/img/checkbox-checked.png";
  }
  document.getElementById(id + i).src = checkicon;
}


/**
 * When the user clicks on the checkbox, the image will change to the active image, and when the user
 * clicks on the image, the image will change to the inactive image.
 * @param id - the id of the checkbox
 * @param i - the index of the checkbox
 */
function uncheckBox(id, i) {
  document.getElementById(id + i).src = "../assets/img/checkbutton-inactive.png";
}


/**
 * If the dropdown is not visible, make it visible. If it is visible, make it not visible.
 * @param dropdownID - the ID of the dropdown list you want to open.
 */
function openDropdownList(dropdownID) {
  let dropdown = document.getElementById(dropdownID);
  if (!dropdown.classList.contains("visible")) {
    dropdown.classList.add("visible");
  }
  else {dropdown.classList.remove("visible");
}
}


/**
 * The function takes a string of first and last name, splits the string into an array of words, then reduces the array into a string of initials.
 * @param firstNameLastName - This is the full name of the user.
 * @returns The initials of the first and last name.
 */
function getInitials(firstNameLastName) {
  let initials = firstNameLastName.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), "");
  return initials.toUpperCase();
}


/**
 * It takes the current date, formats it to YYYY-MM-DD, and then sets the value of the date input field
 * to the formatted date.
 */
function renderTodayDueDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  currentDate = today;
  minDate = today;
  document.getElementById("date").value = currentDate;
  document.getElementById("date").setAttribute('min', today);
  renderSelectedDate();
}


/**
 * Renders the "Create" button to the header section depending on which page is shown and which screen width is used.
 */
function displayCreateBtnHeader() {
  if (window.location.pathname == "/html/board.html" && window.innerWidth < 768) {
    document.getElementById("create-btn-top").classList.remove("d-none");
  }
  if (window.location.pathname == "/html/addtask.html") {
  document.getElementById("create-btn-top").classList.remove("d-none");}
  if (window.location.pathname == "/html/contacts.html" && window.innerWidth < 767) {
    document.getElementById("create-btn-top").classList.remove("d-none");
  }
}


/**
 * Function to hide the create button in the header.
 */
function hideCreateBtnHeader() {
  document.getElementById("create-btn-top").classList.add("d-none");
}


/**
 * It takes an action as a parameter, and then displays a popup message based on the action.
 * @param action - the action that was performed
 */
function displayPopupMsg(action) {
  let popup = document.getElementById("popupMsg");
  popup.classList.remove("d-none");
  popup.innerHTML = "";

  if (action === "taskadded") {
    popup.innerHTML = renderTaskAddedMsg();
  }
  if (action === "taskupdated") {
    popup.innerHTML = renderTaskUpdatedMsg();
  }
  if (action === "taskdeleted") {
    popup.innerHTML = renderTaskDeletedMsg();
  }
  if (action === "subtaskdeleted") {
    popup.innerHTML = renderSubtaskDeletedMsg();
  }
}


/**
 * Function to hide the popup message.
 */
function hidePopupMsg() {
  document.getElementById("popupMsg").innerHTML = "";
  document.getElementById("popupMsg").classList.add("d-none");
}


/**
 * The function will redirect to the board.html page.
 */
function goToBoard() {
  window.location.href = "../html/board.html";
}

/**
 * It closes the taskview.
 */
function closeEditForm() {
  closeTaskview();
}