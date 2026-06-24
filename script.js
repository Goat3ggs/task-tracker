const form = document.querySelector(".task-form");
const input = document.querySelector(".task-form__input");
const taskList = document.querySelector(".task-list");

let tasks = [];
const taskElements = new Map();

const addTask = () => {
  const inputValue = input.value.trim();

  if (!inputValue) return;

  const task = {
    id: Date.now(),
    title: inputValue,
    completed: false,
  };

  tasks.push(task);
  renderTask(task); // doar unul nou
  saveTasks();
};

const renderTask = (task) => {
  const li = document.createElement("li");
  li.className = "task";
  li.id = task.id;

  li.innerHTML = `
    <span>${task.title}</span>
    <div class="editable">
      <label class="check-container">
        <input 
            type="checkbox"
            class="toggle-complete"
            data-task-id="${task.id}"
            ${task.completed ? "checked" : ""}
        >
        <div class="checkmark"></div>
      </label>
      <button class="delete-btn" data-task-id="${task.id}">  <svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg></button>
    </div>
  `;

  li.classList.toggle("task--completed", task.completed);
  taskList.appendChild(li);
  taskElements.set(task.id, li);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask();

  input.value = "";
});

const deleteTask = (event) => {
  const deleteBtn = event.target.closest("button[data-task-id]");

  if (!deleteBtn) return;

  const taskId = Number(deleteBtn.dataset.taskId);

  // 1. scoți din array
  tasks = tasks.filter((task) => task.id !== taskId);
  saveTasks();

  // 2. scoți din DOM direct
  const element = taskElements.get(taskId);
  if (element) {
    element.remove();
    taskElements.delete(taskId);
  }
};

const toggleComplete = (event) => {
  const checkbox = event.target.closest("input[data-task-id]");

  if (!checkbox) return;

  const taskId = Number(checkbox.dataset.taskId);
  const task = tasks.find((task) => task.id === taskId);

  if (!task) return;

  task.completed = checkbox.checked;
  saveTasks();
  const element = taskElements.get(taskId);
  if (!element) return;

  element.classList.toggle("task--completed", task.completed);
};

const saveTasks = () => {
  const myJSON = JSON.stringify(tasks);
  localStorage.setItem("testJSON", myJSON);
};

const loadTasks = () => {
  let text = localStorage.getItem("testJSON");

  if (!text) return;

  let loadedTasks = JSON.parse(text);
  console.log("tasks incarcate:", loadedTasks);

  loadedTasks.forEach((task) => {
    tasks.push(task);
    renderTask(task);
  });
};

taskList.addEventListener("click", (event) => {
  deleteTask(event);
  toggleComplete(event);
});

loadTasks();
