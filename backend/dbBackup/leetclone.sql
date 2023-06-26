-- MySQL dump 10.13  Distrib 8.0.32, for macos13 (arm64)
--
-- Host: localhost    Database: leetclone
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `leetclone`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `leetclone` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `leetclone`;

--
-- Table structure for table `contest`
--

DROP TABLE IF EXISTS `contest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contest` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `time_limit_mins` int DEFAULT NULL,
  `state` enum('created','started','ended') DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contest`
--

LOCK TABLES `contest` WRITE;
/*!40000 ALTER TABLE `contest` DISABLE KEYS */;
INSERT INTO `contest` VALUES (3,4,60,'ended','2023-06-24 11:15:28'),(4,4,100,'ended','2023-06-25 11:43:34'),(5,4,60,'ended','2023-06-25 12:37:17'),(6,4,60,'ended','2023-06-25 12:39:50'),(7,4,60,'ended','2023-06-25 22:09:58'),(8,4,60,'ended','2023-06-25 22:11:28'),(9,4,60,'ended','2023-06-25 22:12:01'),(10,4,60,'ended','2023-06-25 22:13:33'),(11,4,60,'ended','2023-06-25 22:14:56'),(12,4,60,'ended','2023-06-26 13:46:29'),(13,4,60,'ended','2023-06-26 13:55:11'),(14,4,100,'ended','2023-06-26 14:46:12');
/*!40000 ALTER TABLE `contest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contest_player`
--

DROP TABLE IF EXISTS `contest_player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contest_player` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contest_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `state` enum('joined','exited') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contest_player`
--

LOCK TABLES `contest_player` WRITE;
/*!40000 ALTER TABLE `contest_player` DISABLE KEYS */;
INSERT INTO `contest_player` VALUES (1,3,'Jackie','exited'),(2,3,'Jackie','exited'),(3,3,'Jackie','exited'),(4,3,'Jackie','exited'),(5,3,'Jackie','exited'),(6,3,'Jackie','joined'),(7,4,'Jackie','exited'),(8,4,'Jackie','exited'),(9,6,'Jackie','exited'),(10,6,'Ken','exited'),(11,6,'Jackie','exited'),(12,6,'Karry','exited'),(13,6,'aseopfijaspoeijfas','exited'),(14,6,'Jackie cool','exited'),(15,6,'Jackie','exited'),(16,6,'asefasefasev afsefasefasefasefase','exited'),(17,6,'Jackie','exited'),(18,6,'Jackie','exited'),(19,6,'Jackie','exited'),(20,6,'Jackie','joined'),(21,7,'Jackie','joined'),(22,9,'Jackie','exited'),(23,10,'Jackie','exited'),(24,11,'Jackie','joined'),(25,12,'Jackie','exited'),(26,12,'Jackie','exited'),(27,12,'Jackie','exited'),(28,12,'Jackie','exited'),(29,13,'Jackie','exited'),(30,13,'Howard','joined'),(31,14,'Jackie','exited'),(32,14,'Jackie','joined');
/*!40000 ALTER TABLE `contest_player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contest_problem`
--

DROP TABLE IF EXISTS `contest_problem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contest_problem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contest_id` int DEFAULT NULL,
  `problem_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contest_problem`
--

LOCK TABLES `contest_problem` WRITE;
/*!40000 ALTER TABLE `contest_problem` DISABLE KEYS */;
INSERT INTO `contest_problem` VALUES (1,5,25),(2,5,27),(3,5,27),(4,6,25),(5,6,26),(6,6,27),(7,7,25),(8,7,25),(9,8,25),(10,8,25),(11,9,25),(12,9,25),(13,11,25),(14,11,26),(15,12,26),(16,12,27),(17,13,26),(18,13,27),(19,14,25),(20,14,26),(21,15,26),(22,15,27),(23,16,26),(24,16,27),(25,18,25),(26,18,26),(27,19,25),(28,20,26),(29,20,27),(30,21,26),(31,21,25),(32,22,26),(33,23,25),(34,24,25),(35,25,26),(36,1,26),(37,2,26),(38,3,25),(39,4,25),(40,4,26),(41,5,25),(42,5,26),(43,6,25),(44,6,26),(45,7,25),(46,8,25),(47,9,25),(48,10,25),(49,11,25),(50,12,26),(51,13,25),(52,14,26),(53,14,25);
/*!40000 ALTER TABLE `contest_problem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `problem`
--

DROP TABLE IF EXISTS `problem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `problem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(63) DEFAULT NULL,
  `description` text,
  `constraints` text,
  `difficulty` enum('Easy','Medium','Hard') DEFAULT NULL,
  `function_name` varchar(63) DEFAULT NULL,
  `input_keys` text,
  `boilerplate` text,
  `solution_video` varchar(63) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problem`
--

LOCK TABLES `problem` WRITE;
/*!40000 ALTER TABLE `problem` DISABLE KEYS */;
INSERT INTO `problem` VALUES (25,'two-sum','<p>\n    Given an array of integers <code>nums</code> and an <code>integer</code>\n    target, <em> return indices of the two numbers such that they add up to </em> <code>target</code>.\n    </p>\n    <p>\n        You may assume that each input would have\n        <strong>exactly one solution</strong>, and you may not use the\n        same element twice.\n    </p>\n    <p>You can return the answer in any order.</p>','[\"<code> 2 <= nums.length <= 104</code> \",\"<code> -109 <= nums[i] <= 109 </code>\",\"<code> -109 <= target <= 109 </code>\",\"Only one valid answer exists.\"]','Easy','twoSum','[\"nums\",\"target\"]','\n    /**\n    * @param {number[]} nums\n    * @param {number} target\n    * @return {number[]}\n    */\n   var twoSum = function(nums, target) {\n       \n   };\n   ','KLlXCFG5TnA'),(26,'Valid Parentheses','\n    <p>Given a string <code>s</code> containing just the characters <code>\'(\'</code>, <code>\')\'</code>, <code>\'{\'</code>, <code>\'}\'</code>, <code>\'[\'</code> and <code>\']\'</code>, determine if the input string is valid.</p>\n    <ol>\n	<li>Open brackets must be closed by the same type of brackets.</li>\n	<li>Open brackets must be closed in the correct order.</li>\n	<li>Every close bracket has a corresponding open bracket of the same type.</li>\n    </ol>','[\"<code>1 &lt;= s.length &lt;= 10<sup>4</sup></code>\",\"<code>s</code> consists of parentheses only <code>\'()[]{}\'</code>\"]','Easy','isValid','[\"s\"]','\n    /**\n     * @param {string} s\n     * @return {boolean}\n     */\n    var isValid = function(s) {\n        \n    };\n   ','WTzjTskDFMg'),(27,'Number of Islands','\n    <p>Given an <code>m x n</code> 2D binary grid <code>grid</code> which represents a map of <code>\'1\'</code>s (land) and <code>\'0\'</code>s (water), return <em>the number of islands</em>.</p>\n    <p>An <strong>island</strong> is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.</p>','[\"<code>m == grid.length</code>\",\"<code>n == grid[i].length</code>\",\"<code>1 &lt;= m, n &lt;= 300</code>\",\"<code>grid[i][j]</code> is <code>\'0\'</code> or <code>\'1\'</code>.\"]','Easy','numIslands','[\"grid\"]','\n    /**\n     * @param {character[][]} grid\n     * @return {number}\n     */\n    var numIslands = function(grid) {\n        \n    };\n   ','pV2kpPD66nE');
/*!40000 ALTER TABLE `problem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `problem_example`
--

DROP TABLE IF EXISTS `problem_example`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `problem_example` (
  `id` int NOT NULL AUTO_INCREMENT,
  `problem_id` int DEFAULT NULL,
  `input` text,
  `output` text,
  `explanation` text,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problem_example`
--

LOCK TABLES `problem_example` WRITE;
/*!40000 ALTER TABLE `problem_example` DISABLE KEYS */;
INSERT INTO `problem_example` VALUES (65,25,'[[2,7,11,15],9]','[0,1]','Because nums[0] + nums[1] == 9, we return [0, 1].',NULL),(66,25,'[[3,2,4],6]','[1,2]',NULL,NULL),(67,25,'[[3,3],6]','[0,1]',NULL,NULL),(68,26,'[\"()[]{}\"]','true',NULL,NULL),(69,26,'[\"()\"]','true',NULL,NULL),(70,26,'[\"(]\"]','false',NULL,NULL),(71,27,'[[[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]]','1',NULL,NULL),(72,27,'[[[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]]','3',NULL,NULL);
/*!40000 ALTER TABLE `problem_example` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `problem_testcase`
--

DROP TABLE IF EXISTS `problem_testcase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `problem_testcase` (
  `id` int NOT NULL AUTO_INCREMENT,
  `problem_id` int DEFAULT NULL,
  `input` text,
  `output` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problem_testcase`
--

LOCK TABLES `problem_testcase` WRITE;
/*!40000 ALTER TABLE `problem_testcase` DISABLE KEYS */;
INSERT INTO `problem_testcase` VALUES (86,25,'[[3,2,4,1,9],12]','[0,4]'),(87,25,'[[2,1,3,9],5]','[0,2]'),(88,25,'[[1,9,13,20,47],10]','[0,1]'),(89,26,'[\"({[)})\"]','false'),(90,26,'[\"()(\"]','false'),(91,26,'[\"{[}]\"]','false'),(92,26,'[\"({)}\"]','false'),(93,27,'[[[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]]','1'),(94,27,'[[[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]]','3'),(95,27,'[[[\"0\",\"0\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]]','0'),(96,27,'[[[\"1\",\"0\",\"0\",\"0\",\"0\"],[\"0\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"0\"]]]','4');
/*!40000 ALTER TABLE `problem_testcase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `problem_to_tag`
--

DROP TABLE IF EXISTS `problem_to_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `problem_to_tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `problem_id` int DEFAULT NULL,
  `tag_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problem_to_tag`
--

LOCK TABLES `problem_to_tag` WRITE;
/*!40000 ALTER TABLE `problem_to_tag` DISABLE KEYS */;
INSERT INTO `problem_to_tag` VALUES (1,19,1),(2,21,5),(3,19,2),(4,21,3),(5,20,4),(6,24,8),(7,23,6),(8,22,7),(9,24,9),(10,26,10),(11,25,11),(12,27,12),(13,27,13);
/*!40000 ALTER TABLE `problem_to_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(63) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (1,'Hash Table'),(2,'Array'),(3,'DFS'),(4,'Stack'),(5,'BFS'),(6,'Stack'),(7,'HashMap'),(8,'DFS'),(9,'BFS'),(10,'Stack'),(11,'HashMap'),(12,'DFS'),(13,'BFS');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(127) NOT NULL,
  `name` varchar(127) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (4,'jackie@ee.com','Jackie','','2023-06-22 04:09:24','2023-06-22 04:09:24'),(10,'test1@test.com','test1','','2023-06-22 13:41:03','2023-06-22 13:41:03');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_provider`
--

DROP TABLE IF EXISTS `user_provider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_provider` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `name` enum('native','facebook','google') NOT NULL,
  `token` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_provider`
--

LOCK TABLES `user_provider` WRITE;
/*!40000 ALTER TABLE `user_provider` DISABLE KEYS */;
INSERT INTO `user_provider` VALUES (1,4,'native','$argon2id$v=19$m=65536,t=3,p=4$b3/FsujDddklGka3izwHxg$nzGa21XcE2Vi0lFpB2O+KUJJBtNsqRl8VYVhRZnb/8M','2023-06-22 04:09:24','2023-06-22 04:09:24'),(2,10,'native','$argon2id$v=19$m=65536,t=3,p=4$LwIl7TYBHuOxCoGY17VZ+A$s/iyws3cB23RyJstQYgGurh6QmOgQFD15m3UXgV9Cr0','2023-06-22 13:41:03','2023-06-22 13:41:03');
/*!40000 ALTER TABLE `user_provider` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-26 14:58:55
