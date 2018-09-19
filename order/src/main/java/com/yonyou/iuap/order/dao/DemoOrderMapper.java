package com.yonyou.iuap.order.dao;
import com.yonyou.iuap.order.entity.DemoOrder;
import com.yonyou.iuap.baseservice.persistence.mybatis.mapper.GenericExMapper;
import com.yonyou.iuap.mybatis.anotation.MyBatisRepository;
import java.util.List;


@MyBatisRepository
public interface DemoOrderMapper extends GenericExMapper<DemoOrder> {
    List selectListByExcelData(List list);

    List<String> getIds();
}

