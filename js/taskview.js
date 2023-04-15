let selectedTask;

/**
 * It opens a modal window with a task in it
 * @param i - the index of the task in the tasks array
 */
function openTaskview(i) {
  selectedTask = i;
  deactivateScrolling();
  document.getElementById("modal").classList.remove("d-none");
  document.getElementById("taskview-window").className = "scroll modalview";
  if (i < tasks.length) {
    document.getElementById("taskview").classList.remove("d-none");
    renderTaskview(i);
  } else {
    renderTaskviewError();
  }
}


/**
 * It closes the taskview window and resets the form.
 */
function closeTaskview() {
  if (window.location.pathname != "/html/contacts.html"){
       activateScrolling();}
      else if (window.innerWidth < 767 && window.location.pathname == "/html/contacts.html" && window.innerHeight > 750) {
        document.documentElement.style.overflow = 'hidden';
        document.body.scroll = "no";  }
  document.getElementById("create-btn-top").classList.add("d-none");
  document.getElementById("modal").classList.add("d-none");
  document.getElementById("taskview").classList.add("d-none");
  document.getElementById("editformtop").classList.add("d-none");
  document.getElementById("editTaskForm").classList.add("d-none");
  document.getElementById("okbtncontainer").classList.add("d-none");
  document.getElementById("formbuttons").classList.add("d-none");
  if (window.location.pathname == "/html/board.html"){
       hideDeleteMsgContainer();}
  document.getElementById("taskview-window").className = "scroll";
  hidePopupMsg();
  resetForm();
  if (window.location.pathname == "/html/board.html") {
    renderTasksToBoard();
  }
}


/**
 * It renders the taskview with the given id.
 * @param id - the id of the task
 */
function renderTaskview(id) {
  renderCategory(id);
  renderTaskTitle(id);
  renderTaskDescription(id);
  renderDueDate(id);
  renderPrio(id);
  renderAssignees(id);
  renderSubTasksTaskview(id);
  renderEditBtnContainer(id);
}


/**
 * It takes the id of a task, finds the task in the tasks array, and then renders the category name and color of the task.
 * @param id - the id of the task
 */
function renderCategory(id) {
  let category = document.getElementById("taskcategory");
  category.innerHTML = tasks[id].category.categoryName;
  category.className = "";
  category.classList.add(tasks[id].category.categoryColor);
}


/**
 * It takes the id of a task and renders the title of that task to the page.
 * @param id - the id of the task
 */
function renderTaskTitle(id) {
  let title = tasks[id].title;
  document.getElementById("tasktitle").innerHTML = title;
}


/**
 * It takes the id of a task and renders the description of that task to the page.
 * @param id - the id of the task
 */
function renderTaskDescription(id) {
  let description = tasks[id].description;
  document.getElementById("taskdescription").innerHTML = description;
}


/**
 * It takes the id of a task, finds the due date of that task, formats the date, and then renders the formatted date to the page.
 * @param id - the id of the task
 */
function renderDueDate(id) {
  let date = tasks[id].dueDate;
  date = formatDate(date);
  document.getElementById("dueDate").innerHTML = date;
}


/**
 * This function is used to change a date you get from an input field with the type "date" in the format ("yyyy-mm-dd") to this format ("dd.mm.yyyy")
 *
 * @param {string} date - This is the date in the format yyyy-mm-dd
 * @returns {string} - This is the date in the format dd-mm-yyyy
 */
function formatDate(date) {
  let splitDate = date.split("-");
  return `${splitDate[2]}.${splitDate[1]}.${splitDate[0]}`;
}


/**
 * It takes the id of a task, gets the priority of that task, gets the text for that priority, sets the class of the priority button to the priority class, and then sets the innerHTML of the priority button to the HTML for the priority button.
 * @param id - the id of the task
 */
function renderPrio(id) {
  let prio = tasks[id].prio;
  let priorityBtn = document.getElementById("priority");
  let prioText = getPrioText(prio);
  priorityBtn.className = "";
  priorityBtn.classList.add("prio" + prio);
  priorityBtn.innerHTML = prioTaskviewHTML(prioText, prio);
}


/**
 * It takes the id of a task, gets the assignees of that task, and then renders the assignees in the task view.
 * @param id - the id of the task
 */
function renderAssignees(id) {
  let assignees = tasks[id].assignee;
  let list = document.getElementById("assignee-list");
  list.innerHTML = "";

  for (let j = 0; j < assignees.length; j++) {
    const assignee = assignees[j].userName;
    const assigneeInitials = getInitials(assignee);
    const color = assignees[j].color;
    list.innerHTML += assigneeTaskviewHTML(assignee, assigneeInitials, color);
  }
}


/**
 * It takes the id of a task, finds the subtasks of that task, and then renders them.
 * @param id - the id of the task
 */
function renderSubTasksTaskview(id) {
  currentSubTasks = tasks[id].subtasks;
  let subtasksList = document.getElementById("subtasksview-list");
  subtasksList.innerHTML = "";

  for (let i = 0; i < currentSubTasks.length; i++) {
    const subtask = currentSubTasks[i];
    subtasksList.innerHTML += subTaskListTaskViewHTML(subtask, i, id);
  }
}


/**
 * If the value of the variable prio is as specific number it returns the relevant string.
 * @param prio - The priority of the task.
 * @returns the text of the priority.
 */
function getPrioText(prio) {
  if (prio == 1) {return "Urgent";}
  if (prio == 2) {return "Medium";}
  if (prio == 3) {return "Low";}
}


/**
 * It renders the edit form elements, renders the categories and contacts to the form, sets the current task for the edit form, displays the current task in the edit form, renders the current assignees list, renders the sub tasks list, and renders the ok button container.
 */
function openEditForm() {
  let task = tasks[selectedTask];
  renderEditFormElements();
  renderCategoriesToForm();
  renderContactsToForm();
  setCurrentTaskForEditForm(task);
  displayCurrentTaskInEditForm();
  renderMinDueDateToEdit();
  renderCurrentAssigneesList();
  renderSubTasksList();
  renderOkBtnContainer(selectedTask);
}


/**
 * It opens a modal form that includes the AddTask form..
 */
function openAddTaskForm() {
  if (window.location.pathname != "/html/contacts.html") {
  deactivateScrolling();}
    else if (window.location.pathname == "/html/contacts.html" && window.innerHeight > 750 && window.innerWidth < 767) {
      document.documentElement.style.overflow = 'scroll';
      document.body.scroll = "yes";
    }
  document.getElementById("modal").classList.remove("d-none");
  document.getElementById("formbuttons").classList.remove("d-none");
  displayCreateBtnHeader();
  renderEditFormElements();
  document.getElementById("formtophead").innerHTML = "Add Task";
  renderTodayDueDate();
  renderCategoriesToForm();
  renderContactsToForm();
}


/**
 * When the user clicks the edit button, the edit form is displayed and the task view is hidden.
 */
function renderEditFormElements() {
  document.getElementById("formtophead").innerHTML = "Edit Task";
  document.getElementById("taskview").classList.add("d-none");
  document.getElementById("taskview-window").className = "scroll modaledit";
  document.getElementById("editformtop").classList.remove("d-none");
  document.getElementById("editTaskForm").classList.remove("d-none");
}


/**
 * It sets the current task for the edit form.
 * @param task - {
 */
function setCurrentTaskForEditForm(task) {
  currentTitle = task.title;
  currentDescription = task.description;
  currentDate = task.dueDate;
  currentPrio = task.prio;
  currentCategory = task.category;
  currentAssignees = task.assignee;
  currentSubTasks = task.subtasks;
  currentStatus = task.status;
}


/**
 * It takes the current task's data and displays it in the edit form.
 */
function displayCurrentTaskInEditForm() {
  document.getElementById("title").value = currentTitle;
  document.getElementById("description").value = currentDescription;
  document.getElementById("date").value = currentDate;
  renderSelectedDate();
  selectPrioBtn(currentPrio);
  setCategory(currentCategory.categoryName, currentCategory.categoryColor);
  for (let i = 0; i < currentAssignees.length; i++) {
    checkBox("assigneebox", currentAssignees[i].id);
  }
}


/**
 * It validates the task, if it's valid it edits the task, if it's not valid it displays error messages.
 * @param i - the index of the task in the array
 */
async function updateTask(i) {
  validateTask();
  if (taskValidation === true) {
    await editTask(i);
  } else {
    validateTextField("Title");
    validateTextField("Description");
    validateDateField();
    validatePriosField();
    validateCategoryField();
  }
}


/**
 * It takes the current values of the task and saves them to the task object, which is then pushed to the backend. After that a "task updated" message is displayed. The modal gets closed and the board updated.
 * @param i - the index of the task in the array
 */
async function editTask(i) {
  let task = {};
  task.id = i;
  task.title = currentTitle;
  task.description = currentDescription;
  task.prio = currentPrio;
  task.dueDate = currentDate;
  task.category = currentCategory;
  task.assignee = currentAssignees;
  task.subtasks = currentSubTasks;
  task.status = currentStatus;
  tasks[i] = task;

  await backend.setItem("tasks", JSON.stringify(tasks));
  await backend.setItem("users", JSON.stringify(users));
  displayPopupMsg("taskupdated");
  setTimeout(closeTaskview, 2000);
  renderTasksToBoard();
}


/**
 * It returns the index of the user in the currentAssignees array
 * @param userID - The ID of the user you want to check for.
 * @returns The index of the userID in the currentAssignees array.
 */
function getIndexOfUserInCurrentAssignees(userID) {
  return currentAssignees.map((assigneelist) => assigneelist.id).indexOf(userID);
}

/**
 * It takes the index of the current item in the array and renders the HTML for the edit button container.
 * @param i - the index of the item in the array
 */
function renderEditBtnContainer(i) {
  let btncontainer = document.getElementById("editbtncontainer");
  btncontainer.innerHTML = editBtnContainerHTML(i);
}


/**
 * It unhides the "okbtncontainer" and then sets the innerHTML of that element to the return value of the function okBtnContainerHTML(i).
 * @param i - the index of the question
 */
function renderOkBtnContainer(i) {
  let btncontainer = document.getElementById("okbtncontainer");
  btncontainer.classList.remove("d-none");
  btncontainer.innerHTML = okBtnContainerHTML(i);
}


/**
 * It clears the HTML of the four columns of the board.
 */
function clearBoardColumns() {
  document.getElementById("todo").innerHTML = "";
  document.getElementById("inprogress").innerHTML = "";
  document.getElementById("awaitingfeedback").innerHTML = "";
  document.getElementById("done").innerHTML = "";
}


/**
 * Deactivates scrolling' depending on the path and the window size.
 */
function deactivateScrolling() {
  window.scrollTo({ top: 0, behavior: "auto" });
  if (window.innerWidth >= 767) {
    document.documentElement.style.overflow = "hidden";
    document.body.scroll = "no";
  }
  if (
    window.innerWidth < 767 && window.location.pathname == "/html/board.html"
  ) {
    document.getElementById("board").classList.add("d-none");
  }
  if (
    window.innerWidth < 767 && window.location.pathname == "/html/contacts.html"
  ) {
    document.documentElement.style.overflow = "scroll";
    document.body.scroll = "yes";
  }
}


/**
 * It activates scrolling on the page.
 */
function activateScrolling() {
  document.documentElement.style.overflow = "scroll";
  document.body.scroll = "yes";
  if (window.location.pathname == "/html/board.html") {
    document.getElementById("board").classList.remove("d-none");
    document.documentElement.style.overflow = "scroll";
    document.body.scroll = "yes";
  }
  if (window.location.pathname == "/html/contacts.html") {
    document.documentElement.style.overflow = "scroll";
    document.body.scroll = "yes";
  }
}

/**
 * It takes the current date, formats it to YYYY-MM-DD, and then sets the value of the date input field
 * to the formatted date.
 */
function renderMinDueDateToEdit() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  minDate = today;
  document.getElementById("date").setAttribute('min', today);
}