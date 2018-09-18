package com.yonyou.iuap.order.dao;

import com.yonyou.iuap.order.entity.DemoOrder;
import com.yonyou.iuap.baseservice.persistence.mybatis.mapper.GenericExMapper;
import com.yonyou.iuap.mybatis.anotation.MyBatisRepository;

import java.util.List;


@MyBatisRepository
public interface DemoOrderMapper extends GenericExMapper<DemoOrder> {
    /**
     * 查询主键集合
     * @return
     */
    List<String> getIds();
    List selectListByExcelData(List list);
}

