const expect = require("expect");
const deepFreeze = require("deepfreeze");
const { createStore } = require("redux");
//const { combineReducers } = require("redux");
//Reducer function that calculates next state based on current state and action
const todo = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case "TOGGLE_TODO":
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !todo.completed
      };
    default:
      return state;
  }
};
//reducer composition - calls other reducer.
const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, todo(undefined, action)];
    case "TOGGLE_TODO": {
      return state.map(t => todo(t, action));
    }
    default:
      return state;
  }
};
//Reducer composition with objects
const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};

//Single state object is returned.
// const todosApp = (state={},action)=>{
// return{
//     todos:todos(state.todos,action),
//     visibilityFilter: visibilityFilter(state.visibilityFilter,action)
// }
// };

//Combine reducers from scratch
const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    },{});
  };
};

//Combine reducers
const todosApp = combineReducers({
  //state to be managed:reducer todos:todos
  todos,
  visibilityFilter
});
const store = createStore(todosApp);
console.log("Initial State");
console.log(store.getState());
console.log("--------------");
console.log("Dispatching ADD_TODO");
store.dispatch({
  type: "ADD_TODO",
  id: 0,
  text: "Learn Redux"
});
console.log("Current State");
console.log(store.getState());
console.log("--------------");
console.log("Dispatching ADD_TODO");
store.dispatch({
  type: "ADD_TODO",
  id: 1,
  text: "Take a nap"
});
console.log("Current State");
console.log(store.getState());
console.log("--------------");
console.log("Dispatching TOGGLE_TODO");
store.dispatch({
  type: "TOGGLE_TODO",
  id: 1
});
console.log("Current State");
console.log(store.getState());
console.log("--------------");
console.log("Dispatching SET_VISIBILITY_FILTER");
store.dispatch({
  type: "SET_VISIBILITY_FILTER",
  filter: "COMPLETED"
});
console.log("Current State");
console.log(store.getState());
console.log("--------------");
// #region TEST_CASES
// const testAddTodo = () => {
//   const stateBefore = [];
//   const action = {
//     type: "ADD_TODO",
//     id: 0,
//     text: "Learn redux"
//   };
//   const stateAfter = [
//     {
//       id: 0,
//       text: "Learn redux",
//       completed: false
//     }
//   ];
//   deepFreeze(stateBefore);
//   deepFreeze(stateAfter);
//   expect(todos(stateBefore, action)).toEqual(stateAfter);
// };

// const testToggleTodo = () => {
//   const stateBefore = [
//     {
//       id: 0,
//       text: "Learn redux",
//       completed: false
//     },
//     {
//       id: 1,
//       text: "Take a nap",
//       completed: false
//     }
//   ];
//   const action = {
//     type: "TOGGLE_TODO",
//     id: 1
//   };
//   const stateAfter = [
//     {
//       id: 0,
//       text: "Learn redux",
//       completed: false
//     },
//     {
//       id: 1,
//       text: "Take a nap",
//       completed: true
//     }
//   ];
//   expect(todos(stateBefore, action)).toEqual(stateAfter);
// };
// testAddTodo();
// testToggleTodo();
// console.log("All tests successful");
// #endregion
