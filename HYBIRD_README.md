# App与H5之间的交互Action:

# 一、问答模块

##1. 问答首页

### App通知H5展示顶部消息提示

```js
App调用方式: JXRSApi.invoke("操作名称",操作参数);

操作名称: app.qa.showTopNotices

操作参数: 
		{
			"count": [Int] 消息数量
			"img": [String] 最后一条消息的用户头像地址
			"lastId": [String|Int] 最后一条消息的ID
		}
```

### 点击顶部消息栏会跳转到对应模块的消息列表页面

```js
App端接收H5对应的操作

操作名称: view.goto

操作参数: 
	    {
			"title":"目标页面的标题",
			"url":"native://qaLatestMsgs"
			"query":{
				"lastId":"最后一条消息的id"
			}
		}
```

### 点击话题跳转到话题列表页面

```js
App端接收H5对应的操作

操作名称: view.goto

操作参数: 
	    {
			"title":"话题",
			"url":"http://manage.guotailimin.com/qa/topic.list" (针对开发环境)
		}
```

### 点击轮播话题跳转到话题详情页面

```js
App端接收H5对应的操作

操作名称: view.goto

操作参数: 
	    {
			"title":"话题详情",
			"url":"http://manage.guotailimin.com/qa/topic.detail" (针对开发环境),
			"query":{
				id:"话题id"
			}
		}
```

### 点击回答跳转到回答原生页面

```js
App端接收H5对应的操作

操作名称: view.goto

操作参数: 
	    {
			"title":"回复话题",
			"url":"native://createAnswer" (针对开发环境),
			"query":{
				"questionId":"话题id",
                "title":"话题标题",
                "topicFlag":"话题名称"
			}
		}
```

## 2. 问答详情

>   此交互在问题详情和回答详情页面都存在

### H5端通知App显示图片预览器

```
H5通知App

操作名称: app.qa.openImgViewer

操作参数: 
	{
		"currentImgUrl":  当前需要展示的图片路径
		"currentIndex": 当前展示的图片对应的索引
		"imgs": 当前需要展示的图片数组
	}

```



### App通知H5更新问题回答数据的状态数值

```js
App调用方式： JXRSApi.invoke("操作名称","操作参数");

操作名称: app.qa.refreshAnswerStatusCount

操作参数： 
{
    "id":"回答id",
    "status":"状态名称： click-点击  comment-评论 support-点赞",
    "count": "变化的数量，与status对应，例如：阅读数、点赞数、评论数"
}

demo: 
	JXRSApi.invoke("app.qa.refreshAnswerStatusCount",'{"id":"1","status":"click","count":3}')
```


## 3. 话题详情 (http(s)://域名/qa/topic.detail?id=话题id)

### H5端通知App更新参与讨论按钮的传递参数

```
H5通知App

操作名称: app.qa.topic.sendReplyArgs

操作参数: 
	{
		"questionId":  话题ID
		"question": 当前话题的标题
		"topicFlag": 当前话题的名称
	}

```

### H5通知App去批量获取当前回复用户与登录用户的好友关系

```
H5通知App

操作名称： app.qa.refreshH5IMInfo

操作参数：
	{
		"userIds":["id1","id2"]
	}
```



### App通知H5去更新好友状态

```
App调用方式: JXRSApi.invoke("操作名称",操作参数);

操作名称: app.qa.refreshIMStatus

操作参数: 
		{
			"userStatus":[与"app.qa.refreshH5IMInfo"操作中用户Id对应的好友关系状态值]
		}
demo: 
	JXRSApi.invoke("app.qa.refreshIMStatus",'{"userStatus":[1,0]}')
```





# 二、文库

## 1. 文库首页:

### 通知H5页面更新"为你推荐"列表中文档的收藏状态
> 1. 文档预览页面收藏成功之后,回到首页的时候要通知H5
> 2. 我的收藏页面删除了文档之后,要通知App去将首页状态更新

```js

App调用方式: JXRSApi.invoke("操作名称",操作参数);

操作名称: app.doc

操作参数: 
		{
			"action":"refreshItemStatusOfCollect",
			"data":{
				"docIds":"[类型:Array<String>]需要批量更改收藏状态的文档ID列表",
				"status":"[类型:Int]最终的状态值 1:已收藏 0:取消收藏"
			}
		}
demo: 
	JXRSApi.invoke("app.doc",'{"action":"refreshItemStatusOfCollect","data":{"docIds":["471340142100631552","471611436603953152"],"status":0}}')

```




### App通知H5展示顶部消息提示

```js

App调用方式: JXRSApi.invoke("操作名称",操作参数);

操作名称: app.doc.showTopNotices

操作参数: 
		{
			"count": [Int] 消息数量
			"img": [String] 最后一条消息的用户头像地址
			"lastId": [String|Int] 最后一条消息的ID
		}

demo: JXRSApi.invoke("app.doc.showTopNotices","{\"count\":1,\"img\":\"xxxxx.jpg\",\"lastId\":1}")

```

### 点击顶部消息栏会跳转到对应模块的消息列表页面

```js

App端接收H5对应的操作

操作名称: view.goto

操作参数: 
	    {
			"title":"目标页面的标题",
			"url":"native://docLatestMsgs"
			"query":{
				"lastId":"最后一条消息的id"
			}
		}

```



## 2. 分类列表(点击首页11个分类标签跳转后的页面)

### App端通知H5去切换分类列表数据

```js

App调用方式: JXRSApi.invoke("操作名称",操作参数);

操作名称: app.doc.fetchDocsOfTag

操作参数: 
		{
			"tagId": 当前选择的分类ID
		}

demo: JXRSApi.invoke("app.doc.fetchDocsOfTag","{\"tagId\":1}")
```

## 3.最近阅读、我的收藏、好友共享、我的下载

### H5通知App显示顶部右上角的选择按钮

```js

H5通知App

操作名称: app.doc.showTopRightAction

操作参数: 
	{
		"isShow": 1 | 0 // 1:显示 0: 隐藏
	}

Note: 在列表页面第一次进来会有数据的时候会传1, 当文档被删除或者批量删除之后如果当前列表页面没有了文档之后会传0

```

### App点击右上角顶部的选择按钮

> App通知H5切换页面成可编辑模式

```js

App调用方式: JXRSApi.invoke("操作名称",操作参数);

操作名称: app.doc.isChangeToChooseMode

操作参数: 1|0 : 1是0否

demo： JXRSApi.invoke("app.doc.isChangeToChooseMode",1)
```

### App左上角顶部的全选按钮

> App通知H5全部选中或取消全部选中

```js

App调用方式: JXRSApi.invoke("操作名称",操作参数);

操作名称: app.doc.isChoiceAll

操作参数: 1|0 : 1是0否

demo： JXRSApi.invoke("app.doc.isChoiceAll",1)
```

### H5在全部选中之后会通知App更新左上角顶部的全选按钮的选中状态

```js

App端接收H5对应的操作

操作名称: app.doc.changeChooseAllStatus

操作参数: 
	{
		isSelect : 1-切换成选中状态 0-切换成未选中状态
	}
```

## 3.最新阅读、我的收藏、好友共享

### H5通知App去下载文档

```js

操作Action: app.doc.download

操作参数: 

		{
			"docs": [Array<Object>] 待下载的文档列表
		}

```
## 4. 所有的文档列表中点击文档项跳转至预览页

>   H5通知App执行跳转

```js
App端接收H5对应的操作

操作名称: view.goto

操作参数: 
	    {
			"title":"目标页面的标题",
			"url":"native://openDoc"
			"query":{
				"id":"文件ID",
				"fileName":"文件名称",
				"fileSize":"文件大小",
				"isCollected":"文件是否被收藏",
				"mineType":"文件类型"，
                  "url":"文件地址"
			}
		}
```


## 5. 文档删除成功之后的通知

>   H5通知App执行本地文件的删除

```js
App端接收H5对应的操作

操作名称: app.doc.removeLocalDocs

操作参数: 
	    {
			"docs": [Array<Object>] 已删除的文档列表
		}

docs列表内的参数:
	{
		"fileName": 文件名称
	}
	
```


## 6. 文档下载成功之后的通知H5刷新UI

```js
H5端接收App端的通知

操作名称: app.doc.refreshUIOfDownloaded

操作参数: 
	    {
			"docIds": [Array<Object>] 已下载成功的文档Id列表
		}

docs列表内的参数:
	{
		"id": 文档ID
	}
	

demo: JXRSApi.invoke('app.doc.refreshUIOfDownloaded','{"docIds":["1","2]}');
```

## 7. 添加收藏、删除收藏操作
> 需要通知首页去更新"为你推荐"列表中的对应文档的收藏状态

```js 
App端接收H5的通知

操作名称: app.doc.refreshIndexPageItemStatusOfCollected

操作参数: 
	{
		"docIds":"待更新收藏状态的文档ID列表",
		"status": 1:已收藏 0:已取消
	}

```


## 8.首页、点击分类进入的列表页

>   H5接收App端的通知去更新阅读数



```js
App调用方式: JXRSApi.invoke("操作名称",操作参数);

操作名称: app.doc

操作参数: 
		{
			"action":"refreshItemStatusOfReadCount",
			"data":{
				"docId":"[类型:String]需要更新阅读数的文档ID"
			}
		}
demo: JXRSApi.invoke("app.doc",'{"action":"refreshItemStatusOfReadCount","data":{"docId":"471611436603953152"}}')
```

# 三、学习教育

## 1. 学习教育详情页面

>	 通知App设置语音播报的文本

```js
App端接收H5的通知

操作名称: app.education.setAudioText

操作参数: 
	{
		"content":"语音文本"
	}
```

>    更改字体大小 （接口同新闻资讯详情类似）

```js
App调用方式: JXRSApi.invoke("操作名称",操作参数);

操作名称: app.education.changePageFontSize

操作参数: 
		{
			"size":"文字大小", // 文字大小的可选值: small | default | big | bigest
		}
参数说明：
   small:小号
   default: 默认
   big: 大号
   bigest:特大号

demo: JXRSApi.invoke("app.education.changePageFontSize",'{"size:":"small"}')
```



>   切换夜间模式（接口同新闻资讯详情类似）

```js
App调用方式: JXRSApi.invoke("操作名称",操作参数);

操作名称: app.education.changePageModeToNight

操作参数: 
		{
           "isNight": true | false
         }

demo: JXRSApi.invoke("app.education.changePageModeToNight",'{"isNight:":true}')
```


>   通知App更新详情页底层工作条中的图标状态

```js 
App端接收H5的通知

操作名称: app.education.updateStatusInfo

操作参数: 
	{
		"contentId":"当前学习教育的内容id",
		"isCollected":"是否收藏",
		"isSupported":"是否点赞,
		"likeCount":"收藏数目",
		"commentCount":"评论数目",
		"content":"当前学习教育的内容文本(已剔除html标签的文本)"
	}
```



>   当前页面没有评论，显示空评论面板的时候，点在面板会通知App弹出添加评论的原生UI

```js 
App端接收H5的通知

操作名称: app.education.addComment

操作参数: 
	{
		"contentId":"当前学习教育的内容id"
	}
```

>   App端添加评论成功之后,通知H5页面刷新评论列表

```js 
App调用方式: JXRSApi.invoke("操作名称",操作参数);

操作名称: app.education.refreshComments

操作参数: 无

demo: JXRSApi.invoke("app.education.refreshComments")
```

>   App端点击底部评论图标通知H5定位到评论板块

```js 
App调用方式: JXRSApi.invoke("操作名称",操作参数);

操作名称: app.education.scrollToComment

操作参数: 无

demo: JXRSApi.invoke("app.education.scrollToComment")
```

## 2. 学习教育评论页面

页面调用地址: 
1) 阿里云: `http://manage.guotailimin.com/edu/comments?contentid=学习教育评论ID`
2) 测试服务器: `http://whrdd.f3322.net:8889/edu/comments?contentid=学习教育评论ID`

>  当前页面没有评论，显示空评论面板的时候，点在面板会通知App弹出添加评论的原生UI

```js 
App端接收H5的通知

操作名称: app.education.addComment

操作参数: 
	{
		"contentId":"当前学习教育的内容id"
	}
```

>   App端添加评论成功之后,通知H5页面刷新评论列表

```js 
App调用方式: JXRSApi.invoke("操作名称",操作参数);

操作名称: app.education.refreshComments

操作参数: 无

demo: JXRSApi.invoke("app.education.refreshComments")
```

# 4. 考试H5页面

## 考试列表页面

> 通知App当前页面是考试首页

```js 
App端接收H5的通知

操作名称: app.exam.tellNativeIsExamIndex

操作参数: 无
```

## 考试详情页面、考试答题页面、考试结果页面

> 通知App隐藏头部

```js 
App端接收H5的通知

操作名称: app.exam.hideHeader

操作参数: 无
```

> App端点击回退,通知H5来调用H5内部的路由回退

```js 
App调用方式: JXRSApi.invoke("操作名称",操作参数);

操作名称: app.exam.back

操作参数: 无

demo: JXRSApi.invoke("app.exam.back")
```


## 考试详情页面

> 通知App唤起分享

```js 
App端接收H5的通知

操作名称: app.exam.share

操作参数: 
	{
		url: 分享出去的H5链接地址
	}
```


# 5.资讯

## 1. 资讯详情页面

### H5端通知App显示图片预览器

```js
H5通知App

操作名称: app.news.openImgViewer

操作参数: 
	{
		"currentImgUrl":  当前需要展示的图片路径
		"currentIndex": 当前展示的图片对应的索引
		"imgs": 当前需要展示的图片数组
	}
```

# 6. 生日贺卡

## 生日贺卡页面 (card/birth?id=生日贺卡id&passport)

### 点击生日祝福跳转

```js
H5通知App

操作名称: view.goto

操作参数: 
	{
		"title":"生日感言",
		"url":"native://myBirthSpeech"
		"query":{
			"speech":"生日感言"
		}
	}
```

# 7. 投票

## 投票页面

### 投票成功后的通知

```js
H5通知App

操作名称: app.h5.voteOK

操作参数: 无
```

## 投票结果页

### 点击"查看结果详情"跳转至开发型结果统计页面

```js
H5通知App

操作名称: view.goto

操作参数: 
	    {
			"title":"目标页面的标题",
			"url":"https://manage.guotailimin.com/h5/vote.statistics.kfx"
			"query":{
				index:当前题目的序号,
				aid:活动id,
				vtid:投票主题id
			}
		}
```