-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 06, 2022 at 05:37 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `training`
--

-- --------------------------------------------------------

--
-- Table structure for table `advances`
--

CREATE TABLE `advances` (
  `id` bigint(20) NOT NULL,
  `date` date DEFAULT NULL,
  `employee_id` bigint(20) NOT NULL,
  `money` bigint(20) DEFAULT NULL,
  `status` int(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `advances`
--

INSERT INTO `advances` (`id`, `date`, `employee_id`, `money`, `status`) VALUES
(20, '2022-07-15', 12, 23, 0),
(18, '2022-07-06', 12, 12, 1);

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` bigint(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `age` int(11) NOT NULL,
  `day` date DEFAULT NULL,
  `full_name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `money` int(11) NOT NULL,
  `pass_word` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `team_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `address`, `age`, `day`, `full_name`, `image`, `money`, `pass_word`, `phone`, `role`, `sex`, `team_id`) VALUES
(1, 'Bạc Liêu', 22, '2022-05-10', 'Thành Lộc', NULL, 20, '202cb962ac59075b964b07152d234b70', '0941466330', 'R1', 'Male', 1),
(12, 'Bạc Liêu', 20, '2022-07-06', 'Khang Anh', 'cb03de0945164086ab82d2d8af85684a.png', 32, '202cb962ac59075b964b07152d234b70', '0941466331', 'R2', 'Male', 1),
(14, 'Cần Thơ', 34, '2022-07-19', 'Tuấn Khải', '1cfb750b7b7b4d128da52543b7528b64.jpg', 30, '202cb962ac59075b964b07152d234b70', '0941466332', 'R2', 'Other', 13);

-- --------------------------------------------------------

--
-- Table structure for table `hibernate_sequence`
--

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(21);

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`id`, `name`) VALUES
(1, 'Dev'),
(13, 'Test'),
(15, 'Design');

-- --------------------------------------------------------

--
-- Table structure for table `working`
--

CREATE TABLE `working` (
  `id` bigint(20) NOT NULL,
  `date` date DEFAULT NULL,
  `employee_id` bigint(20) NOT NULL,
  `hour` bigint(20) DEFAULT NULL,
  `status` int(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `working`
--

INSERT INTO `working` (`id`, `date`, `employee_id`, `hour`, `status`) VALUES
(19, '2022-07-15', 12, 8, 0),
(17, '2022-07-07', 12, 12, 1),
(16, '2022-07-07', 14, 12, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `advances`
--
ALTER TABLE `advances`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK73rtvp1r5x832f4s9rb3dnblq` (`team_id`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `working`
--
ALTER TABLE `working`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
