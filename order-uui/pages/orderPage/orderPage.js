define(['text!./orderPage.html',
    "css!../../style/common.css",
    'css!./orderPage.css',
   '../../config/sys_const.js',
    "../../utils/utils.js",
    "../../utils/pjt-common.js",
    "./viewModel.js"
	
	],
    function (template) {
        var listRowUrl, saveRowUrl, delRowUrl, element;
        function init(element) {
            element = element;
            $(element).html(template);
            listRowUrl = "/demo_order/list"; //列表查询URL
            saveRowUrl = "/demo_order/save"; //新增和修改URL， 有id为修改 无id为新增
            delRowUrl = "/demo_order/delete"; //刪除URL
            viewModel.event.pageinit(element);
            //撑满高度布局
            $("#myLayout").height(document.body.scrollHeight);
        }

        viewModel.event = {
            pageinit: function (element) {
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
                        queryParameters[key] = encodeURI(removeSpace(searchinfo[key]));
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
                pjt.showDiv('#form-div');
                document.getElementById("myTitle").innerHTML = "新增记录";
            },

            //编辑按钮点击
            editBtnClicked: function () {
                var currentData = viewModel.gridData.getSimpleData({ type: 'select' });
                if (currentData != null && currentData != "") {
                    viewModel.formData.setSimpleData(currentData[0]);
                    viewModel.optType = 1;//编辑状态
                    pjt.showDiv('#form-div');
                    document.getElementById("myTitle").innerHTML = "编辑记录";
                } else {
                    pjt.message("请选择要编辑的数据！");
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
                var listData = pjt.genDataList(data);
                pjt.ajaxSaveData(saveRowUrl, listData, function (result) {
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
        }
        return {
            template: template,
            init: init
        };
    });
