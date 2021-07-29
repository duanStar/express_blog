const { Article } = require('../../model/article');
const paginaton = require('mongoose-sex-page');

module.exports = async(req, res) => {
    const page = req.query.page || 1;
    req.app.locals.currentLink = "article";
    /*
        page为当前页
        size为每页显示数据
        display为客户端要显示的页码数量
        exec向数据库中发生查询请求
    */
    let articles = await paginaton(Article).find().page(page).size(2).display(3).populate('author').exec();
    res.render('admin/article', {
        articles
    });
}