-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Creato il: Set 05, 2016 alle 20:43
-- Versione del server: 5.5.42
-- Versione PHP: 7.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `funnyobjects`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `funny_objects`
--

CREATE TABLE `funny_objects` (
  `fob_id` int(11) NOT NULL,
  `fob_des` varchar(255) NOT NULL,
  `fob_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fob_disabled` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `funny_objects`
--

INSERT INTO `funny_objects` (`fob_id`, `fob_des`, `fob_created`, `fob_disabled`) VALUES
(1, 'TEST - Circuito LED', '2016-08-12 07:35:00', 0),
(2, 'circuito 1', '2016-08-23 07:09:38', 0),
(3, 'circuito 2', '2016-08-23 07:09:45', 0),
(4, 'circuito 3', '2016-08-23 07:09:54', 0),
(5, 'circuito 4', '2016-08-23 07:10:03', 0),
(6, 'circuito 5', '2016-08-23 07:10:11', 0),
(7, 'circuito 6', '2016-08-23 07:10:19', 0),
(8, 'circuito 7', '2016-08-23 07:10:27', 0),
(9, 'circuito 8', '2016-08-23 07:10:36', 0),
(10, 'circuito 9', '2016-08-23 07:10:46', 0),
(11, 'circuito 10', '2016-08-23 07:10:56', 0),
(12, 'circuito 11', '2016-08-23 07:11:37', 0),
(13, 'circuito 12', '2016-08-23 07:11:47', 0),
(14, 'circuito 13', '2016-08-23 07:11:59', 0),
(15, 'circuito 14', '2016-08-23 13:49:57', 0),
(16, 'circuito 15', '2016-08-23 13:51:10', 0),
(17, 'demo 16', '2016-08-23 13:51:16', 0),
(18, 'demo 17', '2016-08-23 13:51:21', 0),
(19, 'demo 18', '2016-08-23 13:51:27', 0),
(20, 'demo 19', '2016-08-23 13:51:33', 0),
(21, 'demo 20', '2016-08-23 13:51:39', 0),
(22, 'demo 21', '2016-08-24 07:32:39', 0),
(23, 'demo 22', '2016-08-24 08:12:28', 0),
(24, 'demo 23', '2016-08-24 08:12:42', 0),
(27, 'demo 24', '2016-08-24 14:17:29', 0),
(28, 'demo 25', '2016-08-24 14:19:32', 0),
(29, 'demo 26', '2016-08-24 14:21:01', 0),
(30, 'demo 27', '2016-08-26 14:47:23', 0),
(31, 'demo 28', '2016-08-26 14:50:15', 0),
(32, 'demo 29', '2016-08-26 14:52:41', 0),
(33, 'demo 30', '2016-08-26 14:52:55', 0),
(34, 'demo 31', '2016-08-26 14:55:46', 0),
(35, 'demo 32', '2016-08-26 14:56:33', 0),
(36, 'demo 33', '2016-08-26 14:58:10', 0),
(37, 'demo 34', '2016-08-26 15:05:25', 0);

--
-- Trigger `funny_objects`
--
DELIMITER $$
CREATE TRIGGER `trigger_funny_objects_on_insert` BEFORE INSERT ON `funny_objects`
 FOR EACH ROW SET NEW.fob_created = IFNULL(NEW.fob_created, NOW())
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struttura della tabella `funny_objects_io`
--

CREATE TABLE `funny_objects_io` (
  `fio_id` int(11) NOT NULL,
  `fob_id` int(11) NOT NULL,
  `fio_des` varchar(255) NOT NULL,
  `fio_direction` varchar(3) NOT NULL DEFAULT 'out' COMMENT 'in|out',
  `fio_send_type` varchar(3) NOT NULL DEFAULT 'cmd' COMMENT 'cmd|val',
  `fio_send_cmd` varchar(255) NOT NULL,
  `fio_send_vmin` int(11) NOT NULL DEFAULT '0',
  `fio_send_vmax` int(11) NOT NULL DEFAULT '0',
  `fio_recv_freq_polling` int(11) NOT NULL DEFAULT '0',
  `fio_disabled` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `funny_objects_io`
--

INSERT INTO `funny_objects_io` (`fio_id`, `fob_id`, `fio_des`, `fio_direction`, `fio_send_type`, `fio_send_cmd`, `fio_send_vmin`, `fio_send_vmax`, `fio_recv_freq_polling`, `fio_disabled`) VALUES
(1, 1, 'Interruttore', 'out', 'cmd', 'XXYYZZ', 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `settings`
--

CREATE TABLE `settings` (
  `set_id` int(11) NOT NULL,
  `set_gateway_host` varchar(255) NOT NULL,
  `set_gateway_port` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `settings`
--

INSERT INTO `settings` (`set_id`, `set_gateway_host`, `set_gateway_port`) VALUES
(1, '127.0.0.1', 8080);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `funny_objects`
--
ALTER TABLE `funny_objects`
  ADD PRIMARY KEY (`fob_id`);

--
-- Indici per le tabelle `funny_objects_io`
--
ALTER TABLE `funny_objects_io`
  ADD PRIMARY KEY (`fio_id`);

--
-- Indici per le tabelle `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`set_id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `funny_objects`
--
ALTER TABLE `funny_objects`
  MODIFY `fob_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=38;
--
-- AUTO_INCREMENT per la tabella `funny_objects_io`
--
ALTER TABLE `funny_objects_io`
  MODIFY `fio_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT per la tabella `settings`
--
ALTER TABLE `settings`
  MODIFY `set_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
