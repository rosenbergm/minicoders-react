import { createStore } from "redux";

const initialState = {
  console: []
};
function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user
      };
    case "SET_TASK":
      return {
        ...state,
        task: action.task
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
