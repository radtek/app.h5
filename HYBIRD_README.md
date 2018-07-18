
# 文库 App与H5之间的交互Action:


## 1. 文库首页:

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

```

### 点击顶部消息栏会跳转到对应版本的消息列表页面

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

### 推荐文章列表中点击列表项跳转至文档详情页

> H5通知App执行跳转

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

## 2. 分类列表(点击首页11个分类标签跳转后的页面)

### App端通知H5去切换分类列表数据

```js

App调用方式: JXRSApi.invoke("操作名称",操作参数);

操作名称: app.doc.fetchDocsOfTag

操作参数: 
		{
			"tagId": 当前选择的分类ID
		}

```

## 3.最近阅读、我的导入、我的收藏、好友共享、我的下载

### App点击右上角顶部的选择按钮

> App通知H5切换页面成可编辑模式

```js

App调用方式: JXRSApi.invoke("操作名称",操作参数);

操作名称: app.doc.isChangeToChooseMode

操作参数: 1|0 : 1是0否

```

### App左上角顶部的全选按钮

> App通知H5全部选中或取消全部选中

```js

App调用方式: JXRSApi.invoke("操作名称",操作参数);

操作名称: app.doc.isChoiceAll

操作参数: 1|0 : 1是0否

```

### H5在全部选中之后会通知App更新左上角顶部的全选按钮的选中状态

```js

App端接收H5对应的操作

操作名称: app.doc.changeChooseAllStatus

操作参数: 1|0 : 1-切换成选中状态 0-切换成未选中状态

```

## 3.最新阅读、我的收藏、好友共享

### H5通知App去下载文档

```js

操作Action: app.doc.download

操作参数: 

		{
			"docs": [Array<Number>] 待下载的文档列表
		}

```

## 4. 我的导入页面

### H5通知App将文档执行好友分享


```js

操作Action: app.doc.share

操作参数: 

		{
			"docs": [Array<Number>] 待分享的文档列表
		}

```


### H5通知App将文档执行上传


```js

操作Action: app.doc.upload

操作参数: 

		{
			"docs": [Array<Number>] 待上传的文档列表
		}

```