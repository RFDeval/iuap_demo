var meta = {
  meta: {
    //主键
    id: { type: "string" },
    //编码
    code: {
      type: "string",
      required: true,
      nullMsg: "编码不能为空!"
    },
    //名称
    name: {
      type: "string",
      required: true,
      nullMsg: "名称不能为空!"
    },
    //是否固定(系统预置)
    sys: {
      type: "string",
      default: "否"
    },
    //备注信息
    remark: {
      type: "string"
    },
    //创建者
    creator: {
      type: "string"
    },
    createtime: {
      type: "string"
    }
  },
  forceDel:true
};

var conditionMeta = {
  meta: {
    search_code: { 
      type: "string" 
    },
    search_name: {
      type: "string"
    }
  }
};

var viewModel = {
  condition: new u.DataTable(conditionMeta),//查询条件
  gridData: new u.DataTable(meta),  //表格数据
  formData: new u.DataTable(meta),  //表单数据
  yesOrNo: [{name: "是", value: "是"}, {name: "否", value: "否"}]
};

