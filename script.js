// Add this at the beginning of your script.js file
const themeToggle = document.getElementById('themeToggle');
let isDark = localStorage.getItem('theme') === 'dark';

// Function to update theme
function updateTheme() {
    if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
        document.querySelector('h1').style.color = '#ffffff';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.textContent = '🌙';
        document.querySelector('h1').style.color = '#000000';
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Initialize theme
updateTheme();

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    updateTheme();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const prioritySelect = document.getElementById('prioritySelect');
    
    if (taskInput.value.trim() === '') {
        alert('Please enter a task!');
        return;
    }

    const li = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.textContent = taskInput.value;

    // Clone the priority select
    const taskPrioritySelect = prioritySelect.cloneNode(true);
    taskPrioritySelect.value = prioritySelect.value; // Copy the selected value
    
    taskPrioritySelect.onchange = function() {
        updatePriorityColor(li, this.value);
    };

    const buttonDiv = document.createElement('div');
    buttonDiv.className = 'task-buttons';

    // Add done button
    const doneButton = document.createElement('button');
    doneButton.textContent = '✓';
    doneButton.className = 'done-btn';
    doneButton.onclick = function() {
        taskText.classList.add('done');
        li.classList.add('completed-task');
        // Remove edit and done buttons
        doneButton.remove();
        editButton.remove();
    };

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-btn';
    editButton.onclick = function() {
        const newTask = prompt('Edit task:', taskText.textContent);
        if (newTask !== null && newTask.trim() !== '') {
            taskText.textContent = newTask;
        }
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = function() {
        if (confirm('Are you sure you want to delete this task?')) {
            li.remove();
        }
    };

    buttonDiv.appendChild(doneButton);
    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(deleteButton);
    li.appendChild(taskText);
    li.appendChild(taskPrioritySelect);
    li.appendChild(buttonDiv);
    taskList.appendChild(li);
    
    // Set initial priority color based on selected value
    updatePriorityColor(li, prioritySelect.value);
    taskInput.value = '';
}

function updatePriorityColor(li, priority) {
    switch(priority) {
        case 'high':
            li.style.borderLeft = '5px solid #ff4444';
            break;
        case 'medium':
            li.style.borderLeft = '5px solid #ffa500';
            break;
        case 'low':
            li.style.borderLeft = '5px solid #4CAF50';
            break;
    }
}

// Add task when Enter key is pressed
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});