const apiBaseUrl = "http://127.0.0.1:8000/api/tasks";
const token = localStorage.getItem("token");
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const messageBox = document.getElementById("message");

if (!token) {
    window.location.href = "index.html";
}

//success and error messaged
function showMessage(text, type = "success") {
    messageBox.innerText = text;
    messageBox.className = `text-white px-4 py-2 mt-3 rounded w-96 text-center ${
        type === "error" ? "bg-red-500" : "bg-green-500"
    }`;
    messageBox.classList.remove("hidden");

    setTimeout(() => {
        messageBox.classList.add("hidden");
    }, 3000);
}

//view tasks
async function fetchTasks() {
    try {
        const response = await fetch(apiBaseUrl, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (response.status === 401) {
            showMessage("Session expired! Please login again.", "error");
            localStorage.removeItem("token");
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
            return;
        }

        if (!response.ok) {
            throw new Error(`Failed to fetch tasks: ${response.statusText}`);
        }

        const tasks = await response.json();
        taskList.innerHTML = "";

        if (tasks.length === 0) {
            taskList.innerHTML = "<p class='text-center text-gray-500'>No tasks available.</p>"; // Display no tasks message
            return;
        }

        tasks.forEach((task) => {
            const li = document.createElement("li");

    // Applying different background colors based on task status
        let bgColor = "";
        let textColor = "";

        if (task.status === "completed") {
            bgColor = "bg-green-100 border-l-4 border-green-500"; 
            textColor = "text-green-600 font-semibold";
        } else if (task.status === "in-progress") {
            bgColor = "bg-yellow-100 border-l-4 border-yellow-500"; 
            textColor = "text-yellow-600 font-semibold";
        } else {
            bgColor = "bg-blue-100 border-l-4 border-blue-500";
            textColor = "text-blue-600 font-semibold";
        }

         li.className = `${bgColor} p-4 shadow-md rounded mb-2 flex justify-between items-center`;


         li.innerHTML = `
         <div class="flex flex-col w-full">
             <div>
                 <h3 class="font-bold">${task.title}</h3>
                 <p class="text-sm text-gray-600">${task.description || "No description"}</p>
                 <p class="text-xs ${textColor}">${task.status}</p>
             </div>
             <div class="flex flex-wrap md:flex-nowrap gap-2 mt-3">
                 ${task.status === "pending" ? 
                     `<button onclick="updateTask(${task.id}, 'in-progress')" 
                     class="w-full md:w-auto bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-all duration-300">
                         Move to In Progress
                     </button>` : ""}
     
                 ${task.status === "in-progress" ? 
                     `<button onclick="updateTask(${task.id}, 'completed')" 
                     class="w-full md:w-auto bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all duration-300">
                         Mark as Completed
                     </button>` : ""}
                 
                 <button onclick="deleteTask(${task.id})" 
                     class="w-full md:w-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all duration-300">
                     Delete
                 </button>
             </div>
         </div>`;

            taskList.appendChild(li);
        });
    } catch (error) {
        showMessage(error.message, "error");
    }
}

//update tasks
async function updateTask(id, newStatus) {
    try {
        const response = await fetch(`${apiBaseUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ status: newStatus })
        });

        if (response.status === 401) {
            showMessage("Session expired! Please login again.", "error");
            localStorage.removeItem("token");
            setTimeout(() => (window.location.href = "index.html"), 2000);
            return;
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update task");
        }

        showMessage("Task updated successfully!");
        fetchTasks();
    } catch (error) {
        showMessage(error.message, "error");
    }
}

//Add tasks
taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const title = document.getElementById("task-title").value;
    const description = document.getElementById("task-desc").value;
    const status = document.getElementById("task-status").value;

    try {
        const response = await fetch(apiBaseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title, description, status })
        });

        if (response.status === 401) {
            showMessage("Session expired! Please login again.", "error");
            localStorage.removeItem("token");
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
            return;
        }

        if (!response.ok) {
            throw new Error(`Failed to create task: ${response.statusText}`);
        }

        showMessage("Task added successfully!");
        taskForm.reset();
        fetchTasks();
    } catch (error) {
        showMessage(error.message, "error");
    }
});

//delete tasks
async function deleteTask(id) {
    if (!confirm("Are you sure you want to delete this task?")) return;
    
    try {
        const response = await fetch(`${apiBaseUrl}/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (response.status === 401) {
            showMessage("Session expired! Please login again.", "error");
            localStorage.removeItem("token");
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
            return;
        }

        if (!response.ok) {
            throw new Error(`Failed to delete task: ${response.statusText}`);
        }

        showMessage("Task deleted successfully!");
        fetchTasks();
    } catch (error) {
        showMessage(error.message, "error");
    }
}

fetchTasks();
