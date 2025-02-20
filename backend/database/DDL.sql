CREATE TABLE users (
	id 			          SERIAL PRIMARY KEY,
	username 	        VARCHAR(20) UNIQUE NOT NULL,
	password_digest 	        VARCHAR(60) UNIQUE NOT NULL,
	email 		        VARCHAR(30) UNIQUE,
	favourite_game		  VARCHAR(60),
  	preferred_platform VARCHAR(30),
  	number_of_games     INT
);

CREATE TABLE games (
	id			SERIAL PRIMARY KEY,
	user_id		INT,
	name		VARCHAR(60) NOT NULL,
  hours   INT,
	date_purchased 	DATE,
	title_colour VARCHAR(16),
	header_colour VARCHAR(16),
	FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE gamertags (
	id				SERIAL PRIMARY KEY,
	user_id		INT,
	tag		VARCHAR(20) NOT NULL,
	platform	VARCHAR(30) NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);
