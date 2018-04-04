var expect = require("expect");
var deepfreeze = require("deepfreeze");

const addCounter = list => {
  //list.push(0);
  return [...list, 0];
  return list;
};
const removeCounter = (list,index) => {
    //  list.splice(index,1);
    //  return list;
    return [...list.slice(0,index),
    ...list.slice(index+1)];
};
const incrementCounter = (list,index) =>{
    // list[index]++;
    // return list;
   return [...list.slice(0,index),
    list[index]+1,
    ...list.slice(index+1)]
    
   
}
const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [0];
  deepfreeze(listBefore);
  expect(addCounter(listBefore)).toEqual(listAfter);
};
const testRemoveCounter = ()=>{
    const listBefore=[1,2,3];
    const listAfter=[1,3];
    deepfreeze(listBefore);
    expect(removeCounter(listBefore,1)).toEqual(listAfter);
}
const testIncrementCounter = () =>{
    const listBefore = [1,2,3];
    const listAfter = [1,3,3];
    deepfreeze(listBefore);
    expect(incrementCounter(listBefore,1)).toEqual(listAfter);    
}
testAddCounter();
testRemoveCounter();
testIncrementCounter();
console.log("All tests passed.");
