import React, { Component } from 'react'
import PaginationTable from 'components/PaginationTable'
import {BpmButtonSubmit,BpmButtonRecall} from 'yyuap-bpm';
import { actions } from 'mirrorx';
import { Button,Message,Modal } from 'tinper-bee';
import Select from 'bee-select';
import moment from "moment/moment";
import Header from 'components/Header';
import DemoOrderForm from '../DemoOrder-form';
import AcUpload from 'ac-upload';
import 'ac-upload/build/ac-upload.css';
import './index.less'
export default class DemoOrderPaginationTable extends Component {
    constructor(props){
        super(props);
        let self=this;
        this.state = {
            // 表格中所选中的数据，拿到后可以去进行增删改查
            selectData: [],
            step: 10,
            showModal:false,
            delData:[],
            column:[
                {
                    title: "订单类型",
                    dataIndex: "orderType",
                    key: "orderType",
                     width:200,
                    render : (text, record, index) => (
                        <Select
                            className = "hideselect"
                            disabled = {true}
                            value={ text || '' }
                        >
                            <Option value="">请选择</Option>
                                <Option value="1">办公用品</Option>
                                <Option value="2">生活用品</Option>
                                <Option value="3">学习用品</Option>
                        </Select>
                    )
                },
                {
                    title: "请购部门",
                    dataIndex: "orderDeptName",
                    key: "orderDeptName",
                     width:200,
                },
                {
                    title: "复核人员",
                    dataIndex: "checkBy",
                    key: "checkBy",
                     width:200,
                },
                {
                    title: "订单编号",
                    dataIndex: "orderNo",
                    key: "orderNo",
                     width:200,
                },
                {
                    title: "部门审核人",
                    dataIndex: "deptCheckBy",
                    key: "deptCheckBy",
                     width:200,
                },
                {
                    title: "商品数量",
                    dataIndex: "orderCount",
                    key: "orderCount",
                     width:200,
                },
                {
                    title: "请购人员",
                    dataIndex: "orderBy",
                    key: "orderBy",
                     width:200,
                },
                {
                    title: "备注信息",
                    dataIndex: "remark",
                    key: "remark",
                     width:200,
                },
                {
                    title: "部门审核人",
                    dataIndex: "deptCheckByName",
                    key: "deptCheckByName",
                     width:200,
                },
                {
                    title: "请购部门",
                    dataIndex: "orderDept",
                    key: "orderDept",
                     width:200,
                },
                {
                    title: "订单金额",
                    dataIndex: "orderAmount",
                    key: "orderAmount",
                     width:200,
                },
                {
                    title: "采购部审核人",
                    dataIndex: "purchaseDeptByName",
                    key: "purchaseDeptByName",
                     width:200,
                },
                {
                    title: "采购部审核人",
                    dataIndex: "purchaseDeptBy",
                    key: "purchaseDeptBy",
                     width:200,
                },
                {
                    title: "请购时间",
                    dataIndex: "orderDate",
                    key: "orderDate",
                     width:200,
                },
                {
                    title: "财务审核人",
                    dataIndex: "financialAudit",
                    key: "financialAudit",
                     width:200,
                },
                {
                    title: "订单名称",
                    dataIndex: "orderName",
                    key: "orderName",
                     width:200,
                },
                {
                    title: "操作",
                    dataIndex: "d",
                    key: "d",
                    width:100,
                    fixed: "right",
                    render(text, record, index) {
                        return (
                            <div className='operation-btn'>
                                <i size='sm' className='uf uf-search edit-btn' onClick={() => { self.cellClick(record,2) }}></i>
                                <i size='sm' className='uf uf-pencil edit-btn' onClick={() => { self.cellClick(record,1) }}></i>
                                <i size='sm' className='uf uf-del del-btn' onClick={() => { self.delItem(record, index) }}></i>
                            </div>
                        )
                    }
                }
            ]
        }
    }
    
    componentDidMount(){
        // this.setState({ step: this.props.pageSize })
        actions.DemoOrder.loadList();//table数据
    }

    tabelSelect = (data) => {//tabel选中数据
        this.setState({
            selectData: data
        })
    }
    /**
     * 编辑,详情，增加
     */

    cellClick = async (record,btnFlag) => {
        await actions.DemoOrder.updateState({
            rowData : record,
        });

        let id = "";
        if(record){
            id = record["id"];
        }
        actions.routing.push(
            {
                pathname: 'DemoOrder-edit',
                search:`?search_id=${id}&btnFlag=${btnFlag}`
            }
        )
    }

    // 删除操作
    delItem = (record, index) => {
        this.setState({
            showModal:true,
            delData:[{ id: record.id,ts: record.ts }]
        });

    }

    // 表格勾选回调函数，返回选中数据
    onTableSelectedData = data => {

        this.setState({
            selectData: data
        })
    }

    // 分页单页数据条数选择函数
    onPageSizeSelect = (index, value) => {
        actions.DemoOrder.loadList({
            pageSize: value
        })
    }

    // 分页组件点击页面数字索引执行函数
    onPageIndexSelect = value => {
        actions.DemoOrder.loadList({
            pageIndex: value
        })
    }

    // 流程提交成功后回调函数
    onSubmitSuc = async ()=>{
        await actions.DemoOrder.loadList();
        actions.DemoOrder.updateState({showLine:false});
        Message.create({content: '单据提交成功', color: 'success'});

    }
    
    // 提交操作初始执行操作
    onSubmitStart = ()=>{
        actions.DemoOrder.updateState({showLine:true});

    }
    // 提交失败回调函数
    onSubmitFail = (error)=>{
        actions.DemoOrder.updateState({showLine:false});
        Message.create({content: error.msg, color: 'danger'});

    }

    // 撤回成功回调函数
    onRecallSuc = async ()=>{
        console.log("onRecallSuc 成功进入recall回调");
        await actions.searchTable.loadList();
        actions.DemoOrder.updateState({showLine:false});
        Message.create({content: '单据撤回成功', color: 'success'});

    }

    // 撤回失败回调函数
    onRecallFail = (error)=>{
        actions.DemoOrder.updateState({showLine:false});
        Message.create({content: error.msg, color: 'danger'});

    }


    onSubmitEnd = () => {
        actions.DemoOrder.updateState({ showLoading: false });
    }

    // 撤回操作执行起始函数,通常用于设置滚动条
    onRecallStart = ()=>{
        actions.DemoOrder.updateState({showLine:true});
    }

    // 查看方法
    onExamine = async (text, record, index)=> {
        console.log("record", record);
        await actions.DemoOrder.updateState({rowData:record});
        await actions.routing.push(
            {
                pathname: 'DemoOrder-edit',
                detailObj: record,
            }
        )
    }

    // 模态框确认删除
    onModalDel = async (delFlag)=>{
        let {delData} = this.state;
        if(delFlag){
            await actions.DemoOrder.delItem({
                param: delData
            });
        }
        this.setState({
            showModal:false,
            delData:[]
        })
    }
    // 模板下载
    onLoadTemplate = () => {
        window.open(`${GROBAL_HTTP_CTX}/demo_order/excelTemplateDownload`)
    }

    // 导入成功回调函数
    handlerUploadSuccess = (data)=>{
        // 导入成功后，列表加载数据
        Message.create({content: '导入数据成功', color: 'success'});
        actions.DemoOrder.loadList();
    }

    // 导入删除回调函数
    handlerUploadDelete = (file) => {

    }

    // 导出
    exportExcel = () =>{
        actions.DemoOrder.exportExcel(this.queryParams);
    }

    // 打印数据
    printExcel = ()=>{
        if(!this.state.selectData.length)  
        {
            Message.create({ content: '请选择需打印的数据', color : 'danger'  });
            return;
        }
        actions.DemoOrder.printExcel({
            queryParams:
            {
                funccode: 'order',
                nodekey: '002'
            },
            printParams: 
            {
                id:this.state.selectData[0].id
            }
        });
    }

    // 动态设置列表滚动条x坐标
    getCloumnsScroll = (columns) => {
        let sum = 0;
        columns.forEach((da) => {
            sum += da.width;
        })
        return (sum);
    }

    render(){
        const self=this;
        let { list, showLoading, pageIndex, pageSize, totalPages , total } = this.props;
        let {selectData,showModal} = this.state;
        console.log("list",list)
        return (
            <div className='DemoOrder-root'>
                <Header title='demo订单'/>
                <DemoOrderForm { ...this.props }/>
                <div className='table-header mt25'>
                    <Button colors="primary" style={{"marginLeft":15}} size='sm' onClick={() => { self.cellClick({},0) }}>
                    新增
                    </Button>
                    <BpmButtonSubmit
                            className="ml5 "
                            checkedArray = {selectData}
                            funccode = "order"
                            nodekey = "003"
                            url = {`${GROBAL_HTTP_CTX}/demo_order/submit`}
                            urlAssignSubmit={`${GROBAL_HTTP_CTX}/demo_order/assignSubmit`}
                            onSuccess = {this.onSubmitSuc}
                            onError = {this.onSubmitFail}
                            onStart={this.onSubmitStart}
                            onEnd={this.onSubmitEnd}
                    >
                        <Button size='sm' style={{"marginLeft":"15px"}} className="admin"  colors="primary">提交</Button>
                    </BpmButtonSubmit>
                    <BpmButtonRecall
                            className="ml5 "
                            checkedArray = {selectData}
                            url = {`${GROBAL_HTTP_CTX}/demo_order/recall`}
                            onSuccess = {this.onRecallSuc}
                            onError = {this.onRecallFail}
                            onStart = {this.onRecallStart}
                            onEnd={this.onSubmitEnd}
                    >
                        <Button size='sm' style={{"marginLeft":"15px"}} className="admin"  colors="primary">收回</Button>
                    </BpmButtonRecall>
                   

                    <Button colors="primary" className="ml5" size='sm' onClick={() => { self.printExcel() }}>
                        打印
                    </Button>

                    <Button colors="primary" className="ml5" size='sm' onClick={ self.onLoadTemplate}>模板下载</Button>
                    <AcUpload
                        title={"导入"}
                        action={`${GROBAL_HTTP_CTX}/demo_order/toImportExcel`}
                        multiple={false}
                        onError={() => console.log('上传报错了')}
                        onSuccess={self.handlerUploadSuccess}
                        onDelete={ self.handlerUploadDelete}
                    >
                        <Button className="ml5" colors="primary" size='sm'>导入</Button>
                    </AcUpload>
                    <Button colors="primary" className="ml5" size='sm' onClick={() => { self.exportExcel() }}>
                        导出
                    </Button>
                </div>
                <PaginationTable
                        data={list}
                        showLoading={showLoading}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        totalPages={totalPages}
                        total = {total}
                        columns={this.state.column}
                        checkMinSize={6}
                        getSelectedDataFunc={this.tabelSelect}
                        onTableSelectedData={this.onTableSelectedData}
                        onPageSizeSelect={this.onPageSizeSelect}
                        onPageIndexSelect={this.onPageIndexSelect}
                        scroll={{x: this.getCloumnsScroll(this.state.column), y: 500}}
                />
                <Modal
                        show={showModal}
                        onHide={this.close} >
                    <Modal.Header>
                        <Modal.Title>确认删除</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        是否删除选中内容
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={()=>this.onModalDel(false)} shape="border" style={{ marginRight: 50 }}>关闭</Button>
                        <Button onClick={()=>this.onModalDel(true)} colors="primary">确认</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        )

    }
}