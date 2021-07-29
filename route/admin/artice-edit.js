const { Article } = require('../../model/article');

module.exports = async(req, res) => {
    req.app.locals.currentLink = "article";
    let id = req.query.id;
    if (id) {
        let article = await Article.findOne({ _id: id });
        res.render('admin/article-edit', {
            button: '修改',
            link: `/admin/article-modify?id=${id}`,
            id: id,
            article: article
        })
    } else {
        res.render('admin/article-edit', {
            button: '发布',
            link: '/admin/article-add'
        });
    }

}