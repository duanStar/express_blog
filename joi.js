// const joi = require('joi');

// //定义对象验证规则
// const schema = {
//     username: joi.string().min(2).max()
// };

// //验证
// joi.validate({}, schema);
var s;
var m ="sda";
function fun(){
	console.log(arguments);
	s=Array.from(arguments,item=>item*2);
};
fun(1,23,22,5);
console.log(s);
console.log(m[0]);