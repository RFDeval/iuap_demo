/*************基础服务支持：附件）***************/
DROP TABLE IF EXISTS `base_attachment`;
CREATE TABLE `base_attachment` (
  `id` varchar(64) NOT NULL,
  `filename` varchar(100) DEFAULT NULL,
  `accessaddress` varchar(100) DEFAULT NULL,
  `refid` varchar(100) DEFAULT NULL,
  `refname` varchar(100) DEFAULT NULL,
  `create_time` varchar(64) DEFAULT NULL,
  `create_user` varchar(64) DEFAULT NULL,
  `last_modified` varchar(64) DEFAULT NULL,
  `last_modify_user` varchar(64) DEFAULT NULL,
  `ts` varchar(64) DEFAULT NULL,
  `dr` int(1) DEFAULT NULL,
  `originalfilename` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

