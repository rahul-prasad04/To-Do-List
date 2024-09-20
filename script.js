// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.todo-container').classList.toggle('dark-mode');
}

// Function to add a task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const dueDateInput = document.getElementById('dueDateInput');
    const categorySelect = document.getElementById('categorySelect');
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;
    const dueDate = dueDateInput.value;
    const category = categorySelect.value;

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.innerHTML = `${taskText} [${category}] <br> Due: ${new Date(dueDate).toLocaleString()}`;
    li.classList.add(priority);
    li.setAttribute('data-category', category);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.onclick = function () {
        editTask(li, taskText, priority, dueDate, category);
    };

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');
    removeBtn.onclick = function () {
        taskList.removeChild(li);
        updateProgress(); // Update the progress bar when a task is removed
    };

    li.appendChild(editBtn);
    li.appendChild(removeBtn);
    li.onclick = function () {
        li.classList.toggle('completed');
        updateProgress(); // Update the progress bar when a task is marked as completed
    };

    taskList.appendChild(li);
    taskInput.value = '';
    dueDateInput.value = '';

    updateProgress(); // Update the progress bar when a new task is added

    const timeUntilDue = new Date(dueDate).getTime() - new Date().getTime();
    if (timeUntilDue > 0) {
        setTimeout(function () {
            alert(`Reminder: Task "${taskText}" is due!`);
        }, timeUntilDue);
    }
}

// Function to edit a task
function editTask(li, taskText, priority, dueDate, category) {
    const newTaskText = prompt('Edit task:', taskText);
    if (newTaskText !== null && newTaskText.trim() !== '') {
        li.innerHTML = `${newTaskText} [${category}] <br> Due: ${new Date(dueDate).toLocaleString()}`;
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.onclick = function () {
            editTask(li, newTaskText, priority, dueDate, category);
        };
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.onclick = function () {
            li.remove();
            updateProgress(); // Update the progress bar when a task is removed
        };
        li.appendChild(editBtn);
        li.appendChild(removeBtn);
        li.classList.add(priority);
    }
    updateProgress(); // Update the progress bar when a task is edited
}

// Function to update progress bar
function updateProgress() {
    const taskList = document.getElementById('taskList');
    const tasks = taskList.querySelectorAll('li'); // All tasks
    const completedTasks = taskList.querySelectorAll('li.completed').length; // Completed tasks

    // Calculate progress percentage
    const progressPercent = tasks.length ? (completedTasks / tasks.length) * 100 : 0;

    // Update the progress bar and percentage text
    const progressBar = document.getElementById('progressBar');
    const progressPercentText = document.getElementById('progressPercent');
    progressBar.value = progressPercent;
    progressPercentText.textContent = `${Math.round(progressPercent)}%`;
}
