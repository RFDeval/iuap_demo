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
    tenantId: { type: "string" }
  },
  forceDel:true
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
};

