import pool from '../config/db';

interface partialGame {
  userId: number;
  name: string;
  hours: number | null;
  datePurchased: Date | null;
}

interface Game {
  id: number;
  userId: number;
  name: string;
  hours: number | null;
  datePurchased: Date | null;
}

export async function postGame(game: partialGame): Promise<Game> {
  console.log("Executing postGame query...");
  const result = await pool.query(
    'INSERT INTO games ("userId", name, hours, "datePurchased") VALUES ($1, $2, $3, $4) RETURNING *',
    [game.userId, game.name, game.hours, game.datePurchased]
  );

  console.log("Query executed successfully:");

  return result.rows[0] as Game;
};

export async function getGamesByUser(userId: number): Promise<Game[] | null> {
  try {
    console.log("Executing getUsersGames query...");
    const result = await pool.query(
      'SELECT * FROM games WHERE "userId" = $1;', 
      [userId]
    );

    console.log("Query executed successfully:");
    return result.rows ? (result.rows as Game[]) : null;
  } catch (err) {
    console.error("Error executing query:", err);
    throw err;
  }
};