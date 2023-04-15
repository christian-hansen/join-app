let minDate;

/**
 * If the input is 0, undefined, an empty string, or an empty object, return false. Otherwise, return true.
 * @param input - The input to be validated.
 * @returns a boolean value.
 */
function validateInput(input) {
  if (input === 0 || input === undefined || input.length < 1 || JSON.stringify(input) === "{}") {
    return false;
  } else {
    return true;
  }
}


/**
 * The function takes a string as an argument, uses that string to get a global variable, validates that global variable, and then displays an error message if the global variable is invalid.
 * @param input - the name of the input field (e.g. "Description")
 */
function validateTextField(input) {
  let getGlobalVariable = eval("current" + input);
  let validatedGlobalVariable = validateInput(getGlobalVariable);
  let errorId = "error-" + input.toLowerCase();
  if (validatedGlobalVariable) {
    document.getElementById(errorId).classList.add("d-none");
  } else {
    document.getElementById(errorId).classList.remove("d-none");
  }
}


/**
 * Validates the date selection. If the currentDate variable is undefined or empty or the date is earlier than today, then remove the class "d-none" from the element with the id "error-date". Otherwise, add the class "d-none" to the element with the id "error-date".
 */
function validateDateField() {
  if (currentDate === "undefined.undefined." || currentDate === undefined || currentDate === '' || currentDate < minDate) {
    document.getElementById("error-date").classList.remove("d-none");
    document.getElementById("error-date").innerHTML = "This field is required. Please select today or later.";
  } 
  else {
    document.getElementById("error-date").classList.add("d-none");
  }
}


/**
 * It adds the class "d-none" to all the error messages so that they are hidden when resetting the form.
 */
function resetFormValidation() {
  document.getElementById("error-title").classList.add("d-none");
  document.getElementById("error-description").classList.add("d-none");
  document.getElementById("error-date").classList.add("d-none");
  document.getElementById("newcategoryerror").classList.add("d-none");
  document.getElementById("error-assignees").classList.add("d-none");
  document.getElementById("error-prios").classList.add("d-none");
}


/**
 * Validates if at least one assignee is selected. If the currentAssignees array is empty, then remove the class "d-none" from the element with the id "error-assignees".
 */
function validateAssigneeField() {
  if (currentAssignees.length == 0) {
    document.getElementById("error-assignees").classList.remove("d-none");
  }
}


/**
 * Validates if a priority is selected. If the currentPrio variable is equal to 0, then remove the class "d-none" from the element with the id "error-prios".
 */
function validatePriosField() {
  if (currentPrio == 0) {
    document.getElementById("error-prios").classList.remove("d-none");
  }
}


/**
 * Validates if a category was selected. If the currentCategory object is empty, then remove the class "d-none" from the element with the id "newcategoryerror" and set the innerHTML of that element to "This selection is required".
 */
function validateCategoryField() {
  if (JSON.stringify(currentCategory) === '{}') {
    document.getElementById("newcategoryerror").classList.remove("d-none");
    document.getElementById("newcategoryerror").innerHTML = "This selection is required";
  }
}


/**
 * If the newCategoryName or newCategoryColor variables are undefined, then display an error message and return false. Validates if newCategoryName and newCategoryColor are both set and returns true
 * @returns a boolean value.
 */
function validateNewCategoryCreation() {
  if (newCategoryName === undefined || newCategoryColor === undefined) {
    document.getElementById("newcategoryerror").classList.remove("d-none");
    document.getElementById("newcategoryerror").innerHTML = "Category name and color are required";
    return false;
  } else {
    return true;
  }
}


/**
 * Function to display the error message that appears if the newCategoryName is the name of an already existing category.
 */
function newCategoryNameErrorMsg() {
    document.getElementById("newcategoryerror").classList.remove("d-none");
    document.getElementById("newcategoryerror").innerHTML = "Choose a name that is not already taken";
}


/**
 * The function is used to check if the entered newCategoryName is already taken. If the newCategoryName is found in the categories array, return false, otherwise return true.
 * @returns a boolean value.
 */
function checkNewCategoryNameAvailability() {
const result = categories.find(({categoryName}) => categoryName === newCategoryName)
if (result !== undefined) {
    console.log(newCategoryName);
    return false;
} else {
    return true;
}
}