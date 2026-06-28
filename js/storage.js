const STORAGE_KEY = "tasks";

export const saveTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const loadTasks = () => {
  let savedTasks = localStorage.getItem(STORAGE_KEY);

  if (!savedTasks) return [];

  return JSON.parse(savedTasks);
};
