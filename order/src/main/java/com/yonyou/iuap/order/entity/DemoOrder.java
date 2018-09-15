package com.yonyou.iuap.order.entity;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.StrUtil;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.yonyou.iuap.baseservice.bpm.entity.AbsBpmModel;
import com.yonyou.iuap.baseservice.attachment.entity.AttachmentEntity;
import com.yonyou.iuap.baseservice.attachment.entity.Attachmentable;
import com.yonyou.iuap.baseservice.print.entity.Printable;      
import com.yonyou.iuap.baseservice.multitenant.entity.MultiTenant;
import com.yonyou.iuap.baseservice.entity.annotation.Reference;

import com.yonyou.iuap.baseservice.support.condition.Condition;
import com.yonyou.iuap.baseservice.support.condition.Match;
import com.yonyou.iuap.baseservice.support.generator.GeneratedValue;
import com.yonyou.iuap.baseservice.support.generator.Strategy;
import com.yonyou.iuap.baseservice.entity.annotation.CodingEntity;
import com.yonyou.iuap.baseservice.entity.annotation.CodingField;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.math.BigDecimal;

/**
 * demo订单
 */

@JsonIgnoreProperties(ignoreUnknown = true)
@Table(name = "demo_order")

@CodingEntity(codingField="orderNo")
public class DemoOrder extends AbsBpmModel  implements Serializable,Attachmentable,MultiTenant,Printable
{
    @Id
    @GeneratedValue(strategy=Strategy.UUID)
    @Column(name="id")
    @Condition
    protected String id;//ID
    @Override
    public String getId() {
        return id;
    }
    @Override
    public void setId(Serializable id){
        this.id= id.toString();
        super.id = id;
    }
    public void setId(String id) {
        this.id = id;
    }
    
        @Override
        public String getMainBoCode() {
                return "demo_order";
        }


    @Condition(match=Match.EQ)
    @Column(name="ORDER_TYPE")
    private String orderType;        //订单类型

    public void setOrderType(String orderType){
        this.orderType = orderType;
    }
    public String getOrderType(){
        return this.orderType;
    }

    @Transient
    private String orderDeptName;        //请购部门

    public void setOrderDeptName(String orderDeptName){
        this.orderDeptName = orderDeptName;
    }
    public String getOrderDeptName(){
        return this.orderDeptName;
    }

    @Column(name="CHECK_BY")
    @Reference(code="bd_common_dept",srcProperties={ "name"}, desProperties={ "checkByName"})
    private String checkBy;        //复核人员

    public void setCheckBy(String checkBy){
        this.checkBy = checkBy;
    }
    public String getCheckBy(){
        return this.checkBy;
    }

    @Condition(match=Match.LIKE)
    @Column(name="ORDER_NO")
    @CodingField(code="asval")
    private String orderNo;        //订单编号

    public void setOrderNo(String orderNo){
        this.orderNo = orderNo;
    }
    public String getOrderNo(){
        return this.orderNo;
    }

    @Column(name="DEPT_CHECK_BY")
    @Reference(code="checkbox_ref",srcProperties={ "peoname"}, desProperties={ "deptCheckByName"})
    private String deptCheckBy;        //部门审核人

    public void setDeptCheckBy(String deptCheckBy){
        this.deptCheckBy = deptCheckBy;
    }
    public String getDeptCheckBy(){
        return this.deptCheckBy;
    }

    @Condition(match=Match.GT)
    @Column(name="ORDER_COUNT")
    private Integer orderCount;        //商品数量

    public void setOrderCount(Integer orderCount){
        this.orderCount = orderCount;
    }
    public Integer getOrderCount(){
        return this.orderCount;
    }

    @Column(name="ORDER_BY")
    @Reference(code="common_ref_treecard",srcProperties={ "peoname"}, desProperties={ "orderByName"})
    private String orderBy;        //请购人员

    public void setOrderBy(String orderBy){
        this.orderBy = orderBy;
    }
    public String getOrderBy(){
        return this.orderBy;
    }

    @Transient
    private String checkByName;        //复核人员

    public void setCheckByName(String checkByName){
        this.checkByName = checkByName;
    }
    public String getCheckByName(){
        return this.checkByName;
    }

    @Column(name="REMARK")
    private String remark;        //备注信息

    public void setRemark(String remark){
        this.remark = remark;
    }
    public String getRemark(){
        return this.remark;
    }

    @Transient
    private String deptCheckByName;        //部门审核人

    public void setDeptCheckByName(String deptCheckByName){
        this.deptCheckByName = deptCheckByName;
    }
    public String getDeptCheckByName(){
        return this.deptCheckByName;
    }

    @Condition(match=Match.EQ)
    @Column(name="ORDER_DEPT")
    @Reference(code="neworganizition",srcProperties={ "name"}, desProperties={ "orderDeptName"})
    private String orderDept;        //请购部门

    public void setOrderDept(String orderDept){
        this.orderDept = orderDept;
    }
    public String getOrderDept(){
        return this.orderDept;
    }

    @Condition(match=Match.GT)
    @Column(name="ORDER_AMOUNT")
    private BigDecimal orderAmount;        //订单金额

    public void setOrderAmount(BigDecimal orderAmount){
        this.orderAmount = orderAmount;
    }
    public BigDecimal getOrderAmount(){
        return this.orderAmount;
    }

    @Transient
    private String orderByName;        //请购人员

    public void setOrderByName(String orderByName){
        this.orderByName = orderByName;
    }
    public String getOrderByName(){
        return this.orderByName;
    }

    @Transient
    private String purchaseDeptByName;        //采购部审核人

    public void setPurchaseDeptByName(String purchaseDeptByName){
        this.purchaseDeptByName = purchaseDeptByName;
    }
    public String getPurchaseDeptByName(){
        return this.purchaseDeptByName;
    }

    @Column(name="PURCHASE_DEPT_BY")
    @Reference(code="common_ref_table",srcProperties={ "peoname"}, desProperties={ "purchaseDeptByName"})
    private String purchaseDeptBy;        //采购部审核人

    public void setPurchaseDeptBy(String purchaseDeptBy){
        this.purchaseDeptBy = purchaseDeptBy;
    }
    public String getPurchaseDeptBy(){
        return this.purchaseDeptBy;
    }

    @Column(name="ORDER_DATE")
    private String orderDate;        //请购时间

    public void setOrderDate(String orderDate){
        this.orderDate = orderDate;
    }
    public String getOrderDate(){
        return this.orderDate;
    }

    @Column(name="FINANCIAL_AUDIT")
    @Reference(code="common_ref",srcProperties={ "peoname"}, desProperties={ "financialAuditName"})
    private String financialAudit;        //财务审核人

    public void setFinancialAudit(String financialAudit){
        this.financialAudit = financialAudit;
    }
    public String getFinancialAudit(){
        return this.financialAudit;
    }

    @Condition(match=Match.LIKE)
    @Column(name="ORDER_NAME")
    private String orderName;        //订单名称

    public void setOrderName(String orderName){
        this.orderName = orderName;
    }
    public String getOrderName(){
        return this.orderName;
    }

    @Transient
    private String financialAuditName;        //财务审核人员

    public void setFinancialAuditName(String financialAuditName){
        this.financialAuditName = financialAuditName;
    }
    public String getFinancialAuditName(){
        return this.financialAuditName;
    }

        @Override
        public String getBpmBillCode() {
        return getOrderNo();
        }

        @Transient
        private List<AttachmentEntity> attachment;
        public List<AttachmentEntity> getAttachment() {
        return attachment;
    }
    public void setAttachment(List<AttachmentEntity> attachment) {
        this.attachment = attachment;
    }


    @Column(name="TENANT_ID")
    @Condition(match=Match.EQ)
    private String tenantid;
    public String getTenantid() {
        return this.tenantid;
    }
    public void setTenantid(String tenantid) {
        this.tenantid = tenantid;
    }


}




