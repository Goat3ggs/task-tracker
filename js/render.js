export const renderTask = (taskList, task) => {
  const li = document.createElement("li");
  li.className = "task";
  li.dataset.taskId = task.id;

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
      <button class="task-button button--delete" data-task-id="${task.id}">  <svg viewBox="0 0 448 512" class="svgIcon--delete"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg></button>

      <button class="task-button button--edit" data-task-id="${task.id}"><img class="svgIcon--edit" src="./edit-button.svg"></button>
    </div>
  `;

  li.classList.toggle("task--completed", task.completed);
  taskList.appendChild(li);
};

export const renderTasks = (taskList, tasksToRender) => {
  taskList.innerHTML = "";

  tasksToRender.forEach((task) => {
    renderTask(taskList, task);
  });
};
