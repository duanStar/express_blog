const { Article } = require('../../model/article');

module.exports = async(req, res) => {
    let { id } = req.query;
    await Article.findOneAndDelete({ _id: id });
    res.redirect('/admin/article');
}