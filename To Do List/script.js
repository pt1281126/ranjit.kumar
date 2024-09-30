// Select DOM elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Load todos from localStorage
document.addEventListener('DOMContentLoaded', loadTodos);

// Add event listener for form submission
todoForm.addEventListener('submit', addTodo);

// Load todos from localStorage
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => createTodoElement(todo.text, todo.completed));
}

// Add a new todo item
function addTodo(event) {
    event.preventDefault();
    const todoText = todoInput.value.trim();

    if (todoText !== '') {
        createTodoElement(todoText, false);
        saveTodoToLocalStorage(todoText, false);
        todoInput.value = '';
    }
}

// Create a new todo element and append it to the list
function createTodoElement(todoText, completed) {
    const li = document.createElement('li');
    li.className = `todo-item ${completed ? 'completed' : ''}`;

    // Checkbox button to mark complete
    const completeBtn = document.createElement('button');
    completeBtn.className = 'mark-complete';
    completeBtn.innerHTML = completed ? '&#x2714;' : '&#x25CB;'; // Tick and empty circle icon
    completeBtn.onclick = () => confirmComplete(li, todoText);

    const textSpan = document.createElement('span');
    textSpan.innerText = todoText;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '&times;'; // Delete icon
    deleteBtn.onclick = () => confirmDelete(li, todoText);

    li.appendChild(completeBtn);
    li.appendChild(textSpan);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
}

// Confirm completion
function confirmComplete(todoElement, todoText) {
    const isCompleted = todoElement.classList.contains('completed');
    const confirmation = confirm(`Are you sure you want to mark this task as ${isCompleted ? 'incomplete' : 'complete'}?`);
    if (confirmation) {
        toggleComplete(todoElement, todoText);
    }
}

// Toggle complete status of todo
function toggleComplete(todoElement, todoText) {
    todoElement.classList.toggle('completed');
    const completed = todoElement.classList.contains('completed');
    updateTodoStatusInLocalStorage(todoText, completed);

    // Update button icon based on completion
    const button = todoElement.querySelector('.mark-complete');
    button.innerHTML = completed ? '&#x2714;' : '&#x25CB;'; // Update icon to tick or empty circle
}

// Confirm deletion
function confirmDelete(todoElement, todoText) {
    const confirmation = confirm('Are you sure you want to delete this task?');
    if (confirmation) {
        removeTodoElement(todoElement, todoText);
    }
}

// Save todo to localStorage
function saveTodoToLocalStorage(todoText, completed) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push({ text: todoText, completed });
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Remove todo element and update localStorage
function removeTodoElement(todoElement, todoText) {
    todoElement.remove();
    removeTodoFromLocalStorage(todoText);
}

// Remove todo from localStorage
function removeTodoFromLocalStorage(todoText) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(todo => todo.text !== todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Update the completion status of the todo in localStorage
function updateTodoStatusInLocalStorage(todoText, completed) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.map(todo =>
        todo.text === todoText ? { ...todo, completed } : todo
    );
    localStorage.setItem('todos', JSON.stringify(todos));
}
