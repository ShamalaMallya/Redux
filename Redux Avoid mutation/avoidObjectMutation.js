var expect = require("expect");
var deepfreeze = require("deepfreeze");

const toggleTodo = (todo) => {    
    // todo.completed = !todo.completed ;
    // return todo;
    // return{
    //     id:todo.id,
    //     text:todo.text,
    //     completed: !todo.completed
    // };
  //  return Object.assign({},todo,{completed:!todo.completed});
  return {
      ...todo,completed:!todo.completed
  };
};
const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: "Learn Redux",
    completed: false
  };
  const todoAfter = {
    id: 0,
    text: "Learn Redux",
    completed: true
  };
  deepfreeze(todoBefore);
  expect(toggleTodo(todoBefore)).toEqual(todoAfter);
};
testToggleTodo();
console.log("All tests passed");
