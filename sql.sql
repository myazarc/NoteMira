-- --------------------------------------------------------
-- Sunucu:                       127.0.0.1
-- Sunucu versiyonu:             5.7.26-0ubuntu0.16.04.1 - (Ubuntu)
-- Sunucu İşletim Sistemi:       Linux
-- HeidiSQL Sürüm:               9.1.0.4867
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- tablo yapısı dökülüyor notes.departments
CREATE TABLE IF NOT EXISTS `departments` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `DEPARTMENTNAME` varchar(200) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dumping data for table notes.departments: ~4 rows (yaklaşık)
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` (`ID`, `DEPARTMENTNAME`) VALUES
	(1, 'System');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;


-- tablo yapısı dökülüyor notes.maingroups
CREATE TABLE IF NOT EXISTS `maingroups` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `MAINGROUPNAME` varchar(200) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table notes.maingroups: ~1 rows (yaklaşık)
/*!40000 ALTER TABLE `maingroups` DISABLE KEYS */;
INSERT INTO `maingroups` (`ID`, `MAINGROUPNAME`) VALUES
	(1, 'Global');
/*!40000 ALTER TABLE `maingroups` ENABLE KEYS */;


-- tablo yapısı dökülüyor notes.notes
CREATE TABLE IF NOT EXISTS `notes` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `MAINGROUPID` bigint(20) NOT NULL,
  `SECONDGROUPID` bigint(20) NOT NULL,
  `DEPARTMENTID` bigint(20) NOT NULL,
  `USERID` bigint(20) NOT NULL,
  `CREATETIME` bigint(20) NOT NULL,
  `TITLE` varchar(250) NOT NULL,
  `NOTE` longtext NOT NULL,
  `PRIVATENOTE` tinyint(4) NOT NULL,
  `DEPARTMENTPRIVATENOTE` tinyint(4) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK__maingroups1` (`MAINGROUPID`),
  KEY `FK__secondgroups` (`SECONDGROUPID`),
  KEY `FK__departments1` (`DEPARTMENTID`),
  KEY `FK__users` (`USERID`),
  CONSTRAINT `FK__departments1` FOREIGN KEY (`DEPARTMENTID`) REFERENCES `departments` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `FK__maingroups1` FOREIGN KEY (`MAINGROUPID`) REFERENCES `maingroups` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `FK__secondgroups` FOREIGN KEY (`SECONDGROUPID`) REFERENCES `secondgroups` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `FK__users` FOREIGN KEY (`USERID`) REFERENCES `users` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


-- tablo yapısı dökülüyor notes.secondgroups
CREATE TABLE IF NOT EXISTS `secondgroups` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `MAINGROUPID` bigint(20) NOT NULL,
  `SECONDGROUPNAME` varchar(250) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK__maingroups` (`MAINGROUPID`),
  CONSTRAINT `FK__maingroups` FOREIGN KEY (`MAINGROUPID`) REFERENCES `maingroups` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- Dumping data for table notes.secondgroups: ~1 rows (yaklaşık)
/*!40000 ALTER TABLE `secondgroups` DISABLE KEYS */;
INSERT INTO `secondgroups` (`ID`, `MAINGROUPID`, `SECONDGROUPNAME`) VALUES
	(1, 1, 'Password');
/*!40000 ALTER TABLE `secondgroups` ENABLE KEYS */;


-- tablo yapısı dökülüyor notes.users
CREATE TABLE IF NOT EXISTS `users` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `DEPARTMENTID` bigint(20) NOT NULL,
  `USERNAME` varchar(150) NOT NULL,
  `PASSWORD` varchar(150) NOT NULL,
  `SHOWPRIVATENOTES` tinyint(4) NOT NULL DEFAULT '0',
  `SHOWPRIVATEDEPARTMENTS` tinyint(4) NOT NULL DEFAULT '0',
  `ISADMIN` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `FK__departments` (`DEPARTMENTID`),
  CONSTRAINT `FK__departments` FOREIGN KEY (`DEPARTMENTID`) REFERENCES `departments` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dumping data for table notes.users: ~1 rows (yaklaşık)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`ID`, `DEPARTMENTID`, `USERNAME`, `PASSWORD`, `SHOWPRIVATENOTES`, `SHOWPRIVATEDEPARTMENTS`, `ISADMIN`) VALUES
	(1, 1, 'admin', 'admin', 1, 1, 1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
