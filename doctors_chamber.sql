-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 18, 2022 at 05:21 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `doctors_chamber`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `adminID` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`adminID`, `email`, `password`) VALUES
(1, 'admin@gmail.com', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `doctorID` int(11) NOT NULL,
  `doctor_name` varchar(255) NOT NULL,
  `doctor_designation` varchar(255) NOT NULL,
  `doctor_phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`doctorID`, `doctor_name`, `doctor_designation`, `doctor_phone`, `password`) VALUES
(1, 'Mizanur Remon', 'Psychiatrist', '01708014216', '789456'),
(2, 'Bellal Hossain', 'Gynecologist', '01535166953', '123456'),
(3, 'SM Kibria Ahmed', 'Eye Specialist', '01321212121', '123456'),
(4, 'Hgjs', '+101535166352', '+101535166352', '123456'),
(5, 'Ishtiak', 'Orthopedics', '01713545454', 'ish123456');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `patientID` int(11) NOT NULL,
  `patient_name` varchar(255) NOT NULL,
  `patient_phone` varchar(255) NOT NULL,
  `patient_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`patientID`, `patient_name`, `patient_phone`, `patient_password`) VALUES
(1, 'Abu Saleh', '01535166352', '112244'),
(2, 'Hugo Boss', '015351663521', '112233'),
(3, 'আবুল হায়াত', '01535166350', '112211');

-- --------------------------------------------------------

--
-- Table structure for table `prescription`
--

CREATE TABLE `prescription` (
  `prescriptionID` int(11) NOT NULL,
  `serialID` int(11) NOT NULL,
  `doctorID` int(11) NOT NULL,
  `patientID` int(11) NOT NULL,
  `medicine` varchar(255) NOT NULL,
  `days` varchar(255) NOT NULL,
  `rules` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prescription`
--

INSERT INTO `prescription` (`prescriptionID`, `serialID`, `doctorID`, `patientID`, `medicine`, `days`, `rules`) VALUES
(1, 3, 1, 1, 'Napa', '7', 'সকাল: ১ টা, রাতে ১ টা'),
(2, 3, 1, 1, 'Dextrim', '5', 'সকাল: 5 ml'),
(3, 4, 1, 1, 'Napa', '45', 'সকালে ১টা রাতে ১টা'),
(4, 4, 1, 1, 'Dyclofane', '70', 'সকালে ১টা রাতে ১টা'),
(5, 7, 1, 3, 'Ace Plus', '3', 'রাতে ১টা'),
(6, 1, 2, 1, 'Avomin', '2', 'রাতে ১টা'),
(7, 5, 2, 3, 'Revotril', '10', 'সকালে 1টা,রাতে ১টা'),
(8, 7, 1, 3, 'Alatrol', '7', 'রাতে ১টা'),
(9, 3, 1, 1, 'Glucose', '7', 'প্রতিদিন ১ গ্লাস');

-- --------------------------------------------------------

--
-- Table structure for table `serials`
--

CREATE TABLE `serials` (
  `serialID` int(11) NOT NULL,
  `doctorID` int(11) NOT NULL,
  `patientID` int(11) NOT NULL,
  `age` varchar(255) NOT NULL,
  `disease` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `serials`
--

INSERT INTO `serials` (`serialID`, `doctorID`, `patientID`, `age`, `disease`, `date`) VALUES
(1, 2, 1, '25', 'বমি', ''),
(2, 2, 1, '28', 'আমাশয়', ''),
(3, 1, 1, '21', 'Fever', '2022-05-18'),
(4, 1, 1, '20', 'Broken Hand', ''),
(5, 2, 3, '35', 'নিদ্রাহীনতা', ''),
(6, 2, 3, '30', 'উচ্চরক্তচাপ', ''),
(7, 1, 3, '35', 'এলার্জি', '2022-05-18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`adminID`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`doctorID`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`patientID`);

--
-- Indexes for table `prescription`
--
ALTER TABLE `prescription`
  ADD PRIMARY KEY (`prescriptionID`);

--
-- Indexes for table `serials`
--
ALTER TABLE `serials`
  ADD PRIMARY KEY (`serialID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `adminID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `doctorID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `patientID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `prescription`
--
ALTER TABLE `prescription`
  MODIFY `prescriptionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `serials`
--
ALTER TABLE `serials`
  MODIFY `serialID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
