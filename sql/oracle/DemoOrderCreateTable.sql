create table demo_order
(
ID VARCHAR2(64) not null,
        constraint PK_demo_order primary key (ID),
        ORDER_TYPE VARCHAR2(64) null,
        ORDER_NO VARCHAR2(64) null,
        DEPT_CHECK_BY VARCHAR2(64) null,
        ORDER_GOODS_COUNT NUMBER(10) null,
        ORDER_BY VARCHAR2(64) null,
        ORDER_GOODS VARCHAR2(100) null,
        REMARK VARCHAR2(200) null,
        ORDER_DEPT VARCHAR2(64) null,
        ORDER_AMOUNT VARCHAR2(64) null,
        ORDER_DATE VARCHAR2(64) null,
        ORDER_NAME VARCHAR2(64) null,
        DR NUMBER(11) NULL,
        TS VARCHAR2(64) NULL,
        LAST_MODIFIED VARCHAR2(64) NULL,
        LAST_MODIFY_USER VARCHAR2(64) NULL,
        CREATE_TIME VARCHAR2(64) NULL,
        CREATE_USER VARCHAR2(64) NULL
);
        comment on column demo_order.ORDER_TYPE is '订单类型';
        comment on column demo_order.ORDER_NO is '订单编号';
        comment on column demo_order.DEPT_CHECK_BY is '审核人';
        comment on column demo_order.ORDER_GOODS_COUNT is '商品数量';
        comment on column demo_order.ORDER_BY is '请购人员';
        comment on column demo_order.ORDER_GOODS is '商品名称';
        comment on column demo_order.REMARK is '备注信息';
        comment on column demo_order.ORDER_DEPT is '请购单位';
        comment on column demo_order.ORDER_AMOUNT is '订单金额';
        comment on column demo_order.ORDER_DATE is '请购时间';
        comment on column demo_order.ORDER_NAME is '订单名称';
comment on column demo_order.DR is '是否删除';
comment on column demo_order.TS is '时间戳';
comment on column demo_order.LAST_MODIFIED is '修改时间';
comment on column demo_order.LAST_MODIFY_USER is '修改人';
comment on column demo_order.CREATE_TIME is '创建时间';
comment on column demo_order.CREATE_USER is '创建人';





