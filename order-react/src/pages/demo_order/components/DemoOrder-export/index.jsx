import React, { Component } from 'react';
import { actions } from 'mirrorx';
import { Button, Message } from 'tinper-bee';
import Select from 'bee-select';

import './index.less'

class AcExport extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            selIndex: "0"
        };

    }

    onSelect = (value,a) => {
        this.setState({
            selIndex : value
        })
    }

    exportExcel = () => {
        let {selIndex} = this.state,
            {pageIndex,pageSize,total,selectData} = this.props;
        if ( selIndex == '0' ) {

            // 导出选中数据
            this.exportSelData(selectData);

        } else if ( selIndex == '1' ) {

            // 导出当前页
            window.open(`${GROBAL_HTTP_CTX}/demo_order/toExportExcelAll?1=1&pageIndex=${pageIndex-1}&pageSize=${pageSize}`)
        } else {
            // 导出全部,将设置的页面数据条数设置为总数据条数
            window.open(`${GROBAL_HTTP_CTX}/demo_order/toExportExcelAll?1=1&pageIndex=0&pageSize=${total}`)
        }

    }

    exportSelData = (selectData) => {
        if(selectData.length > 0) {
            actions.DemoOrder.exportExcel({
                dataList : selectData
            });
        }else {
            Message.create({ content: '请选择导出数据',duration:1, color : 'danger'  });
        }
    }




    render() {
        let self = this;
        let { className } = this.props;
        console.log("export props",this.props)
        return (
            <div className="AcExport">
                <Select
                    defaultValue="0"
                    style={{ width: 200}}
                    onSelect={self.onSelect}
                    className={className}
                    >
                    <Option value="0">导出选中数据</Option>
                    <Option value="1">导出当前页</Option>
                    <Option value="2">导出全部数据</Option>
                </Select>
                <Button colors="primary" className="export-btn" size='sm' onClick={() => { self.exportExcel() }}>
                    导出
                </Button>
            </div>
        );
    }
}

export default AcExport;