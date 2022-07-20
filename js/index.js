let clientWidth = document.documentElement.clientWidth;

function start() {
    id = localStorage.getItem("countID");
    if (JSON.parse(localStorage.getItem("todoList") || "{}").length >= 1) {
        todoList = JSON.parse(localStorage.getItem("todoList") || "{}");
    }
    if (JSON.parse(localStorage.getItem("doingList") || "{}").length >= 1) {
        doingList = JSON.parse(localStorage.getItem("doingList") || "{}");
    }
    if (JSON.parse(localStorage.getItem("doneList") || "{}").length >= 1) {
        doneList = JSON.parse(localStorage.getItem("doneList") || "{}");
    }
    printCard();
}

function printCard() {
    clearCardBoard()
    for (let i = 0; i < todoList.length; i++) {
        $(`#todolist`).append(`<div id="card${todoList[i]._id}" class="myCard" onclick="chooseCard(${todoList[i]._id})" draggable="true" ondragstart="drag(event)"></div>`);
        $(`#card${todoList[i]._id}`).append(`<div class="task" id="todoListID${todoList[i]._id}"></div>`);
        $(`#todoListID${todoList[i]._id}`).append(`<h4>${todoList[i]._name}</h4>`);
        $(`#todoListID${todoList[i]._id}`).append(`<p>${todoList[i]._dueDate}</p>`);
        let imgPath = user.find(userList => userList[0] == todoList[i]._assignedTo);
        $(`#todoListID${todoList[i]._id}`).append(`<div><img class=""user-img" src="img/${imgPath[1]}" alt="${imgPath[1]}" width="35px"></div>`);
    }

    for (let i = 0; i < doingList.length; i++) {
        $(`#doing`).append(`<div id="card${doingList[i]._id}" class="myCard" onclick="chooseCard(${doingList[i]._id})" draggable="true" ondragstart="drag(event)"></div>`);
        $(`#card${doingList[i]._id}`).append(`<div class="task" id="doingListID${doingList[i]._id}"></div>`);
        $(`#doingListID${doingList[i]._id}`).append(`<h4>${doingList[i]._name}</h4>`);
        $(`#doingListID${doingList[i]._id}`).append(`<p>${doingList[i]._dueDate}</p>`);
        let imgPath = user.find(userList => userList[0] == doingList[i]._assignedTo);
        $(`#doingListID${doingList[i]._id}`).append(`<div><img class=""user-img" src="img/${imgPath[1]}" alt="${imgPath[1]}" width="35px"></div>`);
    }

    for (i = 0; i < doneList.length; i++) {
        $(`#done`).append(`<div id="card${doneList[i]._id}" class="myCard" onclick="chooseCard(${doneList[i]._id})" draggable="true" ondragstart="drag(event)"></div>`);
        $(`#card${doneList[i]._id}`).append(`<div class="task" id="doneListID${doneList[i]._id}"></div>`);
        $(`#doneListID${doneList[i]._id}`).append(`<h4>${doneList[i]._name}</h4>`);
        $(`#doneListID${doneList[i]._id}`).append(`<p>${doneList[i]._dueDate}</p>`);
        let imgPath = user.find(userList => userList[0] == doneList[i]._assignedTo);
        $(`#doneListID${doneList[i]._id}`).append(`<div><img class=""user-img" src="img/${imgPath[1]}" alt="${imgPath[1]}" width="35px"></div>`);
    }
}

function chooseCard(id) {
    let thisCard;

    if (findList(id) == 'todoList') {
        thisCard = todoList.find(userList => userList._id == id);
    } else if (findList(id) == 'doingList') {
        thisCard = doingList.find(userList => userList._id == id);
    } else if (findList(id) == 'doneList') {
        thisCard = doneList.find(userList => userList._id == id);
    }
    // if (typeof (todoList.find(userList => userList._id == id)) != 'undefined') {
    //     thisCard = todoList.find(userList => userList._id == id);
    // } else if (typeof (doingList.find(userList => userList._id == id)) != 'undefined') {
    //     thisCard = doingList.find(userList => userList._id == id);
    // } else if (typeof (doneList.find(userList => userList._id == id)) != 'undefined') {
    //     thisCard = doneList.find(userList => userList._id == id);
    // }
    addBackgroungBlock();

    $("body").append(`<div id="form" class="form"></div>`);
    $(`#form`).append(`<form id="editTask" class="d-inline" name="name" onsubmit="return taskEdit(${id})">
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
            <input type="radio" value="TODO" name="schedule">
            <label for="TODO">Todo</label>
            <input type="radio" value="DOING" name="schedule">
            <label for="DOING">Doing</label>
            <input type="radio" value="DONE" name="schedule">
            <label for="DONE">Done</label>
        </div>
        <input type="reset" value="cancel" class="float-right ml-2" onclick="cancelBtn()">
        <input type="submit" value="submit" class="float-right ml-2"> 
        </form>`);

    if (findList(id) == "todoList") {
        $('input[name=schedule]:eq(0)').prop('checked', true);
    } else if (findList(id) == "doingList") {
        $('input[name=schedule]:eq(1)').prop('checked', true);
    } else if (findList(id) == "doneList") {
        $('input[name=schedule]:eq(2)').prop('checked', true);
    }
    formCenter();
}

function clearCardBoard() {
    let todoListLength = document.getElementById("todolist").children.length;
    let doingListLength = document.getElementById("doing").children.length;
    let doneListLength = document.getElementById("done").children.length;
    for (let i = 1; i < todoListLength; i++) {
        document.getElementById("todolist").children[1].remove();
    }
    for (let i = 1; i < doingListLength; i++) {
        document.getElementById("doinglist").children[1].remove();
    }
    for (let i = 1; i < doneListLength; i++) {
        document.getElementById("donelist").children[1].remove();
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
        <input type="submit" value="submit" class="float-right ml-2"> 
        </form>`);

    formCenter();
}


function setList(task) {
    const whichList = $('input[name=schedule]:checked').val();
    if (whichList == "TODO") {
        todoList.push(task);
        localStorage.setItem("todoList", JSON.stringify(todoList));
    } else if (whichList == "DOING") {
        doingList.push(task);
        localStorage.setItem("doingList", JSON.stringify(doingList));
    } else if (whichList == "DONE") {
        doneList.push(task);
        localStorage.setItem("doneList", JSON.stringify(doneList));
    }

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

function findList(id) {
    if (typeof (todoList.find(userList => userList._id == id)) != 'undefined') {
        return "todoList";
    } else if (typeof (doingList.find(userList => userList._id == id)) != 'undefined') {
        return "doingList";
    } else if (typeof (doneList.find(userList => userList._id == id)) != 'undefined') {
        return "doneList";
    }
}

function taskEdit(id) {
    let thisCard;
    if (findList(id) == "todoList") {
        thisCard = todoList.find(userList => userList._id == id);
    } else if (findList(id) == "doingList") {
        thisCard = doingList.find(userList => userList._id == id);
    } else if (findList(id) == "doneList") {
        thisCard = doneList.find(userList => userList._id == id);
    }
    thisCard._name = document.getElementById("fname").value;
    thisCard._description = document.getElementById("fDescription").value;
    thisCard._dueDate = document.getElementById("fDueDate").value;
    thisCard._assignedTo = document.getElementById("fAssigned").value;
    if (findList(id) == "todoList") {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    } else if (findList(id) == "doingList") {
        localStorage.setItem("doingList", JSON.stringify(doingList));
    } else if (findList(id) == "doneList") {
        localStorage.setItem("doneList", JSON.stringify(doneList));
    }
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
    ev.target.appendChild(document.getElementById(data));
}