import static com.yonyou.uap.ieop.busilog.context.ContextKeyConstant.BUSINESS_SYS_ID;

class BusinessLogConfig_demo_order {
    def context;
    def order_save() {
        [category:"业务日志",log:"${context._busiName}：执行保存方法:IP地址为${context._ip},USER用户为${context._user},TIME操作时间为${context._time}," +
                "编码为${context._methodReturn.code},名称为${context._param0.name}"]
    }
}
