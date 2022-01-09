const addTaskBtn = document.getElementById('add-task-btn');
const deskTaskinput = document.getElementById('description-task');
const todosWrapper = document.querySelector('.todos-wrapper');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));   // создание локальной истории

let todoItemElems = [];

function Task(description) {
    this.description = description;
    this.completed = false;
}

const createTemlate = (task, index) => {  // динамическое добавление tasks, очищение строки после добавление task, вызов index по нажатию на кнопки
    return `
        <div class="todo-item ${task.completed ? 'checked' : ''}">
            <div class="description">${task.description}</div>
            <div class="buttons">
                <input onclick="comleteTask(${index})" class="btn-comlete" type="checkbox" ${task.completed ? 'checked' : ''}>
                <button onclick="deleteTask(${index})" class="btn-delete">Delete</button>
            </div>
        </div>
    `
}

const filterTasks = () => {  // фильтрует tasks по нажатию на кнопку completed
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);  // невыполненные задачи
    const comletedTasks = tasks.length && tasks.filter(item => item.completed == true); // выполненные задачи
    tasks = [...activeTasks, ...comletedTasks];
}

const fillHtmlList = () => {  // преобразованный tasks и перебираем tasks
    todosWrapper.innerHTML = "";
    if(tasks.length > 0) {
        filterTasks();
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML += createTemlate(item, index);
        });
        todoItemElems = document.querySelectorAll('.todo-item');
    }
}

fillHtmlList();


const updatelocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));  // обновление локальной истории tasks
}

const comleteTask = index => {  // добавление к массиву строку 'cheked' через кнопку completed 
    //console.log(index); проверка работы кнопки completed
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        todoItemElems[index].classList.add('checked');
    }else {
        todoItemElems[index].classList.remove('checked');
    }
    updatelocal();
    fillHtmlList();
}

addTaskBtn.addEventListener('click', () => {  // добавление task через слушателя 
    tasks.push(new Task(deskTaskinput.value));
    updatelocal();
    fillHtmlList();
    deskTaskinput.value = '';
})

const deleteTask = index => {   // удаление task
    todoItemElems[index].classList.add('delition');
    setTimeout(() => {
        tasks.splice(index, 1);
        updatelocal();
        fillHtmlList();      
    },500)
}