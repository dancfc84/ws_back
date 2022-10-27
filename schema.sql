CREATE DATABASE wildlife_app;
USE wildlife_app;


CREATE TABLE users (
    userID integer PRIMARY KEY AUTO_INCREMENT,
    nickname varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE species (
  speciesID integer PRIMARY KEY AUTO_INCREMENT,
  speciesName varchar(255) NOT NULL,
  commonName varchar(255) NOT NULL,
  genus varchar(255) NOT NULL,
  animalOrder varchar(255) NOT NULL,
  class varchar(255) NOT NULL,
  phylum varchar(255) NOT NULL,
  kingdom varchar(255) NOT NULL,
  preferredHabitat varchar(255),
  created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE records (

  recordID integer PRIMARY KEY AUTO_INCREMENT,
  speciesID integer,
  notes varchar(255),
  dateSighted DATE NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT NOW(),
  userID integer,
  abundance integer NOT NULL,
  sex varchar(255),
  lifeStage varchar(255),
  basisOfRecord varchar(255) NOT NULL,
  lat integer NOT NULL,
  lng integer NOT NULL,
  FOREIGN KEY (speciesID) REFERENCES species(speciesID),
  FOREIGN KEY (userID) REFERENCES users(userID)

);


INSERT INTO users (nickname, email)
VALUES 
('dancfc84', 'danwhittock2013@gmail.com');


INSERT INTO species (speciesName, commonName, genus, animalOrder, class, phylum, kingdom)
VALUES 
('Cyanistes caeruleus', 'Eurasian blue tit', 'Cyanistes', 'Passeriformes', 'Aves', '	Chordata', 'Animalia');


INSERT INTO records (speciesID, notes, dateSighted, userID, abundance, sex, lifeStage, basisOfRecord, lat, lng)
VALUES 
(1, 'Nesting', '2022-02-02', 1, 5, 'male',	'young', 'Human', 0.3333, 0.5454);


