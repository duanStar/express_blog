const guard = (req, res, next) => {
    //判断用户访问的页面是否是登录页面
    //判断用户的登录状态，登录则让其访问，否则跳到登录页面
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login');
    } else {
        if (req.session.role == 'normal') {
            return res.redirect('/home/')
        }
        next();
    }
};

module.exports = guard;