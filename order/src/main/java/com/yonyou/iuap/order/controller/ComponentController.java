package com.yonyou.iuap.order.controller;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.commons.lang.StringEscapeUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.yonyou.iuap.order.service.ComponentService;
import com.yonyou.iuap.utils.PropertyUtil;
import com.yonyou.iuap.base.utils.RestUtils;
import com.yonyou.iuap.cache.CacheManager;
import com.yonyou.iuap.mvc.constants.RequestStatusEnum;
import com.yonyou.iuap.mvc.type.JsonErrorResponse;
import com.yonyou.iuap.mvc.type.JsonResponse;


@Controller
@RequestMapping(value="/component_example")
public class ComponentController {
    @Autowired
	private CacheManager cacheManager;
    
    @Autowired
    private ComponentService componentService;
	
	    @RequestMapping(value = "/redisSetValue", method = {RequestMethod.POST })
	    @ResponseBody
	    public Object redisSetValue(@RequestBody String param) {
	    	JsonResponse jsonResp;
			JSONObject jo=new JSONObject();
			Map<String, Object> m=(Map<String, Object> )jo.parse(param); 
			String rk=(String) m.get("rk");
			String rv=(String) m.get("rv");
			try {
				cacheManager.set(rk, rv);
				jsonResp=buildSuccess("OK");
			} catch (Exception var4) {
				jsonResp = this.buildError("msg", var4.getMessage(), RequestStatusEnum.FAIL_FIELD);
			}
			return jsonResp;
		}

	    @RequestMapping(value = "/redisGetValue", method = {RequestMethod.POST })
	    @ResponseBody
	    public Object redisGetValue(@RequestBody String param) {
	    	JsonResponse jsonResp;
			JSONObject jo=new JSONObject();
			Map<String, Object> m=(Map<String, Object> )jo.parse(param); 
			String rk=(String) m.get("rk");
			try {
			    String rv=cacheManager.get(rk);	
			   jsonResp=buildSuccess(rv);
			} catch (Exception var4) {
				jsonResp = this.buildError("msg", var4.getMessage(), RequestStatusEnum.FAIL_FIELD);
			}
			return jsonResp;
			
		}

	    @RequestMapping(value = "/sendTextMsg", method = {RequestMethod.POST })
	    @ResponseBody
	    public Object sendTextMsg(@RequestBody String param) {
	    	JsonResponse jsonResp;
			JSONObject jo=new JSONObject();
			Map<String, Object> m=(Map<String, Object> )jo.parse(param); 
			String no=(String) m.get("no");
			String name=(String) m.get("name");
			try {
				  componentService.sendMessage(no, name);
				  jsonResp=this.buildSuccess("");
			} catch (Exception var4) {
				jsonResp = this.buildError("msg", var4.getMessage(), RequestStatusEnum.FAIL_FIELD);
			}
			return jsonResp;
		}
	    
	    @RequestMapping(value = "/sendEmail", method = {RequestMethod.POST })
	    @ResponseBody
	    public Object sendEmail(@RequestBody String param) {
	    	JsonResponse jsonResp;
			JSONObject jo=new JSONObject();
			Map<String, Object> m=(Map<String, Object> )jo.parse(param); 
			String title=(String) m.get("title");
			String content=(String) m.get("content");
			try {
				componentService.sendEmail(title, content);
				 jsonResp=this.buildSuccess("");
			} catch (Exception var4) {
				jsonResp = this.buildError("msg", var4.getMessage(), RequestStatusEnum.FAIL_FIELD);
			}
			return jsonResp;
		}

	    @RequestMapping(value = "/saveBussLog", method = {RequestMethod.POST })
	    @ResponseBody
	    public Object saveBussLog(@RequestBody String param) {
			JsonResponse jsonResp;
			System.out.println(param);
			JSONObject jo=new JSONObject();
			Map<String, Object> m=(Map<String, Object> )jo.parse(param); 
			String bussContent=(String) m.get("bussContent");
			try {
				componentService.saveBussLog(bussContent);
				jsonResp = this.buildSuccess("");
			} catch (Exception var4) {
				jsonResp = this.buildError("msg", var4.getMessage(), RequestStatusEnum.FAIL_FIELD);
			}
			return jsonResp;	
		}
	
		public <T> JsonResponse buildSuccess(Object value) {
			JsonResponse response = new JsonResponse();
			response.getDetailMsg().put("data", value);
			return response;
		}

		public JsonResponse buildError(String field, String msg, RequestStatusEnum status) {
			JsonErrorResponse errorResponse = new JsonErrorResponse();
			if (RequestStatusEnum.SUCCESS.equals(status)) {
				throw new IllegalArgumentException("状态码设置错误!");
			} else {
				errorResponse.setSuccess(status.getStatus());
				if (RequestStatusEnum.FAIL_GLOBAL.equals(status)) {
					errorResponse.setMessage(StringEscapeUtils.escapeHtml(msg));
				} else {
					errorResponse.getDetailMsg().put(StringEscapeUtils.escapeHtml(field),
							StringEscapeUtils.escapeHtml(msg));
				}

				return errorResponse;
			}
		}
}
