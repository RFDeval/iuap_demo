package com.yonyou.iuap.order.service;

import com.yonyou.iuap.baseservice.intg.service.GenericIntegrateService;
import com.yonyou.iuap.baseservice.intg.support.ServiceFeature;

import com.yonyou.iuap.order.dao.DemoOrderMapper;
import com.yonyou.iuap.order.entity.DemoOrder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yonyou.iuap.baseservice.ref.service.RefCommonService;
import java.util.List;

import static com.yonyou.iuap.baseservice.intg.support.ServiceFeature.*;
@Service
public class DemoOrderService extends GenericIntegrateService<DemoOrder>{


    private DemoOrderMapper DemoOrderMapper;

    @Autowired
    public void setDemoOrderMapper(DemoOrderMapper DemoOrderMapper) {
        this.DemoOrderMapper = DemoOrderMapper;
        super.setGenericMapper(DemoOrderMapper);
    }
    
        @Autowired
    private RefCommonService refService;
 
        public List selectListByExcelData(List idsList) {
                List list  = DemoOrderMapper.selectListByExcelData(idsList);
                return refService.fillListWithRef(list);
        }


        
    @Override
    protected ServiceFeature[] getFeats() {
        return new ServiceFeature[]{ REFERENCE,ATTACHMENT,BPM,MULTI_TENANT,LOGICAL_DEL };
    }
}