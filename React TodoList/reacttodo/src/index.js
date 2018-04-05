import React from "react";
//import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import "./index.css";
import { createStore, combineReducers } from "redux";
import registerServiceWorker from "./registerServiceWorker";
import {Provider} from 'react-redux';
import { connect } from "react-redux";
//Presenational Component
const mapStateToLinkProps = (state, props, ownProps) => {
  return {
    active: props.filter === state.visibilityFilter
  };
};
const setVisibilityFilter=(filter)=>
{
  return{
    type: "SET_VISIBILITY_FILTER",
    filter: filter
  }
}
const mapDispatchToLinkProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    }
  };
}
const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>;
  }
  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};
;
const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);
// #region Container Component-FilterLink
//Container Component
// class FilterLink extends Component {
//   componentDidMount() {
//     const { store } = this.context;
//     this.unsubscribe = store.subscribe(() => {
//       this.forceUpdate();
//     });
//   }
//   componentWillUnmount() {
//     this.unsubscribe();
//   }
//   render() {
//     const props = this.props;
//     const { store } = this.context;
//     const state = store.getState();
//     return (
//       <Link
//         active={props.filter === state.visibilityFilter}
//         onClick={() =>
//           store.dispatch({
//             type: "SET_VISIBILITY_FILTER",
//             filter: props.filter
//           })
//         }
//       >
//         {" "}
//         {props.children}
//       </Link>
//     );
//   }
// }
// FilterLink.contextTypes ={
//   store:PropTypes.object
// }
// #endregion
//Presentational component - Todo, TodoList
const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? "line-through" : "none"
    }}
  >
    {text}
  </li>
);
const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo => (
      <Todo
        key={todo.id}
        id={todo.id}
        onClick={() => onTodoClick(todo.id)}
        {...todo}
      />
    ))}
  </ul>
);
const Footer = () => (
  <p>
    Show: <FilterLink filter="SHOW_ALL">All</FilterLink>{" "}
    <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>{" "}
    <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
  </p>
);
let nextTodoId = 0;
const addTodo = text => {
  return {
    type: "ADD_TODO",
    id: nextTodoId++,
    text
  };
};
let AddTodo = ({ dispatch }) => {
  let input;
  return (
    <div>
      <input
        ref={node => {
          input = node;
        }}
      />
      <button
        onClick={() => {
          dispatch(addTodo(input.value));
          input.value = "";
        }}
      >
        Add todo
      </button>
    </div>
  );
};
//Injects only dispatch as a prop
AddTodo = connect()(AddTodo);
// AddTodo.contextTypes ={
//   store:PropTypes.object
// }
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
const mapStateTodoListProps = state => {
  return {
    todos: getVisibileTodos(state.todos, state.visibilityFilter)
  };
};
const toggleTodo =(id)=>{
  return{
    type: "TOGGLE_TODO",
    id
  };
}
const mapDispatchToDoListProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id));
    }
  };
};
const VisibleTodoList = connect(
  mapStateTodoListProps,
  mapDispatchToDoListProps
)(TodoList);

// class VisibleTodoList extends Component {
//   componentDidMount() {
//     const { store } = this.context;
//     this.unsubscribe = store.subscribe(() => {
//       this.forceUpdate();
//     });
//   }
//   componentWillUnmount() {
//     this.unsubscribe();
//   }
//   render() {

//     const { store } = this.context;
//     const state = store.getState();
//     return (
//       <TodoList
//         todos={}
//         onTodoClick={
//         }
//       />
//     );
//   }
// }
// VisibleTodoList.contextTypes ={
//   store:PropTypes.object
// }
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

//Container Component
const TodoApp = ({ todos, visibilityFilter, store }) => (
  <div>
    <AddTodo store={store} />
    <VisibleTodoList store={store} />
    <Footer store={store} />
  </div>
);

// class Provider extends Component {
//   getChildContext() {
//     return {
//       store: this.props.store
//     };
//   }
//   render() {
//     return this.props.children;
//   }
// }
// Provider.childContextTypes = {
//   store: PropTypes.object
// };

ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
