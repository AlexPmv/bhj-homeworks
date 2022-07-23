const tasksList = document.getElementById('tasks__list');
const tasksInput = document.getElementById('task__input');
const taskAddButton = document.getElementById('tasks__add');

tasksList.addEventListener('click', (event) => {
    if (event.target.classList.contains('task__remove')) {
        localStorage.removeItem(event.target.dataset.key);
        event.target.closest('.task').remove();
    };
});

taskAddButton.addEventListener('click', () => {
    let trimedTaskValue = tasksInput.value.trim();
    tasksInput.value = trimedTaskValue;
    if (trimedTaskValue) {
        if (checkTaskForDubling(trimedTaskValue)) {
            alert('Такая задача уже есть в списке');
            tasksInput.value = '';
            return;
        }
        addTaskToList();
    };    
});
    
function addTaskToList() {
    const taskValue = tasksInput.value;
    const taskId = generateTaskKeyNumber();

    tasksList.innerHTML +=
        `<div class="task">
            <div class="task__title">
                ${tasksInput.value}
            </div>
            <a href="#" class="task__remove" data-key="task_${taskId}">&times;</a>
        </div>`;

    localStorage[`task_${taskId}`] = taskValue;
    tasksInput.value = '';  
};

function generateTaskKeyNumber() {
    let i = 1;

    while (localStorage[`task_${i}`]) {
      i++;
    };

    return i;
};

function checkTaskForDubling(value) {
    const valueArrayInList = Object.values(localStorage);
    return valueArrayInList.includes(value);
}

function getTaskListFromLocalStorage() {
    const LocalStorageKeys = Object.keys(localStorage).filter((key) => key.includes('task_'));

    LocalStorageKeys.forEach((key) => {
        tasksList.innerHTML += 
        `<div class="task">
            <div class="task__title">
                ${localStorage[key]}
            </div>
            <a href="#" class="task__remove" data-key="${key}">&times;</a>
        </div>`;
    });
};

getTaskListFromLocalStorage();

