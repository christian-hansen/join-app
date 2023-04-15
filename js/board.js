/**
 * It downloads data from the server, then loads it into the local storage, then includes the HTML templates, then renders the tasks to the board.
 */
async function initBoard() {
  await downloadFromServer();
  users = JSON.parse(backend.getItem("users")) || [];
  categories = JSON.parse(backend.getItem("categories")) || [];
  prios = JSON.parse(backend.getItem("prios")) || [];
  tasks = JSON.parse(backend.getItem("tasks")) || [];
  contacts = JSON.parse(backend.getItem("contacts")) || [];
  load();
  includeHTML();
  renderTasksToBoard();
}


/**
 * When the user clicks on the edit button, the task sub menu will appear and the edit button will disappear.
 */
function openTaskSubMenu() {
    document.getElementById("taskmenu").classList.remove("d-none");
    document.getElementById("edit-btn").classList.add("d-none");
  }
  
  
  /**
   * It displays the task sub menu and hides the task move menu.
   * @param i - the index of the task in the array
   */
  function openMoveMenu(i) {
    document.getElementById("taskmenu").classList.add("d-none");
    renderMoveMenu(i);
    document.getElementById("movemenu").classList.remove("d-none");
  }


/**
 * It removes the class "d-none" from the element with the id "taskmenu" and adds the class "d-none" to
 * the element with the id "movemenu".
 */
function closeMoveMenu() {
    document.getElementById("taskmenu").classList.remove("d-none");
    document.getElementById("movemenu").classList.add("d-none");
  }


/**
 * It creates a menu of buttons that allow you to move a task to a different status.
 * @param taskid - the id of the task
 */
function renderMoveMenu(taskid) {
    let movemenu = document.getElementById("movemenu");
    let status = tasks[taskid].status;
    const statusName = ["To do", "In progress", "Awaiting feedback", "Done"];
    movemenu.innerHTML = "";
    for (let i = 0; i < 4; i++) {
      const moveId = "move" + [i];
      if (status == i) {
        className = "buttonblue";
      } else {
        className = "buttonwhite";
      }
      movemenu.innerHTML += moveMenuHTML(taskid, moveId, className, statusName[i], i);
    }
    movemenu.innerHTML += `<div class="buttonwhite" onclick="closeMoveMenu()">Back</div>`;
  }


/**
 * It changes the status of a task and then updates the move menu.
 * @param taskid - the id of the task
 * @param status - the status of the task (e.g. "todo", "doing", "done")
 */
async function changeTaskStatus(taskid, status) {
    tasks[taskid].status = status;
    await backend.setItem("tasks", JSON.stringify(tasks));
    renderMoveMenu(taskid);
  }


/**
 * It renders the tasks to the board into the relevant columns based on the tasks' status.
 */
function renderTasksToBoard() {
    clearBoardColumns();
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      if (task.status === 0) {
        document.getElementById("todo").innerHTML += renderTaskToBoardHTML(task, i);
      } else if (task.status === 1) {
        document.getElementById("inprogress").innerHTML += renderTaskToBoardHTML(task, i);
      } else if (task.status === 2) {
        document.getElementById("awaitingfeedback").innerHTML += renderTaskToBoardHTML(task, i);
      } else if (task.status === 3) {
          document.getElementById("done").innerHTML += renderTaskToBoardHTML(task, i);
      }
      nonCheckSubsNew();
      assignViewIcons();
      showPrioToTaskViewBoard();}
  }


/**
 * It hides the "taskmenu" and unhides the "deletemsgcontainer". It also renders the delete buttons in the delete message container.
 * @param i - the index of the task in the array
 */
function openDeleteForm(i) {
    document.getElementById("taskmenu").classList.add("d-none");
    document.getElementById("deletemsgcontainer").classList.remove("d-none");
    document.getElementById("deletemsg").innerHTML = renderDeleteBtns(i);
  }


/**
 * It hides the delete message and unhides the task sub menu.
 */
function cancelTaskDeletion() {
    document.getElementById("deletemsgcontainer").classList.add("d-none");
    document.getElementById("taskmenu").classList.remove("d-none");
  }


/**
 * When the user confirms the deletion, the task's status is changed to 4 (which hides the tasks from the board), the tasks array is updated, a popup message is displayed, the taskview is closed, and the tasks are rendered to the board.
 * @param i - the index of the task in the array
 */
async function deleteTask(i) {
    tasks[i].status = 4;
    await backend.setItem("tasks", JSON.stringify(tasks));
    displayPopupMsg("taskdeleted");
    setTimeout(closeTaskview, 2000);
    renderTasksToBoard();
  }


/**
 * It toggles the checkbox of a subtask and then uploads the new data to the server.
 * @param i - The index of the subtask
 */
async function toggleSubtaskCheckboxEdit(i) {
    toggleSubtaskCheckbox(i);
    await backend.setItem("tasks", JSON.stringify(tasks));
    nonCheckSubsNew();
  }


/**
 * It deletes a subtask from the array of subtasks, then it saves the array of subtasks in the backend, then it displays a popup message, then it renders the subtasks of the selected task, then it hides the popup message.
 * @param i - the index of the subtask to be deleted
 * @param selectedTask - the task that is currently selected
 */
async function deleteSubTaskEdit(i, selectedTask) {
    deleteSubTask(i);
    await backend.setItem("tasks", JSON.stringify(tasks));
    displayPopupMsg("subtaskdeleted");
    renderSubTasksTaskview(selectedTask);
    setTimeout(hidePopupMsg, 2000);
  }


/**
 * It opens the add task form and sets the current status to the column that was clicked.
 * @param column - status of the column that the task is being added to
 */
function addTaskOnBoard(column) {
    openAddTaskForm();
    currentStatus = column;
  } 


/**
 * If the user is on the board page, hide the delete message container
 */
function hideDeleteMsgContainer() {
    if (window.location.pathname == "/html/board.html") {
      document.getElementById("deletemsgcontainer").classList.add("d-none");
    }
  }

  function doNotClose(event) {
    event.stopPropagation();
}