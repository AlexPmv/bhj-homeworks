const tasksList = document.getElementById('tasks__list');
const tasksInput = document.getElementById('task__input');
const taskAddButton = document.getElementById('tasks__add');

tasksList.addEventListener('click', (event) => {
    if (event.target.classList.contains('task__remove')) {
        localStorage.removeItem(event.target.dataset.key);
        event.target.closest('.task').remove();
    };
});

tasksInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter' && tasksInput.value) {
        addTaskToList();
    };
});

taskAddButton.addEventListener('click', () => {
    if (tasksInput.value) {
        addTaskToList();
    };    
});
    
function addTaskToList() {
    const newTask = 
        `<div class="task">
            <div class="task__title">
                ${tasksInput.value}
            </div>
            <a href="#" class="task__remove" data-key="task_${generateTaskKeyNumber()}">&times;</a>
        </div>`;

    localStorage[`task_${generateTaskKeyNumber()}`] = newTask;
    tasksList.innerHTML += newTask;
    tasksInput.value = '';  
};

function generateTaskKeyNumber() {
    let i = 1;

    while (localStorage[`task_${i}`]) {
      i++;
    };

    return i;
};

function getTaskListFromLocalStorage() {
    const LocalStorageKeys = Object.keys(localStorage).reverse();

    LocalStorageKeys.forEach((key) => {
        tasksList.innerHTML += localStorage[key];
    });

};

getTaskListFromLocalStorage();



