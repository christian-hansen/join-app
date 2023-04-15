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
  await downloadFromServer();
  users = JSON.parse(backend.getItem("users")) || [];
  categories = JSON.parse(backend.getItem("categories")) || [];
  prios = JSON.parse(backend.getItem("prios")) || [];
  tasks = JSON.parse(backend.getItem("tasks")) || [];
  contacts = JSON.parse(backend.getItem("contacts")) || [];
  initForm();
  load();
  await includeHTML();
  displayCreateBtnHeader();
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
  task.category = currentCategory;
  task.assignee = currentAssignees;
  task.subtasks = currentSubTasks;
  task.status = currentStatus;
  tasks.push(task);
  await backend.setItem("tasks", JSON.stringify(tasks));
  await backend.setItem("users", JSON.stringify(users));
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
    setTimeout(goToBoard, 2000);
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
function setCategory(str, color) {
  currentCategory.categoryName = str;
  currentCategory.categoryColor = color;
  document.getElementById("categoryselection").innerHTML =
    categorySelectionHTML(currentCategory.categoryName,currentCategory.categoryColor);
  document.getElementById("categoryselection").innerHTML += `<img class="arrow" src="../assets/img/dropdown.png">`;
}


/**
 * Function to update the currentAssignee array. If the username is not already part of the array the username is added. If the username is already in the array the username gets removed.
 *
 * @param {*} user - Name of the user taken from the "Assigned to" selection
 */
function setAssignee(user, color, id) {
  if (getAssigneeObjIndex(user) === -1) {
    let setUser = {};
    setUser.userName = user;
    setUser.color = color;
    setUser.id = id;
    currentAssignees.push(setUser);
    checkBox("assigneebox", id);
  } else {
    currentAssignees.splice(getAssigneeObjIndex(user), 1);
    uncheckBox("assigneebox", id);
  }
  renderCurrentAssigneesList();
}


/**
 * It takes the list of current assignees and unchecks the checkboxes that correspond to them.
 */
function resetCurrentAssignees() {
  document.getElementById("assigneesList").classList.add("d-none");
  for (let i = 0; i < currentAssignees.length; i++) {
    uncheckBox("assigneebox", i);
  }
}


/**
 * Function to check if the selected user in the "Assigned to" selection was already added to the currentAssignee array before. The sub-function maps the assigneelist that should be searched with the assigneelist element "name" and compares it with the input. If it matches the index number is returned, otherwise -1 is returned. *
 * @param {string} user - Name of the user taken from the "Assigned to" selection
 * @returns - index of the selected user in the currentAssignee array
 */
function getAssigneeObjIndex(user) {
  return currentAssignees.map((assigneelist) => assigneelist.userName).indexOf(user);
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
      const assignee = currentAssignees[i].userName;
      const assigneeInitials = getInitials(assignee);
      const assigneeColor = currentAssignees[i].color;

      document.getElementById("assigneesList").innerHTML += `<div class="${assigneeColor}">${assigneeInitials}</div>`;
      document.getElementById('error-assignees').classList.add("d-none");
    }
  } else {
    assigneesList.classList.add("d-none");
    
  }
}


/**
 * If the new category is valid, add it to the categories array, save the array to local storage, close the new category input, and render the categories to the form.
 */
async function addCategory() {
  if (validateNewCategoryCreation()) {
    let newCategory = {};
    newCategory.categoryName = newCategoryName;
    newCategory.categoryColor = newCategoryColor;
    categories.push(newCategory);
    await backend.setItem("categories", JSON.stringify(categories));
    closeNewCategoryInput();
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