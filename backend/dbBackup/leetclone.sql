-- MySQL dump 10.13  Distrib 8.0.43, for Linux (aarch64)
--
-- Host: localhost    Database: leetclone
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `contest`
--

DROP TABLE IF EXISTS `contest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contest` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `time_limit_mins` int DEFAULT NULL,
  `state` enum('created','started','closed','ended','cleared') DEFAULT NULL,
  `started_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contest`
--

LOCK TABLES `contest` WRITE;
/*!40000 ALTER TABLE `contest` DISABLE KEYS */;
INSERT INTO `contest` VALUES (75,18,60,'created',NULL),(76,18,60,'ended',NULL),(77,19,60,'created',NULL),(78,21,60,'created',NULL),(79,54,60,'ended',NULL),(80,54,60,'ended',NULL),(81,54,60,'ended',NULL),(82,54,60,'ended',NULL),(83,54,60,'ended',NULL),(84,54,60,'ended',NULL),(85,54,60,'ended',NULL),(86,54,60,'ended',NULL),(87,54,60,'ended',NULL),(88,54,60,'ended',NULL),(89,54,60,'ended',NULL),(90,54,60,'ended','2025-09-20 23:13:29'),(91,54,60,'ended','2025-09-20 23:25:19'),(92,54,60,'ended','2025-09-20 23:25:29'),(93,54,60,'ended','2025-09-20 23:32:25'),(94,55,60,'ended','2025-09-20 23:51:48'),(95,55,60,'ended','2025-09-20 23:56:28'),(96,55,60,'ended','2025-09-21 00:00:21'),(97,55,60,'ended','2025-09-21 00:01:44'),(98,55,60,'ended',NULL);
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
  `progress` varchar(255) DEFAULT NULL,
  `finished_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contest_player`
--

LOCK TABLES `contest_player` WRITE;
/*!40000 ALTER TABLE `contest_player` DISABLE KEYS */;
INSERT INTO `contest_player` VALUES (136,93,'Jackie','joined',NULL,NULL),(137,94,'Jackie','exited',NULL,NULL),(138,95,'Jackie','joined',NULL,NULL),(139,96,'Jackie','exited',NULL,NULL),(140,97,'Jackie','exited',NULL,NULL),(141,97,'Jackie','exited',NULL,NULL),(142,97,'Jackie','exited',NULL,NULL),(143,97,'Ken','joined',NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=331 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contest_problem`
--

LOCK TABLES `contest_problem` WRITE;
/*!40000 ALTER TABLE `contest_problem` DISABLE KEYS */;
INSERT INTO `contest_problem` VALUES (306,75,101),(307,76,101),(308,77,101),(309,78,101),(310,79,101),(311,79,103),(312,80,101),(313,81,101),(314,82,101),(315,83,101),(316,84,101),(317,85,101),(318,86,101),(319,87,101),(320,88,101),(321,89,101),(322,90,101),(323,91,101),(324,92,101),(325,93,101),(326,94,101),(327,95,101),(328,96,101),(329,97,101),(330,98,101);
/*!40000 ALTER TABLE `contest_problem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guest_user`
--

DROP TABLE IF EXISTS `guest_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guest_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `public_id` char(36) NOT NULL,
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `public_id` (`public_id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest_user`
--

LOCK TABLES `guest_user` WRITE;
/*!40000 ALTER TABLE `guest_user` DISABLE KEYS */;
INSERT INTO `guest_user` VALUES (1,'_xMZyI5Ny_n8sM3KYvP0bQ8yZnBD0Ogn','2025-09-20 04:46:20'),(2,'nksUx5SDNTT4NFAVv-XS2n7wxsi0unSG','2025-09-20 04:46:23'),(3,'uL_5aTxO3vbszVdvilmTVSUBI6iMKSPm','2025-09-20 04:46:38'),(4,'NZeNmNxDUaOCUFHhSDL_ua-c9d27g3v5','2025-09-20 04:46:42'),(5,'OsKFH8_edDkuQtbqM8-sqPgULU3hknBw','2025-09-20 04:49:20'),(6,'pmbFjIA8JYOyTaxi3lgwOMqIa8Zruwdh','2025-09-20 04:49:22'),(7,'LMF6_Ks9DJhS-iHubeifswGVnj6Z8dqS','2025-09-20 04:49:57'),(8,'5UfwgyYjtuANPOKMJAnw_lrhk2GiQ69I','2025-09-20 04:50:50'),(9,'01i_XMXLjzp-DxB7TottJevDb0FVd_If','2025-09-20 04:52:30'),(10,'wlx68nYQZakWEkzpSqx4dAdFQyMZp5rI','2025-09-20 04:52:32'),(11,'2ftdLE1zb-xUDTvTHrCGfAYcFCyJ6pra','2025-09-20 04:52:42'),(12,'paQepNn3kG4e0ePkflHEzJGLLx-oxPdB','2025-09-20 04:54:41'),(13,'J3sm8xEoZ7HDvfgi7so99-2Zrdh8kVY2','2025-09-20 04:54:43'),(14,'c_2Gcqmiln7yVuM9u5wKi390xDxcylbi','2025-09-20 04:56:57'),(15,'SZItpWqrQsSS2SQRRzev1uMwPwWBSSHx','2025-09-20 04:57:16'),(16,'2HoUjp-16Jr9KAScUnV8OHbLr6XksijJ','2025-09-20 04:57:19'),(17,'8DjoqziCUUoeje5btDAD2VG2ax0TTaDI','2025-09-20 04:57:37'),(18,'0aMHA7AqlKpI5t1aiQiy4GW-gLDCAeam','2025-09-20 05:05:44'),(19,'OlWnXFOCV_4BirZiLwu9K7978uc2daKC','2025-09-20 05:36:13'),(20,'yDJBHEw6skxgGRv_iZQdmfIjpClDCvqQ','2025-09-20 08:26:36'),(21,'dXoqWikJlIYq3-2192_tB7PT3mr7grb9','2025-09-20 08:26:54'),(22,'_PbHJ7XZ2SK3uIw8Dl3qwPJntrV3S1xg','2025-09-20 08:51:36'),(23,'OwsICz8Mh5AO70jy0jGabJSdHyMSOEDV','2025-09-20 08:51:36'),(24,'GT-dFzFxCHA0kfMeCE2-wUC0xh0IhssQ','2025-09-20 08:51:48'),(25,'BeYF88Onmw1HLyd0b7VRYrAO5f9qh6yQ','2025-09-20 08:51:48'),(26,'OzWHahfuR6JzNr1JVBsOGRArJkjv5ctT','2025-09-20 09:09:04'),(27,'p0xZusJ81R2I88X4Y-Drx9wFILcOqIpk','2025-09-20 09:09:04'),(28,'Z5O2spzpjx0Dz9xDtP28GKCMhZtnphx-','2025-09-20 09:09:08'),(29,'cxPTwJ7xZ51CJ1pHAnmlAPiZSLiiEPOL','2025-09-20 09:09:10'),(30,'sv9AnHkjCilIc43T4DUcTwcz7wQJtXbj','2025-09-20 09:09:11'),(31,'oPajzB5DGTgi5WgeadsgHnsQoluM-hLi','2025-09-20 09:09:12'),(32,'zm6AmZjoWCoofqlZvLILVXfcgY6QVoZ7','2025-09-20 09:09:13'),(33,'q_URV05x5RMdt_BculE_TYZFY-2QwDQQ','2025-09-20 09:09:17'),(34,'kWSzxoUJ0GhRRsHf_chAel9VjlzxUhSO','2025-09-20 09:09:18'),(35,'O8ql7M2HHWzlyRZFbDcsOZOiCt8mktkf','2025-09-20 09:09:19'),(36,'SZrmvwmjWCuAj_iRET9WdCz6g5M0jY-8','2025-09-20 09:09:20'),(37,'K7HpvuHzez2DjDE551LaCdQbilhjR-Lb','2025-09-20 09:09:28'),(38,'UaJQJKmubPP-zUofgFjA0LQLDGu52RJY','2025-09-20 09:09:28'),(39,'Y7NaIwnMGJUNNq21IEiZDaE2W5n3tk1L','2025-09-20 09:09:29'),(40,'O1o5Vg72FaWAY25eqX79AO5RisaQr-r-','2025-09-20 09:09:31'),(41,'sogmBZL8HsPpqw3ruryPn_VBakpzDf5p','2025-09-20 09:09:32'),(42,'VVpJLhMKVhEuEs8JP7he_BwBDeW0o5Rd','2025-09-20 09:16:14'),(43,'xb3ENmbMB9uW6xHvRZS_s_ZVNL_MCo06','2025-09-20 09:16:14'),(44,'S8INTyeH6O9pdJ-cL5pf2oGDDcQ4SOkm','2025-09-20 09:16:23'),(45,'ianXFkaONiz3PSSeFjC-PmKO2yC8gVCK','2025-09-20 09:16:23'),(46,'Kj-dtcDOC78zVEOa4DeBq0ZzoIKkbC2p','2025-09-20 09:17:52'),(47,'5FerFlgNedrPz2t8Inqc9ANdKn87F6d5','2025-09-20 09:17:52'),(48,'h5ieXvTXHAxubWzSQ4NMoAxAQUxNJ6qT','2025-09-20 09:17:54'),(49,'oaoSybOhmOAxJbEQ-7cGe9Lr7W73zUo_','2025-09-20 09:17:55'),(50,'vPFXzx4RiB4U7IYxS3uqY3cF0wSYKBwg','2025-09-20 09:23:16'),(51,'fCoIf6MsfTE1nIDUdlYX1R_TwaurPscQ','2025-09-20 09:23:16'),(52,'PWmrAfE92g-OksKRcGbm7CfC0grRqQWR','2025-09-20 09:23:18'),(53,'0ifgpL1_Ve3dOb4TrhobIWsxkHlVDskd','2025-09-20 09:23:24'),(54,'QJwS3hwGUm8NosTBz5yDSD1ebgb4SpP-','2025-09-20 09:23:25'),(55,'lWdXG9WA8Gfdl3xw-lyshXbNRe-nYIUU','2025-09-20 15:35:11'),(56,'8j2G7_20fZsYlAX6jVQEi_AoQuoBNsjd','2025-09-20 15:51:34');
/*!40000 ALTER TABLE `guest_user` ENABLE KEYS */;
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
  `verify_variable` varchar(63) DEFAULT NULL,
  `input_keys` text,
  `boilerplate` text,
  `solution_video` varchar(63) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problem`
--

LOCK TABLES `problem` WRITE;
/*!40000 ALTER TABLE `problem` DISABLE KEYS */;
INSERT INTO `problem` VALUES (101,'Two sum','<p>\n    Given an array of integers <code>nums</code> and an <code>integer</code>\n    target, <em> return indices of the two numbers such that they add up to </em> <code>target</code>.\n    </p>\n    <p>\n        You may assume that each input would have\n        <strong>exactly one solution</strong>, and you may not use the\n        same element twice.\n    </p>\n    <p>You can return the answer in any order.</p>','[\"<code> 2 <= nums.length <= 104</code> \",\"<code> -109 <= nums[i] <= 109 </code>\",\"<code> -109 <= target <= 109 </code>\",\"Only one valid answer exists.\"]','Easy','twoSum',NULL,'[\"nums\",\"target\"]','/**\n    * @param {number[]} nums\n    * @param {number} target\n    * @return {number[]}\n    */\n   var twoSum = function(nums, target) {\n       \n   };\n   ','KLlXCFG5TnA'),(102,'Valid Parentheses','\n    <p>Given a string <code>s</code> containing just the characters <code>\'(\'</code>, <code>\')\'</code>, <code>\'{\'</code>, <code>\'}\'</code>, <code>\'[\'</code> and <code>\']\'</code>, determine if the input string is valid.</p>\n    <ol>\n	<li>Open brackets must be closed by the same type of brackets.</li>\n	<li>Open brackets must be closed in the correct order.</li>\n	<li>Every close bracket has a corresponding open bracket of the same type.</li>\n    </ol>','[\"<code>1 &lt;= s.length &lt;= 10<sup>4</sup></code>\",\"<code>s</code> consists of parentheses only <code>\'()[]{}\'</code>\"]','Easy','isValid',NULL,'[\"s\"]','/**\n     * @param {string} s\n     * @return {boolean}\n     */\n    var isValid = function(s) {\n        \n    };\n   ','WTzjTskDFMg'),(103,'Number of Islands','\n    <p>Given an <code>m x n</code> 2D binary grid <code>grid</code> which represents a map of <code>\'1\'</code>s (land) and <code>\'0\'</code>s (water), return <em>the number of islands</em>.</p>\n    <p>An <strong>island</strong> is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.</p>','[\"<code>m == grid.length</code>\",\"<code>n == grid[i].length</code>\",\"<code>1 &lt;= m, n &lt;= 300</code>\",\"<code>grid[i][j]</code> is <code>\'0\'</code> or <code>\'1\'</code>.\"]','Easy','numIslands',NULL,'[\"grid\"]','/**\n     * @param {character[][]} grid\n     * @return {number}\n     */\n    var numIslands = function(grid) {\n        \n    };\n   ','pV2kpPD66nE'),(104,'Unique Paths','<p>There is a robot on an <code>m x n</code> grid. The robot is initially located at the <strong>top-left corner</strong> (i.e., <code>grid[0][0]</code>). The robot tries to move to the <strong>bottom-right corner</strong> (i.e., <code>grid[m - 1][n - 1]</code>). The robot can only move either down or right at any point in time.</p>\n    <p>Given the two integers <code>m</code> and <code>n</code>, return <em>the number of possible unique paths that the robot can take to reach the bottom-right corner</em>.</p>\n    <p>The test cases are generated so that the answer will be less than or equal to <code>2 * 10<sup>9</sup></code>.</p>','[\"<code>1 &lt;= m, n &lt;= 100</code>\"]','Medium','uniquePaths',NULL,'[\"m\",\"n\"]','/**\n     * @param {number} m\n     * @param {number} n\n     * @return {number}\n     */\n    var uniquePaths = function(m, n) {\n        \n    };\n   ','IlEsdxuD4lY'),(105,'Merge Intervals','<p>Given an array&nbsp;of <code>intervals</code>&nbsp;where <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code>, merge all overlapping intervals, and return <em>an array of the non-overlapping intervals that cover all the intervals in the input</em>.</p>','[\"<code>1 &lt;= intervals.length &lt;= 10<sup>4</sup></code>\",\"<code>intervals[i].length == 2</code>\",\"<code>0 &lt;= start<sub>i</sub> &lt;= end<sub>i</sub> &lt;= 10<sup>4</sup></code>\"]','Medium','merge',NULL,'[\"intervals\"]','/**\n   * @param {number[][]} intervals\n   * @return {number[][]}\n   */\n  var merge = function(intervals) {\n      \n  };','44H3cEC2fFM'),(106,'Permutations','<p>Given an array <code>nums</code> of distinct integers, return <em>all the possible permutations</em>. You can return the answer in <strong>any order</strong>.</p>','[\"<code>1 &lt;= nums.length &lt;= 6</code>\",\"<code>-10 &lt;= nums[i] &lt;= 10</code>\",\"All the integers of <code>nums</code> are <strong>unique</strong>.\"]','Medium','permute','ignore order','[\"nums\"]','/**\n    * @param {number[]} nums\n    * @return {number[][]}\n    */\n   var permute = function(nums) {\n       \n   };','s7AvT7cGdSo'),(107,'Container With Most Water','<p>You are given an integer array <code>height</code> of length <code>n</code>. There are <code>n</code> vertical lines drawn such that the two endpoints of the <code>i<sup>th</sup></code> line are <code>(i, 0)</code> and <code>(i, height[i])</code>.</p>\n    <p>Find two lines that together with the x-axis form a container, such that the container contains the most water.</p>\n    <p>Return <em>the maximum amount of water a container can store</em>.</p>\n    <p><strong>Notice</strong> that you may not slant the container.</p>','[\"<code>n == height.length</code>\",\"<code>2 &lt;= n &lt;= 10<sup>5</sup></code>\",\"<code>0 &lt;= height[i] &lt;= 10<sup>4</sup></code>\"]','Medium','maxArea',NULL,'[\"height\"]','/**\n    * @param {number[]} height\n    * @return {number}\n    */\n   var maxArea = function(height) {\n       \n   };','UuiTKBwPgAo'),(108,'Course Schedule','<p>There are a total of <code>numCourses</code> courses you have to take, labeled from <code>0</code> to <code>numCourses - 1</code>. You are given an array <code>prerequisites</code> where <code>prerequisites[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> indicates that you <strong>must</strong> take course <code>b<sub>i</sub></code> first if you want to take course <code>a<sub>i</sub></code>.</p>\n    <p>For example, the pair <code>[0, 1]</code>, indicates that to take course <code>0</code> you have to first take course <code>1</code>.</p>\n    <p>Return <code>true</code> if you can finish all courses. Otherwise, return <code>false</code>.</p>','[\"<code>1 &lt;= numCourses &lt;= 2000</code>\",\"<code>0 &lt;= prerequisites.length &lt;= 5000</code>\",\"<code>prerequisites[i].length == 2</code>\",\"<code>0 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt; numCourses</code>\",\"All the pairs prerequisites[i] are <strong>unique</strong>.\"]','Medium','canFinish',NULL,'[\"numCourses\",\"prerequisites\"]','/**\n    * @param {number} numCourses\n    * @param {number[][]} prerequisites\n    * @return {boolean}\n    */\n   var canFinish = function(numCourses, prerequisites) {\n       \n   };','EgI5nU9etnU');
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
) ENGINE=InnoDB AUTO_INCREMENT=422 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problem_example`
--

LOCK TABLES `problem_example` WRITE;
/*!40000 ALTER TABLE `problem_example` DISABLE KEYS */;
INSERT INTO `problem_example` VALUES (403,101,'[[2,7,11,15],9]','[0,1]','Because nums[0] + nums[1] == 9, we return [0, 1].',NULL),(404,101,'[[3,2,4],6]','[1,2]',NULL,NULL),(405,101,'[[3,3],6]','[0,1]',NULL,NULL),(406,102,'[\"()\"]','true',NULL,NULL),(407,102,'[\"()[]{}\"]','true',NULL,NULL),(408,102,'[\"(]\"]','false',NULL,NULL),(409,103,'[[[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]]','1',NULL,NULL),(410,103,'[[[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]]','3',NULL,NULL),(411,104,'[3,7]','28',NULL,'robot_maze.png'),(412,104,'[3,2]','3','From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:\n1. Right -> Down -> Down\n2. Down -> Down -> Right\n3. Down -> Right -> Down',NULL),(413,105,'[[[1,3],[2,6],[8,10],[15,18]]]','[[1,6],[8,10],[15,18]]','Since intervals [1,3] and [2,6] overlap, merge them into [1,6].',NULL),(414,105,'[[[1,4],[4,5]]]','[[1,5]]','Intervals [1,4] and [4,5] are considered overlapping.',NULL),(415,106,'[[1,2,3]]','[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]',NULL,NULL),(416,106,'[[0,1]]','[[0,1],[1,0]]',NULL,NULL),(417,106,'[[1]]','[[1]]',NULL,NULL),(418,107,'[[1,8,6,2,5,4,8,3,7]]','49','The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.','water_container.jpeg'),(419,107,'[[1,1]]','1',NULL,NULL),(420,108,'[2,[[1,0]]]','true','There are a total of 2 courses to take. \n        To take course 1 you should have finished course 0. So it is possible.',NULL),(421,108,'[2,[[1,0],[0,1]]]','false','There are a total of 2 courses to take. \n        To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=742 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problem_testcase`
--

LOCK TABLES `problem_testcase` WRITE;
/*!40000 ALTER TABLE `problem_testcase` DISABLE KEYS */;
INSERT INTO `problem_testcase` VALUES (707,101,'[[1,9,13,20,47],10]','[0,1]'),(708,101,'[[3,2,4,1,9],12]','[0,4]'),(709,101,'[[2,1,3,9],5]','[0,2]'),(710,102,'[\"({[)})\"]','false'),(711,102,'[\"{[}]\"]','false'),(712,102,'[\"()(\"]','false'),(713,102,'[\"({)}\"]','false'),(714,103,'[[[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]]','1'),(715,103,'[[[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]]','3'),(716,103,'[[[\"0\",\"0\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]]','0'),(717,103,'[[[\"1\",\"0\",\"0\",\"0\",\"0\"],[\"0\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"0\"]]]','4'),(718,104,'[1,1]','1'),(719,104,'[1,10]','1'),(720,104,'[2,2]','2'),(721,104,'[20,5]','8855'),(722,104,'[5,5]','70'),(723,104,'[16,16]','155117520'),(724,105,'[[[2,3],[9,12],[4,7],[6,8]]]','[[2,3],[4,8],[9,12]]'),(725,105,'[[[6,8],[1,5],[2,4]]]','[[1,5],[6,8]]'),(726,105,'[[[7,8],[2,6],[1,5],[3,4]]]','[[1,6],[7,8]]'),(727,105,'[[[5,6],[1,2],[3,4],[7,8]]]','[[1,2],[3,4],[5,6],[7,8]]'),(728,105,'[[[1,100]]]','[[1,100]]'),(729,105,'[[]]','[]'),(730,106,'[[1,6,2,10]]','[[1,6,2,10],[1,6,10,2],[1,2,6,10],[1,2,10,6],[1,10,6,2],[1,10,2,6],[6,1,2,10],[6,1,10,2],[6,2,1,10],[6,2,10,1],[6,10,1,2],[6,10,2,1],[2,1,6,10],[2,1,10,6],[2,6,1,10],[2,6,10,1],[2,10,1,6],[2,10,6,1],[10,1,6,2],[10,1,2,6],[10,6,1,2],[10,6,2,1],[10,2,1,6],[10,2,6,1]]'),(731,106,'[[9,6,7]]','[[9,6,7],[9,7,6],[6,9,7],[6,7,9],[7,9,6],[7,6,9]]'),(732,106,'[[5,4,3,2,1]]','[[5,4,3,2,1],[5,4,3,1,2],[5,4,2,3,1],[5,4,2,1,3],[5,4,1,3,2],[5,4,1,2,3],[5,3,4,2,1],[5,3,4,1,2],[5,3,2,4,1],[5,3,2,1,4],[5,3,1,4,2],[5,3,1,2,4],[5,2,4,3,1],[5,2,4,1,3],[5,2,3,4,1],[5,2,3,1,4],[5,2,1,4,3],[5,2,1,3,4],[5,1,4,3,2],[5,1,4,2,3],[5,1,3,4,2],[5,1,3,2,4],[5,1,2,4,3],[5,1,2,3,4],[4,5,3,2,1],[4,5,3,1,2],[4,5,2,3,1],[4,5,2,1,3],[4,5,1,3,2],[4,5,1,2,3],[4,3,5,2,1],[4,3,5,1,2],[4,3,2,5,1],[4,3,2,1,5],[4,3,1,5,2],[4,3,1,2,5],[4,2,5,3,1],[4,2,5,1,3],[4,2,3,5,1],[4,2,3,1,5],[4,2,1,5,3],[4,2,1,3,5],[4,1,5,3,2],[4,1,5,2,3],[4,1,3,5,2],[4,1,3,2,5],[4,1,2,5,3],[4,1,2,3,5],[3,5,4,2,1],[3,5,4,1,2],[3,5,2,4,1],[3,5,2,1,4],[3,5,1,4,2],[3,5,1,2,4],[3,4,5,2,1],[3,4,5,1,2],[3,4,2,5,1],[3,4,2,1,5],[3,4,1,5,2],[3,4,1,2,5],[3,2,5,4,1],[3,2,5,1,4],[3,2,4,5,1],[3,2,4,1,5],[3,2,1,5,4],[3,2,1,4,5],[3,1,5,4,2],[3,1,5,2,4],[3,1,4,5,2],[3,1,4,2,5],[3,1,2,5,4],[3,1,2,4,5],[2,5,4,3,1],[2,5,4,1,3],[2,5,3,4,1],[2,5,3,1,4],[2,5,1,4,3],[2,5,1,3,4],[2,4,5,3,1],[2,4,5,1,3],[2,4,3,5,1],[2,4,3,1,5],[2,4,1,5,3],[2,4,1,3,5],[2,3,5,4,1],[2,3,5,1,4],[2,3,4,5,1],[2,3,4,1,5],[2,3,1,5,4],[2,3,1,4,5],[2,1,5,4,3],[2,1,5,3,4],[2,1,4,5,3],[2,1,4,3,5],[2,1,3,5,4],[2,1,3,4,5],[1,5,4,3,2],[1,5,4,2,3],[1,5,3,4,2],[1,5,3,2,4],[1,5,2,4,3],[1,5,2,3,4],[1,4,5,3,2],[1,4,5,2,3],[1,4,3,5,2],[1,4,3,2,5],[1,4,2,5,3],[1,4,2,3,5],[1,3,5,4,2],[1,3,5,2,4],[1,3,4,5,2],[1,3,4,2,5],[1,3,2,5,4],[1,3,2,4,5],[1,2,5,4,3],[1,2,5,3,4],[1,2,4,5,3],[1,2,4,3,5],[1,2,3,5,4],[1,2,3,4,5]]'),(733,107,'[[1,1]]','1'),(734,107,'[[1,2,1]]','2'),(735,107,'[[4,3,2,1,4]]','16'),(736,107,'[[5,2,3,10,8,4]]','20'),(737,107,'[[1,2,3,4,5,6,7,8,9,10]]','25'),(738,107,'[[10,9,8,7,6,5,4,3,2,1]]','25'),(739,108,'[4,[[1,0],[2,0],[3,1],[3,2]]]','true'),(740,108,'[3,[[1,0],[1,2],[0,1]]]','false'),(741,108,'[1,[]]','true');
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
) ENGINE=InnoDB AUTO_INCREMENT=180 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problem_to_tag`
--

LOCK TABLES `problem_to_tag` WRITE;
/*!40000 ALTER TABLE `problem_to_tag` DISABLE KEYS */;
INSERT INTO `problem_to_tag` VALUES (171,101,171),(172,102,176),(173,103,172),(174,103,174),(175,105,173),(176,108,177),(177,104,178),(178,106,175),(179,107,179);
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
) ENGINE=InnoDB AUTO_INCREMENT=180 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (171,'HashMap'),(172,'BFS'),(173,'Sorting'),(174,'DFS'),(175,'Backtracking'),(176,'Stack'),(177,'Graph'),(178,'DP'),(179,'Two Pointers');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-21  3:18:13
