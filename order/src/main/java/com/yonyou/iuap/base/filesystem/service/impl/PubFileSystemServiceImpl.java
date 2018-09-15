/*
 * （C）2018 用友网络科技股份有限公司. yonyou Group, All right reserved.
 *
 * 项目名称 : example
 * 创建日期 : 2018年6月12日
 */

package com.yonyou.iuap.base.filesystem.service.impl;

import com.yonyou.iuap.base.filesystem.dao.PubFileSystemMapper;
import com.yonyou.iuap.base.filesystem.entity.PubFileSystem;
import com.yonyou.iuap.base.filesystem.service.PubFileSystemService;
import com.yonyou.iuap.mvc.type.SearchParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

/**
  * @description 附件管理业务接口实现
  * @author 姚春雷
  * @date 2018年6月12日 下午1:09:58
  * @version 1.0.0
  *
  *                    修改信息说明：
  * @updateDescription
  * @updateAuthor
  * @updateDate
  */
@Service("pubFileSystemService")
public class PubFileSystemServiceImpl implements PubFileSystemService {

    @Autowired
    private PubFileSystemMapper pubFileSystemMapper;

    @Override
    public Page<PubFileSystem> selectAllByPage(PageRequest pageRequest, SearchParams searchParams) {
        return pubFileSystemMapper.selectAllByPage(pageRequest, searchParams.getSearchMap()).getPage();
    }

}
