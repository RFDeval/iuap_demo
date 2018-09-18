var meta = {
  meta: {
    id: { type: "string" },
    orderNo: { type: "string" },
    orderName: { type: "string" },
    orderType: { type: "string" },
    orderCount: { type: "string" },
    orderAmount: { type: "string" },
    remark: { type: "string" },
    orderDate: { type: "string" },
    orderDept: { type: "string" },
    orderBy: { type: "string" },
    deptCheckBy: { type: "string" },
    purchaseDeptBy: { type: "string" },
    financialAudit: { type: "string" },
    checkBy: { type: "string" },
    createTime: { type: "string" },
    createUser: { type: "string" },
    lastModified: { type: "string" },
    lastModifyUser: { type: "string" },
    ts: { type: "string" },
    dr: { type: "string" },
    bpmState: { type: "string" },
    tenantId: { type: "string" },
    attachment:{}
  },
  forceDel:true
};
var fileDataMeta = {
	meta: {
		id: { type: 'string' },//主键
		filepath: { type: 'string' },//文件名称
		filesize: { type: 'string' },//文件大小
		filename: { type: 'string' },//文件名称
		uploadtime: { type: 'string' },//上传时间
		groupname: { type: 'string' },//
		url: { type: 'string' }//URL
	}
};
var conditionMeta = {
  meta: {
    search_orderNo: { 
      type: "string" 
    },
    search_orderName: {
      type: "string"
    }
  }
};

var viewModel = {
  condition: new u.DataTable(conditionMeta),//查询条件
  gridData: new u.DataTable(meta),  //表格数据
  formData: new u.DataTable(meta),  //表单数据
  attachmentData: new u.DataTable(fileDataMeta),
  orderTypeE: [{name: "办公用品", value: "1"}, {name: "生活用品", value: "2"}, {name: "学习用品", value: "3"}]
};

