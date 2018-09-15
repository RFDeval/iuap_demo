define(['text!./orderPage.html',
    "cookieOperation",
    "/eiap-plus/pages/flow/bpmapproveref/bpmopenbill.js",
    "css!../../style/common.css",
    'css!./orderPage.css',
   '../../config/sys_const.js',
    "../../utils/utils.js",
    "../../utils/pjt-common.js",
    "./viewModel.js",
    '/iuap-saas-filesystem-service/resources/js/ajaxfileupload.js',
    '/iuap-saas-filesystem-service/resources/js/ossupload.js',
    'interfaceFileImpl'
	],
    function (template,cookie,bpmopenbill) {
        var listRowUrl, saveRowUrl, delRowUrl,getUrl,submitUrl,recallUrl,auditUrl, element;
        function init(element) {
            element = element;
            $(element).html(template);
            listRowUrl = "/demo_order/list"; //列表查询URL
            saveRowUrl = "/demo_order/save"; //新增和修改URL， 有id为修改 无id为新增
            delRowUrl = "/demo_order/deleteBatch"; //刪除URL
            downTemplateUrl="/demo_order/excelTemplateDownload"; //下载excel模板
            expDataUrl="/demo_order/toExportExcel";
            impDataUrl="/demo_order/toImportExcel";
            getUrl = "/demo_order/get";
            submitUrl = "/demo_order/submit";
            recallUrl = "/demo_order/recall";
            auditUrl  = "/demo_order";

            bpmBack = function(){
                viewModel.formData.clear();
                pjt.hideDiv('#form-div');
            }
           // viewModel.event.pageinit(element);
            viewModel = $.extend({},viewModel,bpmopenbill.model);
            if(cookie && cookie.vtype && cookie.vtype =="bpm"){
                viewModel.flowEvent.initAuditPage(element,cookie);
            }else{
                viewModel.event.pageinit(element)
            }
            //撑满高度布局
            $("#myLayout").height(document.body.scrollHeight);
            
        }

        viewModel.event = {
            pageinit: function (element) {
                pjt.createAttachment(viewModel, $('#myLayout'), $('.u-tabs__panel'));

                viewModel.app = u.createApp({
                    el: element,
                    model: viewModel
                });
                //清除主表格数据
                viewModel.gridData.clear();
                //设置表格每页面数据量
                viewModel.gridData.pageSize(10);
                viewModel.condition.clear();
                viewModel.condition.createEmptyRow();
                viewModel.condition.setRowSelect(0);
                viewModel.event.queryData();
            },

            //表格分页
            pageChange: function (index) {
                viewModel.gridData.pageIndex(index);
                viewModel.event.queryData();
            },

            //当前页显示记录数
            sizeChange: function (size) {
                viewModel.gridData.pageSize(size);
                viewModel.gridData.pageIndex(0);
                viewModel.event.queryData();
            },

            //查询数据
            queryData: function () {
                var queryParameters = {};
                queryParameters["pageIndex"] = viewModel.gridData.pageIndex();
                queryParameters["pageSize"] = viewModel.gridData.pageSize();
                queryParameters["sortField"] = "create_time";
                queryParameters["sortDirection"] = "desc";
                var searchinfo = viewModel.gridData.params;
                for (var key in searchinfo) {
                    if (searchinfo[key] && searchinfo[key] != null) {
                        queryParameters[key] = removeSpace(searchinfo[key]);
                    }
                }
                pjt.ajaxQueryData(listRowUrl, queryParameters, function (data) {
                    if (data != null) {
                        viewModel.gridData.setSimpleData(data.content, { unSelect: true });
                        viewModel.gridData.totalPages(data.totalPages);
                        viewModel.gridData.totalRow(data.totalElements);
                    }
                }, function (data) {
                    pjt.message(data);
                });
            },

            // 新增按钮点击
            addBtnClicked: function () {
                viewModel.formData.clear();
                viewModel.formData.createEmptyRow();
                viewModel.formData.setRowSelect(0);

                $("#uploadFile_btn").css("display","inline");
                $("#delLoadFile_btn").css("display","inline");
                viewModel.businessPk = pjt.newUuid();
				var row = viewModel.formData.getCurrentRow();
				row.setValue('id', viewModel.businessPk);
                row.status = Row.STATUS.NEW;
                if(viewModel.attachmentData){
					viewModel.attachmentData.clear();
                }
                
                pjt.showDiv('#form-div');
                $("#form-div-body-view").css("display","none");
                $("#form-div-body").css("display","inline");
                document.getElementById("myTitle").innerHTML = "新增记录";
            },

            //编辑按钮点击
            editBtnClicked: function () {
                var currentData = viewModel.gridData.getSimpleData({ type: 'select' });
                if (currentData != null && currentData != "") {
                    viewModel.formData.setSimpleData(currentData[0]);
                    $("#uploadFile_btn").css("display","inline");
                    $("#delLoadFile_btn").css("display","inline");
					viewModel.businessPk=currentData[0].id;//设置主键用于附件上传关联
					pjt.attaLoadData(viewModel);
                    viewModel.optType = 1;//编辑状态
                    pjt.showDiv('#form-div');
                    $("#form-div-body-view").css("display","none");
                    $("#form-div-body").css("display","inline");
                    document.getElementById("myTitle").innerHTML = "编辑记录";
                   // $("#form-div-body").find('input').attr('placeholder','').attr('disabled','disabled').attr('readonly','readonly');
                } else {
                    pjt.message("请选择要编辑的数据！");
                }
            },
            viewBtnClicked:function(){
                var currentData = viewModel.gridData.getSimpleData({ type: 'select' });
                if (currentData != null && currentData != "") {
                    viewModel.formData.setSimpleData(currentData[0]);
                    $("#uploadFile_btn").css("display","none");
                    $("#delLoadFile_btn").css("display","none");
                    viewModel.businessPk=currentData[0].id;//设置主键用于附件上传关联
                    pjt.attaLoadData(viewModel);
                    
                    viewModel.optType = 2;//查看状态
                    pjt.showDiv('#form-div');
                    $("#form-div-body").css("display","none");
                    $("#form-div-body-view").css("display","inline");
                    document.getElementById("myTitle").innerHTML = "查看记录";
                    $("#form-div-body-view").find('input').attr('placeholder','').attr('disabled','disabled').attr('readonly','readonly');
                    
                }else{
                    pjt.message("请选择要查看的数据！");
                }
            },
            // 返回按钮点击
            backBtnClick: function () {
                viewModel.formData.clear();
                pjt.hideDiv('#form-div');
            },

            //保存按钮点击
            saveClick: function () {
                //form表单校验
                if (!viewModel.app.compsValidate($(element).find("#addPage")[0])) {
                    pjt.message("请检查必填项");
                    return;
                }
                var data = viewModel.formData.getSimpleData()[0];
                //由于后台要求传递list对象。所以做了list组装，如果后台没有则不需要组装list
                // var listData = pjt.genDataList(data);

                pjt.ajaxSaveData(saveRowUrl, data, function (result) {
                    viewModel.formData.clear();
                    pjt.hideDiv('#form-div');
                    viewModel.event.queryData();
                });
            },

            //删除按钮点击
            delRows: function (data) {
                var currentData = viewModel.gridData.getSimpleData({ type: 'select' });
                if (currentData != null && currentData != "") {
                    u.confirmDialog({
                        msg:
                            '<div class="pull-left col-padding u-msg-content-center" >' +
                            '<i class="fa fa-exclamation-triangle margin-r-5 fa-3x red del-icon" style="vertical-align:middle"></i>确认删除这些数据吗？</div>',
                        title: "",
                        onOk: function () {
                            viewModel.event.del(currentData)
                        }
                    });
                } else {
                    pjt.message("请选择要删除的数据！");
                }
            },
            //真正删除逻辑
            del: function (data) {
                var arr = [];
                for (var i = 0; i < data.length; i++) {
                    arr.push({
                        id: data[i].id
                    });
                }
                pjt.ajaxDelData(delRowUrl, arr, function (result) {
                    pjt.message("删除成功！");
                    viewModel.event.queryData();
                });
            },
            // 搜索
            search: function () {
                viewModel.gridData.clear();
                var conditions = viewModel.condition.getSimpleData();
                if (conditions != null && conditions != "") {
                    viewModel.gridData.addParams(conditions[0]);
                }
                viewModel.event.queryData();
            },
            // 清除搜索
            cleanSearch: function () {
                viewModel.condition.clear();
                viewModel.condition.createEmptyRow();
                viewModel.condition.setRowSelect(0);
                viewModel.gridData.addParams(null);
            },

            downTemplate:function(){
               // pjt.downloadTemple($('#myLayout'),downTemplateUrl);
               pjt.downloadTemple(downTemplateUrl);
            },
            exportData:function(){
                pjt.expData(expDataUrl);
            },
            impExcelData:function(){


                
                pjt.excelDataImp($("#myLayout"), impDataUrl,function(){
                    viewModel.event.queryData();
                });  
            }
        }
        viewModel.flowEvent = {
            //提交工作流
            submit:function(){
                var currentData = viewModel.gridData.getSimpleData({ type: 'select' });
                if (currentData != null && currentData != "" && currentData.length === 1) {
                    var checkUrl = "/eiap-plus/appResAllocate/queryBpmTemplateAllocate?funccode=" + getAppCode() + "&nodekey=order_001";
                    pjt.ajaxQueryThridService(checkUrl, {}, function (data) {
                        console.log("OK:", data);
                        var processDefineCode = data.res_code;
                        viewModel.flowEvent.submitBPMByProcessDefineCode(currentData, processDefineCode);
                    }, function (data) {
                        pjt.message("请求数据错误!");
                    })
                }else if(currentData.length > 1){
                    pjt.message("请选择一条数据");
                }else{
                    pjt.message("请选择要提交的数据");
                }
            },
            submitBPMByProcessDefineCode:function(selectedData, processDefineCode){
                var postUrl = submitUrl + "?processDefineCode=" + processDefineCode;
                pjt.ajaxSaveData(postUrl, selectedData, function (data) {
                    pjt.message("流程提交成功");
                    //TODO
                }, function (data) {
                    pjt.message("流程提交失败");
                });
            },
            //查看工单
            doView:function(){
                var currentData = viewModel.gridData.getSimpleData({ type: 'select' });
                if (currentData != null && currentData != "") {
                    pjt.ajaxQueryData(getUrl, {search_id:currentData[0].id}, function (data) {
                        //加入bpm按钮
                        viewModel.initBPMFromBill(currentData[0].id, viewModel);
    
                        viewModel.formData.clear();
                        viewModel.formData.setSimpleData(data);
                        // 把卡片页面变成不能编辑
                        $("#form-div-body").css("display","none");
                        $("#form-div-body-view").css("display","inline");
                        document.getElementById("myTitle").innerHTML = "查看记录";
                        $("#form-div-body-view").find('input').attr('placeholder','').attr('disabled','disabled').attr('readonly','readonly');
                        pjt.showDiv('#form-div');
                        pjt.hideDiv('#form-div-header');
                    }, function (data) {
                        console.log("error:", data);
                    });
                }else{
                    pjt.message("请选择要查看的数据");
                }
            },
            //撤回工单
            recall:function(){
                var currentData = viewModel.gridData.getSimpleData({ type: 'select' });
                if (currentData != null && currentData != "") {
                    pjt.ajaxSaveData(recallUrl, currentData, function (data) {
                        if(typeof(data.message)=="undefined"){
                            pjt.message("撤回成功");
                        }else{
                            pjt.message(data.message);
                        }
                        
                    }, function (data) {
                        pjt.message(data.message);
                    });
                }else{
                    pjt.message("请选择要撤回的数据");
                }
            },
            //审批单据打开页面,这是从任务中心打开的
            initAuditPage:function(){
                var app = u.createApp({
                    el: element,
                    model: viewModel
                });
                viewModel.initBpmFromTask(arg, viewModel);					//初始化BPM相关内容(添加审批操作头部和审批相关弹出框的代码片段)
                var url = getUrl + "?id=" + arg.id;
                pjt.ajaxQueryData(url, null, function (data) {
                    viewModel.formData.clear();
                    viewModel.formData.setSimpleData(data);
                    // 把卡片页面变成不能编辑
                    $('#myForm').each(function (index, element) {
                        $(element).find('input[type!="radio"]').attr('disabled', true);
                        $(element).find('textarea').attr('disabled', true);
                    });
                    pjt.showDiv('#form-div');
                    pjt.hideDiv('#form-div-header');
                }, function (data) {
                    alert(2);
                });
            }

        }
        return {
            template: template,
            init: init
        };
    });
