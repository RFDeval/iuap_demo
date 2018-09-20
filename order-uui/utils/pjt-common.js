var pjt = pjt || {};


/**
 * 信息框
 * @param messge	显示信息
 */
pjt.messge = function(messge){
	u.messageDialog({
	    msg: messge,
	    title: "友情提醒",
	    btnText: "确定",
	    width:"400px"
	});
};

/**
 * 信息框
 * @param messge	显示信息
 */
pjt.message = function(messge){
	u.messageDialog({
	    msg: messge,
	    title: "友情提醒",
	    btnText: "确定",
	    width:"400px"
	});
};




/**
 * 将对象组装在数组中
 * @param {*} data 
 */
pjt.genDataList = function (data) {
	var datalist = [];
	datalist.push(data);
	return datalist;
};




/**
 * ajax删除数据
 * @param url	删除URL
 * @param data	要删除的数据
 * @param succCallBack	成功回调函数
 */
pjt.ajaxDelData = function(url,data,succCallBack) {
	$.ajax({
		url: appCtx + url,
		type:'POST',
		contentType: 'application/json',
		data:JSON.stringify(data),
		success:function(result){
			if (result.state=="success") {
		        if(succCallBack) {
		        	succCallBack(result);
		        }
			}
		}
	});
};


/**
 * ajax删除数据
 * @param url	删除URL
 * @param data	要删除的数据
 * @param succCallBack	成功回调函数
 */
pjt.ajaxDelData = function (url, data, succCallBack, errorCallBack) {
	$.ajax({
		url: appCtx + url,
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(data),
		success: function (result) {
			if (result.state == "success" || result.success == "success") {
				if (succCallBack) {
					if(result.detailMsg){
						succCallBack(result.detailMsg.data);
					}else if(result.data){
						succCallBack(result.data);
					}
				}
			} else {
				if (errorCallBack) {
					errorCallback(result.message);
				}
			}
		}
	});
};


/**
 * ajax保存数据
 * @param url	保存URL
 * @param data	要保存的数据
 * @param succCallBack	成功回调函数
 */
pjt.ajaxSaveData = function(url,data,succCallBack) {
	$.ajax({
		url: appCtx + url,
		type:'POST',
		contentType: 'application/json',
		data:JSON.stringify(data),
		success:function(result){
			if (result.state=="success") {
		        if(succCallBack) {
		        	succCallBack(result);
		        }
			}
		}
	});
};


/**
 * ajax保存数据
 * @param url	保存URL
 * @param data	要保存的数据
 * @param succCallBack	成功回调函数
 */
pjt.ajaxSaveData = function (url, data, succCallBack, errorCallBack) {
	$.ajax({
		url: appCtx + url,
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(data),
		success: function (result) {
			if (result.state == "success" || result.success == "success") {
				if (succCallBack) {
					if(result.detailMsg){
						succCallBack(result.detailMsg.data);
					}else if(result.data){
						succCallBack(result.data);
					}
				}
			} else {
				if (errorCallBack) {
					errorCallback(result.message);
				}
			}
		}
	});
};




/**
 * ajax查询数据
 * @param url	查询URL
 * @param data	要查询的数据
 * @param succCallBack	成功回调函数
 */
pjt.ajaxQueryData = function(url,queryData,succCallBack){
	$.ajax({
		type : 'GET',
		url: appCtx + url,
		data : queryData,
		contentType: 'application/json;charset=utf-8',
		dataType : 'json',
		success : function(result) {
			if(result.state=="success") {
		        if(succCallBack) {
		        	succCallBack(result);
		        }
			}
		}
	});
};


/**
 * ajax查询数据
 * @param url	查询URL
 * @param data	要查询的数据
 * @param succCallBack	成功回调函数
 */
pjt.ajaxQueryData = function (url, queryData, succCallBack, errorCallBack) {
	$.ajax({
		type: 'GET',
		url: appCtx + url,
		data: queryData,
		contentType: 'application/json;charset=utf-8',
		dataType: 'json',
		success: function (result) {
			if (result.state == "success" || result.success == "success") {
				if (succCallBack) {
					if(result.detailMsg){
						succCallBack(result.detailMsg.data);
					}else if(result.data){
						succCallBack(result.data);
					}
				}
			} else {
				if (errorCallBack) {
					errorCallback(result.message);
				}
			}
		}
	});
};


/**
 * ajax调用iuap提供的第三方服务
 * @param url	查询URL
 * @param data	要查询的数据
 * @param succCallBack	成功回调函数
 */
pjt.ajaxQueryThridService = function (url, queryData, succCallBack, errorCallBack) {
	$.ajax({
		type: 'GET',
		url: url,
		data: queryData,
		contentType: 'application/json;charset=utf-8',
		dataType: 'json',
		success: function (result) {
			if (result.state == "success" || result.success == "success") {
				if (succCallBack) {
					succCallBack(result.detailMsg.data);
				}
			} else {
				if (errorCallBack) {
					errorCallback(result.message);
				}
			}
		}
	});
};




/**
 * ajax查询数据
 * @param url	查询URL
 * @param data	要查询的数据
 * @param succCallBack	成功回调函数
 */
pjt.newUuid = function(){
	var uuid = "";
	$.ajax({
		type : 'GET',
		url: appCtx + '/commonweb/getuuid',
		contentType: 'application/json;charset=utf-8',
		async: false,
		success : function(result) {
			uuid = result;
		}
	});
	return uuid;
};

/**
 * html转义
 * @param html	需要转义的html
 */
pjt.htmlEncode = function (html) {
    var temp = document.createElement("div");
    (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
    var output = temp.innerHTML;
    temp = null;
    return output;
};

/**
 * html反转义
 * @param text	需要转义的文本
 */
pjt.htmlDecode = function (text) { 
    var temp = document.createElement("div"); 
    temp.innerHTML = text; 
    var output = temp.innerText || temp.textContent; 
    temp = null; 
    return output; 
};



/**
 * 下载excel模板
 * @param {*} mainPage 外层DIV对象，用来附加表单的
 * @param {*} url 后台下载模板地址
 */
pjt.downloadTemple = function (mainPage, url) {
	var form = $("<form>");   //定义一个form表单
	form.attr('style', 'display:none');   //在form表单中添加查询参数
	form.attr('target', '');
	form.attr('method', 'post');
	form.attr('action', appCtx + url);
	mainPage.append(form);  //将form放置在web中
	var input2 = $('<input>');
	input2.attr('type', 'hidden');
	input2.attr('name', 'x-xsrf-token');
	input2.attr('value', window.x_xsrf_token);
	form.append(input2);
	form.submit();
}


/**
 * 下载excel模板
 * @param {*} url 后台下载模板地址
 */
pjt.downloadTemple = function (url) {
	window.open(appCtx+url);
}

pjt.expData = function (url) {
	window.open(appCtx+url);
}



/**
 * 模板打印
 * @param templateCode	模板编码
 * @param url	取数请求
 * @param businessPk	业务主键
 */
pjt.printTemplate = function(templateCode,url,businessPk){
	if (businessPk != undefined && businessPk.trim() != null) {
		var tenantId = "tenant";//固定字符串
		var serverUrl = appCtx + url;//取数据的url地址
		var params = {//去后台打印数据的参数
			'id': businessPk
		};
		params = encodeURIComponent(JSON.stringify(params));//URL参数部分有特殊字符，必须编码(不同的tomcat对特殊字符的处理不一样)
		var url = '/print_service/print/preview?tenantId='
			+ tenantId + '&printcode=' + templateCode + '&serverUrl=' + serverUrl
			+ '&params=' + params + '&sendType=post';
		window.open(url);
	}else {
		pjt.messge('业务主键不能为空！');
	}
};

/**
 * 创建导出表单对象
 * @param mainPage	界面第一层DIV对象
 * @param url	请求URL
 * @param ids	需要导出的数据主键
 */
pjt.createExpForm = function(mainPage,url,ids){
	var form = $("<form>");   //定义一个form表单
    form.attr('style', 'display:none');   //在form表单中添加查询参数
    form.attr('target', '');
    form.attr('method', 'post');
    form.attr('action', appCtx + url);
    //将表单追加到当前html中，否则会报Form submission canceled because the form is not connected错误
    mainPage.append(form);  //将表单放置在web中
    if(ids!=null && ids !=""){
    	var input1 = $('<input>');
        input1.attr('type', 'hidden');
        input1.attr('name', 'ids');
        input1.attr('value', ids);
        form.append(input1);   //将查询参数控件提交到表单上
    }
    var input2 = $('<input>');
    input2.attr('type', 'hidden');
    input2.attr('name', 'x-xsrf-token');
    input2.attr('value', window.x_xsrf_token);
    form.append(input2);
    return form;
};

/**
 * excel数据导入
 * @param mainPage	界面第一层DIV对象
 * @param url	请求URL
 */
pjt.excelDataImp = function (mainPage,url) {
	//生成上传弹出框的hmtl
	var excelImpHtml = '<div id="excel_imp_dialog" style="display: none;">'+
        		   	   '	<div class="u-msg-title">'+
        		       '		<h4>导入</h4>'+
        		       '	</div>'+
        		       '	<div class="u-msg-content aline-center">'+
        	           '		 <div class="u-msg-uplode-content">'+
        	           '     	 	<div class="choosefile">'+
        	           '         		<div class="choosefileImg">'+
        	           '             		<img src="../iuap_pap_quickstart/static/beforeUpload.svg" id="excelUploadImg">'+
        	           '         		</div>'+
        	           '         		<div id="excelUploadMsg" class="uploadingMsg"></div>'+
        	           '         		<button class="u-button u-button-border uploadBtn " title="选择上传文件" id="selectFileBtn" onclick="document.getElementById(\'excelImpFile\').click()">选择上传文件</button>'+
        	           '         		<input style="display: none" type="file" name="excelImpFile" id="excelImpFile" />'+
        	           '     		</div>'+
        	           '     		<div class="filenamediv" id="filenamediv2"></div>'+
        	           '     		<div class="file-loding" style="display: none;">'+
        	           '         		<div class="file-lodedPart" style="height:26px;background-color:#039BE5;color:#fff"></div>'+
        	           '     		</div>'+
        	           ' 		</div>'+
        	           '	</div>'+
        	           '	<div class="u-msg-footer u-msg-date-footer">'+
        	           '	</div>'+
        		       '</div>';
	
	//追加到界面中
	mainPage.prepend(excelImpHtml);
	
	//将html放到dialog中显示
	window.md = u.dialog({
		id: 'excelImpDialog',
		content: "#excel_imp_dialog",
		width:"400px",
		hasCloseMenu: true
	});
    
	//移除显示的文件名
    $("#filenamediv2").html("");
    $("#excelUploadMsg").html("").addClass("uploading").removeClass("fail").removeClass("success");
    //当文件发生改变，重新获取文件名在div中显示
    $("#excelImpFile").change(function(){
    	var file = $("#excelImpFile").val();
    	var strFileName=file.replace(/^.+?\\([^\\]+?)(\.[^\.\\]*?)?$/gi,"$1");
    	$("#filenamediv2").html(strFileName);
    	//改变显示图标
        $("#excelUploadImg").attr("src", "../iuap_pap_quickstart/static/uploading.svg");
        //改变显示信息
        $("#excelUploadMsg").html("文件上传中").addClass("uploading").removeClass("success").removeClass("fail");
        //显示文件上传进度条
        $(".file-loding").show();
        $('.file-lodedPart').width(0);
        //进度条增加
        window.loadingTimer = window.setInterval(function () {
            var loadingpart = $('.file-lodedPart');
            var width = loadingpart.width();
            //宽度为360
            if (width > 360) {
                window.clearInterval(window.loadingTimer);
            }
            //每次宽度增加3.6
            loadingpart.width(width + 3.6);
            var progress = parseInt(width / 3.6);
            //当进度数字大于100时显示100
            if(progress>100){
            	progress = 100;
            }
            //进度条显示数字
            loadingpart.html(progress+'%');
        }, 100);
        
        //发起数据导入请求
        $.ajaxFileUpload({
            url: appCtx + url,
            timeout:30000,
            fileElementId: 'excelImpFile',
            dataType: 'json',//返回值
            success: function (data) {
            	$("#excelImpFile").remove();
                $("#excel_imp_dialog").find(".choosefile").append('<input style="display: none" type="file" name="excelImpFile" id="excelImpFile" />');
                window.clearInterval(window.loadingTimer);
                md.close();
                pjt.messge('数据导入成功，请重新查询数据！');
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            	$("#excelImpFile").remove();
                $("#excel_imp_dialog").find(".choosefile").append('<input style="display: none" type="file" name="excelImpFile" id="excelImpFile" />');
            	window.clearInterval(window.loadingTimer);
                md.close();
                pjt.messge('数据导入失败！');
            }
        });
    }); 
};



/**
 * jquery显示Div
 * @param strDiv div的Id或者class，id需要携带#
 */
pjt.showDiv = function (strDiv) {
	$(strDiv).show();
}

/**
 * jquery隐藏Div
 * @param strDiv div的Id或者class，id需要携带#
 */
pjt.hideDiv = function (strDiv) {
	$(strDiv).hide();
}



/**
 * 元素只读
 * @param domIdStrArray	元素id字符串数组
 */
pjt.elementReadOnly = function(domIdStrArray) {
	$.each(domIdStrArray, function(index, value) {   
		$("#"+value).attr("readOnly",'readOnly');
	});
};

/**
 * 元素解除只读
 * @param domIdStrArray	元素id字符串数组
 */
pjt.elementUnReadOnly = function(domIdStrArray) {
	$.each(domIdStrArray, function(index, value) {   
		$("#"+value).removeAttr("readOnly",'');
	});
};

/**
 * 页面组件样式初始化
 */
pjt.pageCmpStyleInit = function() {
	//初始化内容区域的高度为网页可见区域高(包括边线的高)
	if($("#u-mdlayout")){
		$("#u-mdlayout").height(document.body.scrollHeight);
	}
	
};


/**
 * 附件上传
 * @param mainPage	界面第一层DIV对象
 * @param businessPk	业务主键
 */
pjt.attachmentFile = function (mainPage,businessPk) {
	//生成上传弹出框的hmtl
	var excelImpHtml = '<div id="dialogUploadFile" style="display: none;">'+
        		   	   '	<div class="u-msg-title">'+
        		       '		<h4>导入</h4>'+
        		       '	</div>'+
        		       '	<div class="u-msg-content aline-center">'+
        	           '		 <div class="u-msg-uplode-content">'+
        	           '     	 	<div class="choosefile">'+
        	           '         		<div class="choosefileImg">'+
        	           '             		<img src="../iuap_pap_quickstart/static/beforeUpload.svg" id="fileUploadImg">'+
        	           '         		</div>'+
        	           '         		<div id="fileUploadMsg" class="uploadingMsg"></div>'+
        	           '         		<button class="u-button u-button-border uploadBtn " title="选择上传文件" id="selectFileBtn" onclick="document.getElementById(\'uploadFile\').click()">选择上传文件</button>'+
        	           '         		<input style="display: none" type="file" name="uploadFile" id="uploadFile" />'+
        	           '     		</div>'+
        	           '     		<div class="filenamediv" id="filenamediv2"></div>'+
        	           '     		<div class="file-loding" style="display: none;">'+
        	           '         		<div class="file-lodedPart" style="height:26px;background-color:#039BE5;color:#fff"></div>'+
        	           '     		</div>'+
        	           ' 		</div>'+
        	           '	</div>'+
        	           '	<div class="u-msg-footer u-msg-date-footer">'+
        	           '	</div>'+
        		       '</div>';
	
	//追加到界面中
	mainPage.prepend(excelImpHtml);
	
	//将html放到dialog中显示
	window.md = u.dialog({
		id: 'attachmentDialg',
		content: "#dialogUploadFile",
		width:"400px",
		hasCloseMenu: true
	});
    
	//移除显示的文件名
    $("#filenamediv2").html("");
    $("#fileUploadMsg").html("").addClass("uploading").removeClass("fail").removeClass("success");
    
    //当文件发生改变，重新获取文件名在div中显示
    $("#uploadFile").change(function(){
    	var file = $("#uploadFile").val();
    	var strFileName=file.replace(/^.+?\\([^\\]+?)(\.[^\.\\]*?)?$/gi,"$1");
    	$("#filenamediv2").html(strFileName);
    	//改变显示图标
        $("#fileUploadImg").attr("src", "../iuap_pap_quickstart/static/uploading.svg");
        //改变显示信息
        $("#fileUploadMsg").html("文件上传中").addClass("uploading").removeClass("success").removeClass("fail");
        //显示文件上传进度条
        $(".file-loding").show();
        $('.file-lodedPart').width(0);
        //进度条增加
        window.loadingTimer = window.setInterval(function () {
            var loadingpart = $('.file-lodedPart');
            var width = loadingpart.width();
            //宽度为360
            if (width > 360) {
                window.clearInterval(viewModel.loadingTimer);
            }
            //每次宽度增加3.6
            loadingpart.width(width + 3.6);
            var progress = parseInt(width / 3.6);
            //当进度数字大于100时显示100
            if(progress>100){
            	progress = 100;
            }
            //进度条显示数字
            loadingpart.html(progress+'%');
        }, 100);
        
        //如果使用了nginx需要修改nginx的文件大小限制，nginx默认是2M，附件上传组件支持单文件1000M上传。
        var par = {
            fileElementId: "uploadFile",  //【必填】文件上传空间的id属性  <input type="file" id="id_file" name="file" />,可以修改，主要看你使用的 id是什么
            filepath: businessPk,   //【必填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
            groupname: "demo",//【必填】分組名称,未来会提供树节点
            permission: "read", //【选填】 read是可读=公有     private=私有     当这个参数不传的时候会默认private
            url: true,          //【选填】是否返回附件的连接地址，并且会存储到数据库
            //thumbnail :  "500w",//【选填】缩略图--可调节大小，和url参数配合使用，不会存储到数据库
            cross_url: '/iuap-saas-filesystem-service/' //【选填】跨iuap-saas-fileservice-base 时候必填
        }
        var f = new interface_file();
        f.filesystem_upload(par, function(){
        	$("#uploadFile").remove();
            $("#dialogUploadFile").find(".choosefile").append('<input style="display: none" type="file" name="uploadFile" id="uploadFile" />');
        	window.clearInterval(window.loadingTimer);
            md.close();
            pjt.messge('文件上传成功！');
            viewModel.attachmentData.clear();
        	viewModel.event.loadAtta();
        });
    }); 
};


/**
 * 创建附件管理组件
 * @param viewModel	视图模型
 * @param mainPage	界面首个DIV
 * @param depend	附件管理组件依附TAB
 */
pjt.createAttachment = function(viewModel,mainPage,depend){
	
	var attachmentMeta = {
			meta: {
				id: {
					type: "string"
				},
				pkfile: { 
					type: "string" 
				},
				filename: {
					type: "string"
				},
				filepath: {
					type: "string"
				},
				filesize: {
					type: "string"
				},
				groupname:{
					type: "string"
				},
				permission:{
					type: "string"
				},
				uploader: {
					'refmodel' : JSON.stringify(refinfo['bd_user']),
					'refcfg' : '{"ctx":"/uitemplate_web"}'
				},
				uploaderName: {
					
				},
				uploadtime: {
					type: "string"
				},
				sysid: {
					type: "string"
				},
				tenant: {
					type: "string"
				},
				modular: {
					type: "string"
				},
				url: {
					type: "string"
				},
				secretkey: {
					type: "string"
				},
				sourcetenant: {
					type: "string"
				}
			}
		};
	
	viewModel.attachmentData =  new u.DataTable(attachmentMeta);
	
	//清除主表格数据
	viewModel.attachmentData.clear();
	//设置表格每页面数据量，此属性不设置会导致页面分页组件不显示
	viewModel.attachmentData.pageSize(20);
	
	viewModel.event.uploadFile = function(){
		if(viewModel.businessPk==null || viewModel.businessPk ==""){
			pjt.messge("请设置业务单据主键！");
			return ;
		}
		//注意如果使用了nginx做代理，需要修改nginx默认文件大小，nginx默认2M，附件上传服务支持单文件1000M的上传。
    	pjt.attachmentFile(mainPage,viewModel.businessPk);
	};
	
	viewModel.event.downLoadFile = function(){
		var row = viewModel.attachmentData.getSelectedRows();
        if (row == null || row.length == 0) {
        	pjt.messge("请选择要下载的附件！");
            return;
        } else if (row.length > 1) {
        	pjt.messge("每次只能下载一个附件！");
            return;
        }
        var pk = row[0].getValue("id");
        var form = $("<form>");   //定义一个form表单
        form.attr('style', 'display:none');   //在form表单中添加查询参数
        form.attr('target', '');
        form.attr('enctype', 'multipart/form-data');
        form.attr('method', 'post');
        form.attr('action', "/iuap-saas-filesystem-service/file/download?permission=read&stream=false&id=" + pk);
        mainPage.append(form);  //将表单放置在web中
        form.submit();
	};
	
	viewModel.event.delLoadFile = function(){
		var rows = viewModel.attachmentData.getSelectedRows();
        if (rows == null || rows.length == 0) {
        	pjt.messge("请选择要删除的附件！");
            return
        } else if (rows.length > 1) {
        	pjt.messge("每次只能删除一个附件！");
            return
        }
        u.confirmDialog({
            msg:
                '<div class="pull-left col-padding u-msg-content-center" >' +
                '<i class="fa fa-exclamation-triangle margin-r-5 fa-3x red del-icon" style="vertical-align:middle"></i><br/>确认删除这个附件吗？</div>',
            title: '友情提醒',
            width:"400px",
            onOk: function () {
                var pk = rows[0].getValue("id");
                var par = {
                    id: pk,//【必填】表的id
                    cross_url: '/iuap-saas-filesystem-service/' //【选填】跨iuap-saas-fileservice-base 时候必填
                }
                var f = new interface_file();
                f.filesystem_delete(par, viewModel.event.loadAtta);
            }
        });
	};
	
	viewModel.event.loadAtta = function(){
		if(viewModel.businessPk==null || viewModel.businessPk ==""){
			pjt.messge("请设置业务单据主键！");
			return ;
		}
		var queryData = {};
    	queryData["search_filepath"] = viewModel.businessPk;
    	queryData["pageIndex"] = viewModel.attachmentData.pageIndex();
		queryData["pageSize"] = viewModel.attachmentData.pageSize();
		pjt.ajaxQueryData('/pubfilesystemweb/list',queryData,function(result){
			var data = result;
			if(data!=null){
				viewModel.attachmentData.setSimpleData(data.content,{unSelect:true});
				viewModel.attachmentData.totalPages(data.totalPages);
				viewModel.attachmentData.totalRow(data.totalElements);
			}
		});
	};
	
	viewModel.event.attachmentPageChange = function(index){
		viewModel.attachmentData.pageIndex(index);
    	viewModel.event.loadAtta();
	};
	
	viewModel.event.attachmentSizeChange = function(size){
		viewModel.attachmentData.pageSize(size);
		viewModel.attachmentData.pageIndex(0);
		viewModel.event.loadAtta();
	};
	
	var fileHtml = '<div class="u-row">'+
				   '	<div class="u-col-12">'+
				   '		<div class="u-widget" style="background-color:transparent;margin-left: 0;">'+
				   '			<button id="pjt_btn_uploadFile" class="u-button raised " data-bind="click: event.uploadFile">'+
				   '				<span class="operation">上传</span>'+
				   '			</button>'+
				   '			<button id="pjt_btn_downloadFile" class="u-button raised" data-bind="click: event.downLoadFile">'+
				   '				<span class="operation">下载</span>'+
				   '			</button>'+
				   '			<button id="pjt_btn_delLoadFile" class="u-button raised" data-bind="click: event.delLoadFile">'+
				   '				<span class="operation">删除</span>'+
				   '			</button>'+
				   '		</div>'+
				   '	</div>'+
				   '</div>'+
				   '<div class="u-row">'+
				   '	<div class="u-col-md-12">'+
				   '		<div id="attachmentGird" u-meta=\'{"id":"attachmentGird","type":"grid","data":"attachmentData","columnMenu":false,"canDrag":false,"sortable":false,"canSwap":false}\'>'+
				   '			<div options=\'{"title":"附件名称","field":"filename","dataType":"String","fixed":true}\' class="fixed-color"></div>'+
				   '			<div options=\'{"title":"文件类型","field":"fileType","dataType":"String"}\'></div>'+
				   '			<div options=\'{"title":"文件大小","field":"filesize","dataType":"String"}\'></div>'+
				   '			<div options=\'{"field":"uploader","dataType":"String","title":"创建人","renderType":"ncReferRender","editType":"ncReferEditType","showField":"uploaderName","editOptions":{"validType":"string"}}\'></div>'+
				   '			<div options=\'{"title":"创建时间","field":"uploadtime","dataType":"String"}\'></div>'+
				   '		</div>'+
				   '		<div id="attachmentPagination" class="u-pagination pagination" u-meta=\'{"type":"pagination","data":"attachmentData","pageChange":"event.attachmentPageChange","sizeChange":"event.attachmentSizeChange"}\'></div>'+
				   '	</div>'+
				   '</div>';
	depend.prepend(fileHtml);
};

/**
 *附件管理装载数据
 * @param viewModel	视图模型
 */
pjt.attaLoadData = function(viewModel){
	viewModel.attachmentData.clear();
	viewModel.event.loadAtta();
};

/**
 * 流程提交
 * @param currentData	当前表单数据
 * @param submitUrl	提交请求URL
 * @param funcCode	流程资源code
 * @param nodeKey	流程资源key
 */
pjt.submitProcess = function(currentData,submitUrl,funcCode,nodeKey){
    $.ajax({
        type: "GET",
        url: '/eiap-plus/appResAllocate/queryBpmTemplateAllocate?funccode='+funcCode+'&nodekey='+nodeKey,
        contentType: "application/json;charset=utf-8",
        success: function (result) {
        	if (result.success == "success") {
            	currentData["processDefinitionKey"] = result.detailMsg.data.res_code;
            	currentData["processInstanceName"] = result.detailMsg.data.res_name;
                $.ajax({
                    type: "POST",
                    url: submitUrl,
                    contentType: "application/json;charset=utf-8",
                    data: JSON.stringify(currentData),
                    success: function (result) {
                    	if (result.state == "success") {
                        	pjt.messge("流程提交成功！");
                        } 
                    }
                });
            } 
        }
    });
};

pjt.loadProcess = function(viewModel,cookie,callBack){
	if (cookie && cookie.vtype && cookie.vtype == 'bpm') {
		var bpmHeadHtml = '<div id="bpmhead" class="func_card_button_news">';
		$('#form-div-header').prepend(bpmHeadHtml);
		var bpmFootHtml = '<div id="bpmfoot"></div>';
		$('#form-div-body').prepend(bpmFootHtml);
		$('#btnGroupInlayer').hide();
		
		viewModel.initBpmFromTask(cookie, viewModel);
        viewModel.md = document.querySelector('#u-mdlayout');
        $('#form-div').show();
        
        callBack(cookie.id);
    }
};




/**
 * 模板打印，通过funCode,nodeKey取到打印模板
 * @param funCode	业务功能编码
 * @param nodeKey	打印nodeKey
 * @param qureyDataURL iuap打印服务获取业务数据的地址
 * @param businessPk	业务主键
 */
pjt.print = function (funCode, nodeKey, qureyDataURL, businessPk) {
	var getPrintTempUrl = '/eiap-plus/appResAllocate/queryPrintTemplateAllocate?funccode=' + funCode + '&nodekey=' + nodeKey;
	pjt.ajaxQueryThridService(getPrintTempUrl, '', function (data) {
		var templateCode = data.res_code;
		var tenantId = "tenant";//固定字符串
		var serverUrl = appCtx + qureyDataURL;//取数据的url地址
		var params = {//去后台打印数据的参数
			'id': businessPk
		};
		params = encodeURIComponent(JSON.stringify(params));//URL参数部分有特殊字符，必须编码(不同的tomcat对特殊字符的处理不一样)
		var url = '/print_service/print/preview?tenantId='
			+ tenantId + '&printcode=' + templateCode + '&serverUrl=' + serverUrl
			+ '&params=' + params + '&sendType=post';
		window.open(url);
	}, function (data) {
		pjt.message('没有找到打印模板');
	})
}

