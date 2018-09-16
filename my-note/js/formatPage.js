// 将分页数据封装成 Handelbars 需要的数据
// 构造一个分页数组，其中每个元素（每一页）都包含以下几个属性：
// 其中，index：序号，cur：当前页，clickable：可点击的，text：内容
// « < 1 2 [3] 4 5 ... 64 > »
function formatPage(pageData) {
    var pageArr = [];
    var curPage = parseInt(pageData.curPage);
    var totalPage = parseInt(pageData.totalCount);

    // 处理到首页的逻辑
    var toStart = {}; // 到首页 toStart
    toStart.index = 1;
    toStart.text = "&laquo;"; //  «
    if (curPage != 1) { // 只要当前不在第一页，那么 « 就可以点击
        toStart.clickable = true;
    }
    pageArr.push(toStart);

    // 处理到上一页的逻辑
    var toPrev = {}; // 上一页 toPrev
    toPrev.index = curPage - 1;
    toPrev.text = "&lt;";
    if (curPage != 1) { // 只要当前不在第一页，那么到上一页就可以点击
        toPrev.clickable = true;
    }
    pageArr.push(toPrev);

    // 处理当前页之前页码的逻辑
    if (curPage <= 5) {
        for (var i = 1; i < curPage; i++) {
            var page = {};
            page.index = i;
            page.text = i;
            page.clickable = true;
            pageArr.push(page);
        }
    } else {
        var page = {};
        page.index = 1;
        page.text = 1;
        page.clickable = true;
        pageArr.push(page);

        var page = {};
        page.text = "...";
        pageArr.push(page);

        for (var i = curPage - 2; i < curPage; i++) {
            var page = {};
            page.index = i;
            page.text = i;
            page.clickable = true;
            pageArr.push(page);
        }
    }

    // 处理当前页的逻辑
    var toCur = {};
    toCur.index = curPage;
    toCur.text = curPage;
    toCur.cur = true;
    pageArr.push(toCur);

    // 处理当前页之后页码的逻辑
    if (curPage >= totalPage - 4) {
        for (var i = curPage + 1; i <= totalPage; i++) {
            var page = {};
            page.index = i;
            page.text = i;
            page.clickable = true;
            pageArr.push(page);
        }
    } else {
        for (var i = curPage + 1; i <= curPage + 2; i++) {
            var page = {};
            page.index = i;
            page.text = i;
            page.clickable = true;
            pageArr.push(page);
        }
        var page = {};
        page.text = "...";
        pageArr.push(page);

        var page = {};
        page.index = totalPage;
        page.text = totalPage;
        page.clickable = true;
        pageArr.push(page);
    }

    // 处理到下一页的逻辑
    var toNext = {}; // 下一页 toNext
    toNext.index = curPage + 1;
    toNext.text = "&gt;";
    if (curPage != totalPage) { // 只要当前不在最后一页，那么到下一页就可以点击
        toNext.clickable = true;
    }
    pageArr.push(toNext);

    // 处理到尾页的逻辑
    var toEnd = {}; // 回到首页 toEnd
    toEnd.index = totalPage;
    toEnd.text = "&raquo;"; //  »
    if (curPage != totalPage) { // 只要当前不在最后一页，那么 » 就可以点击
        toEnd.clickable = true;
    }
    pageArr.push(toEnd);

    console.log(pageArr);
    return pageArr;
}
