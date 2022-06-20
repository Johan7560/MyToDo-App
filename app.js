//selectors
const input = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".custom-select");

//event listeneres
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getLocalTodos);

//functions
function addTodo(event) {
  //prevent form from subiting
  event.preventDefault();
  if (input.value != "") {
    //create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create li
    const newTodo = document.createElement("p");
    newTodo.innerText = input.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //add todo to local storage
    saveLocalTodos(input.value);
    //check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-button");
    todoDiv.appendChild(completedButton);
    //delete todo button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-button");
    todoDiv.appendChild(deleteButton);
    //Append to the new div
    todoList.appendChild(todoDiv);
    //clear input box
    input.value = "";
  }
}
//this function is used to delete and mark todos as completed
function deleteCheck(event) {
  const item = event.target;
  const todo = item.parentElement;
  //checks if the delete button was clicked, if so the todo is deleted
  if (item.classList[0] === "delete-button") {
    //animation
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
    //remove from local storage
    removeLocalTodos(todo);
  } else if (item.classList[0] === "complete-button") {
    //this runs of the completed button was clicked
    todo.classList.toggle("completed");
  }
}

//this function allows you to filter the todos
function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    //checks what is selected after a user has clicked and displays certain todos acordingly
    switch (event.target.id) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (todo.classList.contains("completed")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }
        break;
    }
  });
}

//function to save todos to local storage
function saveLocalTodos(todo) {
  let todos;
  //checks if there is todos in local storage
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //adds new todo to the lst
  todos.push(todo);
  //overwrites local storage with the new list of todos
  localStorage.setItem("todos", JSON.stringify(todos));
}

//function to get todos from local storage
function getLocalTodos() {
  let todos;
  //checks if local storage has any todos stored
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //adds all todos from local storage to the list
  todos.forEach(function (todo) {
    //create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create li
    const newTodo = document.createElement("p");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-button");
    todoDiv.appendChild(completedButton);
    //delete todo button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-button");
    todoDiv.appendChild(deleteButton);
    //Append to the new div
    todoList.appendChild(todoDiv);
  });
}

//this function removes selected todos from local storage when a user chooses to delelte them
function removeLocalTodos(todo) {
  let todos;
  //this takes todos from local storage
  todos = JSON.parse(localStorage.getItem("todos"));
  //get the text from the todo
  const todoText = todo.children[0].innerText;
  //removes the todo selected from list of todos
  todos.splice(todos.indexOf(todoText), 1);
  //over writes local storage with the new todo
  localStorage.setItem("todos", JSON.stringify(todos));
}

//Select Box Code:

//this checks if the box is clicked if it is, then it is added the class open. which makes the options visible
document
  .querySelector(".custom-select-wrapper")
  .addEventListener("click", function () {
    this.querySelector(".custom-select").classList.toggle("open");
  });

//this loop checks if any of the options have been selected, and acts acordingly, it also highlights the currently selected object
for (const option of document.querySelectorAll(".custom-option")) {
  option.addEventListener("click", function () {
    if (!this.classList.contains("selected")) {
      this.parentNode
        .querySelector(".custom-option.selected")
        .classList.remove("selected");
      this.classList.add("selected");
      this.closest(".custom-select").querySelector(
        ".custom-select__trigger span"
      ).textContent = this.textContent;
    }
  });
}

//this function just makes sure if the user clicks anywhere else on the screen that the select box is closed.
window.addEventListener("click", function (event) {
  const select = document.querySelector(".custom-select");
  if (!select.contains(event.target)) {
    select.classList.remove("open");
  }
});
