import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import queryString from 'query-string';
import { Switch, InputNumber,Loading, Table, Button, Col, Row, Icon, InputGroup, FormControl, Checkbox, Modal, Panel, PanelGroup, Label, Message, Radio } from "tinper-bee";
import { BpmTaskApprovalWrap } from 'yyuap-bpm';
import AcUpload from 'ac-upload';
import Header from "components/Header";
import options from "components/RefOption";
import DatePicker from 'bee-datepicker';
import Form from 'bee-form';
import Select from 'bee-select';
import RefWithInput from 'yyuap-ref/dist2/refWithInput'
import moment from "moment";
import 'yyuap-ref/dist2/yyuap-ref.css'//参照样式
import './edit.less';
import 'ac-upload/build/ac-upload.css';
import { setCookie, getCookie} from "utils";

const FormItem = Form.FormItem;
const Option = Select.Option;
const format = "YYYY-MM-DD HH:mm:ss";

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowData: {},
            fileNameData: props.rowData.attachment || [],//上传附件数据
        }
    }
    async componentWillMount() {
        await actions.DemoOrder.getOrderTypes();
        let searchObj = queryString.parse(this.props.location.search);
        let { btnFlag } = searchObj;
        if (btnFlag && btnFlag > 0) {
            let { search_id } = searchObj;
            let tempRowData = await actions.DemoOrder.queryDetail({ search_id });
            let rowData = this.handleRefShow(tempRowData) || {};

            console.log('rowData',rowData);
            this.setState({
                rowData:rowData,
            })
        }

    }
    save = () => {//保存
        this.props.form.validateFields(async (err, values) => {
            values.attachment = this.state.fileNameData;
            let numArray = [
                "orderCount",
                "orderAmount",
            ];
            for(let i=0,len=numArray.length; i<len; i++ ) {
                values[numArray[i]] = Number(values[numArray[i]]);
            }


            if (err) {
                Message.create({ content: '数据填写错误', color: 'danger' });
            } else {
                let {rowData,
                } = this.state;
                if (rowData && rowData.id) {
                    values.id = rowData.id;
                    values.ts = rowData.ts;
                }
                values.orderDate = values.orderDate.format(format);

                await actions.DemoOrder.save(
                    values,
                );
            }
        });
    }

    // 处理参照回显
    handleRefShow = (tempRowData) => {
        let rowData = {};
        if(tempRowData){

            let {
            } = tempRowData;

            this.setState({
            })
            rowData = Object.assign({},tempRowData,
                {
                }
            )
        }
        return rowData;
    }

    onBack = async() => {
        window.history.go(-1);
    }

    // 动态显示标题
    onChangeHead = (btnFlag) => {
        let titleArr = ["新增","编辑","详情"];
        return titleArr[btnFlag]||'新增';
    }
    //上传成功后的回调
    handlerUploadSuccess = (data) => {
        Message.create({content: '上传成功', color: 'success'});
        let searchObj = queryString.parse(this.props.location.search);
        let id = searchObj.search_id;
        if (searchObj.btnFlag == 0) {

        } else if (searchObj.btnFlag == 1) {
            // if (data.length > 0) {
            //     data[0]['id'] = id;
            // }
        }

        this.setState(({ fileNameData }) => {
            //拿到当前原始对象
            let newFileList = [];
            //找到历史数据合并
            newFileList = newFileList.concat(fileNameData);
            //原始数据合并新数据
            newFileList = newFileList.concat(data);
            return {
                fileNameData: newFileList
            };
        });
    }
    //删除文件的回调
    handlerUploadDelete = (file) => {
        this.setState(({ fileNameData }) => {
            for (let i = 0; i < fileNameData.length; i++) {
                if (fileNameData[i].originalFileName == file.name) {
                    fileNameData[i]['del'] = 'del';
                }
            }
            return {
                fileNameData
            }
        });
    }

    // 跳转到流程图
    onClickToBPM = (rowData) => {
        console.log("actions", actions);
        actions.routing.push({
            pathname: 'DemoOrder-chart',
            search: `?id=${rowData.id}`
        })
    }
    
    // 流程图相关回调函数
    onBpmStart = () => {
        actions.DemoOrder.updateState({ showLoading: true });
    }
    onBpmEnd = () => {
        actions.DemoOrder.updateState({ showLoading: false });
    }
    onBpmSuccess = () => {
        actions.DemoOrder.updateState({ showLoading: false });
        // actions.routing.push('pagination-table');
        actions.routing.goBack();
    }
    onBpmError = () => {
        actions.DemoOrder.updateState({ showLoading: false });
    }

    // 审批面板展示
    showBpmComponent = (btnFlag, appType, id, processDefinitionId, processInstanceId, rowData) => {
        // btnFlag为2表示为详情
        if ((btnFlag == 2) && rowData && rowData['id']) {
            console.log("showBpmComponent", btnFlag)
            return (
                <div >
                    {appType == 1 &&<BpmTaskApprovalWrap
                        id={rowData.id}
                        onBpmFlowClick={() => { this.onClickToBPM(rowData) }}
                        appType={appType}
                        onStart={this.onBpmStart}
                        onEnd={this.onBpmEnd}
                        onSuccess={this.onBpmSuccess}
                        onError={this.onBpmError}
                    />}
                    {appType == 2 &&<BpmTaskApprovalWrap
                        id={id}
                        processDefinitionId={processDefinitionId}
                        processInstanceId={processInstanceId}
                        onBpmFlowClick={() => { this.onClickToBPM(rowData) }}
                        appType={appType}
                        onStart={this.onBpmStart}
                        onEnd={this.onBpmEnd}
                        onSuccess={this.onBpmSuccess}
                        onError={this.onBpmError}
                    />}
                </div>

            );
        }
    }

    arryDeepClone = (array)=>{
        let result = [];
        if(array){
            array.map((item)=>{
                let temp = Object.assign([],item);
                result.push(temp);
            })
        }
    }

    // 通过search_id查询数据

    render() {
        const self = this;

        let { btnFlag,appType, id, processDefinitionId, processInstanceId } = queryString.parse(this.props.location.search);
        btnFlag = Number(btnFlag);
        let {rowData,
        } = this.state;


        let title = this.onChangeHead(btnFlag);
        let { orderType,orderDeptName,checkBy,orderNo,deptCheckBy,orderCount,orderBy,remark,deptCheckByName,orderDept,orderAmount,purchaseDeptByName,purchaseDeptBy,orderDate,financialAudit,orderName, } = rowData;
        const { getFieldProps, getFieldError } = this.props.form;

        return (
            <div className='DemoOrder-detail'>
                <Loading
                    showBackDrop={true}
                    loadingType="line"
                    show={this.props.showLoading}
                />
                <Header title={title} back={true} backFn={this.onBack}>
                    {(btnFlag < 2) ? (
                        <div className='head-btn'>
                            <Button className='head-cancel' onClick={this.onBack}>取消</Button>
                            <Button className='head-save' onClick={this.save}>保存</Button>
                        </div>
                    ) : ''}
                </Header>
                {
                    self.showBpmComponent(btnFlag, appType ? appType : "1", id, processDefinitionId, processInstanceId, rowData)
                }
                <Row className='detail-body'>

                            <Col md={4} xs={6}>
                                <Label>
                                    订单类型：
                                </Label>
                                    <Select disabled={btnFlag == 2}
                                        {
                                        ...getFieldProps('orderType', {
                                            initialValue: orderType || '',
                                            rules: [{
                                                type:'string',required: true, message: '请选择订单类型',
                                            }],
                                        }
                                        )}>
                                        <Option value="">请选择</Option>
                                            <Option value="1">办公用品</Option>
                                            <Option value="2">生活用品</Option>
                                            <Option value="3">学习用品</Option>
                                    </Select>


                                <span className='error'>
                                    {getFieldError('orderType')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    复核人员：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('checkBy', {
                                            validateTrigger: 'onBlur',
                                            initialValue: checkBy || '',
                                            rules: [{
                                                type:'string',required: true, message: '请输入复核人员',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('checkBy')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    订单编号：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||true}
                                        {
                                        ...getFieldProps('orderNo', {
                                            validateTrigger: 'onBlur',
                                            initialValue: orderNo || '',
                                            rules: [{
                                                message: '请输入订单编号',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('orderNo')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    部门审核人：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('deptCheckBy', {
                                            validateTrigger: 'onBlur',
                                            initialValue: deptCheckBy || '',
                                            rules: [{
                                                type:'string',required: true, message: '请输入部门审核人',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('deptCheckBy')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    商品数量：
                                </Label>

                                    <InputNumber
                                        iconStyle="one"
                                        min={0}
                                        step ={1}
                                        className={"input-number-int"}
                                        disabled={btnFlag == 2}
                                        {
                                            ...getFieldProps('orderCount', {
                                                    initialValue: orderCount && (orderCount+"")|| '0',
                                                    rules: [{type: 'string',message: '请输入数字'}],
                                            })
                                        }
                                    />

                                <span className='error'>
                                    {getFieldError('orderCount')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    请购人员：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('orderBy', {
                                            validateTrigger: 'onBlur',
                                            initialValue: orderBy || '',
                                            rules: [{
                                                type:'string',required: true, message: '请输入请购人员',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('orderBy')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    备注信息：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('remark', {
                                            validateTrigger: 'onBlur',
                                            initialValue: remark || '',
                                            rules: [{
                                                type:'string',required: true, message: '请输入备注信息',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('remark')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    请购部门：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('orderDept', {
                                            validateTrigger: 'onBlur',
                                            initialValue: orderDept || '',
                                            rules: [{
                                                type:'string',required: true, message: '请输入请购部门',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('orderDept')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    订单金额：
                                </Label>


                                    <InputNumber
                                        precision={2}
                                        min={0}
                                        className={"input-number"}
                                        disabled={btnFlag == 2}
                                        {
                                            ...getFieldProps('orderAmount', {
                                                    initialValue: orderAmount&&Number(orderAmount).toFixed(2) || '0.00',
                                                    //rules: [{type: 'string',pattern: /^(?:(?!0\.00$))[\d\D]*$/ig,message: '请输入数字'}],
                                            })
                                        }
                                    />
                                <span className='error'>
                                    {getFieldError('orderAmount')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    采购部审核人：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('purchaseDeptBy', {
                                            validateTrigger: 'onBlur',
                                            initialValue: purchaseDeptBy || '',
                                            rules: [{
                                                type:'string',required: true, message: '请输入采购部审核人',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('purchaseDeptBy')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label class="datepicker">
                                    请购时间：
                                </Label>
                                <DatePicker className='form-item' disabled={btnFlag == 2}
                                    format={format}
                                    {
                                    ...getFieldProps('orderDate', {
                                        initialValue: orderDate? moment(orderDate):moment(),
                                        validateTrigger: 'onBlur',
                                        rules: [{
                                            required: true, message: '请选择请购时间',
                                        }],
                                    }
                                    )}
                                />


                                <span className='error'>
                                    {getFieldError('orderDate')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    财务审核人：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('financialAudit', {
                                            validateTrigger: 'onBlur',
                                            initialValue: financialAudit || '',
                                            rules: [{
                                                type:'string',required: true, message: '请输入财务审核人',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('financialAudit')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    订单名称：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('orderName', {
                                            validateTrigger: 'onBlur',
                                            initialValue: orderName || '',
                                            rules: [{
                                                type:'string',required: true, message: '请输入订单名称',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('orderName')}
                                </span>
                            </Col>
                        <Col md={4} xs={6}>
                            <Label>
                                附件：
                            </Label>
                            {
                                (btnFlag < 2) ? (<AcUpload
                                    title={"附件上传"}
                                    action={`${GROBAL_HTTP_CTX}/fileMananger/fastDfs/imgUpload`}
                                    multiple={false}
                                    defaultFileList={this.state.fileNameData}
                                    onError={() => console.log('上传报错了')}
                                    onSuccess={this.handlerUploadSuccess}
                                    onDelete={this.handlerUploadDelete}
                                >
                                    <Button colors="info">上传</Button>
                                </AcUpload>) : (
                                        <AcUpload
                                            title={"查看附件"}
                                            action={`${GROBAL_HTTP_CTX}/fileMananger/fastDfs/imgUpload`}
                                            defaultFileList={this.state.fileNameData}
                                            multiple={false}
                                            isView={true}
                                            onError={() => console.log('上传报错了')}
                                            onSuccess={this.handlerUploadSuccess}
                                        >
                                            <Button colors="info">查看</Button>
                                        </AcUpload>
                                    )
                            }
                        </Col>
                </Row>


            </div>
        )
    }
}

export default Form.createForm()(Edit);
