//Tüm elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() { // Tüm event listenerlar
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
  secondCardBody.addEventListener("click",deleteTodo);

}
function deleteTodo(e){
  if(e.target.className==="fa fa-remove"){
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success","Todo başarıyla silindi...");
  }
}
function deleteTodoFromStorage(deleteTodo){
  
  let todos=getTodosFromStorage();

  todos.forEach(function(todo,index){
    if(todo===deleteTodo){
      todos.splice(index,1); // Arrayden değerimizi silebiliriz
    }
  });

  localStorage.setItem("todos",JSOn.stringify(todos));
}
function loadAllTodosToUI(){
  let todos=getTodosFromStorage();

  todos.forEach(function(todo){
    addTodoToUI(todo);
  })
}
function addTodo(e) {
  const newTodo = todoInput.value.trim();

  if (newTodo===""){
    showAlert("danger","Lütfen bir todo giriniz...");
  }
  else{
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);

    showAlert("success","Todo başariyla eklendi...");
  }
  

  e.preventDefault();
}

function getTodosFromStorage(){//Storagedan todoları almak
  let todos;

  if (localStorage.getItem("todos")===null){
    todos=[];
  }
  else{
    todos= JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function addTodoToStorage(newTodo){

  let todos=getTodosFromStorage();

  todos.push(newTodo);

  localStorage.setItem("todos",JSON.stringify(todos)); // değer güncelleme

}
function showAlert(type,message){
  const alert=document.createElement("div");
  alert.className=`alert alert-${type}`;
  alert.textContent=message;
  firstCardBody.appendChild(alert);
  
  //settimeout metodu
  setTimeout(function(){
      alert.remove();
  },1000);
}
function addTodoToUI(newTodo) {//Aldığı string  değerini list item olarak UI'a eklyecek.

     //List item oluşturma
     const listItem=document.createElement("li");
     //Link oluşturma
     const link=document.createElement("a");
     link.href="#";
     link.className="delete-item";
     link.innerHTML="<i class='fa fa-remove'></i>";

     listItem.className="list-group-item d-flex justify-content-between";
     
     //Text Node ekleme
     listItem.appendChild(document.createTextNode(newTodo));
     listItem.appendChild(link);

     //Todo liste list item i ekleme
     todoList.appendChild(listItem);

     todoInput.value="";

}



















