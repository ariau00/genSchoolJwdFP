let clientWidth = document.documentElement.clientWidth;

function start() {
    id = localStorage.getItem("countID");
    if (JSON.parse(localStorage.getItem("todoList") || "{}").length >= 1) {
        todoList = JSON.parse(localStorage.getItem("todoList") || "{}");
    }
    printCard();
}

function printCard() {
    clearCardBoard()
    let task = document.getElementsByClassName("task");
    for (let i = 0; i < todoList.length; i++) {
        $(`#todolist`).append(`<div id="card${todoList[i]._id}" class="myCard" onclick="chooseCard(${todoList[i]._id})"></div>`);
        $(`#card${todoList[i]._id}`).append(`<div class="task"></div>`);
        $(task[i]).append(`<h4>${todoList[i]._name}</h4>`);
        $(task[i]).append(`<p>${todoList[i]._dueDate}</p>`);
        let imgPath = user.find(userList => userList[0] == todoList[i]._assignedTo);
        $(task[i]).append(`<div><img class=""user-img" src="img/${imgPath[1]}" alt="${imgPath[1]}" width="35px"></div>`);
    }
}

function chooseCard(id) {
    let thisCard = todoList.find(userList => userList._id == id);
    addBackgroungBlock();

    $("body").append(`<div id="form" class="form"></div>`);
    $(`#form`).append(`<form id="editTask" class="d-inline" name="name" onsubmit="return taskExit(${id})">
        <p>Task</p>
        <div>Name: </div><input type="text" name="fname" id="fname" class="w-100" value="${thisCard._name}">
        <div>Description: </div><input type="text" name="fDescription" id="fDescription" class="w-100 description" value="${thisCard._description}">
        <div>Duedate: </div><input type="date" name="fDueDate" id="fDueDate" class="w-100" value="${thisCard._dueDate}">
        <div>Assigned: </div>

        <select id="fAssigned" class="w-100">
            <option>${thisCard._assignedTo}</option>
            <option> Ari </option>
            <option> Alison </option>
            <option> Chloe </option>
        </select>

        <div class="w-100">
            <input type="radio" value="TODO" name="schedule" checked>
            <label for="TODO">Todo</label>
            <input type="radio" value="DOING" name="schedule">
            <label for="DOING">Doing</label>
            <input type="radio" value="DONE" name="schedule">
            <label for="DONE">Done</label>
        </div>
        <input type="reset" value="cancel" class="float-right ml-2" onclick="cancelBtn()">
        <input type="reset" value="submit" class="float-right ml-2" onclick="taskExit(${id})"> 
        </form>`);

    printCard();
}

function clearCardBoard() {
    let cardListLength = document.getElementById("todolist").children.length;
    for (let i = 1; i < cardListLength; i++) {
        document.getElementById("todolist").children[1].remove();
    }
}

function addTask() {
    document.getElementById("addTaskBtn").classList.add("addtesk");
    addBackgroungBlock();

    $("body").append(`<div id="form" class="form"></div>`);
    $(`#form`).append(`<form id="addtask" class="d-inline" name="name" onsubmit="return taskSubmit()">
        <p>Add task</p>
        <div>Name: </div><input type="text" name="fname" id="fname" class="w-100">
        <div>Description: </div><input type="text" name="fDescription" id="fDescription" class="w-100 description">
        <div>Duedate: </div><input type="date" name="fDueDate" id="fDueDate" class="w-100">
        <div>Assigned: </div>

        <select id="fAssigned" class="w-100">
            <option> ---Choose--- </option>
            <option> Ari </option>
            <option> Alison </option>
            <option> Chloe </option>
        </select>

        <div class="w-100">
            <input type="radio" value="TODO" name="schedule" checked>
            <label for="TODO">Todo</label>
            <input type="radio" value="DOING" name="schedule">
            <label for="DOING">Doing</label>
            <input type="radio" value="DONE" name="schedule">
            <label for="DONE">Done</label>
        </div>
        <input type="reset" value="cancel" class="float-right ml-2" onclick="cancelBtn()">
        <input type="submit" value="submit" class="float-right ml-2" onclick="taskSubmit()"> 
        </form>`);

    if (clientWidth = document.documentElement.clientWidth >= 992) {
        formCenter();
    }
}

function taskSubmit() {
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

function taskExit(id) {
    let thisCard = todoList.find(userList => userList._id == id);
    thisCard._name = document.getElementById("fname").value;
    thisCard._description = document.getElementById("fDescription").value;
    thisCard._dueDate = document.getElementById("fDueDate").value;
    thisCard._assignedTo = document.getElementById("fAssigned").value;
    // todoList.push(task);
    // localStorage.setItem("todoList", JSON.stringify(todoList));
    printCard();
    cancelBtn();
}

function cancelBtn() {
    document.getElementById("form").remove();
    document.getElementById("backgroundBlock").remove();
}

function addBackgroungBlock() {
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

