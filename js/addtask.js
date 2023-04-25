//Variables needed only for short time periods
let currentTitle, currentDescription, currentDate, newCategoryColor, newCategoryName;
let currentPrio = 0;
let currentCategory = {};
let currentAssignees = [];
let currentSubTasks = [];
let currentStatus = 0;
let taskValidation = false;
let categoryCreationValidation = false;


/**
 * It downloads data from the server, parses it, initializes the form, loads the data, includes the HTML, and displays the create button in the header.
 */
async function initAddTask() {
  setPage('addTask');
  users = await loadItem('users');
  categories = await loadItem('categories');
  prios = await loadItem('prios');
  tasks = await loadItem('tasks');
  contacts = await loadItem('contacts');
  initForm();
  load();
  await includeHTML();
  displayCreateBtnHeader();
  addDropdownListener();
}

/**
 * It creates a task object, pushes it to the tasks array, and then saves the tasks array to local storage.
 */
async function createTask() {
  let task = {};
  task.id = tasks.length;
  task.title = currentTitle;
  task.description = currentDescription;
  task.prio = currentPrio;
  task.dueDate = currentDate;
  task.category = currentCategory.categoryID;
  task.assignee = currentAssignees;
  task.subtasks = currentSubTasks;
  task.status = currentStatus;
  tasks.push(task);
  await setItem('tasks', tasks);
  await setItem('users', users);
}


/**
 * If all of the input fields are valid, then the taskValidation variable is set to true. Otherwise, it's set to false.
 */
function validateTask() {
  if (
    validateInput(currentTitle) && validateInput(currentDescription) && validateInput(currentDate) && validateInput(currentPrio) && validateInput(currentCategory)) {
    taskValidation = true;
  } else {
    taskValidation = false;
  }
}


/**
 * It validates the form, if the form is valid it creates a task, displays a popup message, and then redirects to the board.
 */
async function getTask() {
  validateTask();

  if (taskValidation === true) {
    await createTask();
    displayPopupMsg("taskadded");
      if (selectedPage !== 'board') {
          setTimeout(goToBoard, 2000);}
      else {{
          setTimeout(closeTaskview, 2000);}
    }
  } else {
    validateTextField("Title");
    validateTextField("Description");
    validateDateField();
    validatePriosField();
    validateCategoryField();
  }
}


/**
 * The function resets the variables and the HTML form.
 */
function resetForm() {
  resetVariables();
  resetFormHTML();
}


/**
 * It resets all the variables that are used to create a new task.
 */
function resetVariables() {
  currentTitle = "";
  currentDescription = "";
  currentPrio = 0;
  selectPrioBtn(0);
  currentDate = undefined;
  currentCategory = {};
  currentAssignees = [];
  currentSubTasks = [];
}


/**
 * It resets the form to its default state.
 */
function resetFormHTML() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("date").value = "";
  resetFormValidation();
  renderTodayDueDate();
  renderSelectedDate();
  resetCurrentCategories();
  resetCurrentAssignees();
  resetCurrentSubtasks();
}


/**
 * It gets the value of the title input field and stores it in the variable currentTitle
 */
function getTitle() {
  currentTitle = document.getElementById("title").value;
}


/**
 * It gets the value of the description textarea and stores it in a variable.
 */
function getDescription() {
  currentDescription = document.getElementById("description").value;
}


/**
 * If the current priority is the same as the one clicked, reset the priority to 0, otherwise set the current priority to the one clicked.
 * @param i - the priority number
 */
function setPrio(i) {
  if (currentPrio === i) {
    currentPrio = 0;
    resetPrio(i);
  } else {
    currentPrio = i;
    selectPrioBtn(i);
  }
}


/**
 * It loops through all the buttons and adds the class "btn-selected" to the button that was clicked, and removes the class from all the other buttons.
 * @param i - the index of the button that was clicked
 */
function selectPrioBtn(i) {
  for (let j = 1; j <= prios.length; j++) {
    const button = document.getElementById("prioBtn" + j);
    if (i == j) {
      button.classList.add("btn-selected");
      replacePrioIcon("prioBtn" + j);
    } else {
      button.classList.remove("btn-selected");
      resetPrio(j);
    }
  }
}


/**
 * It removes the class "btn-selected" from the element with the id "prioBtn" + i and changes the src of the element with the id "prioBtn" + i + "Icon" to "../assets/img/prioBtn" + i + ".png"
 * @param i - the number of the button
 */
function resetPrio(i) {
  document.getElementById("prioBtn" + i).classList.remove("btn-selected");
  document.getElementById("prioBtn" + i + "Icon").src = `../assets/img/prioBtn${i}.png`;
}

/**
 * This function is to get the date from an input field with the ID "date".
 *
 */
function setDate() {
  let date = document.getElementById("date").value;
  currentDate = date;
  validateDateField();
  renderSelectedDate();
}

/**
 * If the currentDate variable is true, add the class "dateselected" to the element with the id "date". If the currentDate variable is false, remove the class "dateselected" from the element with the id "date".
 */
function renderSelectedDate() {
  if (currentDate) {
    document.getElementById("date").classList.add("dateselected");
  } else {
    document.getElementById("date").classList.remove("dateselected");
  }
}


/**
 * It sets the currentCategory object's categoryName and categoryColor properties to the values of the str and color parameters, respectively. It then sets the innerHTML of the categoryselection element to the return value of the categorySelectionHTML function, which is a string. It then adds an image element to the innerHTML of the categoryselection element.
 * @param str - the category name
 * @param color - the color of the category
 */
function setCategory(id) {
  currentCategory = categories[id];
  document.getElementById("categoryselection").innerHTML =
    categorySelectionHTML(currentCategory);
  document.getElementById("categoryselection").innerHTML += `<img class="arrow" src="../assets/img/dropdown.png">`;
  // closeDropdownList('categories-dropdown');
}


/**
 * This function adds or removes an assignee from a list and updates the UI accordingly.
 * @param id - The id parameter is a unique identifier for an assignee object. It is used to add or
 * remove the assignee from the currentAssignees array and to update the UI by checking or unchecking
 * the corresponding checkbox.
 */
function setAssignee(id) {
  if (getAssigneeIndex(id) === -1) {
    let setUser = id;
    currentAssignees.push(setUser);
    checkBox("assigneebox", id);
  } else {
    currentAssignees.splice(getAssigneeIndex(id), 1);
    uncheckBox("assigneebox", id);
  }
  renderCurrentAssigneesList();
}

/**
 * It takes the list of current assignees and unchecks the checkboxes that correspond to them.
 */
function resetCurrentAssignees() {
  document.getElementById("assigneesList").classList.add("d-none");
  closeDropdownList('assignees-dropdown');
  for (let i = 0; i < activeContactIDs.length; i++) {
    let id = activeContactIDs[i];
    uncheckBox("assigneebox", id);
  }
}



/**
 * The function returns the index of an assignee object in an array based on its ID.
 * @param id - The parameter "id" is a variable that represents the ID of an assignee object. The function "getAssigneeObjIndex" takes this ID as input and returns the index of the assignee object in the "currentAssignees" array.
 * @returns The function `getAssigneeObjIndex` is returning the index of the `id` parameter in the `currentAssignees` array.
 */
function getAssigneeIndex(id) {
  return currentAssignees.indexOf(id);
}


/**
 * If there are assignees, show the list and add the assignees to the list. If there are no assignees,
 * hide the list.
 */
function renderCurrentAssigneesList() {
  let assigneesList = document.getElementById("assigneesList");
  if (currentAssignees.length > 0) {
    assigneesList.classList.remove("d-none");
    assigneesList.innerHTML = "";
    for (let i = 0; i < currentAssignees.length; i++) {
      const contactID = getContactsObjIndex(currentAssignees[i]);
      if (contacts[contactID].isActive) {
      renderCurrentAssigneeDot(i);}
    }
  }
    else {
    assigneesList.classList.add("d-none");
  }
}


/**
 * The function renders a dot with the initials of a current assignee and their assigned color.
 * @param i - The index of the current assignee being rendered.
 */
function renderCurrentAssigneeDot(i) {
  const contactID = getContactsObjIndex(currentAssignees[i])
  const assigneeName = contacts[contactID].contactName;
  const assigneeInitials = getInitials(assigneeName);
  const assigneeColor = contacts[contactID].color;

  document.getElementById("assigneesList").innerHTML += `<div class="${assigneeColor}">${assigneeInitials}</div>`;
  document.getElementById('error-assignees').classList.add("d-none");
}

/**
 * The function returns the index of an object in an array of contacts based on its ID.
 * @param id - The parameter `id` is a unique identifier for a contact object. The function
 * `getContactsObjIndex` takes this `id` as input and returns the index of the contact object in the
 * `contacts` array that has the same `id`.
 * @returns The function `getContactsObjIndex` is returning the index of the object in the `contacts`
 * array that has the specified `id`.
 */
function getContactsObjIndex(id) {
  return contacts.map((contacts) => contacts.id).indexOf(id);
}


/**
 * If the new category is valid, add it to the categories array, save the array to local storage, close the new category input, and render the categories to the form.
 */
async function addCategory() {
  if (validateNewCategoryCreation()) {
    let newCategory = {};
    newCategory.categoryID = categories.length;
    newCategory.categoryName = newCategoryName;
    newCategory.categoryColor = newCategoryColor;
    newCategory.categoryIsActive = true;
    categories.push(newCategory);
    await setItem('categories', categories);;
    closeNewCategoryInput();
    setCategory(categories.length - 1);
    renderCategoriesToForm();
  }
}


/**
 * It takes the value of the input box, creates a new object, adds the value to the object, and pushes the object to the array.
 */
function addNewCurrentSubtask() {
  let input = document.getElementById("subtask-inputbox").value;
  if (input.length > 0) {
    let subtask = {};
    subtask.checked = false;
    subtask.description = input;
    currentSubTasks.push(subtask);
    closeSubtaskInput();
    renderSubTasksList();
  }
}


/**
 * It takes the index of the sub-task to be deleted, removes it from the array, and then re-renders the list of sub-tasks.
 * @param i - The index of the sub-task to delete.
 */
function deleteSubTask(i) {
  currentSubTasks.splice(i, 1);
  renderSubTasksList();
}


/**
 * It closes the subtask input, then renders the subtask list.
 */
function resetCurrentSubtasks() {
  closeSubtaskInput();
  renderSubTasksList();
}


/**
 * It takes the value of the input box, checks if it's empty, if it's not empty, it checks if the name is available, if it is available, it renders the new category, if it's not available, it shows an error message.
 */
function setNewCategoryName() {
  let input = document.getElementById("category-inputbox").value;

  if (input.length > 0) {
    newCategoryName = input;
    if (checkNewCategoryNameAvailability()) {
      renderNewCategory();
      openNewCategoryColorBtn();
    } else {
      newCategoryNameErrorMsg();
    }
  }
}


/**
 * When the user selects a new color, the newCategoryColor variable is updated with the new color, and
 * the renderNewCategory function is called.
 * @param input - the color that the user has selected
 */
function setNewCategoryColor(input) {
  newCategoryColor = input;
  renderNewCategory();
}


/**
 * It resets the newCategoryName and newCategoryColor variables to undefined.
 */
function resetNewCategory() {
  newCategoryName = undefined;
  newCategoryColor = undefined;
}


/**
 * When the user clicks the 'Add Category' button, the function will render the new category name and color in the preview box.
 */
function renderNewCategory() {
  let preview = document.getElementById("category-preview");
  preview.innerHTML = `<div>${newCategoryName}</div><div class="dot ${newCategoryColor}"></div>`;
}

/**
 * The function adds a click event listener to the "addTaskForm" element and closes the
 * "assignees-dropdown" and "categories-dropdown" dropdown lists.
 */
function addDropdownListener() {
  document.getElementById('addTaskForm').addEventListener("click", () => {
    closeDropdownList('assignees-dropdown');
    closeDropdownList('categories-dropdown');
    dropdownIsOpen = false;
  });
}