package com.yonyou.iuap.order.controller;
import com.yonyou.iuap.baseservice.print.controller.GenericPrintController;
import com.yonyou.iuap.mvc.constants.RequestStatusEnum;
import com.yonyou.iuap.baseservice.entity.annotation.Associative;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.yonyou.iuap.order.entity.DemoOrder;
import com.yonyou.iuap.order.service.DemoOrderService;
import com.yonyou.iuap.baseservice.ref.service.RefCommonService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.yonyou.iuap.mvc.annotation.FrontModelExchange;
import com.yonyou.iuap.mvc.type.SearchParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Controller
@RequestMapping(value="/demo_order")
public class DemoOrderPrintController extends GenericPrintController<DemoOrder>{
    
    private Logger logger = LoggerFactory.getLogger(DemoOrderController.class);

    @Autowired
    private RefCommonService refService;

    private DemoOrderService service;
    @Autowired
    public void setService(DemoOrderService service) {
        this.service = service;
        super.setService(service);
    }

    @Override
    public Object getDataForPrint(HttpServletRequest request) {
                String params = request.getParameter("params");
                JSONObject jsonObj = JSON.parseObject(params);
                String id = (String) jsonObj.get("id");

        DemoOrder vo = service.findById(id);
        if (vo.getMainBoCode()==null){
            return buildError("mainBoCode","主表业务对象编码为打印关键参数不可为空",RequestStatusEnum.FAIL_FIELD);
        }
        List<DemoOrder> mainList = new ArrayList();
        mainList.add(vo);
        mainList=refService.fillListWithRef(mainList);
        mainList= transformEnum(mainList);
        vo = mainList.get(0);

        JSONObject jsonVo = JSONObject.parseObject(JSONObject.toJSON(vo).toString());

                JSONObject mainData = new JSONObject();
                JSONObject childData = new JSONObject();

                JSONArray mainDataJson = new JSONArray();// 主实体数据


                Set<String> setKey = jsonVo.keySet();
        for(String key : setKey ){
            String value = jsonVo.getString(key);
            mainData.put(key, value);
        }
        mainDataJson.add(mainData);// 主表只有一行


        //增加子表的逻辑

        JSONObject boAttr = new JSONObject();
        //key：主表业务对象code
        boAttr.put(vo.getMainBoCode(), mainDataJson);

        
        return boAttr.toString();
    }

    private List<DemoOrder> transformEnum(List<DemoOrder> list){
        List<DemoOrder> resultList = new ArrayList<DemoOrder>();
            Map<String, String> orderTypeMap = new HashMap<String, String>();
                            orderTypeMap.put("1", "办公用品");
                            orderTypeMap.put("2", "生活用品");
                            orderTypeMap.put("3", "学习用品");
        for (DemoOrder entity : list) {
                if(entity.getOrderType() != null){
                    String value = orderTypeMap.get(entity.getOrderType());
                    entity.setOrderType(value);
                }
            resultList.add(entity);
        }

        return resultList;
    }

        
    }
