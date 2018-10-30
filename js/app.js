// Accessing DOM Elements 
const ul = document.querySelector('.tasks-collection');
const taskinput = document.querySelector('.task-input');
const addtaskbtn = document.querySelector('.add-task');
const cleartaskbtn = document.querySelector('.clear-task');
const filter = document.querySelector('.filter');
//const delItem = document.querySelector('.delete-item');

loadEventListeners();

//Loading Event Listeners
function loadEventListeners(){
    addtaskbtn.addEventListener('click', addtask);
    cleartaskbtn.addEventListener('click',cleartasks);
    filter.addEventListener('keyup',filtertasks);
    ul.addEventListener('click',deleteItem);
    document.addEventListener('DOMContentLoaded',getTasks);
}

//get tasks from the localStorage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')!=null){
        tasks = JSON.parse(localStorage.getItem('tasks'));
        for(let x in tasks){
            const listItem = document.createElement('li');
            listItem.appendChild(document.createTextNode(tasks[x]));
            listItem.className="list-group-item list-item justify-content-between d-flex";
            //Create a Link
            const a = document.createElement('a');
            a.className="delete-item";
            a.setAttribute('href', "#");
            a.innerHTML='<i class="fa fa-remove"></i>';
            //Append the child elements to the parent
            listItem.appendChild(a);
            ul.appendChild(listItem);  
        }
    }
}


//Add task Function
function addtask(e){
    // Create a list item
    if(taskinput.value===''){
        alert('Please enter a task!!')
    }
    else{
        const li = document.createElement('li');
        li.className="list-group-item list-item justify-content-between d-flex";
        li.appendChild(document.createTextNode(taskinput.value));
        //Create a Link
        const a = document.createElement('a');
        a.className="delete-item";
        a.setAttribute('href', "#");
        a.innerHTML='<i class="fa fa-remove"></i>';
        //Append the child elements to the parent
        li.appendChild(a);
        ul.appendChild(li);
        //Store task in Local Storage
        storeTaskInLocalStorage(taskinput.value);
        taskinput.value='';
    }
}

//Store task in local storage
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks= JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Clear All tasks Function
function cleartasks(e)
{
   // ul.innerHTML='';

   // A much faster way of doing the same
    if(ul.childNodes.length!=0){
        if(confirm('Do you want to continue?')){
            while(ul.firstChild){
                ul.removeChild(ul.firstChild);
            }
            localStorage.clear();
        }
    }

    e.preventDefault();
}

//Delete individual Items
function deleteItem(e)
{
    e.preventDefault();
    if(e.target.parentElement.classList.contains('delete-item')){
       ul.removeChild(e.target.parentElement.parentElement);
       removeFromLS(e.target.parentElement.parentElement.textContent);
    }
    
}

//Delete individual items from localstorage
function removeFromLS(taskItem){
        let ls;
        if(localStorage.getItem('tasks')!=null){
            ls = JSON.parse(localStorage.getItem('tasks'));
            let index = ls.indexOf(taskItem);
            ls.splice(index,1);
            console.log(ls);
            localStorage.setItem('tasks',JSON.stringify(ls));
        }
        else{
            ls=[];
        }
}

//Filtering tasks
function filtertasks(e){
   let val = e.target.value.toLowerCase();
   let li = document.querySelectorAll('.list-item');
   li.forEach(function(item){
        let text = item.textContent.toLowerCase();
        if(text.includes(filter.value)){
            item.classList.add('d-flex');
            item.style.display="block";
            //console.log(item);
        }
        else{
            item.classList.remove('d-flex');
            item.style.display="none";
        }
        
   });
  
}