import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";

import Header from 'components/Header';
import DemoOrderTable from '../DemoOrder-table';
import DemoOrderForm from '../DemoOrder-form';

import './index.less';

/**
 * DemoOrderRoot Component
 */
class DemoOrderRoot  extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }
    /**
     *
     */
    componentWillMount() {
        this.getTableData();
    }
    /**
     * 获取table表格数据
     */
    getTableData = () => {
        actions.DemoOrder.loadList();
    }

    render() {
        let { pageSize, pageIndex, totalPages} = this.props;
        return (
            <div className='DemoOrder-root'>
                <Header title='demo订单' back={true}/>
                <DemoOrderForm { ...this.props }/>
                <DemoOrderTable { ...this.props }/>
            </div>
        )
    }
}
export default DemoOrderRoot;