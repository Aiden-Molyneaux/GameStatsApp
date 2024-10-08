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

type CreateGameQueryReturn = { success: true; game: Game } | { success: false; error: string };

export async function postGame(game: partialGame): Promise<CreateGameQueryReturn> {
  console.log("Executing postGame query...");

  try {
    const result = await pool.query(
      'INSERT INTO games ("userId", name, hours, "datePurchased") VALUES ($1, $2, $3, $4) RETURNING *',
      [game.userId, game.name, game.hours, game.datePurchased]
    );

    if (result.rows.length > 0) {
      const game = result.rows[0];
      console.log(`-> Query SUCCESS: created entity with ID (${game.id}).`);
      return { success: true, game };
    } else {
      console.error(`-> Query FAIL: could not create game.`);
      return { success: false, error: `Could not create game.` };
    }
  } catch(err) {
    console.error(`-> Query ERROR:`, err);
    return { success: false, error: `Database error from create query: ${err}` };
  }
};

type DeleteGameQueryReturn = { success: true; deletedGameId: number } | { success: false; error: string };

export async function deleteGame(gameId: number): Promise<DeleteGameQueryReturn> {
  console.log(`Executing deleteGame query on entity with ID (${gameId})...`);
  try {
    const result = await pool.query(
      'DELETE FROM games WHERE id = $1 RETURNING id',
      [gameId]
    );

    if (result.rows.length > 0) {
      const deletedGameId = result.rows[0].id;
      console.log(`-> Query SUCCESS: deleted entity with ID (${deletedGameId}).`);
      return { success: true, deletedGameId };
    } else {
      console.log(`-> Query FAIL: no game found with the given ID (${gameId}).`);
      return { success: false, error: `No game found with the given ID (${gameId}).` };
    }
  } catch (err) {
    console.error("-> Query ERROR:", err);
    return { success: false, error: `Database error from delete query with game with ID (${gameId}): ${err}` };
  }
};

type GetGamesByUserQueryReturn = { success: true; games: Game[] } | { success: false; error: string };

export async function getGamesByUser(userId: number): Promise<GetGamesByUserQueryReturn> {
  console.log("Executing getUsersGames query...");

  try {
    const result = await pool.query(
      'SELECT * FROM games WHERE "userId" = $1;', 
      [userId]
    );

    if (result.rows.length > 0) {
      const games = result.rows;
      console.log(`-> Query SUCCESS: fetched games for user with given ID ${userId}`);
      return { success: true, games };
    } else {
      console.log(`-> Query SUCCESS: no games found for the user with given ID (${userId}).`);
      return { success: true, games: [] };
    }
  } catch (err) {
    console.error("-> Query ERROR:", err);
    return { success: false, error: `Database error from get games by user query with user ID (${userId}): ${err}` };
  }
};