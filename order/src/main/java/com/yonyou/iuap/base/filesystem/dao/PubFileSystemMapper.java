/*
 * （C）2018 用友网络科技股份有限公司. yonyou Group, All right reserved.
 *
 * 项目名称 : example
 * 创建日期 : 2018年6月12日
 */

package com.yonyou.iuap.base.filesystem.dao;

import com.yonyou.iuap.base.filesystem.entity.PubFileSystem;
import com.yonyou.iuap.mybatis.type.PageResult;
import com.yonyou.iuap.persistence.mybatis.anotation.MyBatisRepository;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.domain.PageRequest;

import java.util.Map;

/**
  * @description 附件管理业务接口
  * @author 姚春雷
  * @date 2018年6月12日 下午1:07:40
  * @version 1.0.0
  *
  *                    修改信息说明：
  * @updateDescription
  * @updateAuthor
  * @updateDate
  */
@MyBatisRepository
public interface PubFileSystemMapper {

    /**
     * 分页查询附件管理，根据分页需求和查询参数
     * @param pageRequest  分页需求
     * @param searchParams 查询参数
     * @return 分页结果集合
    */
    PageResult<PubFileSystem> selectAllByPage(@Param("page") PageRequest pageRequest, @Param("search") Map<String, Object> searchParams);

}
