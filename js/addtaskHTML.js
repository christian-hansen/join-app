/**
 * It takes a category object and returns a string of HTML that represents a category list item
 * @param category - the category object
 * @returns A string of HTML.
 */
function categoryListItemHTML(category) {
  return `<div class="category-item" onclick="setCategory('${category.categoryName}', '${category.categoryColor}')"><div>${category.categoryName}</div><div class="dot ${category.categoryColor}"</div></div>`;
}


/**
 * It takes in a category name and a category color, and returns a string of HTML that contains the
 * category name and a colored dot.
 * @param categoryName - The name of the category
 * @param categoryColor - The color of the dot that will be displayed next to the category name.
 * @returns A string of HTML.
 */
function categorySelectionHTML(categoryName, categoryColor) {
  return `<div>${categoryName}<div class="dot ${categoryColor}"</div>`;
}


/**
 * It returns a string of HTML that contains a div that contains an assignee name for the assignees list. 
 * @param contact - the contact object
 * @returns A string of HTML.
 */
function assigneeListItemHTML(contact) {
  return `<div id="assignee-${contact.id}" onclick="setAssignee('${contact.contactName}', '${contact.color}', ${contact.id})">${contact.contactName}<img id="assigneebox${contact.id}"src="../assets/img/checkbutton-inactive.png"></div>
  `;
}


/**
 * It returns a string of HTML that contains a div displaying the "New category" creation option.
 * @returns A string of HTML.
 */
function addNewCategoryHTML() {
  return `<div class="category-item" onclick="openNewCategoryInput()"><div>New Category</div></div>`;
}


/**
 * When the user clicks on a priority icon, replace the icon with a white version of the icon.
 * @param id - the id of the element that was clicked
 */
function replacePrioIcon(id) {
  let iconElement = document.getElementById(id + "Icon");
  iconElement.src = `../assets/img/${id}w.png`;
}


/**
 * Reset the priority icon to the default icon.
 * @param id - the id of the element that was clicked
 */
function resetPrioIcon(id) {
  let iconElement = document.getElementById(id + "Icon");
  iconElement.src = `../assets/img/${id}.png`;
}


/**
 * It takes a subtask object and an index number, and returns a string of HTML that represents that
 * subtask.
 * @param subtask - the subtask object
 * @param i - the index of the subtask in the subtasks array
 * @returns A string of HTML code.
 */
function addNewSubTaskHTML(subtask, i) {
  if (subtask.checked) {
    return `<div class="subtask" id="subtask-${i}"><div class="subflex"><img id="subtaskbox${i}" src="../assets/img/checkbox-checked.png" onclick="toggleSubtaskCheckbox(${i})"><span>${subtask.description}</span></div><img class="icon" src="../assets/img/trash.png" onclick="deleteSubTask(${i})"></div>`;
  } else {
  return `<div class="subtask" id="subtask-${i}"><div class="subflex"><img id="subtaskbox${i}" src="../assets/img/checkbutton-inactive.png" onclick="toggleSubtaskCheckbox(${i})"><span>${subtask.description}</span></div><img class="icon" src="../assets/img/trash.png" onclick="deleteSubTask(${i})"></div>`;}
}


/**
 * It takes a string and a number, and returns a string.
 * @param prioText - The text of the priority button
 * @param prio - 1, 2, 3, 4, 5
 * @returns a string with the prioText and the image.
 */
function prioTaskviewHTML(prioText, prio) {
  return `${prioText}<img src="../assets/img/prioBtn${prio}w.png"></div>`;
}


/**
 * It takes in three parameters to display an assignee in the taskview.
 * @param assignee - The name of the assignee
 * @param assigneeInitials - The initials of the assignee
 * @param color - the backgroundcolor of the initials
 * @returns A string of HTML.
 */
function assigneeTaskviewHTML(assignee, assigneeInitials, color) {
  return `<div class="assignee"><div class="intials ${color}">${assigneeInitials}</div>${assignee}</div>`;
}


/**
 * It returns a string of HTML code that is used to display a subtask in the task view either with a checked checkbox or with an unchecked checkbox.
 * @param subtask - the subtask object
 * @param i - the index of the subtask in the array
 * @param selectedTask - the index of the task in the tasks array
 * @returns A string of HTML code.
 */
function subTaskListTaskViewHTML(subtask, i, selectedTask) {
  if (subtask.checked) {
    return `<div class="subtask" id="subtask-${i}"><div class="subflex"><img id="subtaskbox${i}" src="../assets/img/checkbox-checked.png" onclick="toggleSubtaskCheckboxEdit(${i}, ${selectedTask})"><span>${subtask.description}</span></div><img class="icon" src="../assets/img/trash.png" onclick="deleteSubTaskEdit(${i}, ${selectedTask})"></div>`;
  } else {
  return `<div class="subtask" id="subtask-${i}"><div class="subflex"><img id="subtaskbox${i}" src="../assets/img/checkbutton-inactive.png" onclick="toggleSubtaskCheckboxEdit(${i}, ${selectedTask})"><span>${subtask.description}</span></div><img class="icon" src="../assets/img/trash.png" onclick="deleteSubTaskEdit(${i}, ${selectedTask})"></div>`;}
}


/**
 * It returns a string of HTML that contains the elements of the by default hidden "taskmenu" and a Edit button that is displayed by default.
 * @param i - the index of the task in the tasks array
 * @returns A string of HTML.
 */
function editBtnContainerHTML(i) {
  return `<div id="movemenu" class="d-none"></div>
<div id="taskmenu" class="d-none">
  <div class="buttonwhite" onclick="openMoveMenu(${i})">Move</div>
  <div class="buttonwhite" onclick="openEditForm(${i})">Edit</div>
  <div class="buttonwhite" onclick="openDeleteForm(${i})">Delete</div>  
  <div class="buttonwhite" onclick="closeTaskview()">To Board</div>
</div>
<div id="edit-btn" class="edit-btn" onclick="openTaskSubMenu()"><img src="../assets/img/edit.png" alt=""></div>`;
}


/**
 * It returns a string of HTML that contains an eleement of the Move task menu. It contains a div with an id, class, and onclick event.
 * @param taskid - the index of the task in the tasks array
 * @param moveId - the id of the div
 * @param className - the class name of the div
 * @param statusName - The name of the status that the task is being moved to.
 * @param i - the index of the element in the move menu that is required for the onclick function.
 * @returns A string of HTML.
 */
function moveMenuHTML(taskid, moveId, className, statusName, i) {
  return `<div id="${moveId}" class="${className}" onclick="changeTaskStatus(${taskid}, ${i})">${statusName}</div>`
}


/**
 * It returns a string of HTML that contains "Delete" and "Ok" buttons in the Edit Task form.
 * @returns A string.
 */
function okBtnContainerHTML(i) {
  return `<div class="delete-btn" onclick="openDeleteForm(${i})">Delete<img class="btn-icon"
  src="../assets/img/close.png"></div><div class="ok-button" onclick="updateTask(${i})">OK<img class="btn-icon" src="../assets/img/checked.png"></div>`;
}


/**
 * It returns a string of HTML that contains the "Task added" message.
 * @returns A string.
 */
function renderTaskAddedMsg() {
  return `<div class="message">Task added to board<img src="../assets/img/board.png"></div>`;
}


/**
 * It returns a string of HTML that contains the "Task updated" message.
 * @returns A string.
 */
function renderTaskUpdatedMsg() {
  return `<div class="message">Task updated<img src="../assets/img/board.png"></div>`;
}


/**
 * It returns a string of HTML that contains the "Task deleted" message.
 * @returns A string.
 */
function renderTaskDeletedMsg() {
  return `<div class="message">Task deleted<img src="../assets/img/board.png"></div>`;
}


/**
 * It returns a string of HTML that contains the "Subtask deleted" message.
 * @returns A string.
 */
function renderSubtaskDeletedMsg() {
  return `<div class="message">Subtask deleted<img src="../assets/img/trash-icon-white.png"></div>`;
}


/**
 * It resets the categoryselection dropdown head to its default value.
 */
function resetCurrentCategories() {
  document.getElementById("categoryselection").innerHTML = `<div>Select Task Category</div><img class="arrow" src="../assets/img/dropdown.png">`;
}


/**
 * It takes a task object and an index, and returns a string of HTML that represents the task
 * @param task - the task object
 * @param i - the index of the task in the array
 * @returns A string of HTML.
 */
function renderTaskToBoardHTML(task, i) {
  return `<div class="boardtask" ondragstart="startDragging(${task.id})" draggable="true" onclick="openTaskview(${i})">
              <div class="boardtask-taskcategory ${task.category.categoryColor}">
                  ${task.category.categoryName}
              </div>
              <div style="width: 100%;"><b><div class="boardtask-task-titel">${task.title}</div></b></div>
              <div style="width: 100%;">
                  <p class="boardtask-description">${task.description}</p>
                  <div class="progressbar-subtasks-container" id="progressbar-subtasks-container${i}">
                    <progress id="prog${i}" max="${task.subtasks.length}" value=""></progress>
                    <div style="display: flex; flex-direction: row; align-items: center; justify-content: center;">
                      <span class="subtask-progress-span" id="truth${i}"></span><span class="subtask-progress-span">/${task.subtasks.length} Done</span>
                    </div>
                  </div>
                  <div style="display: flex; margin-top: 23px;">
                      <div id="assign-view-icons${i}" class="assign-view-icons"></div>
                      <div id="assign-view-icons-greater${i}" class="assign-view-icons"></div>
                      <div style="width: 100%; display: flex; justify-content: flex-end;">
                        <div class="task-view-icon-priority"><img id="task-view-icon-priority${i}" src=""></div>
                      </div>
                  </div>
              </div>
          </div>`;
}


/**
 * It renders an error message to the taskview page if the task could not be found.
 */
function renderTaskviewError() {
  document.getElementById('taskview').innerHTML = `The task could not be found.<br>Please go back to the <a href="../html/board.html">Board</a>.`;
}


/**
 * It returns a string of HTML that contains two buttons, one that cancels the deletion of a task, and one that deletes the task.
 * @param i - the index of the task in the array
 * @returns A string of HTML.
 */
function renderDeleteBtns(i) {
  return `<div>Are you sure you want to delete this task?</div>
  <div class="deletemsgbtns"><div onclick="cancelTaskDeletion()">No</div><div class="alerthover" onclick="deleteTask(${i})">Yes</div></div>`
}