// Load task from local storage
document.addEventListener("DOMContentLoaded", loadTask);

// Popup
var overlay = document.querySelector(".overlay");
var newbox = document.querySelector(".newbox");

// New task fields
var title = document.querySelector(".title");
var type = document.querySelector(".type");
var description = document.querySelector(".description");
var date = document.querySelector(".date");
var links = document.querySelector(".taskLink");
var p = "";

// Get priority
function prior(priority) {
    p = priority;
}

// Display popup
function addTask() {
    overlay.style.display = "block";
    newbox.style.display = "block";
}

// Cancel popup
function cancelNewBox(event) {
    event.preventDefault();
    overlay.style.display = "none";
    newbox.style.display = "none";
}

// Adding new task
var boxContainer = document.querySelector(".box");
function addNewBox(event) {
    event.preventDefault();

    if (title.value === "" || type.value === "" || description.value === "" || date.value.trim() === "") {
        alert("Every field is mandatory");
        return;
    }

    var addnewboxelem = document.createElement("div");
    addnewboxelem.setAttribute("class", "box-contents");
    if (p == "") {
        p = "Low";
    }

    addnewboxelem.innerHTML =
        `<h3>${title.value}</h3>
        <h4>${type.value}</h4>
        <p>${description.value}</p>
        ${links.value ? `<a href="${links.value}" target="_blank" style="color:skyblue;">Click here to view</a>` : ''}
        <p>${"Deadline: " + date.value}</p>
        <p>${"Priority: " + p}</p>
        <button class="btn" onclick="deletetask(event)">Delete</button>`;

    boxContainer.append(addnewboxelem);

    let allTask = {
        taskTitle: title.value,
        taskType: type.value,
        taskdes: description.value,
        taskLink: links.value,
        taskDate: date.value,
        taskPriority: p
    };

    saveTaskLocal(allTask);
    clearInput();

    overlay.style.display = "none";
    newbox.style.display = "none";
}

// Save task in local storage
function saveTaskLocal(allTask) {
    let SavedTasks = JSON.parse(localStorage.getItem("SavedTasks")) || [];
    SavedTasks.push(allTask);
    localStorage.setItem("SavedTasks", JSON.stringify(SavedTasks));
}

// Load saved tasks
function loadTask() {
    let SavedTasks = JSON.parse(localStorage.getItem("SavedTasks")) || [];
    SavedTasks.forEach(task => {
        var addnewboxelem = document.createElement("div");
        addnewboxelem.setAttribute("class", "box-contents");

        addnewboxelem.innerHTML =
            `<h3>${task.taskTitle}</h3>
            <h4>${task.taskType}</h4>
            <p>${task.taskdes}</p>
            ${task.taskLink ? `<a href="${task.taskLink}" target="_blank" style="color:skyblue;">Click here to view</a>` : ''}
            <p>${"Deadline: " + task.taskDate}</p>
            <p>${"Priority: " + task.taskPriority}</p>
            <button class="btn" onclick="deletetask(event)">Delete</button>`;

        boxContainer.append(addnewboxelem);
    });
}

// Delete task
function deletetask(event) {
    var option = confirm("Are you sure you want to delete this?");
    if (option) {
        let taskElement = event.target.parentElement;
        let taskTitle = taskElement.querySelector("h3").innerText;
        let taskDetails = taskElement.querySelectorAll("p");
        let taskDescription = taskDetails[0].innerText;

        taskElement.remove();
        let SavedTasks = JSON.parse(localStorage.getItem("SavedTasks")) || [];
        let taskIndex = SavedTasks.findIndex(task => task.taskTitle === taskTitle && task.taskdes === taskDescription);
        if(taskIndex!=-1){
            SavedTasks.splice(taskIndex,1);
            localStorage.setItem("SavedTasks",JSON.stringify(SavedTasks));

        }
    }
}

// Clear input fields
function clearInput() {
    title.value = "";
    type.value = "";
    description.value = "";
    date.value = "";
    links.value = "";
}