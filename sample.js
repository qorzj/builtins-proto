var builtins_proto = require('./builtins-proto');

var a = [1,2,3,1,2,2];
console.log(a.count(2));
console.log(a.count(3));
console.log(a.count(0));

console.log([1,2,3].__eq__([1,2,3]))
console.log([1,2,3].__eq__([1,2,3,4]))
console.log([1,2].__eq__({1:1, 2:2}))
console.log([1,2].__eq__(undefined))
