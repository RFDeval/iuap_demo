var meta = {
  meta: {
    rkey1: { type: "string" },   //缓存set时候的key
    rvalue1: { type: "string" }, //缓存set时候的value
    rkey2: { type: "string" },   //缓存get时候的key
    rvalue2: { type: "string" }, //缓存get时候的value
    msgNo1:{ type: "string" },//站内消息单据号
    msgName1: { type: "string" },//站内消息单据名称
    emailTitle:{ type: "string" },//站内消息单据号
    emailContent: { type: "string" },//邮件消息单据名称
    bussContent:{type: "string"}   //业务日志内容
  }
};
var viewModel = {
  formData: new u.DataTable(meta),
};