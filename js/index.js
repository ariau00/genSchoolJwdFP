let clientWidth = document.documentElement.clientWidth;

function addTask() {
    document.getElementById("addTaskBtn").classList.add("addtesk");
    addBackgroungBlock();

    $("body").append(`<div id="form" class="form"></div>`);
    $(`#form`).append(`<form id="addtask" class="d-inline" name="name" onsubmit="return validateForm()">
        <p>Add task</p>
        <div>Name: </div><input type="text" name="fname" class="w-100">
        <div>Description: </div><input type="text" name="fDescription" class="w-100 description">
        <div>Duedate: </div><input type="date" name="fDueDate" class="w-100">
        <div>Assigned: </div><input type="text" name="fAssigned" class="w-100">
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

    if (clientWidth = document.documentElement.clientWidth >= 992) {
        formCenter();
    }
}

function taskSubmit(temp){
    console.log(temp)
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

