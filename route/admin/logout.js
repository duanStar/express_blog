module.exports = (req, res) => {
    //删除session
    req.session.destroy(function() {
        //清除cookie
        res.clearCookie('connect.sid');
        //删除userInfo
        req.app.locals.userInfo = null;
        //重定向
        res.redirect('admin/login');
    })
};