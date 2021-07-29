//创建admin路由模块
const express = require('express');
const admin = express.Router();

//渲染登录页面
admin.get('/login', require('./admin/loginPage'));
//响应登录请求
admin.post('/login', require('./admin/login'));
//渲染用户列表页面
admin.get('/user', require('./admin/userPage'));
//实现退出功能
admin.get('/logout', require('./admin/logout'));
//创建用户编辑路由
admin.get('/user-edit', require('./admin/user-edit'));
//实现处理新增用户功能
admin.post('/user-edit', require('./admin/user-edit-fn'));
//实现用户修改功能
admin.post('/user-modify', require('./admin/user-modify'));
//删除用户
admin.get('/delete', require('./admin/user-delete'));
//文章列表
admin.get('/article', require('./admin/article'));
//文章编辑
admin.get('/article-edit', require('./admin/artice-edit'));
//实现文章添加功能
admin.post('/article-add', require('./admin/article-add'));
//实现文章修改
admin.post('/article-modify', require('./admin/article-modify'));
//实现文章删除
admin.get('/article-delete', require('./admin/article-delete'));
module.exports = admin;