import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createStore, combineReducers } from "redux";
import registerServiceWorker from "./registerServiceWorker";

const FilterLink = ({ filter, children,currentFilter }) => {
  if(currentFilter === filter){
    return <span>{children}</span>
  }
  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        store.dispatch({
          type: "SET_VISIBILITY_FILTER",
          filter
        });
      }}
    >
      {children}
    </a>
  );
};

const getVisibileTodos = (todos, filter) => {
  switch (filter) {
    case "SHOW_ALL":
      return todos;
    case "SHOW_ACTIVE":
      return todos.filter(todo => !todo.completed);
    case "SHOW_COMPLETED":
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};
const todo = (state = [], action) => {
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
      return { ...state, completed: !state.completed };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, todo(undefined, action)];
    case "TOGGLE_TODO":
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};
const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};
const todoApp = combineReducers({
  todos,
  visibilityFilter
});
const store = createStore(todoApp);
let nextTodoId = 0;
class TodoApp extends Component {
  render() {
    const {
      todos,
      visibilityFilter
    } = this.props;
    const visibleTodos = getVisibileTodos(
      todos,
      visibilityFilter
    );
    return (
      <div>
        <input
          ref={node => {
            this.input = node;
          }}
        />
        <button
          onClick={() => {
            store.dispatch({
              type: "ADD_TODO",
              id: nextTodoId++,
              text: this.input.value
            });
            this.input.value = "";
          }}
        >
          Add todo
        </button>
        <ul>
          {visibleTodos.map(todo => (
            <li
              key={todo.id} id={todo.id}
              onClick={() => {
                store.dispatch({
                  type: "TOGGLE_TODO",
                  id: todo.id
                });
              }}
              style={{
                textDecoration: todo.completed ? "line-through" : "none"
              }}
            >
              {todo.text}
            </li>
          ))}
        </ul>
        <p>
          Show: {' '} 
          <FilterLink filter="SHOW_ALL" currentFilter={visibilityFilter}>All</FilterLink>
          {" "}
          <FilterLink filter="SHOW_ACTIVE" currentFilter={visibilityFilter}>Active</FilterLink>
          {" "}
          <FilterLink filter="SHOW_COMPLETED" currentFilter={visibilityFilter}>Completed</FilterLink>
        </p>
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp {...store.getState()} />,
    document.getElementById("root")
  );
};
store.subscribe(render);
render();
registerServiceWorker();