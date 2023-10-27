const todoForm = document.getElementById('todo_form');
const todoInput = document.getElementById('todo_input');
const todoList = document.getElementById('todo_list');

todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo();
});

function addTodo() {
    const text = todoInput.value;
    if(text === '')return;

    const item = document.createElement('li');
    item.innerHTML = `
    <div class="items">
        <div>
            <p>${text}</p>
        </div>
        <div>
         <button class="remove" onclick="removeTodo(this)">Elimina</button>
        </div>
    </div>
    `;
    todoList.appendChild(item);

    todoInput.value = '';
}

function removeTodo(button) {
    const item = button.parentNode;
    todoList.removeChild(item);
}
