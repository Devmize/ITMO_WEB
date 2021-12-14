// Getting all required elements
const inputBox = document.querySelector(".inputField input");
const addButton = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllButtons = document.querySelector(".todoList__score button");

inputBox.onkeyup = () => {
    let userData = inputBox.value; // Gettin user entered value
    if(userData.trim() != 0) { // If user values aren't only spaces
        addButton.classList.add("active"); // Active the add button
    } else {
        addButton.classList.remove("active") // Unactive the add button
    }
}

showTasks();

// If user click on the add button
addButton.onclick = () => {
    let userData = inputBox.value; // Gettin user entered value
    let getLocalStorage = localStorage.getItem("New Todo"); // Getting localStorage
    if(getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage); // Transforming json string into a js object
    }
    listArr.push(userData);
    localStorage.setItem("New Todo", JSON.stringify(listArr)); // Transforming js object into a json string
    showTasks();
    addButton.classList.remove("active");
}

// Function to add task list inside ul
function showTasks() {
    let getLocalStorage = localStorage.getItem("New Todo"); // Getting localStorage
    if(getLocalStorage == null) {
        listArr = []; // Creating blank array
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    const pendingNumber = document.querySelector(".pendingNumber");
    pendingNumber.textContent = listArr.length; // Passing the lenght value in pendingNumber
    if(listArr.length > 0) {
        deleteAllButtons.classList.add("active");
    } else {
        deleteAllButtons.classList.remove("active");
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})"; ><i>-</i></span></li>`;
    });
    todoList.innerHTML = newLiTag; // Adding new li tag inside ul tag
    inputBox.value = ""; // Once task added leave the input field blank
}

// Fuction to delete task
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); // Delete or remove the particular indexed li

    // After remove the li and again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); // Transforming js object into a json string
    showTasks();
}

// Fuction to delete all tasks
deleteAllButtons.onclick = () => {
    listArr = [];
    // After remove all tasks and update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); // Transforming js object into a json string
    showTasks();
}