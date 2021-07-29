const { User, validateUser } = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async(req, res, next) => {

    try {
        //实施验证
        await validateUser(req.body);
    } catch (err) {
        return next(JSON.stringify({ path: '/admin/user-edit', message: err.message }));
    };

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱地址已经被占用' }));
    }
    //密码加密
    let str = await bcrypt.genSalt(10);
    let password = await bcrypt.hash(req.body.password, str);
    req.body.password = password;
    //添加用户到数据库
    await User.create(req.body);
    res.redirect('/admin/user');
};