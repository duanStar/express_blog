//引入用户集合
const { User } = require('../../model/user');
const bcrypt = require('bcrypt');
module.exports = async(req, res) => {
    const { email, password } = req.body;
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render('admin/error', {
            msg: "邮箱地址或密码错误"
        });
    };
    let user = await User.findOne({ email }).catch((err) => {});
    if (user) {
        //查询到用户，比对密码
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            req.session.username = user.username;
            req.session.role = user.role;
            req.app.locals.userInfo = user;
            //重定向到用户列表页面
            if (user.role == 'admin') {
                res.redirect('/admin/user');
            } else {
                res.redirect('/home/');
            }
        } else {
            res.status(400).render('admin/error', { msg: '邮箱地址或密码错误' });
        }
    } else {
        res.status(400).render('admin/error', { msg: '邮箱地址或密码错误' });
    };
};