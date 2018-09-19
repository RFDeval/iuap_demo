
CREATE TABLE `demo_order` (
`ID` VARCHAR(64) NOT NULL COMMENT '主键',
    PRIMARY KEY (`ID`),
    `ORDER_TYPE` VARCHAR(64) DEFAULT NULL COMMENT '订单类型',
    `ORDER_NO` VARCHAR(64) DEFAULT NULL COMMENT '订单编号',
    `DEPT_CHECK_BY` VARCHAR(64) DEFAULT NULL COMMENT '审核人',
    `ORDER_GOODS_COUNT` NUMERIC(10) DEFAULT NULL COMMENT '商品数量',
    `ORDER_BY` VARCHAR(64) DEFAULT NULL COMMENT '请购人员',
    `ORDER_GOODS` VARCHAR(100) DEFAULT NULL COMMENT '商品名称',
    `REMARK` VARCHAR(200) DEFAULT NULL COMMENT '备注信息',
    `ORDER_DEPT` VARCHAR(64) DEFAULT NULL COMMENT '请购单位',
    `ORDER_AMOUNT` VARCHAR(64) DEFAULT NULL COMMENT '订单金额',
    `ORDER_DATE` VARCHAR(64) DEFAULT NULL COMMENT '请购时间',
    `ORDER_NAME` VARCHAR(64) DEFAULT NULL COMMENT '订单名称',
        `DR` int(11) DEFAULT NULL COMMENT '是否删除',
        `TS` varchar(64) DEFAULT NULL COMMENT '时间戳',
        `LAST_MODIFIED` varchar(64) DEFAULT NULL COMMENT '修改时间',
        `LAST_MODIFY_USER` varchar(64) DEFAULT NULL COMMENT '修改人',
        `CREATE_TIME` varchar(64) DEFAULT NULL COMMENT '创建时间',
        `CREATE_USER` varchar(64) DEFAULT NULL COMMENT '创建人'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;



