const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');
//创建集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    //admin 超级管理员
    //normal 正常用户
    role: {
        type: String,
        required: true
    },
    //0 启用 1 禁用
    state: {
        type: Number,
        default: 0
    }
});
//创建集合
const User = mongoose.model("User", userSchema);
//创建测试用户
async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('123456', salt);
    const user = await User.create({
        username: 'itheima',
        email: '123456@it.com',
        password: pass,
        role: 'admin',
        state: 0
    })

}
//验证用户信息
const validateUser = (user) => {
    //定义验证规则
    const schema = {
        username: Joi.string().alphanum().min(2).max(12).required().error(new Error('用户名长度必须为2~12位，只能为英文字母和数字')),
        email: Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    };
    return Joi.validate(user, schema);
};
// createUser();
module.exports = {
    User,
    validateUser
};