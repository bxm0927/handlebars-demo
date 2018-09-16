// 使用 jQuery 封装作用域 (function ($) {})(Jquery);
(function ($) {
    // 获取课程 ?curPage=1
    var GETCLASSES = "http://imoocnote.calfnote.com/inter/getClasses.php";
    // 获取课程大纲 ?cid=1
    var GETCLASSCHAPTER = "http://imoocnote.calfnote.com/inter/getClassChapter.php";
    // 获取笔记内容 ?cid=1
    var GETCLASSNOTE = "http://imoocnote.calfnote.com/inter/getClassNote.php";

    /**
     * Handlebars 模版渲染
     * @param {*} hbsTmp script 中的 Handelbars 模版
     * @param {*} target HTML 待渲染元素
     * @param {*} data 用来渲染的数据
     */
    function handlebarsRender(hbsTmp, target, data) {
        var t = hbsTmp.html();
        var f = Handlebars.compile(t);
        var h = f(data);
        target.html(h);
    }

    // 请求第一页的数据
    $.ajax({
        type: "GET",
        url: GETCLASSES,
        data: {
            "curPage": 1
        },
        dataType: "json",
        success: function (response) {
            console.log(response);

            handlebarsRender($("#cardHbsTmp"), $(".classes"), response.data); // 渲染课程
            handlebarsRender($("#pageHbsTmp"), $(".page"), formatPage(response)); // 渲染分页
        }
    });

    // 点击页码事件
    // 事件委托，点击页码请求其他页面数据
    $(".page").on("click", "li.clickable", function () {
        var pagecode = $(this).data("pagecode");
        console.log(pagecode);

        $.ajax({
            type: "GET",
            url: GETCLASSES,
            data: {
                "curPage": pagecode
            },
            dataType: "json",
            success: function (response) {
                console.log(response);

                handlebarsRender($("#cardHbsTmp"), $(".classes"), response.data); // 渲染课程
                handlebarsRender($("#pageHbsTmp"), $(".page"), formatPage(response)); // 渲染分页
            }
        });
    });

    // 点击课程事件
    // 1. 获取课程大纲数据，渲染课程大纲
    // 2. 获取笔记数据，渲染笔记内容
    $(".classes").on("click", "li", function () {
        var cid = $(this).data("id");

        getClasschapter(cid); // 获取课程大纲数据，渲染课程大纲
        getClassnote(cid); // 获取笔记数据，渲染笔记内容

        // jQuery.when()
        // $.when($.ajax(GETCLASSCHAPTER), $.ajax(GETCLASSNOTE)).done(function(){
        //     showNode(true);
        // });
    });

    // 获取课程大纲数据，渲染课程大纲
    function getClasschapter(cid) {
        $.ajax({
            type: "GET",
            url: GETCLASSCHAPTER,
            data: {
                "cid": cid
            },
            dataType: "json",
            success: function (response) {
                console.log(response);
                handlebarsRender($("#catalogHbsTmp"), $(".catalog"), response); // 渲染课程大纲
                showNode(true);
            }
        });
    }

    // 获取笔记数据，渲染笔记内容
    function getClassnote(cid) {
        $.ajax({
            type: "GET",
            url: GETCLASSNOTE,
            data: {
                "cid": cid
            },
            dataType: "json",
            success: function (response) {
                console.log(response);
                handlebarsRender($("#noteContentHbsTmp"), $(".note-content"), response); // 渲染笔记内容
            }
        });
    }

    // 点击遮罩层隐藏笔记
    $(".screen-mask").on("click", function () {
        showNode(false);
    });

    // 显示/隐藏笔记
    function showNode(show) {
        if (show) {
            $(".screen-mask").css("display", "block");
            $(".note-detail").css("display", "block");
        } else {
            $(".screen-mask").css("display", "none");
            $(".note-detail").css("display", "none");
        }
    }
})(jQuery);
