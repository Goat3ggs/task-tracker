export const filterTasks = (tasks, filterType) => {
  if (filterType === "completed") {
    return tasks.filter((task) => task.completed === true);
  }

  if (filterType === "active") {
    return tasks.filter((task) => task.completed === false);
  }

  return tasks;
};

export const searchTasks = (tasks, searchValue) => {
  const normalizedValue = searchValue.toLowerCase().trim();

  return tasks.filter((task) =>
    task.title.toLowerCase().includes(normalizedValue),
  );
};
