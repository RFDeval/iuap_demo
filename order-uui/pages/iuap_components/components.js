define(['text!./components.html',
  "./viewModel.js",
  '../../config/sys_const.js',
  "../../utils/utils.js",
  "../../utils/pjt-common.js",
],
  function (template) {
    var redisSetUrl;
    var redisGetUrl;
    var msgSendUrl;
    var emailSendUrl;
    var bussLogUrl;
    var gNewRow;
    function init(element) {
      element = element;
      $(element).html(template);
      redisSetUrl = "/component_example/redisSetValue"; 
      redisGetUrl = "/component_example/redisGetValue";
      msgSendUrl = "/component_example/sendTextMsg"; 
      emailSendUrl = "/component_example/sendEmail"; 
      bussLogUrl = "/component_example/saveBussLog"; 
      viewModel.event.pageinit(element);
    }
    viewModel.event = {
      pageinit: function (element) {
        viewModel.app = u.createApp({
          el: element,
          model: viewModel
        });
        gNewRow = viewModel.formData.createEmptyRow();
        viewModel.formData.setRowSelect(0);
      },
      redisSetValue: function () {
        var data = viewModel.formData.getSimpleData()[0];
        var param = {
          "rk": data.rkey1,
          "rv": data.rvalue1
        }
        pjt.ajaxSaveData(redisSetUrl, param, function (result) {
          console.log(result);
        });
      },
      redisGetValue: function () {
        var data = viewModel.formData.getSimpleData()[0];
        var param = {
          "rk": data.rkey2,
        }
        pjt.ajaxSaveData(redisGetUrl, param, function (result) {
          gNewRow.setValue('rvalue2', result);
        });
      },
      sendMsg: function () {
        var data = viewModel.formData.getSimpleData()[0];
        var param = {
          "no":data.msgNo1,
          "name": data.msgName1
        }
        pjt.ajaxSaveData(msgSendUrl, param, function (result) {
          console.log(result);
        });
      },
      sendEmail: function () {
        var data = viewModel.formData.getSimpleData()[0];
        var param = {
          "title":data.emailTitle,
          "content": data.emailContent
        }
        pjt.ajaxSaveData(emailSendUrl, param, function (result) {
          console.log(result);
        });
      },

      sendBussLog: function () {
        var data = viewModel.formData.getSimpleData()[0];
        var param = {
          "bussContent": data.bussContent
        }
        pjt.ajaxSaveData(bussLogUrl, param, function (result) {
          console.log(result);
        });
      }


    }
    return {
      template: template,
      init: init
    };
  });
