CREATE DATABASE IF NOT EXISTS `solar_system_db`;
USE `solar_system_db`;

DROP TABLE IF EXISTS `planet`;

CREATE TABLE IF NOT EXISTS `planet` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `radius` VARCHAR(500) NOT NULL,
  `mass` VARCHAR(20) NOT NULL,
  `distanceFromSun` VARCHAR(50) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `users_id` INT,
  PRIMARY KEY (`id`)
);


INSERT INTO `planet`(name,radius
,mass,distanceFromSun,image)VALUES
('Terre','6 378 137 km','5 5972 RG','149M km','https://static.nationalgeographic.fr/files/styles/image_3200/public/02bluemarbleearth.ngsversion.1437508806487.jpg?w=1900&h=1900'),
('Lune','1 734 km','7 342 RG','150M km','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7zWYQiS_Db4RyUsfQBtxDLup45SlewdTTVw&usqp=CAU'),
('Mars','3 389 km','6 418 RG','228M km','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ_n5ffARsQ7Mm1EuwRH7KqiJEocgx9x8wYA&usqp=CAU'),
('Uranus','25 362 km','8 681 RG','2,800M km','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8Efp9-8ls7IGsBfdV2LldJ3nazrUIImOF1Q&usqp=CAU');


DROP TABLE IF EXISTS `users`;

CREATE TABLE IF NOT EXISTS users (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS admins (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);
