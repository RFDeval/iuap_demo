package com.yonyou.iuap.order.service;

import com.yonyou.iuap.baseservice.bpm.service.GenericBpmService;
import com.yonyou.iuap.bpm.pojo.BPMFormJSON;
import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.iuap.order.dao.DemoOrderMapper;
import com.yonyou.iuap.order.entity.DemoOrder;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

@Service
public class DemoOrderBpmService extends GenericBpmService<DemoOrder>{

    private DemoOrderMapper DemoOrderMapper;

    @Autowired
    public void setDemoOrderMapper(DemoOrderMapper DemoOrderMapper) {
        this.DemoOrderMapper = DemoOrderMapper;
        super.setIbatisMapperEx(DemoOrderMapper);
    }

    @Override
    public BPMFormJSON buildBPMFormJSON(String processDefineCode, DemoOrder entity) {
        try {
            BPMFormJSON bpmform = new BPMFormJSON();
            bpmform.setProcessDefinitionKey(processDefineCode);
            String userName = InvocationInfoProxy.getUsername();
            try {
            userName = URLDecoder.decode(userName,"utf-8");
            userName = URLDecoder.decode(userName,"utf-8");
            } catch (UnsupportedEncodingException e) {
            userName =InvocationInfoProxy.getUsername();
            }
            //title
            String title = userName + "提交的单据,单号是" + entity.getBpmBillCode() + ", 请审批";
            bpmform.setTitle(title);
            // 实例名
            bpmform.setFunCode("order");
            // 单据id
            bpmform.setFormId(entity.getId().toString());
            // 单据号
            bpmform.setBillNo(entity.getBpmBillCode());
            // 制单人
            bpmform.setBillMarker(InvocationInfoProxy.getUserid());
            // 其他变量
            bpmform.setOtherVariables(buildEntityVars(entity));
            // 单据url
            //bpmform.setFormUrl("/react_example_fe/demo_order/#/DemoOrder-edit?btnFlag=2&search_id="+entity.getId());  // 单据url
            bpmform.setFormUrl("/OrderPage/order-uui/pages/orderPage/orderPage.js");
            // 流程实例名称
            bpmform.setProcessInstanceName(title);                                                                              // 流程实例名称
            // 流程审批后，执行的业务处理类(controller对应URI前缀)
            bpmform.setServiceClass("/order/demo_order");// 流程审批后，执行的业务处理类(controller对应URI前缀)
            //设置单据打开类型 uui/react
           // bpmform.setFormType(BPMFormJSON.FORMTYPE_REACT);
            bpmform.setFormType(BPMFormJSON.FORMTYPE_UUI);
            return bpmform;
        } catch (Exception ex) {
            throw new RuntimeException(ex.getMessage());
        }
    }
}

