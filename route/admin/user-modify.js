const { User, validateUser } = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async(req, res, next) => {
    let { username, email, role, state, password } = req.body;
    let { id } = req.query;
    let user = await User.findOne({ _id: id });

    try {
        await validateUser(req.body);
    } catch (err) {
        return next(JSON.stringify({ path: '/admin/user-edit', message: err.message, id: id }));
    };

    //密码比对
    let isSame = await bcrypt.compare(password, user.password);
    if (isSame) {
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state
        });
        res.redirect('/admin/user');
    } else {
        return next(JSON.stringify({ path: '/admin/user-edit', message: '密码不匹配,修改失败', id: id }))
    }
}