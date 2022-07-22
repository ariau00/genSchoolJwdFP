let clientWidth = document.documentElement.clientWidth;
let filterList = [];
let TODO = true;
let DOING = true;
let DONE = true;

function start() {
    id = localStorage.getItem("countID");

    if (JSON.parse(localStorage.getItem("fullList") || "{}").length >= 1) {
        fullList = JSON.parse(localStorage.getItem("fullList") || "{}");
    }
    updateList();
    printCard();
}

function printCard() {
    clearCardBoard();

    for (let i = 0; i < todoList.length; i++) {
        $(`#todolist`).append(`<div id="card${todoList[i]._id}" class="myCard" onclick="chooseCard(${todoList[i]._id})" draggable="true" ondragstart="drag(event)"></div>`);
        $(`#card${todoList[i]._id}`).append(`<div class="task" id="todoListID${todoList[i]._id}"></div>`);
        $(`#todoListID${todoList[i]._id}`).append(`<h4>${todoList[i]._name}</h4>`);
        $(`#todoListID${todoList[i]._id}`).append(`<p>${todoList[i]._dueDate}</p>`);
        let imgPath = user.find(userList => userList[0] == todoList[i]._assignedTo);

        if (typeof (user.find(userList => userList[0] == todoList[i]._assignedTo)) != 'undefined') {
            $(`#todoListID${todoList[i]._id}`).append(`<div><img class="user-img" src="img/${imgPath[1]}" alt="${imgPath[1]}" width="35px"><button class="task-btn" disabled>To Do</button></div>`);
        } else if (typeof (user.find(userList => userList[0] == todoList[i]._assignedTo)) == 'undefined') {
            $(`#todoListID${todoList[i]._id}`).append(`<div><img class="user-img" src="img/person.png" alt="person.png" width="35px"></div>`);
        }
    }

    for (let i = 0; i < doingList.length; i++) {
        $(`#doing`).append(`<div id="card${doingList[i]._id}" class="myCard" onclick="chooseCard(${doingList[i]._id})" draggable="true" ondragstart="drag(event)"></div>`);
        $(`#card${doingList[i]._id}`).append(`<div class="task" id="doingListID${doingList[i]._id}"></div>`);
        $(`#doingListID${doingList[i]._id}`).append(`<h4>${doingList[i]._name}</h4>`);
        $(`#doingListID${doingList[i]._id}`).append(`<p>${doingList[i]._dueDate}</p>`);
        let imgPath = user.find(userList => userList[0] == doingList[i]._assignedTo);

        if (typeof (user.find(userList => userList[0] == doingList[i]._assignedTo)) != 'undefined') {
            $(`#doingListID${doingList[i]._id}`).append(`<div><img class="user-img" src="img/${imgPath[1]}" alt="${imgPath[1]}" width="35px"><button class="task-btn" disabled>Doing</button></div>`);
        } else if (typeof (user.find(userList => userList[0] == doingList[i]._assignedTo)) == 'undefined') {
            $(`#doingListID${doingList[i]._id}`).append(`<div><img class="user-img" src="img/person.png" alt="person.png" width="35px"></div>`);
        }
    }

    for (let i = 0; i < doneList.length; i++) {
        $(`#done`).append(`<div id="card${doneList[i]._id}" class="myCard" onclick="chooseCard(${doneList[i]._id})" draggable="true" ondragstart="drag(event)"></div>`);
        $(`#card${doneList[i]._id}`).append(`<div class="task" id="doneListID${doneList[i]._id}"></div>`);
        $(`#doneListID${doneList[i]._id}`).append(`<h4>${doneList[i]._name}</h4>`);
        $(`#doneListID${doneList[i]._id}`).append(`<p>${doneList[i]._dueDate}</p>`);
        let imgPath = user.find(userList => userList[0] == doneList[i]._assignedTo);

        if (typeof (user.find(userList => userList[0] == doneList[i]._assignedTo)) != 'undefined') {
            $(`#doneListID${doneList[i]._id}`).append(`<div><img class="user-img" src="img/${imgPath[1]}" alt="${imgPath[1]}" width="35px"><button class="task-btn" disabled>Done</button></div>`);
        } else if (typeof (user.find(userList => userList[0] == doneList[i]._assignedTo)) == 'undefined') {
            $(`#doneListID${doneList[i]._id}`).append(`<div><img class="user-img" src="img/person.png" alt="person.png" width="35px"></div>`);
        }
    }

    for (let i = 0; i < filterList.length; i++) {

        $(`#molist`).append(`<div id="mocard${filterList[i]._id}" class="myCard" onclick="chooseCard(${filterList[i]._id})" draggable="true" ondragstart="drag(event)"></div>`);
        $(`#mocard${filterList[i]._id}`).append(`<div class="task" id="molistID${filterList[i]._id}"></div>`);
        $(`#molistID${filterList[i]._id}`).append(`<h4>${filterList[i]._name}</h4>`);
        $(`#molistID${filterList[i]._id}`).append(`<p>${filterList[i]._dueDate}</p>`);
        let imgPath = user.find(userList => userList[0] == filterList[i]._assignedTo);
        if (typeof (user.find(userList => userList[0] == filterList[i]._assignedTo)) != 'undefined') {
            $(`#molistID${filterList[i]._id}`).append(`<div id="temp"><img class="user-img" src="img/${imgPath[1]}" alt="${imgPath[1]}" width="35px"></div>`);
            addStatusIcon(i);
        } else if (typeof (user.find(userList => userList[0] == fullList[i]._assignedTo)) == 'undefined') {
            $(`#molistID${filterList[i]._id}`).append(`<div><img class="user-img" src="img/person.png" alt="person.png" width="35px"></div>`);
            addStatusIcon(i);
        }
    }
}

function addStatusIcon(id) {
    if (filterList[id]._status == "TODO") {
        $(`#molistID${filterList[id]._id} > div`).append(`<button id="status${id}" onclick="changeIconWord(${id}) || window.event; " class="task-btn" disable>To Do</button>`);
    } else if (filterList[id]._status == "DOING") {
        $(`#molistID${filterList[id]._id} > div`).append(`<button id="status${id}" onclick="changeIconWord(${id}) || window.event; " class="task-btn" disable>Doing</button>`);
    } else if (filterList[id]._status == "DONE") {
        $(`#molistID${filterList[id]._id} > div`).append(`<button id="status${id}" onclick="changeIconWord(${id}) || window.event; " class="task-btn" disable>Done</button>`);
    }
}

function changeIconWord(id) {
    var evt = window.event;
    if (evt.stopPropagation) evt.stopPropagation();

    if (filterList[id]._status == "TODO") {
        filterList[id]._status = "DOING";
        document.getElementById(`status${id}`).innerHTML = "Doing";
    } else if (filterList[id]._status == "DOING") {
        filterList[id]._status = "DONE";
        document.getElementById(`status${id}`).innerHTML = "Done";
    } else if (filterList[id]._status == "DONE") {
        filterList[id]._status = "TODO";
        document.getElementById(`status${id}`).innerHTML = "To Do";
    }
    updateList();
    printCard();
}

function chooseCard(id) {
    let thisCard = fullList.find(cardList => cardList._id == id);
    addBackgroungBlock();

    $("body").append(`<div id="form" class="form"></div>`);
    $(`#form`).append(`<form id="editTask" class="d-inline" name="name" onsubmit="return taskEdit(${id})">
        <p class="addtask-w">Task</p>
        <div class="box-w">Name: </div><input type="text" name="fname" id="fname" class="w-100 box-bar" value="${thisCard._name}" required>
        <div class="box-w">Description: </div><input type="text" name="fDescription" id="fDescription" class="w-100 box-bar description" value="${thisCard._description}">
        <div class="box-w">Duedate: </div><input type="date" name="fDueDate" id="fDueDate" class="w-100 box-bar" value="${thisCard._dueDate}" required>
        <div class="box-w">Assigned: </div>

        <select id="fAssigned" class="w-100 box-bar">
            <option>${thisCard._assignedTo}</option>
            <option> Ari </option>
            <option> Alison </option>
            <option> Chloe </option>
        </select>

        <div class="w-100">
            <input type="radio" value="TODO" name="schedule">
            <label for="TODO">Todo</label>
            <input type="radio" value="DOING" name="schedule">
            <label for="DOING">Doing</label>
            <input type="radio" value="DONE" name="schedule">
            <label for="DONE">Done</label>
        </div>
        <button type="button" value="remove" class="float-left ml-2 form-btn" onclick="removeBtn(${id})">Remove</button>
        <input type="reset" value="cancel" class="float-right ml-2 form-btn" onclick="cancelBtn()">
        <input type="submit" value="submit" class="float-right ml-2 form-btn"> 
        </form>`);

    if (thisCard._status == "TODO") {
        $('input[name=schedule]:eq(0)').prop('checked', true);
    } else if (thisCard._status == "DOING") {
        $('input[name=schedule]:eq(1)').prop('checked', true);
    } else if (thisCard._status == "DONE") {
        $('input[name=schedule]:eq(2)').prop('checked', true);
    }
    formCenter();
}

function clearCardBoard() {
    for (let i = document.getElementById("todolist").children.length; i > 1; i--) {
        document.getElementById("todolist").children[1].remove();
    }
    for (let i = document.getElementById("doing").children.length; i > 1; i--) {
        document.getElementById("doing").children[1].remove();
    }
    for (let i = document.getElementById("done").children.length; i > 1; i--) {
        document.getElementById("done").children[1].remove();
    }
    for (let i = document.getElementById("molist").children.length; i > 0; i--) {
        document.getElementById("molist").children[0].remove();
    }
}

function addTask() {
    document.getElementById("addTaskBtn").classList.add("addtesk");
    addBackgroungBlock();

    $("body").append(`<div id="form" class="form"></div>`);
    $(`#form`).append(`<form id="addtask" class="d-inline" name="name" onsubmit="return taskSubmit()">
        <p class="addtask-w">Add task</p>
        <div class="box-w">Name: </div><input type="text" name="fname" id="fname" class="w-100 box-bar" required>
        <div class="box-w">Description: </div><input type="text" name="fDescription" id="fDescription" class="w-100 description box-bar">
        <div class="box-w">Duedate: </div><input type="date" name="fDueDate" id="fDueDate" class="w-100 box-bar" required>
        <div class="box-w">Assigned: </div>

        <select id="fAssigned" class="w-100 box-bar" required>
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
        <input type="reset" value="cancel" class="float-right ml-2 form-btn" onclick="cancelBtn()">
        <input type="submit" value="submit" class="float-right ml-2 form-btn"> 
        </form>`);

    formCenter();
}


function setList(task) {

    fullList.push(task);
    updateList();
}

function updateList() {
    todoList = fullList.filter(card => card._status == "TODO")
    doingList = fullList.filter(card => card._status == "DOING")
    doneList = fullList.filter(card => card._status == "DONE")
    filterList = fullList.filter(stat => stat._status == "TODO" && TODO == true || stat._status == "DOING" && DOING == true || stat._status == "DONE" && DONE == true)
    localStorage.setItem("fullList", JSON.stringify(fullList));
}

function taskSubmit() {
    let task = new card();
    task.setName(document.getElementById("fname").value)
    task.setDescription(document.getElementById("fDescription").value)
    task.setDueDate(document.getElementById("fDueDate").value)
    task.setAssignedTo(document.getElementById("fAssigned").value)
    task.setStatus($('input[name=schedule]:checked', '#form').val());
    setList(task);
    printCard();
    cancelBtn();
}

function taskEdit(id) {
    let thisCard = fullList.find(cardList => cardList._id == id);

    thisCard._name = document.getElementById("fname").value;
    thisCard._description = document.getElementById("fDescription").value;
    thisCard._dueDate = document.getElementById("fDueDate").value;
    thisCard._assignedTo = document.getElementById("fAssigned").value;
    if (thisCard._status != $('input[name=schedule]:checked').val()) {
        thisCard._status = ($('input[name=schedule]:checked').val());
    }
    updateList();
    printCard();
    cancelBtn();
}

function cancelBtn() {
    document.getElementById("form").remove();
    document.getElementById("backgroundBlock").remove();
}

function removeBtn(id) {
    fullList = fullList.filter(cardid => cardid._id != id);
    updateList();
    cancelBtn();
    printCard();
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
    clientWidth = document.documentElement.clientWidth;
    let clientHeight = document.documentElement.clientHeight;
    let objWidth = obj.offsetWidth;
    let objHeight = obj.offsetHeight;
    let x = (clientWidth - objWidth) / 2;
    let y = (clientHeight - objHeight) / 2;
    obj.style.left = x + "px";
    obj.style.top = y + "px";
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    let getCardID = parseInt(data.substr(4)-1);
    if (ev.target.id == "todolist") {
        ev.target.appendChild(document.getElementById(data));
        fullList[getCardID]._status = "TODO";
    } else if (ev.target.id == "doing") {
        ev.target.appendChild(document.getElementById(data));
        fullList[getCardID]._status = "DOING";
    } else if (ev.target.id == "done") {
        ev.target.appendChild(document.getElementById(data));
        fullList[getCardID]._status = "DONE";
    }
    updateList();
    printCard();
}
function filterListControl(listname) {
    listname == "TODO" ? TODO = !TODO : listname == "DOING" ? DOING = !DOING : listname == "DONE" ? DONE = !DONE : console.log("undef List");
    updateList();
    printCard();
}