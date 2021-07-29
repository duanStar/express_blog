function serializeArrayToJson(form) {
    var result = {};
    //获取表单中用户输入的内容，返回存储对象的数组如：[{name:'eamil',value:'用户输入'}]
    var f = form.serializeArray();
    f.forEach((item) => {
        result[item.name] = item.value;
    });
    return result;
};