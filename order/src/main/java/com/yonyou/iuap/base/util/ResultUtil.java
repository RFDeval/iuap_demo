/*
 * （C）2015 泰尔重工股份有限公司. taier Group, All right reserved.
 *
 * 项目名称 : party
 * 创建日期 : 2018年5月4日
 */

package com.yonyou.iuap.base.util;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;

import java.util.Map;

/**
  * @description 结果工具类
  * @author 姚春雷
  * @date 2018年5月4日 下午8:21:38
  * @version 1.0.0
  *
  *                    修改信息说明：
  * @updateDescription
  * @updateAuthor
  * @updateDate
  */
public class ResultUtil {

    private ResultUtil() {

    }

    /**
      * 封装结果对象信息
      * @param result   结果map
      * @param state    执行状态
      * @param messger  执行信息
      * @return 结果map
     */
    public static Map<String, Object> getWebResult(Map<String, Object> result, String state, String messger) {
        if (StringUtils.isNotBlank(state) && StringUtils.isNotBlank(messger)) {
            result.put("state", state);
            result.put("messger", messger);
        }
        return result;
    }

    /**
      * 封装结果对象信息
      * @param result   结果map
      * @param state    执行状态
      * @param messger  执行信息
      * @param page 页面数据
      * @return 结果map
     */
    public static <T> Map<String, Object> getWebResult(Map<String, Object> result, String state, String messger, Page<T> page) {
        if (StringUtils.isNotBlank(state) && StringUtils.isNotBlank(messger)) {
            result.put("state", state);
            result.put("messger", messger);
        }
        if (null != page) {
            result.put("data", page);
        }
        return result;
    }

    /**
     * 封装结果对象信息
     * @param result   结果map
     * @param state    执行状态
     * @param messger  执行信息
     * @param obj 单个数据对象
     * @return 结果map
    */
    public static <T> Map<String, Object> getWebResult(Map<String, Object> result, String state, String messger, Object obj) {
        if (StringUtils.isNotBlank(state) && StringUtils.isNotBlank(messger)) {
            result.put("state", state);
            result.put("messger", messger);
        }
        if (null != obj) {
            result.put("data", obj);
        }
        return result;
    }
}
