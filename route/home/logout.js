module.exports = (req, res) => {
    req.session.destroy(function() {
        res.clearCookie('connect.sid');
        req.app.locals.userInfo = null;
        res.redirect('/admin/logout')
    })
};