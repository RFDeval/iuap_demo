import static com.yonyou.uap.ieop.busilog.context.ContextKeyConstant.BUSINESS_SYS_ID;

class BusinessLogConfig {
    def context;
    def saveBussLog() {
      [category:"业务日志",log:"${context._billName}：执行保存方法:IP地址为${context._ip},"+
      "USER用户为${context._user},TIME操作时间为${context._time},内容为${context._param0}"+
      "返回值为${context._methodReturn}"]
    }
    def saveBussLog1() {
      [category:"业务日志1",log:"${context._billName}：执行保存方法:IP地址为${context._ip},USER用户为${context._user},TIME操作时间为${context._time},"]
    }
}
