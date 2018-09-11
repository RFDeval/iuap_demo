# order

{**When you're done, you can delete the content in this README and update the file with details for others getting started with your repository**}

Software architecture description


1. xxxx
2. xxxx
3. xxxx


1. xxxx
2. xxxx
3. xxxx


1. Fork the project
2. Create Feat_xxx branch
3. Commit your code
4. Create Pull Request



1. You can use Readme\_XXX.md to support different languages, such as Readme\_en.md, Readme\_zh.md
2. Gitee blog [blog.gitee.com](https://blog.gitee.com)
3. Explore open source project [https://gitee.com/explore](https://gitee.com/explore)
4. The most valuable open source project [GVP](https://gitee.com/gvp)
5. The manual of Gitee [http://git.mydoc.io/](http://git.mydoc.io/)
6. The most popular members  [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)



```javascript
var href = window.location.href;
var protocol = window.location.protocol;
var host = window.location.host;
var port = window.location.port;

var url = protocol+"//"+host+"/wbalone/index-view.html#/01code?billtype=1";
var content = '<iframe  id="iframepage" src="' + url + '" width="100%" height="500px;" frameborder="0" scrolling="no"></iframe>';
u.refer({
    // 模式 弹出层
    isPOPMode: true,
    // 弹出层id
    //contentId: 'testitemid_ref',
    // 设定参照层标题
    title:'测试项目',
    // 设置而参照层高度
    height:'500px',
    width:"700px",
    // 设置参照层内容
    module:{
        template: content
    },
    // 点击确认后回调事件
    onOk: function(){
        if(document.getElementById("iframepage").contentWindow.document.getElementById("grid")["u-meta"].type == "grid"){
            var selectRows = document.getElementById("iframepage").contentWindow.document.getElementById("grid")["u-meta"].grid.selectRows;
            console.log(selectRows);
            var data = viewModel.formData.getSimpleData()[0];
            data.content = selectRows[0].name;
            viewModel.formData.setSimpleData(data);

            console.log(data);
        }
    },
    // 点击取消后回调事件
    onCancel: function(){
    }
});
```

