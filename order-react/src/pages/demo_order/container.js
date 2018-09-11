import React from 'react';
import mirror, { connect } from 'mirrorx';

// 组件引入
import DemoOrderTable from './components/DemoOrder-root/DemoOrderTable';
import DemoOrderSelectTable from './components/DemoOrder-root/DemoOrderSelectTable';
import DemoOrderPaginationTable from './components/DemoOrder-root/DemoOrderPaginationTable';
import DemoOrderEdit from './components/DemoOrder-edit/Edit';
import DemoOrderBpmChart from './components/DemoOrder-bpm-chart'
// 数据模型引入
import model from './model'
mirror.model(model);

// 数据和组件UI关联、绑定
export const ConnectedDemoOrderTable = connect( state => state.DemoOrder, null )(DemoOrderTable);
export const ConnectedDemoOrderSelectTable = connect( state => state.DemoOrder, null )(DemoOrderSelectTable);
export const ConnectedDemoOrderPaginationTable = connect( state => state.DemoOrder, null )(DemoOrderPaginationTable);
export const ConnectedDemoOrderEdit = connect( state => state.DemoOrder, null )(DemoOrderEdit);
export const ConnectedDemoOrderBpmChart = connect( state => state.DemoOrder, null )(DemoOrderBpmChart);
