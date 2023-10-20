const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const todoDataFile = 'todo-data.json';

const saveDataToFile = (data) => {
  fs.writeFileSync(todoDataFile, JSON.stringify(data, null, 2));
};

const loadDataFromFile = () => {
  try {
    const data = fs.readFileSync(todoDataFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Function to add a task to the Todo List
const addTask = (task) => {
  // Load existing tasks from file
  const tasks = loadDataFromFile();

  // Check if the task is valid
  if (task.trim() === '') {
    console.log('Task cannot be empty.');
    return;
  }

  // Add the task to the Todo List
  tasks.push({ id: Date.now(), task });
  saveDataToFile(tasks);
  console.log('Task added successfully.');
};

// Function to update a task in the Todo List
const updateTask = (taskId, updatedTask) => {
  // Load existing tasks from file
  const tasks = loadDataFromFile();

  // Find the task with the given ID
  const taskToUpdate = tasks.find((task) => task.id === taskId);

  if (!taskToUpdate) {
    console.log('Task not found.');
    return;
  }

  // Update the task's description
  taskToUpdate.task = updatedTask;
  saveDataToFile(tasks);
  console.log('Task updated successfully.');
};

// Function to delete a task from the Todo List
const deleteTask = (taskId) => {
  // Load existing tasks from file
  let tasks = loadDataFromFile();

  // Filter out the task with the given ID
  tasks = tasks.filter((task) => task.id !== taskId);

  if (tasks.length === 0) {
    console.log('No tasks found.');
    return;
  }

  saveDataToFile(tasks);
  console.log('Task deleted successfully.');
};

// Function to display all tasks in the Todo List
const displayTasks = () => {
  // Load existing tasks from file
  const tasks = loadDataFromFile();

  if (tasks.length === 0) {
    console.log('No tasks found.');
    return;
  }

  console.log('Tasks:');
  tasks.forEach((task) => {
    console.log(`- [${task.id}] ${task.task}`);
  });
};

// Export the functions
module.exports = {
  addTask,
  updateTask,
  deleteTask,
  displayTasks,
};

// Prompt the user for input
rl.question('Enter a command (add/update/delete/display): ', (command) => {
  if (command === 'add') {
    rl.question('Enter a task: ', (task) => {
      addTask(task);
      rl.close();
    });
  } else if (command === 'update') {
    rl.question('Enter the task ID to update: ', (taskId) => {
      rl.question('Enter the updated task: ', (updatedTask) => {
        updateTask(Number(taskId), updatedTask);
        rl.close();
      });
    });
  } else if (command === 'delete') {
    rl.question('Enter the task ID to delete: ', (taskId) => {
      deleteTask(Number(taskId));
      rl.close();
    });
  } else if (command === 'display') {
    displayTasks();
    rl.close();
  } else {
    console.log('Invalid command.');
    rl.close();
  }
});