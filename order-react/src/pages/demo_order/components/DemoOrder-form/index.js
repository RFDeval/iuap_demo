import React, { Component } from 'react'
import { actions } from "mirrorx";
import { Switch, InputNumber, Col, Row,FormControl, Label, Select, Radio } from "tinper-bee";
import Form from 'bee-form';
import DatePicker from 'bee-datepicker';
import 'bee-datepicker/build/DatePicker.css';
import SearchPanel from 'components/SearchPanel';
const FormItem = Form.FormItem;
import options from "components/RefOption";
const { RangePicker } = DatePicker;
import RefWithInput from 'yyuap-ref/dist2/refWithInput'
import 'yyuap-ref/dist2/yyuap-ref.css'//参照样式
import './index.less'

class DemoOrderForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            orderType: '',
            orderDeptName: '',
            refKeyArraycheckBy:"",
            orderNo: '',
            refKeyArraydeptCheckBy:"",
            orderCount: '',
            refKeyArrayorderBy:"",
            checkByName: '',
            remark: '',
            deptCheckByName: '',
            refKeyArrayorderDept:"",
            orderAmount: '',
            orderByName: '',
            purchaseDeptByName: '',
            refKeyArraypurchaseDeptBy:"",
            orderDate: '',
            refKeyArrayfinancialAudit:"",
            orderName: '',
            financialAuditName: '',
        }
    }
    componentWillMount(){
        // 获得demo订单列表数据
        actions.DemoOrder.getOrderTypes();
    }
    /** 查询数据
     * @param {*} error 校验是否成功
     * @param {*} values 表单数据
     */
    search = (error,values) => {
        this.props.form.validateFields(async (err, values) => {
            values.pageIndex = this.props.pageIndex || 0;
            values.pageSize = this.props.pageSize || 10;
            let {
                refKeyArraycheckBy,
                refKeyArraydeptCheckBy,
                refKeyArrayorderBy,
                refKeyArrayorderDept,
                refKeyArraypurchaseDeptBy,
                refKeyArrayfinancialAudit,
            } = this.state;
            if(refKeyArraycheckBy){
                values.checkBy = refKeyArraycheckBy
            }else {
                values.checkBy = "";
            }
            if(refKeyArraydeptCheckBy){
                values.deptCheckBy = refKeyArraydeptCheckBy
            }else {
                values.deptCheckBy = "";
            }
            if(refKeyArrayorderBy){
                values.orderBy = refKeyArrayorderBy
            }else {
                values.orderBy = "";
            }
            if(refKeyArrayorderDept){
                values.orderDept = refKeyArrayorderDept
            }else {
                values.orderDept = "";
            }
            let orderAmount = values.orderAmount;
            if(orderAmount){
                if(Number(orderAmount)>0){
                values.orderAmount = Number(orderAmount);
                }else {
                delete values.orderAmount 
                }
            }
            if(refKeyArraypurchaseDeptBy){
                values.purchaseDeptBy = refKeyArraypurchaseDeptBy
            }else {
                values.purchaseDeptBy = "";
            }
            if(refKeyArrayfinancialAudit){
                values.financialAudit = refKeyArrayfinancialAudit
            }else {
                values.financialAudit = "";
            }
            await actions.DemoOrder.loadList(values);
        });


    }
    /**
     * 重置
     */
    reset = () => {
        this.setState({
            orderType:'',
            orderDeptName:'',
            refKeyArraycheckBy:'',
            checkBy:'',
            orderNo:'',
            refKeyArraydeptCheckBy:'',
            deptCheckBy:'',
            orderCount:'',
            refKeyArrayorderBy:'',
            orderBy:'',
            checkByName:'',
            remark:'',
            deptCheckByName:'',
            refKeyArrayorderDept:'',
            orderDept:'',
            orderAmount:'',
            orderByName:'',
            purchaseDeptByName:'',
            refKeyArraypurchaseDeptBy:'',
            purchaseDeptBy:'',
            orderDate:'',
            refKeyArrayfinancialAudit:'',
            financialAudit:'',
            orderName:'',
            financialAuditName:'',
        })
    }
    render(){
        const { getFieldProps, getFieldError } = this.props.form;
        let { orderTypes } = this.props;
        let self = this;
        let {
            refKeyArraycheckBy,
            refKeyArraydeptCheckBy,
            refKeyArrayorderBy,
            refKeyArrayorderDept,
            refKeyArraypurchaseDeptBy,
            refKeyArrayfinancialAudit,
        } = this.state;
        return (
            <SearchPanel
                    className='DemoOrder-form'
                    form={this.props.form}
                    reset={this.reset}
                    search={this.search}>
                <Row>

                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>订单类型</Label>

                                    <Select
                                            {
                                            ...getFieldProps('orderType', {
                                            initialValue: '',
                                        })
                                    }
                                    >
                                            <Option value="">请选择</Option>
                                                <Option value="1">办公用品</Option>
                                                <Option value="2">生活用品</Option>
                                                <Option value="3">学习用品</Option>
                                    </Select>

                                </FormItem>
                            </Col>
                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>订单编号</Label>
                                    <FormControl
                                            {
                                            ...getFieldProps('orderNo', {
                                                initialValue: '',
                                            })
                                        }
                                    />


                                </FormItem>
                            </Col>
                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>商品数量</Label>


                                    <InputNumber
                                        iconStyle="one"
                                        min={0}
                                        step ={1}
                                        
                                        {
                                            ...getFieldProps('orderCount', {
                                                    initialValue:  '0',
                                                    rules: [{type: 'string',message: '请输入数字'}],
                                            })
                                        }
                                    />
                                </FormItem>
                            </Col>
                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>请购部门</Label>


                                    <RefWithInput option={options({
                                                  title: '请购部门',
                                        refType: 1,//1:树形 2.单表 3.树卡型 4.多选 5.default
                                        className: '',
                                        param: {//url请求参数
                                            refCode: 'neworganizition',
                                            tenantId: '',
                                            sysId: '',
                                            transmitParam: '1',
                                        },
                                        keyList:(refKeyArrayorderDept && refKeyArrayorderDept.split(',')) || [],//选中的key
                                        onSave: function (sels) {
                                            console.log(sels);
                                            var temp = sels.map(v => v.id)
                                            console.log("temp",temp);
                                            self.setState({
                                                refKeyArrayorderDept: temp.join(),
                                            })
                                        },
                                        showKey:'refname',
                                        verification:true,//是否进行校验
                                        verKey:'orderDept',//校验字段
                                        verVal:""
                                    })} form={this.props.form}/>
                                </FormItem>
                            </Col>
                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>订单金额</Label>

                                    <InputNumber
                                            precision={2}
                                            min={0}
                                            className={"input-number"}
                                            {
                                            ...getFieldProps('orderAmount', {
                                                    initialValue: '0.00',
                                                    //rules: [{type: 'string',pattern: /^(?:(?!0\.00$))[\d\D]*$/ig,message: '请输入数字'}],
                                            })
                                        }
                                    />

                                </FormItem>
                            </Col>
                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>订单名称</Label>
                                    <FormControl
                                            {
                                            ...getFieldProps('orderName', {
                                                initialValue: '',
                                            })
                                        }
                                    />


                                </FormItem>
                            </Col>
                </Row>
            </SearchPanel>
        )
    }
}

export default Form.createForm()(DemoOrderForm)