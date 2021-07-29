const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    let page = req.query.page || 1;
    let articles = await pagination(Article).find().page(page).size(4).display(5).populate('author').exec();
    res.render('home/default', {
        articles
    });
}