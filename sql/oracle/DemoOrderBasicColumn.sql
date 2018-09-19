-- Add/modify columns
alter table demo_order add create_time VARCHAR2(64);
alter table demo_order add create_user VARCHAR2(64);
alter table demo_order add last_modified VARCHAR2(64);
alter table demo_order add last_modify_user VARCHAR2(64);
alter table demo_order add ts VARCHAR2(64);
alter table demo_order add dr NUMBER(11);



