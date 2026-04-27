-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 27, 2026 at 08:52 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `viter_ftcd-v1`
--

-- --------------------------------------------------------

--
-- Table structure for table `donor_list`
--

CREATE TABLE `donor_list` (
  `donor_aid` int(11) NOT NULL,
  `donor_is_active` tinyint(1) NOT NULL,
  `donor_first_name` varchar(255) NOT NULL,
  `donor_middle_name` varchar(255) NOT NULL,
  `donor_last_name` varchar(255) NOT NULL,
  `donor_email` varchar(255) NOT NULL,
  `donor_stripe` int(11) NOT NULL,
  `donor_created` datetime NOT NULL,
  `donor_updated` datetime NOT NULL,
  `donor_contact` varchar(50) NOT NULL,
  `donor_address` text NOT NULL,
  `donor_city` varchar(100) NOT NULL,
  `donor_state` varchar(100) NOT NULL,
  `donor_country` varchar(100) NOT NULL,
  `donor_zip` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donor_list`
--

INSERT INTO `donor_list` (`donor_aid`, `donor_is_active`, `donor_first_name`, `donor_middle_name`, `donor_last_name`, `donor_email`, `donor_stripe`, `donor_created`, `donor_updated`, `donor_contact`, `donor_address`, `donor_city`, `donor_state`, `donor_country`, `donor_zip`) VALUES
(1, 1, 'das', '', '', 'asd@asd', 0, '2026-04-27 13:37:20', '2026-04-27 13:37:20', '2132131', 'asdadsa', 'asd', 'asd', 'ads', 'asddsasa'),
(2, 0, 'adsas', '', '', 'asadasd@asdsa', 0, '2026-04-27 13:38:37', '2026-04-27 13:38:37', 'asd', 'as', 'asd', 'asd', 'asd', 'asd'),
(3, 1, 'asd', '', '', 'asd@asd', 0, '2026-04-27 13:50:22', '2026-04-27 13:50:22', 'asd', 'asd', 'asd', 'ads', 'ads', 'asd');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `donor_list`
--
ALTER TABLE `donor_list`
  ADD PRIMARY KEY (`donor_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `donor_list`
--
ALTER TABLE `donor_list`
  MODIFY `donor_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
