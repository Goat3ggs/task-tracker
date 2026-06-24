const form = document.querySelector(".task-form");
const input = document.querySelector(".task-form__input");
const taskList = document.querySelector(".task-list");

const tasks = [];

const addTask = () => {
  const inputValue = input.value.trim();

  if (inputValue === "") {
    console.log("enter a task");
    return;
  }
  const task = {
    id: Date.now(),
    title: inputValue,
    completed: false,
  };
  tasks.push(task);
  renderTasks();
};

const renderTasks = () => {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const listHTML = `<li id="${task.id}" class="task">
            ${task.title}
            <input type="checkbox" class="toggle-complete">
        </li>`;
    taskList.insertAdjacentHTML("beforeend", listHTML);
  });
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask();
  input.value = "";
});
