let urgentTasks = [];
let currentUserUrgentTasks = [];
let dates = [];
let sortedDates = [];
let todoTasks = [];
let feedback = [];
let InProgress = [];
let dones = [];

/**
 * It's a function that waits for the init() function to finish, then it gets the prios and tasks from
 * the backend, then it renders the page.
 */
async function init_summary() {
    await init();
    prios = JSON.parse(backend.getItem('prios')) || [];
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    render();
}

/**
 * The render function calls the greeting function, the greetAnimationMobile function, and the
 * showSummaryOverlay function.
 */
function render() {
    greeting();
    greetAnimationMobile();
    showSummaryOverlay();
}

/**
 * It takes the user's name from the activeUser array and displays it on the page.
 * 
 */
function greeting() {
    greetTime();
    let greet = document.getElementById('greet-name');
    let greetMobile = document.getElementById('greeting-name-mobile');
    for (let i = 0; i < activeUser.length; i++) {
        const element = activeUser[i].userName;
        greet.innerHTML = element;
        greetMobile.innerHTML = element;
    }
}

/**
 * It gets the time of day and displays a greeting based on the time of day.
 */
function greetTime() {
    let greetTime = document.getElementById('greet-time');
    let greetTimeMobile = document.getElementById('greet-time-mobile');
    let date = new Date();
    let time = date.getHours();
    if (time < 11 && time > 0) {
        greetTime.innerHTML = 'Good Morning,'
        greetTimeMobile.innerHTML = 'Good Morning,'
    } else if (time >= 11 && time < 17) {
        greetTime.innerHTML = 'Hello,'
        greetTimeMobile.innerHTML = 'Hello,'
    } else {
        greetTime.innerHTML = 'Good Evening,'
        greetTimeMobile.innerHTML = 'Good Evening,'
    }
}

/**
 * It removes the class 'd-none' from the element with the id 'greet-animation-mobile' and adds the
 * class 'd-none' to the same element after 2 seconds.
 */
function greetAnimationMobile() {
    let count = activeUser[0].animationCounter;
    let greet = document.getElementById('greet-animation-mobile');
    let summary = document.getElementById('summary-content');
    if (count == 0) {
        greet.classList.remove('d-none');
        setTimeout(() => greet.classList.add("d-none"), 2000);
        summary.classList.remove('d-none');
    } else { summary.classList.remove('d-none'); }
    activeUser[0].animationCounter = 1;
    save();
}

/**
 * "showSummaryOverlay()" is a function that calls other functions to get data from a database and
 * display it on a webpage.
 */
function showSummaryOverlay() {
    showSumTasks();
    getNewOverviewForSummary();
    getUrgentTasks();
    sortDates();
}

/**
 * It loops through the tasks array, and if the status of the task is not 4, it pushes the task to the
 * tasksactive array, and then sets the innerHTML of the tasksinBoard element to the length of the
 * tasksactive array.
 */
function showSumTasks() {
    let tasksactive = [];
    let tasksinBoard = document.getElementById('summary-board-counter');
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].status != 4) {
            tasksactive.push(tasks);
            tasksinBoard.innerHTML = tasksactive.length;
        }
    }
}

/**
 * It loops through the tasks array, checks if the status is not 4, and if the priority is 1, it pushes
 * the task to the urgentTasks array and updates the counter.
 */
function getUrgentTasks() {
    let prio = document.getElementById('summary-urgent-counter');
    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i].prio;
        if (tasks[i].status != 4) {
            if (element == 1) {
                urgentTasks.push(tasks[i]);
                prio.innerHTML = urgentTasks.length;
            }
        }
    }
}

/**
 * It takes the due dates from the urgentTasks array, pushes them into the dates array, sorts the dates
 * array, and then formats the dates array into a new format.
 * @returns The date is being returned in the format of YYYY-MM-DD.
 */
function sortDates() {
    let deadline = document.getElementById('summary-date-deadline');
    for (let i = 0; i < urgentTasks.length; i++) {
        const element = urgentTasks[i].dueDate;
        dates.push(element)
    }
    dates.sort((a, b) => {
        const num1 = Number(a.split("-").map((num) => (`000${num}`).slice(-2)).join(""));
        const num2 = Number(b.split("-").map((num) => (`000${num}`).slice(-2)).join(""));
        return num1 - num2;
    });
    if(dates == '') {
        currentDateFormatted();        
        return false
    } else {
        newDateFormat();
    }
}

/**
 * It takes the first date in the array, splits it into an array of three elements, then uses the first
 * element as the year, the second as the month, and the third as the day. Then it creates a new date
 * object with the new date format, and uses the toLocaleString method to get the month and year in
 * long format. Then it replaces the innerHTML of the deadline element with the new date format.
 */
function newDateFormat() {
    let deadline = document.getElementById('summary-date-deadline');
    let dateSplit = dates[0].split("-");
    let newDate = new Date(`${dateSplit[1]}/${dateSplit[2]}/${dateSplit[0]}`);
    let monthL = new Date(newDate).toLocaleString('en-US', { month: 'long' });
    let year = new Date(newDate).toLocaleString('en-US', { year: 'numeric' });
    deadline.innerHTML = monthL + ` ${dateSplit[2]}, ` + year;
}

/**
 * It takes the current date and formats it to the following format: "January 1, 2020"
 */
function currentDateFormatted() {
    let deadline = document.getElementById('summary-date-deadline');
    let newDate = new Date();
    let monthL = new Date(newDate).toLocaleString('en-US', { month: 'long' });
    let year = new Date(newDate).toLocaleString('en-US', { year: 'numeric' });
    let day = new Date(newDate).toLocaleString('en-US', { day: 'numeric' });
    deadline.innerHTML = ` ${monthL} ${day}, ${year} `;
}

/**
 * It loops through the tasks array and pushes the tasks with a status of:
 * 0 into todo array; 1 into Inprogress array;
 * 2 into the feedback array and 3 into the dones array. 
 * Then it updates the innerHTML of the summary-done-counter, 
 * summary-feedback-counter, summary-progress-counter and 
 * summary-todo-counter elements with the length of the
 * feedback array.
 */
function getNewOverviewForSummary() {
    let doned = document.getElementById('summary-done-counter');
    let af = document.getElementById('summary-feedback-counter');
    let ip = document.getElementById('summary-progress-counter');
    let todo = document.getElementById('summary-todo-counter');
    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i].status;
        if(element == 0) {
            todoTasks.push(tasks[i]);
            todo.innerHTML = todoTasks.length;
        } else if(element == 1) {
            InProgress.push(tasks[i]);
            ip.innerHTML = InProgress.length;
        } else if(element == 2) {
            feedback.push(tasks[i]);
            af.innerHTML = feedback.length;
        } else if (element == 3){
            dones.push(tasks[i]);
            doned.innerHTML = dones.length;
        }
    }
}