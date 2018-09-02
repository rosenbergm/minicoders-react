import { createStore } from "redux";

const initialState = {};
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
      console.log(action)
      localStorage.setItem('token', action.token)
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store
