-- create the tables for our movies
CREATE TABLE `movies` (
   `movieid` int(10) unsigned NOT NULL AUTO_INCREMENT,
   `title` varchar(100) NOT NULL,
   `year` char(4) DEFAULT NULL,
   PRIMARY KEY (`movieid`)
);
-- insert data into the tables
INSERT INTO movies
VALUES (1, "Elizabeth", "1998"),
   (2, "Black Widow", "2021"),
   (3, "Oh Brother Where Art Thou?", "2000"),
   (
      4,
      "The Lord of the Rings: The Fellowship of the Ring",
      "2001"
   ),
   (5, "Up in the Air", "2009");

CREATE TABLE 'actors' (
   'actorid' int(10) unsigned NOT NULL AUTO_INCREMENT,
   'firstNames' varchar(100) NOT NULL,
   'lastName' varchar(100) NOT NULL,
   'dob' char(10) DEFAULT NULL,
   PRIMARY KEY ('actorid')
);

INSERT INTO movies
VALUES (1, "Robert", "Downey Jr", "1965-04-04"),
(2, "Joe", "Keery", "1992-04-24"),
(3, "Morgan", "Freeman", "1937-06-01"),
(4, "Harrison", "Ford", "1942-07-13"),
(5, "J.K.", "Simmons", "1955-01-09");