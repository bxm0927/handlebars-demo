// 有笔记 v1 = v2，hasnote = 1
Handlebars.registerHelper('equal', function (v1, v2, options) {
    if (v1 === v2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

// 一小时以上
Handlebars.registerHelper('style', function (v1, options) {
    if (v1.indexOf("小时") !== -1) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

// +1
Handlebars.registerHelper('addOne', function (num) {
    return num + 1;
});

// 时间日期格式化
Handlebars.registerHelper('formatDate', function (time) {
    if (!time) return "";

    var date = new Date(time);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    var str = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    return str;
});
