let task = document.querySelector('input[type="text"]');
let time = document.querySelector('input[type="time"]');
const button = document.querySelector('button');
const list = document.querySelector('.listContainer');
const timelist = document.querySelector('.timeContainer');

button.addEventListener('click', addtask);

function addtask() {
    if (task.value === "" && time.value === "") {
        alert("Please Enter any task and a time");
    } else if (time.value === "") {
        alert("Please enter a time.");
    } else if (task.value === "") {
        alert("Please enter a task");
    } else {
        // Create task list item
        const li = document.createElement("li");
        li.textContent = `${task.value}`;

        // Create time list item
        const li2 = document.createElement("li");
        li2.textContent = `${time.value}`;

        // Create delete span
        const span = document.createElement('span');
        span.innerHTML = '<i class="fas fa-times"></i>';
        span.classList.add('delete');
        saveToLocalStorage()
        // Add event listener to span
        span.addEventListener('click', function () {
            li.remove();     // remove the task
            li2.remove();    // remove the corresponding time
            saveToLocalStorage()
        });

        // Append delete button to task and add to list
        li.appendChild(span);
        list.appendChild(li);
        timelist.appendChild(li2);
        saveToLocalStorage()
        // Clear inputs
        time.value = "";
        task.value = "";
    }
}
function saveToLocalStorage() {
    const tasks = [];
    const times = [];

    document.querySelectorAll('.listContainer li').forEach(li => {
        // remove 'X' span text from task text
        tasks.push(li.firstChild.textContent.trim());
    });

    document.querySelectorAll('.timeContainer li').forEach(li => {
        times.push(li.textContent.trim());
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('times', JSON.stringify(times));
}

function loadFromLocalStorage() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    const savedTimes = JSON.parse(localStorage.getItem('times'));

    if (savedTasks && savedTimes && savedTasks.length === savedTimes.length) {
        for (let i = 0; i < savedTasks.length; i++) {
            const li = document.createElement('li');
            li.textContent = savedTasks[i];

            const span = document.createElement('span');
            span.innerHTML = '<i class="fas fa-times"></i>';
            span.classList.add('delete');

            span.addEventListener('click', function () {
                li.remove();
                li2.remove();
                saveToLocalStorage();
            });

            li.appendChild(span);

            const li2 = document.createElement('li');
            li2.textContent = savedTimes[i];

            list.appendChild(li);
            timelist.appendChild(li2);
        }
    }
}

// Call it once after defining it
loadFromLocalStorage();


