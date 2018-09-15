/*
 * （C）2018 用友网络科技股份有限公司. yonyou Group, All right reserved.
 *
 * 项目名称 : example
 * 创建日期 : 2018年6月12日
 */

package com.yonyou.iuap.base.filesystem.web;

import com.yonyou.iuap.base.filesystem.entity.PubFileSystem;
import com.yonyou.iuap.base.filesystem.service.PubFileSystemService;
import com.yonyou.iuap.base.util.ResultUtil;
import com.yonyou.iuap.base.util.SysConstant;
import com.yonyou.iuap.mvc.type.SearchParams;
import org.apache.commons.collections4.map.HashedMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
  * @description 附件管理请求控制
  * @author 姚春雷
  * @date 2018年6月12日 下午1:08:18
  * @version 1.0.0
  *
  *                    修改信息说明：
  * @updateDescription
  * @updateAuthor
  * @updateDate
  */
@RestController
@RequestMapping(value = "/pubfilesystemweb")
public class PubFileSystemWeb {

    private static final Logger LOGGER = LoggerFactory.getLogger(PubFileSystemWeb.class);

    @Autowired
    private PubFileSystemService pubFileSystemService;

    /**
      * 查询数据
      * @param pageRequest  分页对象
      * @param searchParams 查询参数
      * @param request  http请求
      * @return 数据集合
     */
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public Object selectAllByPage(PageRequest pageRequest, SearchParams searchParams, HttpServletRequest request) {
        //创建结果map
        Map<String, Object> result = new HashedMap<String, Object>();
        try {
            //获得分页数据
            Page<PubFileSystem> pubFileSystemPage = pubFileSystemService.selectAllByPage(pageRequest, searchParams);

            //封装执行信息
            result = ResultUtil.getWebResult(result, SysConstant.SUCCESS_FLAG, SysConstant.QUERY_DATA_SUCCESS, pubFileSystemPage);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            result = ResultUtil.getWebResult(result, SysConstant.FAILED_FLAG, SysConstant.QUERY_DATA_FAILED);
        }
        return result;
    }

}
