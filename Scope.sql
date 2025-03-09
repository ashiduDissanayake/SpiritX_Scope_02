-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (x86_64)
--
-- Host: spiritx1-jupiter-1.h.aivencloud.com    Database: defaultdb
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '090fdcfb-fbd4-11ef-98d9-1ed4c2851038:1-291';

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `players` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `university` varchar(255) NOT NULL,
  `category` enum('Batsman','Bowler','All-Rounder') NOT NULL,
  `total_runs` int NOT NULL DEFAULT '0',
  `balls_faced` int NOT NULL DEFAULT '0',
  `innings_played` int NOT NULL DEFAULT '0',
  `wickets` int NOT NULL DEFAULT '0',
  `overs_bowled` int NOT NULL DEFAULT '0',
  `runs_conceded` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES (6,'Niroshan Mathews','University of the Visual & Performing Arts','Batsman',275,305,5,0,2,18,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(7,'Chaturanga Gunathilaka','University of Moratuwa','Bowler',140,264,11,39,88,528,'2025-03-08 17:02:58','2025-03-09 13:18:39'),(8,'Lahiru Rathnayake','University of Ruhuna','Batsman',749,824,14,0,1,8,'2025-03-08 17:02:58','2025-03-09 12:26:09'),(11,'Lakshan Vandersay','University of the Visual & Performing Arts','All-Rounder',405,337,15,15,75,450,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(13,'Sammu Sandakan','University of Ruhuna','Bowler',120,240,10,26,80,320,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(14,'Kalana Jayawardene','University of Jaffna','Bowler',120,240,10,33,100,400,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(15,'Binura Samarawickrama','University of the Visual & Performing Arts','Bowler',77,154,7,21,63,252,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(16,'Dasun Thirimanne','Eastern University','Bowler',121,242,11,29,88,440,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(17,'Angelo Samarawickrama','University of Kelaniya','Batsman',424,471,8,0,1,7,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(18,'Nuwan Jayawickrama','University of Ruhuna','Batsman',300,333,6,0,3,27,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(19,'Kusal Dhananjaya','South Eastern University','Batsman',480,533,10,0,2,16,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(20,'Chamika Bandara','Eastern University','Batsman',270,300,5,0,5,45,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(21,'Dilruwan Shanaka','University of Peradeniya','Batsman',384,426,8,0,5,45,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(22,'Danushka Jayawickrama','University of Peradeniya','All-Rounder',350,291,14,14,70,350,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(23,'Charith Shanaka','University of Colombo','Batsman',477,530,9,0,3,27,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(24,'Asela Nissanka','University of Sri Jayewardenepura','Batsman',765,850,15,0,0,1,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(25,'Wanindu Hasaranga','University of Colombo','Bowler',120,240,10,30,90,540,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(26,'Asela Vandersay','University of the Visual & Performing Arts','Bowler',154,308,14,37,112,448,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(27,'Pathum Fernando','University of Peradeniya','Batsman',450,500,10,0,2,18,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(28,'Angelo Kumara','Eastern University','Batsman',330,366,6,0,1,8,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(29,'Danushka Rajapaksa','University of Peradeniya','Batsman',441,490,9,0,5,35,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(30,'Suranga Shanaka','South Eastern University','Bowler',55,110,5,13,40,160,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(31,'Pathum Dhananjaya','Eastern University','Batsman',360,400,8,0,1,9,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(32,'Asela Asalanka','South Eastern University','Batsman',550,611,11,0,0,1,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(33,'Minod Rathnayake','University of Kelaniya','Bowler',154,308,14,37,112,448,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(35,'Praveen Asalanka','Eastern University','Batsman',477,530,9,0,1,7,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(36,'Angelo Jayawardene','University of Jaffna','Batsman',468,520,9,0,3,21,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(37,'Kamindu Asalanka','University of Moratuwa','Bowler',135,270,15,45,135,810,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(38,'Sadeera Rajapaksa','University of Jaffna','All-Rounder',275,229,11,8,44,264,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(39,'Sandakan Hasaranga','University of Kelaniya','Batsman',795,883,15,0,1,7,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(40,'Bhanuka Rajapaksa','University of Moratuwa','All-Rounder',364,303,14,11,56,336,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(41,'Chamika Rajapaksa','University of Ruhuna','Batsman',450,500,9,0,1,7,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(42,'Kamindu Lakmal','University of the Visual & Performing Arts','Batsman',780,866,15,0,5,35,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(43,'Lakshan Gunathilaka','University of Peradeniya','Bowler',84,168,7,21,63,315,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(44,'Tharindu Thirimanne','South Eastern University','Batsman',611,678,13,0,2,18,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(45,'Dinesh Samarawickrama','University of Jaffna','Batsman',400,444,8,0,3,27,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(46,'Suranga Sandakan','University of Moratuwa','Batsman',235,261,5,0,4,36,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(47,'Sandakan Dickwella','University of Jaffna','Batsman',368,408,8,0,3,27,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(48,'Sammu Rajapaksa','University of Ruhuna','Batsman',240,266,5,0,2,16,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(49,'Suranga Bandara','University of Moratuwa','Bowler',154,308,14,46,140,840,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(50,'Tharindu Embuldeniya','University of the Visual & Performing Arts','All-Rounder',264,220,12,12,60,360,'2025-03-08 17:02:58','2025-03-08 17:02:58'),(52,'Dasun Illangasinghe','University of the Visual & Performing Arts','Bowler',3,3,3,3,3,3,'2025-03-08 21:59:28','2025-03-08 21:59:28'),(54,'Dasun madusanka','University of the Visual & Performing Arts','Batsman',1,4,2,0,1,1,'2025-03-09 12:23:04','2025-03-09 12:23:04');
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_players`
--

DROP TABLE IF EXISTS `team_players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_players` (
  `id` int NOT NULL AUTO_INCREMENT,
  `team_id` int NOT NULL,
  `player_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_team_player` (`team_id`,`player_id`),
  KEY `player_id` (`player_id`),
  CONSTRAINT `team_players_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE,
  CONSTRAINT `team_players_ibfk_2` FOREIGN KEY (`player_id`) REFERENCES `players` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_players`
--

LOCK TABLES `team_players` WRITE;
/*!40000 ALTER TABLE `team_players` DISABLE KEYS */;
INSERT INTO `team_players` VALUES (3,1,23,'2025-03-08 17:16:39'),(4,1,31,'2025-03-08 17:16:45'),(5,1,49,'2025-03-08 17:16:52'),(6,1,13,'2025-03-08 17:16:59'),(7,1,33,'2025-03-08 17:17:09'),(8,1,43,'2025-03-08 17:17:17'),(10,1,22,'2025-03-08 17:17:32'),(11,1,11,'2025-03-08 17:17:39'),(13,2,13,'2025-03-08 17:20:11'),(15,2,14,'2025-03-08 17:20:14'),(16,2,15,'2025-03-08 17:20:16'),(17,2,16,'2025-03-08 17:20:16'),(18,2,18,'2025-03-08 17:20:19'),(19,2,17,'2025-03-08 17:20:20'),(20,2,21,'2025-03-08 17:20:21'),(21,2,22,'2025-03-08 17:20:23'),(22,2,40,'2025-03-08 17:20:29'),(26,3,11,'2025-03-08 19:10:27'),(27,3,22,'2025-03-08 19:10:31'),(31,3,39,'2025-03-08 19:15:00'),(32,3,42,'2025-03-08 19:15:09'),(34,3,13,'2025-03-08 19:15:57'),(35,3,14,'2025-03-08 19:16:13'),(39,4,7,'2025-03-08 22:09:34'),(51,1,6,'2025-03-09 04:52:45'),(52,1,24,'2025-03-09 06:06:03'),(53,7,24,'2025-03-09 06:16:17'),(54,7,32,'2025-03-09 06:16:40'),(55,7,17,'2025-03-09 06:16:59'),(58,7,22,'2025-03-09 06:17:10'),(59,7,50,'2025-03-09 06:17:12'),(60,7,40,'2025-03-09 06:17:15'),(61,7,7,'2025-03-09 06:17:21'),(62,7,25,'2025-03-09 06:17:22'),(63,7,16,'2025-03-09 06:17:28'),(64,2,6,'2025-03-09 07:15:21'),(67,6,11,'2025-03-09 08:58:08'),(75,6,50,'2025-03-09 08:58:41'),(79,6,13,'2025-03-09 09:50:11'),(81,6,15,'2025-03-09 09:50:21'),(94,4,6,'2025-03-09 13:19:38'),(96,4,11,'2025-03-09 13:19:41'),(97,4,13,'2025-03-09 13:19:42'),(98,4,14,'2025-03-09 13:19:43'),(99,4,8,'2025-03-09 13:19:44'),(100,4,15,'2025-03-09 13:19:45'),(101,4,18,'2025-03-09 13:19:50'),(102,4,22,'2025-03-09 13:19:51'),(103,4,19,'2025-03-09 13:19:55'),(104,6,7,'2025-03-09 13:20:54'),(105,6,8,'2025-03-09 13:20:55'),(106,6,14,'2025-03-09 13:20:56'),(107,6,18,'2025-03-09 13:20:59'),(108,6,19,'2025-03-09 13:21:00'),(109,6,6,'2025-03-09 13:31:33'),(110,2,24,'2025-03-09 14:14:56');
/*!40000 ALTER TABLE `team_players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `teams_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES (1,4,'2025-03-08 17:14:17','2025-03-08 17:14:17'),(2,5,'2025-03-08 17:20:03','2025-03-08 17:20:03'),(3,6,'2025-03-08 19:01:56','2025-03-08 19:01:56'),(4,7,'2025-03-08 19:37:57','2025-03-08 19:37:57'),(5,13,'2025-03-09 01:34:58','2025-03-09 01:34:58'),(6,14,'2025-03-09 03:01:35','2025-03-09 03:01:35'),(7,15,'2025-03-09 06:13:54','2025-03-09 06:13:54');
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'spiritx_2025','$2a$12$mwUy.ay0bVencDlTiddWxO2UZmx/f0dLsPjsdKluwxCHPe5ogwEL2',0,'2025-03-08 17:02:57','2025-03-08 17:22:33'),(2,'kasun kumara','$2a$12$8LAreOfuEUjXlfhnc4fmE.VgvqiBKEaiNaF0b7Tt/FpApTtqn3GQK',0,'2025-03-08 17:09:17','2025-03-08 17:09:17'),(3,'KasunKumara','$2a$12$YbKgnRB0/.XFsV08Vzn0ZOoEo5DCh9m5m9qPw6LxKypHO9QZkNleW',0,'2025-03-08 17:11:55','2025-03-08 17:11:55'),(4,'Kasunk@4','$2a$12$sJeXyY0ZXGnWCXjIeXPEZu9wB483zwzZhhSlLATVoU8SWo7JKBVGK',0,'2025-03-08 17:13:59','2025-03-08 17:13:59'),(5,'ashiduDissanayake','$2a$12$pciy5g4UqmgYtZ26Qjz1deRzR9rEqu/kdZAK9xeNTA2anZGtE7Pz2',0,'2025-03-08 17:19:54','2025-03-08 17:19:54'),(6,'Dasun123','$2a$12$vVO1FPGYcbw2GpRdni9yt.QEDBW1bPgV6uT8SWscyTWc/fGc1QMpe',1,'2025-03-08 19:01:10','2025-03-08 19:29:37'),(7,'kasun456','$2a$12$70IVG7.z4.6IJ2/NiBmElux4JV7bczvcDxVLOpFJZyqkxm/epIY8S',0,'2025-03-08 19:37:50','2025-03-08 19:37:50'),(8,'Illangasinghe','$2a$12$OUTKaNrAPJceuJfdPPmxrufpoLmIJ9sA9E5nwpI1SvecFFtR.AikW',0,'2025-03-08 19:58:29','2025-03-08 19:58:29'),(9,'Illangasingh','$2a$12$nfwr79pK7gdGi2QvPa.H4.DIWiLUGE8KEQD6fQF9rNffdVckcosTG',0,'2025-03-08 19:58:54','2025-03-08 19:58:54'),(10,'Illangasing','$2a$12$mNqzxdo3y6iKqZKpYRG.sO35IGbWa2NWtaBClRatXq4YMIkhYNZSi',0,'2025-03-08 20:03:29','2025-03-08 20:03:29'),(11,'Illangasin','$2a$12$EFOIrB.HkUO9EQ87MauMku/lqRGNsZf2no7Cq0JnmlYavc7CjVMR2',0,'2025-03-08 20:03:53','2025-03-08 20:03:53'),(12,'Illangasi','$2a$12$WSYiNzUPgB9jcNAXk5SrZOo4SAr7kthPyAITTZiWEL3bPeO5b.Vee',0,'2025-03-08 20:06:27','2025-03-08 20:06:27'),(13,'Kasun333','$2a$12$AsP5eCt6TzV6a9DcqpObyOUBQPlpdE7H89inKJ3dgdqPUbd3643Ma',1,'2025-03-09 01:34:40','2025-03-09 02:56:56'),(14,'Dilhara333','$2a$12$b/gq6dRMBwxfnNDyEVNMyeqOCZMeATQzyXVHNTNc3dKLZcHClyXz.',0,'2025-03-09 03:01:25','2025-03-09 03:01:25'),(15,'HirunaNimesh','$2a$12$8mnRlipFTlSNIsVc/NUOGeE8BUexu202WxQBgcZQUsSBHAR8trFYi',0,'2025-03-09 06:10:13','2025-03-09 06:10:13');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'defaultdb'
--

--
-- Dumping routines for database 'defaultdb'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-09 19:58:59
