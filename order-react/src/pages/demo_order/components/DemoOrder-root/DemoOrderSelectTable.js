import React, { Component } from 'react';
import { Button,Checkbox,Table } from 'tinper-bee';
import moment from "moment/moment";
import multiSelect from "tinper-bee/lib/multiSelect.js";
import Header from 'components/Header';
import DemoOrderForm from '../DemoOrder-form';
const MultiSelectTable = multiSelect(Table, Checkbox);

export default class DemoOrderSelectTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectData:[]
        }
    }
    /**
     * 编辑
     */
    edit = () =>{
        console.log('进入编辑');
    }
    /**
     * tabel选中数据
     * @param {*} data
     */
    tabelSelect = (data) => {
        this.setState({
            selectData: data
        })
    }
    render(){
        const self=this;
        const { list,showLoading,pageSize, pageIndex, totalPages } = this.props;
        const column = [
            {
                title: "序号",
                dataIndex: "index",
                key: "index",
                width: 100,
                render(record, text, index) {
                    return index + 1;
                }
            },
                {
                    title: "订单类型",
                    dataIndex: "orderType",
                    key: "orderType",
                    width: 100,
                },
                {
                    title: "请购部门",
                    dataIndex: "orderDeptName",
                    key: "orderDeptName",
                    width: 100,
                },
                {
                    title: "复核人员",
                    dataIndex: "checkBy",
                    key: "checkBy",
                    width: 100,
                },
                {
                    title: "订单编号",
                    dataIndex: "orderNo",
                    key: "orderNo",
                    width: 100,
                },
                {
                    title: "部门审核人",
                    dataIndex: "deptCheckBy",
                    key: "deptCheckBy",
                    width: 100,
                },
                {
                    title: "商品数量",
                    dataIndex: "orderCount",
                    key: "orderCount",
                    width: 100,
                },
                {
                    title: "请购人员",
                    dataIndex: "orderBy",
                    key: "orderBy",
                    width: 100,
                },
                {
                    title: "复核人员",
                    dataIndex: "checkByName",
                    key: "checkByName",
                    width: 100,
                },
                {
                    title: "备注信息",
                    dataIndex: "remark",
                    key: "remark",
                    width: 100,
                },
                {
                    title: "部门审核人",
                    dataIndex: "deptCheckByName",
                    key: "deptCheckByName",
                    width: 100,
                },
                {
                    title: "请购部门",
                    dataIndex: "orderDept",
                    key: "orderDept",
                    width: 100,
                },
                {
                    title: "订单金额",
                    dataIndex: "orderAmount",
                    key: "orderAmount",
                    width: 100,
                },
                {
                    title: "请购人员",
                    dataIndex: "orderByName",
                    key: "orderByName",
                    width: 100,
                },
                {
                    title: "采购部审核人",
                    dataIndex: "purchaseDeptByName",
                    key: "purchaseDeptByName",
                    width: 100,
                },
                {
                    title: "采购部审核人",
                    dataIndex: "purchaseDeptBy",
                    key: "purchaseDeptBy",
                    width: 100,
                },
                {
                    title: "请购时间",
                    dataIndex: "orderDate",
                    key: "orderDate",
                    width: 100,
                },
                {
                    title: "财务审核人",
                    dataIndex: "financialAudit",
                    key: "financialAudit",
                    width: 100,
                },
                {
                    title: "订单名称",
                    dataIndex: "orderName",
                    key: "orderName",
                    width: 100,
                },
                {
                    title: "财务审核人员",
                    dataIndex: "financialAuditName",
                    key: "financialAuditName",
                    width: 100,
                },
            {
                title: "操作",
                dataIndex: "e",
                key: "e",
                render(text, record, index) {
                    return (
                        <div className='operation-btn'>
                            <Button size='sm' className='edit-btn' onClick={() => { self.edit(record,true) }}>编辑</Button>
                        </div>
                    )
                }
            }
        ];
        return (
            <div className="DemoOrder-select-table">
                <Header title='demo订单' back={true} />
                <DemoOrderForm { ...this.props }/>
                <div className="table-list">
                    <MultiSelectTable
                        loading={{ show: showLoading, loadingType: "line" }}
                        rowKey={(r, i) => i}
                        columns={column}
                        data={list}
                        multiSelect={{ type: "checkbox" }}
                        getSelectedDataFunc={this.tabelSelect}
                    />
                </div>
            </div>
        )
    }
}