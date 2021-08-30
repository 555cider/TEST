-- CREATE DATABASE IF NOT EXISTS `libraryservice` DEFAULT CHARACTER SET utf8;

DROP TABLE IF EXISTS auth;
DROP TABLE IF EXISTS book;
DROP TABLE IF EXISTS rental;
DROP TABLE IF EXISTS comment;

CREATE TABLE `auth` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `registered_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

CREATE TABLE `book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `publisher` text NOT NULL,
  `author` text NOT NULL,
  `published_date` date NOT NULL DEFAULT (curdate()),
  `pages` int NOT NULL,
  `isbn` bigint NOT NULL,
  `description` text,
  `link` text,
  `cover` text,
  `rating` decimal(2,1) DEFAULT '0.0',
  `shelved_date` date NOT NULL DEFAULT (curdate()),
  `rented` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

CREATE TABLE `rental` (
  `id` int NOT NULL AUTO_INCREMENT,
  `auth_id` int NOT NULL,
  `book_id` int NOT NULL,
  `rented_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `returned_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `auth_id` int NOT NULL,
  `book_isbn` int NOT NULL,
  `rating` int NOT NULL,
  `comment` text NOT NULL,
  `commented_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idrating_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;