const express = require('express');
const path = require('path');
const { template } = require('express-art-template');
const bodyParser = require('body-parser');
//导入dateformat模块
const dateFormat = require('dateformat');
//导入express-session
const session = require('express-session');
//导入morgan模块
const morgan = require('morgan');
//导入config模块
const config = require('config');

//搭建服务器
const app = express();

//数据库连接
require('./model/connect');
//处理post请求参数
app.use(bodyParser.urlencoded({ extended: false }));

//配置session
app.use(session({
    secret: 'secret key',
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));

//模板配置
app.engine('art', require('express-art-template'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');
app.use(express.static(path.join(__dirname, 'public')));
template.defaults.imports.dateFormat = dateFormat;

//引入路由对象
const home = require('./route/home');
const admin = require('./route/admin');

//拦截请求，判断用户是否登录
app.use('/admin', require('./middleware/loginGuard'));

if (process.env.NODE_ENV == 'development') {
    //在开发环境中把客户端发送到服务器的请求信息打印到控制台
    app.use(morgan('dev'));
} else {

}

app.use('/home', home);
app.use('/admin', admin);

app.use((err, req, res, next) => {
    err = JSON.parse(err);
    let params = [];
    for (let attr in err) {
        if (attr != 'path') {
            params.push(attr + '=' + err[attr]);
        }
    }
    res.redirect(`${err.path}?${params.join('&')}`);
})

app.listen(3000);
console.log('网站服务器启动成功');