var expect = require("expect");
var createStore = require("redux").createStore;
const counter = (state =0, action) => {
  switch(action.type){
    case "INCREMENT":
    return state + 1;
  case "DECREMENT":
    return state - 1;
  default:
    return state;
  }
};
// expect(counter(0, { type: "INCREMENT" })).toEqual(1);
// expect(counter(1, { type: "INCREMENT" })).toEqual(2);

// expect(counter(2, { type: "DECREMENT" })).toEqual(1);
// expect(counter(1, { type: "DECREMENT" })).toEqual(0);

// expect(counter(1, { type: "RANDOM" })).toEqual(1);
// expect(counter(undefined, {})).toEqual(0);

// console.log("All Success");
// const createStore = (reducer) =>{
//   let state;
//   let listeners = [];
//   const getState = ()=> state;
//   const dispatch =(action) =>{
//     state = reducer(state,action);
//     listeners.forEach(listener=>listeners());
//   };
//   const subscribe = (listener)=>{
//     listeners.push(listener);
//     return()=>{
//       listeners  =listeners.filter(l => l !== listener);
//     };
//   };
//   dispatch({});
//   return{getState,dispatch,subscribe};
// };

const store = createStore(counter);
const render = ()=>{
  document.body.innerText = store.getState();
}
store.subscribe(render);
render({});
document.addEventListener('click',()=>{
  store.dispatch({type:'INCREMENT'});
})