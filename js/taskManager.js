let id = 0;
let user = [["Ari","user1.png"], ["Alison","user2.png"], ["Chloe","user3.png"]];
let status = ["TODO", "DOING", "DONE"]
let todoList = [];
let doingList = [];
let doneList = [];
class card {
    constructor() {
        this._id = countID();
        this._name;
        this._description;
        this._assignedTo;
        this._dueDate;
        this._status = "TODO";
    }

    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    get assignedTo() {
        return this._assignedTo;
    }
    get dueDate() {
        return this._dueDate;
    }
    get status() {
        return this._status;
    }

    setName(name) {
        this._name = name;
    }
    setDescription(text) {
        this._description = text;
    }
    setAssignedTo(assignedTo) {
        this._assignedTo = assignedTo;
    }
    setDueDate(dueDate) {
        this._dueDate = dueDate;
    }

}

function countID() {
    id++;
    localStorage.setItem("countID", id);
    return id;
}