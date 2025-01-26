CREATE TABLE users (
	id 			          SERIAL PRIMARY KEY,
	username 	        VARCHAR(20) UNIQUE NOT NULL,
	password 	        VARCHAR(60) UNIQUE NOT NULL,
	email 		        VARCHAR(30) UNIQUE,
	favouriteGame		  VARCHAR(60),
  preferredPlatform VARCHAR(30),
  numberOfGames     INT
);

CREATE TABLE games (
	id			SERIAL PRIMARY KEY,
	userId		INT,
	name		VARCHAR(60) NOT NULL,
  hours   INT,
	datePurchased 	DATE,
	titleColour VARCHAR(16),
	headerColour VARCHAR(16),
	FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE gamertags (
	id				SERIAL PRIMARY KEY,
	userId		INT,
	tag		VARCHAR(20) NOT NULL,
	platform	VARCHAR(30) NOT NULL,
	FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
);