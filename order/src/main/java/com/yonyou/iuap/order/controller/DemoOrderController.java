package com.yonyou.iuap.order.controller;
import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.yonyou.iuap.baseservice.controller.GenericController;
import com.yonyou.iuap.order.entity.DemoOrder;
import com.yonyou.iuap.order.service.DemoOrderService;
import com.yonyou.iuap.mvc.annotation.FrontModelExchange;
import com.yonyou.iuap.mvc.constants.RequestStatusEnum;
import com.yonyou.iuap.mvc.type.JsonResponse;
import com.yonyou.iuap.mvc.type.SearchParams;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.yonyou.iuap.common.utils.ExcelExportImportor;
import com.yonyou.iuap.persistence.vo.pub.BusinessException;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import java.util.List;
import java.util.Map;
import com.yonyou.iuap.cache.CacheManager;


@Controller
@RequestMapping(value="/demo_order")
public class DemoOrderController extends GenericController<DemoOrder>{

        private final static  Logger LOG = LoggerFactory.getLogger(DemoOrderController.class);

    	@Autowired
    	private CacheManager cacheManager;
    	
        private DemoOrderService demoOrderService;

        @Autowired
    public void setDemoOrderService(DemoOrderService demoOrderService) {
        this.demoOrderService = demoOrderService;
        super.setService(demoOrderService);
    }


    @Override
    public Object list(PageRequest pageRequest,
                                       @FrontModelExchange(modelType = DemoOrder.class) SearchParams searchParams) {
            return super.list(pageRequest,searchParams);
    }
        
    @RequestMapping(value = "/excelTemplateDownload", method = { RequestMethod.GET, RequestMethod.POST })
    @ResponseBody
    public Map<String, String> excelTemplateDownload(HttpServletRequest request,
                    HttpServletResponse response) throws BusinessException {
            Map<String, String> result = new HashMap<String, String>();

            try {
                    ExcelExportImportor.downloadExcelTemplate(response, getImportHeadInfo(), "demo订单", "demo订单模板");
                    result.put("status", "success");
                    result.put("msg", "Excel模版下载成功");
            } catch (Exception e) {
                    LOG.error("Excel模版下载失败", e);
                    result.put("status", "failed");
                    result.put("msg", "Excel模版下载失败");
            }
            return result;
    }

    @RequestMapping(value = "/toImportExcel", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> importExcel(HttpServletRequest request) throws BusinessException {
            Map<String, String> result = new HashMap<String, String>();
            try {

                    List<DemoOrder> list = new ArrayList<DemoOrder>();
            CommonsMultipartResolver resolver = new CommonsMultipartResolver();
            if(resolver.isMultipart(request)){
                     MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
                     int size = multipartRequest.getMultiFileMap().size();
                     MultiValueMap<String, MultipartFile> multiValueMap = multipartRequest.getMultiFileMap();
                     if(multiValueMap !=null && size > 0){
                            for(MultiValueMap.Entry<String, List<MultipartFile>> me : multiValueMap.entrySet()){
                    List<MultipartFile> multipartFile = me.getValue();
                    for(MultipartFile mult : multipartFile){
                            list = ExcelExportImportor.loadExcel(mult.getInputStream(), getImportHeadInfo(), DemoOrder.class);
                    }
                            }
                     }
            }
                    demoOrderService.saveBatch(list);
                    result.put("status", "success");
                    result.put("msg", "Excel导入成功");
            } catch (Exception e) {
                    LOG.error("Excel导入失败", e);
                    result.put("status", "failed");
                    result.put("msg", "Excel导入失败");
            }
            return result;
    }
        
    @RequestMapping(value = "/toExportExcel",method = RequestMethod.POST)
    @ResponseBody
    public Object exportExcel(PageRequest pageRequest,
                        @FrontModelExchange(modelType = DemoOrder.class) SearchParams searchParams,HttpServletResponse response,@RequestBody List<DemoOrder> dataList){

       Map<String, String> result = new HashMap<String, String>();
       try {
              List idsList = new ArrayList();
      for (DemoOrder entity : dataList) {
             idsList.add(entity.getId());
      }
      List list = demoOrderService.selectListByExcelData(idsList);
      list= transformEnum(list);
              ExcelExportImportor.writeExcel(response, list, getExportHeadInfo(), "demo订单", "demo订单");
          result.put("status", "success");
          result.put("msg", "信息导出成功");
          result.put("fileName", "demo订单");
       } catch (Exception e) {
          LOG.error("Excel下载失败", e);
          result.put("status", "failed");
          result.put("msg", "Excel下载失败");
       }
       return result;
    }
        
    @RequestMapping(value = "/toExportExcelAll",method = RequestMethod.GET)
    @ResponseBody
    public Object exportExcelAll(PageRequest pageRequest,
                        @FrontModelExchange(modelType = DemoOrder.class) SearchParams searchParams,HttpServletResponse response){

       Map<String, String> result = new HashMap<String, String>();
       try {
              Page<DemoOrder> page = demoOrderService.selectAllByPage(pageRequest, searchParams);
              List list = page.getContent();
      list= transformEnum(list);
              ExcelExportImportor.writeExcel(response, list, getExportHeadInfo(), "demo订单", "demo订单");
          result.put("status", "success");
          result.put("msg", "信息导出成功");
       } catch (Exception e) {
          LOG.error("Excel下载失败", e);
          result.put("status", "failed");
          result.put("msg", "Excel下载失败");
       }
       return result;
    }

    private Map<String, String> getExportHeadInfo() {
        String values = "{'orderType':'订单类型','orderNo':'订单编号','deptCheckByName':'审核人','orderGoodsCount':'商品数量','orderByName':'请购人员','orderGoods':'商品名称','remark':'备注信息','orderDeptName':'请购单位','orderAmount':'订单金额','orderDate':'请购时间','orderName':'订单名称',}";
        return getMapInfo(values);
    }
    
    private Map<String, String> getImportHeadInfo() {
        String values = "{'orderType':'订单类型','orderNo':'订单编号','deptCheckBy':'审核人','orderGoodsCount':'商品数量','orderBy':'请购人员','orderGoods':'商品名称','remark':'备注信息','orderDept':'请购单位','orderAmount':'订单金额','orderDate':'请购时间','orderName':'订单名称',}";
            return getMapInfo(values);
    }
    
    private Map<String, String> getMapInfo(String values){      
                String values_new = values.substring(0, values.length()-1);
                if(values_new.endsWith(",")){
                        values = values_new.substring(0, values_new.length()-1)+"}";
                }
        Map<String, String> headInfo = null;
            //if (headInfo == null) {
            net.sf.json.JSONObject json = net.sf.json.JSONObject.fromObject(values);
            headInfo = (Map<String, String>) json;
            //}
            return headInfo;
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