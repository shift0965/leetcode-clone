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
  `state` enum('created','started','closed','ended','cleared') DEFAULT NULL,
  `started_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contest`
--

LOCK TABLES `contest` WRITE;
/*!40000 ALTER TABLE `contest` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contest_player`
--

LOCK TABLES `contest_player` WRITE;
/*!40000 ALTER TABLE `contest_player` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=306 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contest_problem`
--

LOCK TABLES `contest_problem` WRITE;
/*!40000 ALTER TABLE `contest_problem` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (4,'jackie@ee.com','Jackie','','2023-06-22 04:09:24','2023-06-22 04:09:24'),(10,'test1@test.com','test1','','2023-06-22 13:41:03','2023-06-22 13:41:03'),(12,'tommy@gmail.com','Tommy','','2023-07-12 08:11:14','2023-07-12 08:11:14'),(15,'test2@test.com','test1','','2023-07-12 08:13:20','2023-07-12 08:13:20'),(16,'test3@test.com','test3','','2023-07-12 08:14:58','2023-07-12 08:14:58'),(17,'leo@ee.com','Leo','','2023-07-13 07:42:21','2023-07-13 07:42:21');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_provider`
--

LOCK TABLES `user_provider` WRITE;
/*!40000 ALTER TABLE `user_provider` DISABLE KEYS */;
INSERT INTO `user_provider` VALUES (1,4,'native','$argon2id$v=19$m=65536,t=3,p=4$b3/FsujDddklGka3izwHxg$nzGa21XcE2Vi0lFpB2O+KUJJBtNsqRl8VYVhRZnb/8M','2023-06-22 04:09:24','2023-06-22 04:09:24'),(2,10,'native','$argon2id$v=19$m=65536,t=3,p=4$LwIl7TYBHuOxCoGY17VZ+A$s/iyws3cB23RyJstQYgGurh6QmOgQFD15m3UXgV9Cr0','2023-06-22 13:41:03','2023-06-22 13:41:03'),(3,12,'native','$argon2id$v=19$m=65536,t=3,p=4$noTnTqqCk4itgrP5ifzFWQ$nBnjC91Wr1pMTs6FZcNozou2qcgZdxA1qtOlrW9biTc','2023-07-12 08:11:14','2023-07-12 08:11:14'),(4,15,'native','$argon2id$v=19$m=65536,t=3,p=4$nb9IA1297yfr6/kq8V/I4w$AAZ1aEXXSa1R/tA27Ck8QyKBNqoKv/GKXL91gx1JwUU','2023-07-12 08:13:20','2023-07-12 08:13:20'),(5,16,'native','$argon2id$v=19$m=65536,t=3,p=4$SkenicUgiksmV8QzZxgOwQ$wtEdrFuxxdDYTW+7YtXzs0qiixrokEfRbkvym8PSLh8','2023-07-12 08:14:58','2023-07-12 08:14:58'),(6,17,'native','$argon2id$v=19$m=65536,t=3,p=4$cBS/xprzfSy6/WnYGUf8Ng$LHio5klGbTTrgPU5cTr7LqGHA73NoYl73O3+mwlw86A','2023-07-13 07:42:21','2023-07-13 07:42:21');
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

-- Dump completed on 2023-07-17 14:10:19
