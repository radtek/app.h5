const Router = require('koa-router')
let router  = new Router()
router.get('/banner',async (ctx)=>{
  ctx.body={
	  swipeTopics: [{
	  description: '<div><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span></div><div class="editor-topic-block"><p>加班1<span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span></p></div>',
	  fileKey: ["FGfFQFacwJ@upload_8369b2936bc0cee8e30360edbca3a8e5.jpg"],
	  id: "516684310121172992",
	  imgPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546657924&di=d78403cf234fbca25cde7a02635cd751&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F019def58ee313aa8012049ef69e432.jpg%401280w_1l_2o_100sh.jpg",
  },{
	  description: '<div><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span></div><div class="editor-topic-block"><p>加班1<span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span></p></div>',
	  fileKey: ["FGfFQFacwJ@upload_8369b2936bc0cee8e30360edbca3a8e5.jpg"],
	  id: "516684310121172992",
	  imgPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546062945526&di=05ce031f79c3d90c9c084b26ce7d0c3b&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01c8415a77c3a4a80120a12372925c.jpg%402o.jpg"
  }]
  }
})

module.exports=router
