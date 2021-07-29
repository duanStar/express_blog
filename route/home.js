//创建home路由模块
const express = require('express');

const home = express.Router();

//博客前台页面
home.get('/', require('./home/index'));

//博客前台文章详情页面
home.get('/article', require('./home/article'));

//用户评论功能
home.post('/comment', require('./home/comment'))

//用户退出功能
home.get('/logout', require('./home/logout'));
module.exports = home;