let clientWidth = document.documentElement.clientWidth;

function start(){
    id = localStorage.getItem("countID");
    if(JSON.parse(localStorage.getItem("todoList") || "{}").length >= 1){
        todoList = JSON.parse(localStorage.getItem("todoList") || "{}");
    }
    printCard();
}

function printCard(){
    for(let i=0; i<todoList.length; i++){
        $(`#todolist`).append(`<div>${todoList[i]._name}</div>`);
        $(`#todolist`).append(`<div>${todoList[i]._description}</div>`);
        $(`#todolist`).append(`<div>${todoList[i]._assignedTo}</div>`);
        $(`#todolist`).append(`<div>${todoList[i]._dueDate}</div>`);
    }

}

function addTask() {
    document.getElementById("addTaskBtn").classList.add("addtesk");
    addBackgroungBlock();

    $("body").append(`<div id="form" class="form"></div>`);
    $(`#form`).append(`<form id="addtask" class="d-inline" name="name" onsubmit="return validateForm()">
        <p>Add task</p>
        <div>Name: </div><input type="text" name="fname" id="fname" class="w-100">
        <div>Description: </div><input type="text" name="fDescription" id="fDescription" class="w-100 description">
        <div>Duedate: </div><input type="date" name="fDueDate" id="fDueDate" class="w-100">
        <div>Assigned: </div><input type="text" name="fAssigned" id="fAssigned" class="w-100">
        <div class="w-100">
            <input type="radio" value="TODO" name="schedule" checked>
            <label for="TODO">Todo</label>
            <input type="radio" value="DOING" name="schedule">
            <label for="DOING">Doing</label>
            <input type="radio" value="DONE" name="schedule">
            <label for="DONE">Done</label>
        </div>
        <input type="reset" value="cancel" class="float-right ml-2" onclick="cancelBtn()">
        <input type="reset" value="submit" class="float-right ml-2" onclick="taskSubmit()"> 
        </form>`);

    if (clientWidth = document.documentElement.clientWidth >= 992) {
        formCenter();
    }
}

function taskSubmit(){
    let task = new card();
    task.setName(document.getElementById("fname").value)
    task.setDescription(document.getElementById("fDescription").value)
    task.setDueDate(document.getElementById("fDueDate").value)
    task.setAssignedTo(document.getElementById("fAssigned").value)
    todoList.push(task);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    printCard();
    cancelBtn();
}

function cancelBtn(){
    document.getElementById("form").remove();
    document.getElementById("backgroundBlock").remove();
}

function addBackgroungBlock(){
    const backgroundBlock = document.createElement("div");
    backgroundBlock.style.backgroundColor = "dimgray";
    backgroundBlock.setAttribute('id', 'backgroundBlock');
    document.body.appendChild(backgroundBlock);

    document.getElementById("backgroundBlock").addEventListener("click", cancelBtn);
}

function formCenter() {
    let obj = document.getElementById("form");
    // obj.style.display = "";
    clientWidth = document.documentElement.clientWidth;
    let clientHeight = document.documentElement.clientHeight;
    let objWidth = obj.offsetWidth;
    let objHeight = obj.offsetHeight;
    let x = (clientWidth - objWidth) / 2;
    let y = (clientHeight - objHeight) / 2;
    obj.style.position = "absolute";
    obj.style.left = x + "px";
    obj.style.top = y + "px";
}

