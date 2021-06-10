import { TODOLIST } from "../constants/todo-list";

const initialState = {
  listData: []
};

function toDoListReducer(state = initialState, action) {
  const { listData } = state;
  switch (action.type) {
    case TODOLIST.GETDATA:
      return { ...state, listData: action.payload };
    case TODOLIST.ADD:
      const newData = [...listData];
      newData.push(action.payload);
      return { ...state, listData: newData };
    case TODOLIST.EDIT:
      const newListData = [...listData];
      const ind = newListData.findIndex(item => item.id === action.payload.id);
      newListData[ind] = action.payload;
      return { ...state, listData: newListData };
    case TODOLIST.DELETE:
      const newDataList = listData.filter(item => item.id !== action.payload);
      return { ...state, listData: newDataList };

    default:
      return state;
  }
}

export { toDoListReducer };
