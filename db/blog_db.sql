-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 03, 2022 at 07:48 AM
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
-- Database: `blog_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth_user`
--

CREATE TABLE `auth_user` (
  `id_user` int(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `auth_user`
--

INSERT INTO `auth_user` (`id_user`, `username`, `password`, `created_at`, `updated_at`) VALUES
(17, 'test1', '$2b$10$Ghu7IvUqogAzWBCn5gozLOjQX66BYReEQQgzXkNBzmwfiwJRfKcnS', '2022-09-02 13:03:08', '2022-09-02 13:03:08'),
(18, 'test2', '$2b$10$1Jqeicsk6stukk0dzsZ3YOenzoHaEoyuTRrxMUxuQnuTjHRRAwg4S', '2022-09-02 13:11:34', '2022-09-02 13:11:34'),
(21, 'test5', '$2b$10$60WeKyT4Pv3ctWO2Q0IpDuCYs5R2H3biZL0S6gOeN5TGBTGWyVbNO', '2022-09-03 03:54:44', '2022-09-03 03:54:44'),
(22, 'eko2', '$2b$10$.4kPm1njGZ0trs5DynIZnOIOrhxzG0FId6zgBtEVCY5b1N9QTr0Cq', '2022-09-03 05:04:49', '2022-09-03 05:43:12'),
(23, 'test3', '$2b$10$fXBFyeVwnyyWj9zQOru4Ku2jQgzX.vqSFNKGSi6OmPB9jbSuyXMlq', '2022-09-03 05:11:59', '2022-09-03 05:12:35'),
(25, 'eko1', '$2b$10$fEs5QIRAavjDvWmsH4DO.usZKyGcpQq4P8B8ApRfF/BaROoa.ILA2', '2022-09-03 05:31:00', '2022-09-03 05:42:20');

-- --------------------------------------------------------

--
-- Table structure for table `d_article`
--

CREATE TABLE `d_article` (
  `id_article` int(255) NOT NULL,
  `id_user` int(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `d_article`
--

INSERT INTO `d_article` (`id_article`, `id_user`, `title`, `content`, `created_at`, `updated_at`) VALUES
(2, 22, 'test2', 'test1', '2022-09-03 05:16:16', '2022-09-03 05:18:08'),
(3, 22, 'test1', 'test1', '2022-09-03 05:19:24', '2022-09-03 05:19:24');

-- --------------------------------------------------------

--
-- Table structure for table `d_comment`
--

CREATE TABLE `d_comment` (
  `id_comment` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_article` int(11) NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `d_comment`
--

INSERT INTO `d_comment` (`id_comment`, `id_user`, `id_article`, `comment`, `created_at`, `updated_at`) VALUES
(2, 22, 1, 'comment test', '2022-09-03 05:22:37', '2022-09-03 05:22:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id_user`);

--
-- Indexes for table `d_article`
--
ALTER TABLE `d_article`
  ADD PRIMARY KEY (`id_article`);

--
-- Indexes for table `d_comment`
--
ALTER TABLE `d_comment`
  ADD PRIMARY KEY (`id_comment`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id_user` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `d_article`
--
ALTER TABLE `d_article`
  MODIFY `id_article` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `d_comment`
--
ALTER TABLE `d_comment`
  MODIFY `id_comment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
