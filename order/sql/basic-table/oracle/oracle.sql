
-- ----------------------------
-- Table structure for BASE_ATTACHMENT
-- ----------------------------
create table BASE_ATTACHMENT
(
  id               VARCHAR2(64) not null,
  filename         VARCHAR2(100),
  accessaddress    VARCHAR2(100),
  refid            VARCHAR2(100),
  refname          VARCHAR2(100),
  create_time      VARCHAR2(64),
  create_user      VARCHAR2(64),
  last_modified    VARCHAR2(64),
  last_modify_user VARCHAR2(64),
  ts               VARCHAR2(64),
  dr               NUMBER(11)
)
-- Add comments to the columns
comment on column BASE_ATTACHMENT.filename
  is '文件名';
comment on column BASE_ATTACHMENT.accessaddress
  is '文件URL地址';
comment on column BASE_ATTACHMENT.refid
  is '关联ID';
comment on column BASE_ATTACHMENT.refname
  is '关联实体';
comment on column BASE_ATTACHMENT.create_time
  is '创建时间';
comment on column BASE_ATTACHMENT.create_user
  is '创建人';
comment on column BASE_ATTACHMENT.last_modified
  is '修改时间';
comment on column BASE_ATTACHMENT.last_modify_user
  is '修改人';
comment on column BASE_ATTACHMENT.ts
  is '数据时间戳';
comment on column BASE_ATTACHMENT.dr
  is '删除标志：0-可用；1-已删除';


