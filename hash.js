const bcrypt = require('bcrypt');

async function run() {
    //生成随机字符串
    let salt = await bcrypt.genSalt(10);
    //对密码加密
    let result = await bcrypt.hash('123456', salt);
};

run();