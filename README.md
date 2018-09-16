# Handlebars 实现我的笔记本

demo1 数据写死在 HTML 中
- 缺点：数据写死，不够灵活


demo2 数据通过 JavaScript 拼接
- HTML 写到 JavaScript 中，可读性不好


demo3 数据通过 Handlebars 渲染
- 数据动态渲染，增加了灵活性
- 不需要把 HTML 写到 JavaScript 中，可读性良好


demo4 复杂数据通过 Handlebars 渲染，以及一些 Handlebars 内置标签
- 内置标签


demo5 Handlebars 自定义标签 helper
- 自定义标签

my-note 我的笔记本


## 接口

- 获取课程：http://imoocnote.calfnote.com/inter/getClasses.php?curPage=1
- 获取课程大纲：http://imoocnote.calfnote.com/inter/getClassChapter.php?cid=1
- 获取笔记内容：http://imoocnote.calfnote.com/inter/getClassNote.php?cid=1
