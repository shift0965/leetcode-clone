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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problem`
--

LOCK TABLES `problem` WRITE;
/*!40000 ALTER TABLE `problem` DISABLE KEYS */;
INSERT INTO `problem` VALUES (40,'two-sum','<p>\n    Given an array of integers <code>nums</code> and an <code>integer</code>\n    target, <em> return indices of the two numbers such that they add up to </em> <code>target</code>.\n    </p>\n    <p>\n        You may assume that each input would have\n        <strong>exactly one solution</strong>, and you may not use the\n        same element twice.\n    </p>\n    <p>You can return the answer in any order.</p>','[\"<code> 2 <= nums.length <= 104</code> \",\"<code> -109 <= nums[i] <= 109 </code>\",\"<code> -109 <= target <= 109 </code>\",\"Only one valid answer exists.\"]','Easy','twoSum','[\"nums\",\"target\"]','\n    /**\n    * @param {number[]} nums\n    * @param {number} target\n    * @return {number[]}\n    */\n   var twoSum = function(nums, target) {\n       \n   };\n   '),(41,'Number of Islands','\n    <p>Given an <code>m x n</code> 2D binary grid <code>grid</code> which represents a map of <code>\'1\'</code>s (land) and <code>\'0\'</code>s (water), return <em>the number of islands</em>.</p>\n    <p>An <strong>island</strong> is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.</p>','[\"<code>m == grid.length</code>\",\"<code>n == grid[i].length</code>\",\"<code>1 &lt;= m, n &lt;= 300</code>\",\"<code>grid[i][j]</code> is <code>\'0\'</code> or <code>\'1\'</code>.\"]','Easy','numIslands','[\"grid\"]','\n    /**\n     * @param {character[][]} grid\n     * @return {number}\n     */\n    var numIslands = function(grid) {\n        \n    };\n   '),(42,'Valid Parentheses','\n    <p>Given a string <code>s</code> containing just the characters <code>\'(\'</code>, <code>\')\'</code>, <code>\'{\'</code>, <code>\'}\'</code>, <code>\'[\'</code> and <code>\']\'</code>, determine if the input string is valid.</p>\n    <ol>\n	<li>Open brackets must be closed by the same type of brackets.</li>\n	<li>Open brackets must be closed in the correct order.</li>\n	<li>Every close bracket has a corresponding open bracket of the same type.</li>\n    </ol>','[\"<code>1 &lt;= s.length &lt;= 10<sup>4</sup></code>\",\"<code>s</code> consists of parentheses only <code>\'()[]{}\'</code>\"]','Easy','isValid','[\"s\"]','\n    /**\n     * @param {string} s\n     * @return {boolean}\n     */\n    var isValid = function(s) {\n        \n    };\n   ');
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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problem_example`
--

LOCK TABLES `problem_example` WRITE;
/*!40000 ALTER TABLE `problem_example` DISABLE KEYS */;
INSERT INTO `problem_example` VALUES (25,40,'[[2,7,11,15],9]','[0,1]','Because nums[0] + nums[1] == 9, we return [0, 1].',NULL),(26,40,'[[3,2,4],6]','[1,2]',NULL,NULL),(27,41,'[[[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]]','3',NULL,NULL),(28,41,'[[[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]]','1',NULL,NULL),(29,40,'[[3,3],6]','[0,1]',NULL,NULL),(30,42,'[\"()\"]','true',NULL,NULL),(31,42,'[\"()[]{}\"]','true',NULL,NULL),(32,42,'[\"(]\"]','false',NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problem_testcase`
--

LOCK TABLES `problem_testcase` WRITE;
/*!40000 ALTER TABLE `problem_testcase` DISABLE KEYS */;
INSERT INTO `problem_testcase` VALUES (1,40,'[[1,9,13,20,47],10]','[0,1]'),(2,41,'[[[\"0\",\"0\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]]','0'),(3,41,'[[[\"1\",\"0\",\"0\",\"0\",\"0\"],[\"0\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"0\"]]]','4'),(4,40,'[[3,2,4,1,9],12]','[0,4]'),(5,40,'[[2,1,3,9],5]','[0,2]'),(6,42,'[\"({[)})\"]','false'),(7,42,'[\"{[}]\"]','false'),(8,42,'[\"()(\"]','false'),(9,42,'[\"({)}\"]','false'),(10,41,'[[[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]]','1'),(11,41,'[[[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]]','3');
/*!40000 ALTER TABLE `problem_testcase` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-16 19:45:35
