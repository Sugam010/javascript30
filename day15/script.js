// Select DOM elements
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-task-btn');
const toggleAllBtn = document.getElementById('toggle-all-btn');
const todoList = document.getElementById('todo-list');

// Load todos from localStorage or start with empty list
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Save todos to localStorage
function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Generate unique ID (like uuid)
function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

// Render all todos to the DOM
function renderTodos() {
  todoList.innerHTML = todos.map((todo, i) => {
    return `
      <li data-id="${todo.id}">
        <span class="${todo.isDone ? 'done' : ''}">${todo.task}</span>
        <button class="delete-btn">Delete</button>
        <button class="toggle-btn">${todo.isDone ? 'Done' : 'Mark As Done'}</button>
      </li>
    `;
  }).join('');
}

// Add new task
function addNewTask() {
  const taskText = input.value.trim();
  if (taskText === "") return;

  const newTask = {
    task: taskText,
    id: generateId(),
    isDone: false,
  };

  todos.push(newTask);
  saveToLocalStorage();
  renderTodos();
  input.value = "";
}

// Toggle individual task as done/undone
function toggleDone(id) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
  );
  saveToLocalStorage();
  renderTodos();
}

// Delete a task
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveToLocalStorage();
  renderTodos();
}

// Toggle all todos
function toggleAllTodos() {
  todos = todos.map(todo => ({
    ...todo,
    isDone: !todo.isDone,
  }));
  saveToLocalStorage();
  renderTodos();
}

// Handle clicks on the todo list (event delegation)
todoList.addEventListener('click', function (e) {
  const li = e.target.closest('li');
  const id = li.dataset.id;

  if (e.target.classList.contains('delete-btn')) {
    deleteTodo(id);
  } else if (e.target.classList.contains('toggle-btn')) {
    toggleDone(id);
  }
});

// Handle add task button click
addBtn.addEventListener('click', addNewTask);

// Handle Enter key
input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    addNewTask();
  }
});

// Toggle all done
toggleAllBtn.addEventListener('click', toggleAllTodos);

// Initial render
renderTodos();
