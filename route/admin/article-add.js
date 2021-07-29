const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article');

module.exports = (req, res) => {
    //创建表单解析对象
    const form = new formidable.IncomingForm();
    //设置上传路径
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'upload');
    //保留文件后缀
    form.keepExtensions = true;
    //解析表单
    form.parse(req, async(err, fields, files) => {
        let { title, author, publishDate, content } = fields;
        await Article.create({
            title: title,
            author: author,
            publishDate: publishDate,
            cover: files.cover.path.split('public')[1],
            content: content,
        })
        res.redirect('/admin/article');
    });
};