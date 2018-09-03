import { createStore } from "redux";

const initialState = {
  console: [],
  tasks: []
};
function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user
      };
    case "SET_ACTIVE_TASK":
      return {
        ...state,
        task: action.task
      };
    case "SET_TASKS":
      return {
        ...state,
        tasks: action.tasks
      };
    case "UPDATE_TASK":
      const index = state.tasks.findIndex(task => action.task.id === task.id)
      const tasks = state.tasks.slice(0)
      tasks[index] = action.task
      return {
        ...state,
        tasks
      };
    case "LOGOUT":
      localStorage.setItem('token', '')
      return {
        ...state,
        user: undefined
      };
    case "LOGIN":
      localStorage.setItem('token', action.token)
      return {
        ...state,
        user: action.user
      };
    case "ADD_TO_CONSOLE":
      return {
        ...state,
        console: [...state.console, action.log]
      };
    case "CLEAR_CONSOLE":
    return {
      ...state,
      console: []
    };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store
