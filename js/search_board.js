let currentDraggedElement;
let nonsubs = [];


/**
 * It clears the HTML of the four columns and then calls the findTaskForLoop function.
 */
function findTask() {
    document.getElementById('todo').innerHTML = "";
    document.getElementById('inprogress').innerHTML = "";
    document.getElementById('awaitingfeedback').innerHTML = "";
    document.getElementById('done').innerHTML = "";
    let search = document.getElementById('findTask').value;
    search = search.toLowerCase();
    findTaskForLoop(search);
}


/**
 * It loops through the tasks array, and if the task title or description includes the search term, and
 * the task status is not 4, it calls the findTaskIf function.
 * @param search - the search term
 */
function findTaskForLoop(search) {
    for (let j = 0; j < tasks.length; j++) {
        const task = tasks[j];
        if(task.title.toLowerCase().includes(search) || task.description.toLowerCase().includes(search)) {
            if(task.status != 4){
                findTaskIf(task, j);
            }
        }
    }
}


/**
 * It takes a task and a number, and then it adds the task to the board based on the task's status.
 * If the task status is 0, then adds the task to the ToDo - section;
 * If the task status is 1, then adds the task to the InProgress - section;
 * If the task status is 2, then adds the task to the Awaiting Feedback - section;
 * If the task status is 3, then adds the task to the Done - section;
 * @param task - the task object
 * @param j - the index of the task in the array
 */
function findTaskIf(task, j) {
    if (task.status === 0) {
        document.getElementById('todo').innerHTML += renderTaskToBoardHTML(task, j)
    }
    else if (task.status === 1) {
        document.getElementById('inprogress').innerHTML += renderTaskToBoardHTML(task, j)
    }
    else if (task.status === 2) {
        document.getElementById('awaitingfeedback').innerHTML += renderTaskToBoardHTML(task, j)
    }
    else if (task.status === 3) {
        document.getElementById('done').innerHTML += renderTaskToBoardHTML(task, j)
    }
}



////////////Drag'n'Drop \\\\\\\\\\\\\\\\\\\\\\\\



/**
 * When the user starts dragging an element, set the currentDraggedElement variable to the id of the
 * element being dragged.
 * @param id - The id of the element that is being dragged.
 */
function startDragging(id) {
    currentDraggedElement = id;
}

/**
 * It prevents the default action of the event from happening.
 * @param ev - The event object.
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * It takes a status as a parameter, sets the status of the current dragged element to the status,
 * renders the tasks to the board, and then sets the tasks to the backend.
 * @param status - The status of the task.
 */
async function moveTo(status) {
    tasks[currentDraggedElement]['status'] = status;
    renderTasksToBoard();
    await backend.setItem('tasks', JSON.stringify(tasks));
}

/**
 * It adds a class to the element with the id that is passed to the function.
 * @param id - The id of the element you want to highlight.
 */
function highlightDragArea(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

/**
 * It removes the class 'drag-area-highlight' from the element with the id that is passed to the
 * function.
 * @param id - The id of the element you want to highlight.
 */
function removehighlightDragArea(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}


//////////////////////////////////////////////////

/**
 * It loops through the tasks array, and for each task, it loops through the subtasks array, and for
 * each subtask, it checks if the subtask is completed or not. If it is, it adds 1 to the counter. If
 * it isn't, it adds 1 to the counterFalse. Then, it sets the progress bar to the percentage of
 * completed subtasks.
 */
function nonCheckSubsNew() {
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        let subs = tasks[i].subtasks;
        let truth = document.getElementById(`truth${i}`);
        let prog = document.getElementById(`prog${i}`);
        let progContainer = document.getElementById(`progressbar-subtasks-container${i}`);

        if(truth == null || prog == null || progContainer == null){continue} 
        truth.innerHTML = ''; 
        prog.value = '';

        let counterFalse = 0;
        if(subs != ''){
            secondForLoopForCheckSubs(subs, truth, prog, counterFalse);
        } else {
            progContainer.classList.add('d-none');
        }
    }
}

/**
 * It takes an array of checkboxes, a div, and a progress bar, and it counts the number of checked
 * checkboxes and displays that number in the div and in the progress bar.
 * @param subs - the array of checkboxes
 * @param truth - the span element that displays the number of checked checkboxes
 * @param prog - is the progress bar
 * @param counterFalse - is the counter for the number of checked checkboxes
 */
function secondForLoopForCheckSubs(subs, truth, prog, counterFalse) {
    for (let k = 0; k < subs.length; k++) {
        const element = subs[k].checked;
        
        if(element == true){
            counterFalse++
        }
        truth.innerHTML = counterFalse;
        prog.value = counterFalse;
    }
}

/**
 * It takes two arguments, the first is an object with a color property, the second is a string. It
 * returns a string of HTML with the color property of the object as a class and the string as the text
 * of a div.
 * @param assignes - {}
 * @param acronymAU - The acronym of the assignee's name.
 * @returns A string of HTML.
 */
function assignIconsHTML(assignes, acronymAU) {
    return `
    <div class="circleLayoutIcon ${assignes.color}">
        <div class="circleNameIcon">
            ${acronymAU}
        </div>
    </div>`
}


/**
 * It returns a string of HTML that contains a div with a class of circleLayoutIcon and a background
 * color of grey. Inside that div is another div with a class of circleNameIcon. Inside that div is a
 * string of text that says "+" and the number of assignees minus 1.
 * @param i - the index of the task in the array
 * @returns A string of HTML.
 */
function assignIconsGreaterHTML(i) {
    return `
    <div class="circleLayoutIcon" style="background-color: grey;">
        <div class="circleNameIcon">
            +${tasks[i].assignee.length - 1}
        </div>
    </div>`
}

/**
 * For each task, if the task has an assignee, then add an icon to the task's assignee.
 */
function assignViewIcons() {
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i].assignee;
        let assignIcons = document.getElementById(`assign-view-icons${i}`);
        let assignGreat = document.getElementById(`assign-view-icons-greater${i}`);

        if(assignIcons == null || assignGreat == null){continue} 
        assignIcons.innerHTML = "";
        assignGreat.innerHTML = "";
        secondForLoopForAssignViewIcons(task, assignIcons, assignGreat, i);
    }
}

/**
 * If the index of the current iteration of the outer loop is less than or equal to 2, then append the
 * HTML to the innerHTML of the assignIcons element, otherwise, set the innerHTML of the assignIcons
 * element to the HTML and set the innerHTML of the assignGreat element to the HTML.
 * @param task - an array of objects
 * @param assignIcons - the div that holds the icons
 * @param assignGreat - the element that will contain the "and X more" text
 * @param i - the index of the task in the array
 */
function secondForLoopForAssignViewIcons(task, assignIcons, assignGreat, i) {
    for (let j = 0; j < task.length; j++) {
        const assignes = task[j];

        let firstletterAU = assignes.userName;
        let acronymAU = firstletterAU.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '');
        
        if(j <= 2){
            assignIcons.innerHTML += assignIconsHTML(assignes, acronymAU);
        } else {
            assignIcons.innerHTML = assignIconsHTML(assignes, acronymAU);
            assignGreat.innerHTML = assignIconsGreaterHTML(i); 
        }
    }
}

/**
 * It loops through the tasks array and changes the src of the img element with the id
 * "task-view-icon-priority" to the corresponding priority image.
 */
function showPrioToTaskViewBoard() {
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i].prio;
        let prioImg = document.getElementById(`task-view-icon-priority${i}`);
        if(prioImg == null){continue} 
        if(task == 1) {
            prioImg.src = "../assets/img/prioBtn1.png"
        } else if(task == 2) {
            prioImg.src = "../assets/img/prioBtn2.png"
        } else {
            prioImg.src = "../assets/img/prioBtn3.png"
        }
    }
}