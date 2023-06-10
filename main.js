let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let arrayOfTasks = [];

// Check if Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();

// Add Task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = ""; // Empty Input After Use 
  }
}

// Click on "Delete Button"
tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    // Remove Element From Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Remove Element From page
    e.target.parentElement.remove();
  }
  // Task Element
  if (e.target.classList.contains("task")) {
    // Toggle Completed For The Task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    // Toggle Done Class
    e.target.classList.toggle("done");
  }
});

// Add Task To The Created Array Of Tasks
function addTaskToArray (taskText) {
  // Data From Input Of Tasks
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // Push The Task To Array Of Tasks
  arrayOfTasks.push(task);
  addElementsToPageFrom(arrayOfTasks);
  // Add Tasks To Local Storage
  addDataToLocalStorageFrom(arrayOfTasks);
}

// Function To Add Information To Page 
function addElementsToPageFrom(arrayOfTasks) {
  tasksDiv.innerHTML= "";

  arrayOfTasks.forEach((task) => {
    // Created The Div 
      let div = document.createElement("div");
      div.className = "task";
    // Check If Task is Done
      if (task.completed) {
        div.className = "task done";
      }
      div.setAttribute("data-id", task.id);
      div.appendChild(document.createTextNode(task.title));
    // Created Delete Button
      let span = document.createElement("span");
      span.className = "del";
      span.appendChild(document.createTextNode("Delete"));
    // Add Delete Button To Tasks Div
      div.appendChild(span);
    // Add Tasks Div To Div Countiner In Page
    tasksDiv.appendChild(div);
});
}

// Function To Add the information to Local Storage
function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

// Function To Restore Data From Local Storage to Save in Page as Defualt
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

// Function To Delete The Element With Id Of Task
function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

// Function To Know If The Task Was Completed Or Not
function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed = arrayOfTasks[i].completed ? false : true;
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}