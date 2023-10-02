// Initialize an empty array to store tasks
let tasks = [];



function updateTime() {
    chrome.storage.local.get("timer", (res) => {
        const time = document.getElementById("time");
        const minutes = 25 - Math.ceil( res.timer / 60)  
        let seconds = "00"; // Use a single equals sign for assignment

        if (res.timer % 60 != 0) { // Also corrected the comparison operator to "!=="
            seconds = 60 - (res.timer % 60);
        }
        
        time.textContent = `${minutes}:${seconds}`;

    });
}

updateTime();
setInterval(updateTime, 1000); // Corrected function name


const startTimerBtn = document.getElementById("start-timer-btn");
startTimerBtn.addEventListener("click", () => {
    chrome.storage.local.get(["isRunning"], (res) => {
        const newIsRunning = !res.isRunning; // Toggle the isRunning state
        chrome.storage.local.set({
            isRunning: newIsRunning,
        }, () => {
            // Update the button text based on the new isRunning state
            startTimerBtn.textContent = newIsRunning ? "Pause Timer" : "Start Timer";
        });
    });
});

const resetTimerBtn = document.getElementById("reset-timer-btn");

resetTimerBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        timer: 0,
        isRunning: false,
    }, () => {
        const startTimerBtn = document.getElementById("start-timer-btn");
        startTimerBtn.textContent = "Start Timer";
    });
});



const addTaskBtn = document.getElementById("add-task-btn");
addTaskBtn.addEventListener("click", () => addTask());

// Retrieve tasks from Chrome storage
chrome.storage.sync.get(["tasks"], (res) => {
    tasks = res.tasks ? res.tasks : [];
    renderTasks(); // Render tasks after retrieving them from storage
});


function saveTasks() {
    chrome.storage.sync.set({ tasks });
}

// Function to render a single task
function renderTask(tasksNum) {
    // Create a container for the task
    const taskRow = document.createElement("div");

    // Create an input field for the task
    const text = document.createElement("input");
    text.type = "text";
    text.value = tasks[tasksNum]
    text.placeholder = "Enter a task";

    // Add a change event listener to update the tasks array when the input field changes
    text.addEventListener("change", function() {
        tasks[tasksNum] = this.value; // Update the tasks array with the new task text
        saveTasks()
    });

    // Create a "Delete" button for the task
    const deleteBtn = document.createElement("input");
    deleteBtn.type = "button";
    deleteBtn.value = "x";

    // Add a click event listener to delete the task
    deleteBtn.addEventListener("click", () => {
        deleteTask(tasksNum); // Call the deleteTask function to remove the task
        renderTasks(); // Update the task list after deletion
    });
    
    // Append the input field and delete button to the task container
    taskRow.appendChild(text);
    taskRow.appendChild(deleteBtn);

    // Get the task container element and append the task container
    const taskContainer = document.getElementById("task-container");
    taskContainer.appendChild(taskRow);
}

// Function to add a new task
function addTask() {
    const tasksNum = tasks.length; 
    tasks.push(""); // Add an empty task to the tasks array
    renderTask(tasksNum); // Render the new task
    saveTasks()
}

// Function to delete a task
function deleteTask(taskNum) {
    tasks.splice(taskNum, 1); // Remove the task from the tasks array
    renderTask()
    saveTasks()
}

// Function to render all tasks
function renderTasks() {
    const taskContainer = document.getElementById("task-container");
    taskContainer.innerHTML = ""; // Clear the taskContainer

    // Loop through the tasks array and render each task
    tasks.forEach((taskText, taskNum) => {
        renderTask(taskNum);
    });
}

// Initial render of tasks when the page loads
renderTasks();
