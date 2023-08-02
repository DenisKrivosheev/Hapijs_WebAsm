import './function.js';


console.log()

setTimeout(()=>{
  let res = Module.ccall('int_sqrt', // name of C function
  'number', // return type
  ['number'], // argument types
  [28]); // arguments
  console.log(`Result: ${res}`) 
}, 10)
   

/*
fetch("function.wasm")
  .then((response) => response.arrayBuffer())
  .then((bytes) => WebAssembly.instantiate(bytes, importObject))
  .then((results) => {
    results.instance.exports.main();
  });
*/



/*
Module().then((instance) => {
  instance._main(); // direct calling works
  instance.ccall("int_sqrt(28)"); // using ccall etc. also work
  console.log(instance.main()); // values can be returned, etc.
});*/