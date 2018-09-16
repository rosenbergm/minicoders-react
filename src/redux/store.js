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
      window.clearIntervals()
      window.reset()
      const task = Object.assign({}, action.task)
      task.progress = action.task.progress || action.task.default || ''
      return {
        ...state,
        task
      };
    case "SET_TASKS":
      return {
        ...state,
        tasks: action.tasks
      };
    case "UPDATE_TASK":
      window.reset()
      const index = state.tasks.findIndex(task => action.task.taskId === task.taskId)
      const tasks = state.tasks.slice(0)
      tasks[index] = action.task
      return {
        ...state,
        tasks
      };
    case "LOGOUT":
      localStorage.setItem('token', '')
      window.location = '/login'
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
    window.consoleStack.push(action.log)
      return {
        ...state,
        console: [...state.console, action.log]
      };
    case "CLEAR_CONSOLE":
    window.consoleStack = []
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
