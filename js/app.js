import { renderTask, renderTasks } from "./render.js";
import { saveTasks, loadTasks } from "./storage.js";
import { filterTasks, searchTasks } from "./filters.js";

const form = document.querySelector(".task-form");
const input = document.querySelector(".task-form__input");
const taskList = document.querySelector(".task-list");
const filtersContainer = document.querySelector(".filters");
const searchInput = document.querySelector("[data-search]");

let tasks = [];

searchInput.addEventListener("input", () => {
  const searchedTasks = searchTasks(tasks, searchInput.value);
  renderTasks(taskList, searchedTasks);
});

const addTask = () => {
  const inputValue = input.value.trim();

  if (!inputValue) return;

  const task = {
    id: Date.now(),
    title: inputValue,
    completed: false,
  };

  tasks.push(task);
  renderTask(taskList, task); // doar unul nou
  saveTasks(tasks);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask();

  input.value = "";
});

const deleteTask = (event) => {
  const deleteBtn = event.target.closest(".button--delete[data-task-id]");

  if (!deleteBtn) return;

  const taskId = Number(deleteBtn.dataset.taskId);

  // 1. scoți din array
  tasks = tasks.filter((task) => task.id !== taskId);

  saveTasks(tasks);
  renderTasks(taskList, tasks);
};

const editTask = (event) => {
  const editBtn = event.target.closest(".button--edit[data-task-id]");

  if (!editBtn) return;

  const taskId = Number(editBtn.dataset.taskId);
  const task = tasks.find((task) => task.id === taskId);

  if (!task) return;

  const newTitle = prompt("Edit this text", task.title);

  if (newTitle === null) return;

  const cleanTitle = newTitle.trim();

  if (!cleanTitle) return;

  task.title = cleanTitle;

  saveTasks(tasks);
  renderTasks(taskList, tasks);
};

const toggleComplete = (event) => {
  const checkbox = event.target.closest("input[data-task-id]");

  if (!checkbox) return;

  const taskId = Number(checkbox.dataset.taskId);
  const task = tasks.find((task) => task.id === taskId);

  if (!task) return;

  task.completed = checkbox.checked;

  saveTasks(tasks);
  renderTasks(taskList, tasks);
};

filtersContainer.addEventListener("click", (event) => {
  const clickedBtn = event.target.closest("button");

  if (!clickedBtn) return;

  const filterType = clickedBtn.dataset.filter;
  const filteredTasks = filterTasks(tasks, filterType);

  renderTasks(taskList, filteredTasks);
});

taskList.addEventListener("click", (event) => {
  deleteTask(event);
  editTask(event);
  toggleComplete(event);
});

tasks = loadTasks();
renderTasks(taskList, tasks);
