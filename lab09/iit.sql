-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 06, 2025 at 11:57 PM
-- Server version: 10.11.13-MariaDB-0ubuntu0.24.04.1
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `iit`
--

-- --------------------------------------------------------

--
-- Table structure for table `actors`
--

CREATE TABLE `actors` (
  `actorid` int(10) UNSIGNED NOT NULL,
  `first_names` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `dob` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `actors`
--

INSERT INTO `actors` (`actorid`, `first_names`, `last_name`, `dob`) VALUES
(1, 'Robert', 'Downey Jr', '1965-04-04'),
(2, 'Joe', 'Keery', '1992-04-24'),
(3, 'Morgan', 'Freeman', '1937-06-01'),
(4, 'Harrison', 'Ford', '1942-07-13'),
(5, 'J.K.', 'Simmons', '1955-01-09');

-- --------------------------------------------------------

--
-- Table structure for table `actors-movies`
--

CREATE TABLE `actors-movies` (
  `actorid` varchar(100) NOT NULL,
  `movieid` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `actors-movies`
--

INSERT INTO `actors-movies` (`actorid`, `movieid`) VALUES
('Joe Keery', 'Free Guy 2021'),
('Robert Downey Jr', 'Oppenheimer 2023'),
('Morgan Freeman', 'The Lego Movie 2014'),
('Harrison Ford', 'Star Wars Episode IV - A New Hope 1977'),
('J. K. Simmons', 'Zootopia 2016');

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `movieid` int(10) UNSIGNED NOT NULL,
  `title` varchar(100) NOT NULL,
  `year` char(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`movieid`, `title`, `year`) VALUES
(1, 'Elizabeth', '1998'),
(2, 'Black Widow', '2021'),
(3, 'Oh Brother Where Art Thou?', '2000'),
(4, 'The Lord of the Rings: The Fellowship of the Ring', '2001'),
(5, 'Up in the Air', '2009');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actors`
--
ALTER TABLE `actors`
  ADD PRIMARY KEY (`actorid`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`movieid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actors`
--
ALTER TABLE `actors`
  MODIFY `actorid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `movieid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
