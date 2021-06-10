import { TODOLIST } from "../constants/todo-list";

const getAllData = data => ({ type: TODOLIST.GETDATA, payload: data });

const addToDoList = data => ({ type: TODOLIST.ADD, payload: data });

const editToDoList = data => ({ type: TODOLIST.EDIT, payload: data });

const deleteToDoList = id => ({ type: TODOLIST.DELETE, payload: id });

export { addToDoList, deleteToDoList, getAllData, editToDoList };
