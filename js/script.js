const input = document.querySelector('.todo-input');
const items = document.querySelector('.tasks');
let tasks = [];
getFromLocalStorage();
input.addEventListener("keydown",function(event){
  if (event.key === "Enter"){
    event.preventDefault();
    addTask(input.value);
  }
});

function addTask(item){
  if(item!=''){
    const data={
      id: Date.now(),
      name: item,
      comp: false
    };
    tasks.push(data);
    addToLocalStorage(tasks);
    input.value='';
  }
}
function getFromLocalStorage(){
    const ref = localStorage.getItem('tasks');
    if(ref){
        tasks=JSON.parse(ref);
        renderTask(tasks);
    }
}

function addToLocalStorage(tasks){
    localStorage.setItem('tasks',JSON.stringify(tasks));
    renderTask(tasks);
}
function renderTask(todos){
  items.innerHTML='';
  todos.forEach(function(item){
    let checked = item.comp ? 'checked': null;
    const li = document.createElement('li');
    li.setAttribute('class','item');
    li.setAttribute('data-key',item.id);
    if (item.comp === true) {
      li.classList.add('checked');
    }
    li.innerHTML = `
      <button class="del-btn">X</button>
      <button class="edit-btn">i</button>
      <input class="checkbox" type="checkbox" ${checked }>
      ${item.name}
    `;
    items.append(li);
  });
}
function toggle(id){
    tasks.forEach(function(task){
        if(task.id==id){
            task.comp=!task.comp;
        }
    });
    addToLocalStorage(tasks);
}
function delTodo(id){
    tasks=tasks.filter(function(task){
        return task.id!=id;
    });
    addToLocalStorage(tasks);
}
function editTodo(id){
    tasks.forEach(function(task){
        if(task.id==id){
            input.value=task.name;
            delTodo(id);
        }
    });
    addToLocalStorage(tasks);
}
items.addEventListener('click',function(event){
    if(event.target.type=='checkbox'){
        toggle(event.target.parentElement.getAttribute('data-key'));
    }
    if(event.target.classList.contains('del-btn')){
        delTodo(event.target.parentElement.getAttribute('data-key'));
    }
    if(event.target.classList.contains('edit-btn')){
        editTodo(event.target.parentElement.getAttribute('data-key'));
    }
});