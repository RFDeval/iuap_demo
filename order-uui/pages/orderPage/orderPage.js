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
  'interfaceFileImpl',
  // '/uitemplate_web/static/js/uiref/reflib.js',
  // '/uitemplate_web/static/js/uiref/refer.js',
  // '/uitemplate_web/static/js/uiref/refGrid.js',
  // '/uitemplate_web/static/js/uiref/refGridtree.js',
  // '/uitemplate_web/static/js/uiref/refTree.js',
  // '/uitemplate_web/static/js/uiref/refcommon.js',
  // '/uitemplate_web/static/js/uiref/uiReferComp.js'
],
  function (template, cookie, bpmopenbill) {
    var listRowUrl, saveRowUrl, delRowUrl, getUrl, submitUrl, recallUrl, auditUrl, element;

    var gNewRow = null;
    var gEditRowData = null;
    var gConditionRow = null;
    function init(element) {
      element = element;
      $(element).html(template);
      listRowUrl = "/demo_order/list"; //列表查询URL
      saveRowUrl = "/demo_order/save"; //新增和修改URL， 有id为修改 无id为新增
      delRowUrl = "/demo_order/deleteBatch"; //刪除URL
      downTemplateUrl = "/demo_order/excelTemplateDownload"; //下载excel模板
      expDataUrl = "/demo_order/toExportExcel";
      impDataUrl = "/demo_order/toImportExcel";
      getUrl = "/demo_order/get";
      submitUrl = "/demo_order/submit";
      recallUrl = "/demo_order/recall";
      auditUrl = "/demo_order";

      bpmBack = function () {
        viewModel.formData.clear();
        pjt.hideDiv('#form-div');
      }
      // viewModel.event.pageinit(element);
      viewModel = $.extend({}, viewModel, bpmopenbill.model);
      if (cookie && cookie.vtype && cookie.vtype == "bpm") {
        viewModel.flowEvent.initAuditPage(element, cookie);
      } else {
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
        viewModel.optType = 0;// 设置默认状态为查询态

        //设置表格每页面数据量
        viewModel.gridData.pageSize(10);
        viewModel.condition.clear();
        gConditionRow = viewModel.condition.createEmptyRow();
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
        console.log(searchinfo);
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
        gNewRow = viewModel.formData.createEmptyRow();
        viewModel.formData.setRowSelect(0);
        viewModel.optType = 1;//新增状态
        pjt.showDiv('#form-div');

        viewModel.businessPk = pjt.newUuid();
        var row = viewModel.formData.getCurrentRow();
        row.setValue('id', viewModel.businessPk);
        row.status = Row.STATUS.NEW;
        if (viewModel.attachmentData) {
          viewModel.attachmentData.clear();
        }
        document.getElementById("myTitle").innerHTML = "新增记录";
        $("#form-div-body").find('input').removeAttr("readOnly");
        $("#form-div-body").find('input').removeAttr("disabled");
        $("#orderInput").attr('readonly', 'readonly');
        $("#form_orderType").attr('readonly', 'readonly');
        $("#form_orderDeptName").attr('readonly', 'readonly');
        $("#form_orderByName").attr('readonly', 'readonly');
      },

      //编辑按钮点击
      editBtnClicked: function () {
        var currentData = viewModel.gridData.getSimpleData({ type: 'select' });
        if (currentData != null && currentData != "") {
          if (currentData.length > 1) {
            pjt.message("只能编辑一条记录！");
            return;
          }
          gEditRowData = currentData[0];//保存数据
          viewModel.formData.setSimpleData(currentData[0]);
          viewModel.businessPk = currentData[0].id;//设置主键用于附件上传关联
          pjt.attaLoadData(viewModel);
          viewModel.optType = 2;//编辑状态
          pjt.showDiv('#form-div');
          document.getElementById("myTitle").innerHTML = "编辑记录";
          $("#form-div-body").find('input').removeAttr("readOnly");
          $("#form-div-body").find('input').removeAttr("disabled");
          $("#orderInput").attr('readonly', 'readonly');
          $("#form_orderType").attr('readonly', 'readonly');
          $("#form_orderDeptName").attr('readonly', 'readonly');
          $("#form_orderByName").attr('readonly', 'readonly');
        } else {
          pjt.message("请选择要编辑的数据！");
        }
      },
      viewBtnClicked: function () {
        var currentData = viewModel.gridData.getSimpleData({ type: 'select' });
        if (currentData != null && currentData != "") {
          if (currentData.length > 1) {
            pjt.message("只能查看一条记录！");
            return;
          }
          viewModel.formData.setSimpleData(currentData[0]);
          viewModel.optType = 3;//查看状态
          pjt.showDiv('#form-div');
          document.getElementById("myTitle").innerHTML = "查看记录";
          // $("#form-div-body").find('input').attr('placeholder', '').attr('disabled', 'disabled').attr('readonly', 'readonly');
          $("#form-div-body").find('input').attr('disabled', 'disabled').attr('readonly', 'readonly');
          $("#form-div-body").find('button').attr('disabled', 'disabled').attr('readonly', 'readonly');
        } else {
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
        viewModel.optType = 0;
        var conditions = viewModel.condition.getSimpleData();
        if (conditions != null && conditions != "") {
          viewModel.gridData.addParams(conditions[0]);
        }
        viewModel.event.queryData();
      },
      // 清除搜索
      cleanSearch: function () {
        viewModel.condition.clear();
        gConditionRow = viewModel.condition.createEmptyRow();
        viewModel.condition.setRowSelect(0);
        viewModel.gridData.addParams(null);
      },

      //   下载模板
      downTemplate: function () {
        pjt.downloadTemple(downTemplateUrl);
      },
      //   导出成excel
      exportData: function () {
        pjt.expData(expDataUrl);
      },
      //   导入数据
      impExcelData: function () {
        pjt.excelDataImp($("#myLayout"), impDataUrl, function () {
          viewModel.event.queryData();
        });
      },

      /** 打印*/
      printPage: function () {
        var rows = viewModel.gridData.getSelectedRows();
        if (rows.length > 1 || rows.length < 1) {
          u.messageDialog({ msg: '请选择一条数据进行打印', title: '提示', btnText: '确定' });
          return;
        }
        var funCode = "demo_order1";
        var nodeKey = "test_print2";
        var serverUrl = '/demo_order/dataForPrint';//取数据的url地址
        var bussPK = rows[0].getSimpleData().id;
        pjt.print(funCode, nodeKey, serverUrl, bussPK);
      },

      showOrderType: function (obj) {
        var showValue = "";
        switch (obj.value) {
          case '1':
            showValue = "办公用品";
            break;
          case '2':
            showValue = "生活用品";
            break;
          case '3':
            showValue = "学习用品";
            break;
          default:
            showValue = "请选择";
            break;
        }
        obj.element.innerHTML = showValue;
      },

      newRef: function () {
        //var refCode="neworganizition";

        $.ajax({
          type: "get",
          url: '/newref/rest/iref_ctr/blobRefTree',
          data: {
            refCode: refCode || ""
          },
          traditional: true,
          async: false,
          dataType: "json",
          success: function (pRefmodel) {
            newpRefmodel = pRefmodel;
            console.log(pRefmodel);
            viewModel.event.newRefInit1(pRefmodel);
          }
        });
      },

      newRef1: function () {
        viewModel.event.newRefInit1('');
      },
      newRef2: function () {
        viewModel.event.newRefInit2('');
      },
      newRef3: function () {
        viewModel.event.newRefInit3('');
      },
      newRef4: function () {
        viewModel.event.newRefInit4('');
      },
      newRef5: function () {
        viewModel.event.newRefInit5('');
      },
      newRef6: function () {
        viewModel.event.newRefInit6('');
      },

      newRefInit1: function () {
        var option = {
          title: '选取组织',
          refType: 1,
          isRadio: true,
          hasPage: false,
          backdrop: false,
          treeloadData: true,
          tabData: [
          ],
          param: {//url请求参数
            refCode: 'neworganizition',
            tenantId: '',
            sysId: '',
            content: ''
          },
          refModelUrl: {
            TreeUrl: '/newref/rest/iref_ctr/blobRefTree', //树请求
            GridUrl: '/newref/rest/iref_ctr/commonRefsearch',//单选多选请求
            TableBodyUrl: '/newref/rest/iref_ctr/blobRefTreeGrid',//表体请求
            TableBarUrl: '/newref/rest/iref_ctr/refInfo',//表头请求
            totalDataUrl: '/newref/rest/iref_ctr/matchPKRefJSON',//根据refcode请求完整数
          },
          checkedArray: [],
          onCancel: function (p) {
          },
          onSave: function (sels) {
            switch (viewModel.optType) {
              case 1: {//新增记录
                gNewRow.setValue('orderDept', sels[0].refpk);
                gNewRow.setValue('orderDeptName', sels[0].refname);
                break;
              }
              case 2: {//修改记录
                gEditRowData.orderDept = sels[0].refpk;
                gEditRowData.orderDeptName = sels[0].refname;
                viewModel.formData.setSimpleData(gEditRowData);
                break;
              }
              case 3: {//查看记录详情
                break;
              }
              default: {//过滤和查询条件
                gConditionRow.setValue('search_orderDept', sels[0].refpk);
                gConditionRow.setValue('show_orderDeptName', sels[0].refname);



                break;
              }
            }
          },
          className: '',
        };
        window.createModal(option);
      },

      newRefInit2: function () {
        var option = {
          title: '选人员2',
          refType: 2,
          isRadio: true,
          hasPage: false,
          backdrop: false,
          treeloadData: true,
          tabData: [
          ],
          param: {//url请求参数
            refCode: 'common_ref_table',
            tenantId: 'tenantId',
            sysId: 'sysId',
            content: '',
          },
          refModelUrl: {
            TreeUrl: '/newref/rest/iref_ctr/blobRefTree', //树请求
            GridUrl: '/newref/rest/iref_ctr/commonRefsearch',//单选多选请求
            TableBodyUrl: '/newref/rest/iref_ctr/blobRefTreeGrid',//表体请求
            TableBarUrl: '/newref/rest/iref_ctr/refInfo',//表头请求
            totalDataUrl: '/newref/rest/iref_ctr/matchPKRefJSON',//根据refcode请求完整数
          },
          checkedArray: [],
          onCancel: function (p) {
          },
          onSave: function (sels) {
            switch (viewModel.optType) {
              case 1: {//新增记录
                gNewRow.setValue('orderBy', sels[0].refpk);
                gNewRow.setValue('orderByName', sels[0].refname);
                break;
              }
              case 2: {//修改记录
                gEditRowData.orderBy = sels[0].refpk;
                gEditRowData.orderByName = sels[0].refname;
                viewModel.formData.setSimpleData(gEditRowData);
                break;
              }
              case 3: {//查看记录详情

                break;
              }
              default://过滤和查询条件

                break;
            }
          },
          className: '',
        };

        window.createModal(option);
      },

      newRefInit3: function (refModel) {
        var option = {
          title: '选人员3',
          refType: 3,
          isRadio: true,
          hasPage: false,
          backdrop: false,
          treeloadData: true,
          tabData: [
          ],
          param: {//url请求参数
            refCode: 'common_ref_treecard',
            tenantId: 'tenantId',
            sysId: 'sysId',
            content: ''
          },
          refModelUrl: {
            TreeUrl: '/newref/rest/iref_ctr/blobRefTree', //树请求
            GridUrl: '/newref/rest/iref_ctr/commonRefsearch',//单选多选请求
            TableBodyUrl: '/newref/rest/iref_ctr/blobRefTreeGrid',//表体请求
            TableBarUrl: '/newref/rest/iref_ctr/refInfo',//表头请求
            totalDataUrl: '/newref/rest/iref_ctr/matchPKRefJSON',//根据refcode请求完整数
          },
          checkedArray: [],
          onCancel: function (p) {
          },
          onSave: function (sels) {
            console.log(sels);
            gNewRow.setValue('orderBy', sels[0].refpk);
            gNewRow.setValue('orderByName', sels[0].refname);
            console.log(gNewRow);
          },
          className: '',
        };
        window.createModal(option);
      },

      newRefInit4: function (refModel) {
        var option = {
          title: '选人员4',
          refType: 4,
          isRadio: true,
          hasPage: false,
          backdrop: false,
          treeloadData: true,
          tabData: [
          ],
          param: {//url请求参数
            refCode: 'checkbox_ref',
            tenantId: 'tenantId',
            sysId: 'sysId',
            content: ''
          },
          refModelUrl: {
            TreeUrl: '/newref/rest/iref_ctr/blobRefTree', //树请求
            GridUrl: '/newref/rest/iref_ctr/commonRefsearch',//单选多选请求
            TableBodyUrl: '/newref/rest/iref_ctr/blobRefTreeGrid',//表体请求
            TableBarUrl: '/newref/rest/iref_ctr/refInfo',//表头请求
            totalDataUrl: '/newref/rest/iref_ctr/matchPKRefJSON',//根据refcode请求完整数
          },
          checkedArray: [],
          onCancel: function (p) {
          },
          onSave: function (sels) {
            console.log(sels);

          },
          className: '',
        };
        window.createModal(option);
      },

      newRefInit5: function () {
        var option = {
          title: '选人员5',
          refType: 5,
          isRadio: true,
          hasPage: false,
          backdrop: false,
          treeloadData: true,
          tabData: [
          ],
          param: {//url请求参数
            refCode: 'common_ref',
            tenantId: '',
            sysId: '',
            content: '',
            transmitParam: '5'
          },
          refModelUrl: {
            TreeUrl: '/newref/rest/iref_ctr/blobRefTree', //树请求
            GridUrl: '/newref/rest/iref_ctr/commonRefsearch',//单选多选请求
            TableBodyUrl: '/newref/rest/iref_ctr/blobRefTreeGrid',//表体请求
            TableBarUrl: '/newref/rest/iref_ctr/refInfo',//表头请求
            totalDataUrl: '/newref/rest/iref_ctr/matchPKRefJSON',//根据refcode请求完整数
          },
          checkedArray: [],
          onCancel: function (p) {
          },
          onSave: function (sels) {
            console.log(sels);

          },
          className: '',
        };
        window.createModal(option);
      },

      newRefInit6: function (refModel) {
        var option = {
          title: '选人员6',
          refType: 6,
          isRadio: true,
          hasPage: false,
          backdrop: false,
          treeloadData: true,
          tabData: [
          ],
          param: {//url请求参数
            refCode: 'bd_common_org',
            tenantId: 'tenantId',
            sysId: 'sysId',
            content: '',
          },
          refModelUrl: {
            TreeUrl: '/newref/rest/iref_ctr/blobRefTreeGrid', //树请求
            GridUrl: '/newref/rest/iref_ctr/commonRefsearch',//单选多选请求
            TableBodyUrl: '/newref/rest/iref_ctr/blobRefTreeGrid',//表体请求
            TableBarUrl: '/newref/rest/iref_ctr/refInfo',//表头请求
            totalDataUrl: '/newref/rest/iref_ctr/matchPKRefJSON',//根据refcode请求完整数
          },
          checkedArray: [],
          onCancel: function (p) {
          },
          onSave: function (sels) {
            console.log(sels);

          },
          className: '',
        };
        window.createModal(option);
      },


    }


    viewModel.flowEvent = {
      //提交工作流
      submit: function () {
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
        } else if (currentData.length > 1) {
          pjt.message("请选择一条数据");
        } else {
          pjt.message("请选择要提交的数据");
        }
      },
      submitBPMByProcessDefineCode: function (selectedData, processDefineCode) {
        var postUrl = submitUrl + "?processDefineCode=" + processDefineCode;
        pjt.ajaxSaveData(postUrl, selectedData, function (data) {
          pjt.message("流程提交成功");
          //TODO
        }, function (data) {
          pjt.message("流程提交失败");
        });
      },
      //查看工单
      doView: function () {
        var currentData = viewModel.gridData.getSimpleData({ type: 'select' });
        if (currentData != null && currentData != "") {
          pjt.ajaxQueryData(getUrl, { search_id: currentData[0].id }, function (data) {
            //加入bpm按钮
            viewModel.initBPMFromBill(currentData[0].id, viewModel);

            viewModel.formData.clear();
            viewModel.formData.setSimpleData(data);
            // 把卡片页面变成不能编辑
            $("#form-div-body").css("display", "none");
            $("#form-div-body-view").css("display", "inline");
            document.getElementById("myTitle").innerHTML = "查看记录";
            $("#form-div-body-view").find('input').attr('placeholder', '').attr('disabled', 'disabled').attr('readonly', 'readonly');
            pjt.showDiv('#form-div');
            pjt.hideDiv('#form-div-header');
          }, function (data) {
            console.log("error:", data);
          });
        } else {
          pjt.message("请选择要查看的数据");
        }
      },
      //撤回工单
      recall: function () {
        var currentData = viewModel.gridData.getSimpleData({ type: 'select' });
        if (currentData != null && currentData != "") {
          pjt.ajaxSaveData(recallUrl, currentData, function (data) {
            if (typeof (data.message) == "undefined") {
              pjt.message("撤回成功");
            } else {
              pjt.message(data.message);
            }

          }, function (data) {
            pjt.message(data.message);
          });
        } else {
          pjt.message("请选择要撤回的数据");
        }
      },
      //审批单据打开页面,这是从任务中心打开的
      initAuditPage: function () {
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
