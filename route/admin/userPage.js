const { User } = require('../../model/user');

module.exports = async(req, res) => {
    req.app.locals.currentLink = "user";
    //接受客户端传来的页数
    let page = req.query.page || 1;
    //每页显示数据的条数
    let pagesize = 10;
    //查询用户数据总数
    let count = await User.countDocuments({});
    //总页数
    let total = Math.ceil(count / pagesize);
    //开始查询的位置
    let start = (page - 1) * pagesize;
    let users = await User.find().skip(start).limit(pagesize);
    res.render('admin/user', {
        users,
        page,
        total
    });
};