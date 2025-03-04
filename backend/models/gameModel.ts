import pool from '../config/db';

export interface Game {
  id: number;
  userId: number;
  name: string;
  hours: number;
  percentComplete: number;
  datePurchased: Date | null;
  titleColour: string;
  headerColour: string;
}

export interface PartialGame {
  userId: number;
  name: string;
  hours: number;
  percentComplete: number;
  datePurchased: Date | null;
  titleColour: string;
  headerColour: string;
}

export interface UpdatedGame {
  id: number;
  name: string;
  hours: number;
  percentComplete: number;
  datePurchased: Date | null;
  titleColour: string;
  headerColour: string;
}

type CreateGameQueryReturn = { success: true; game: Game } | { success: false; error: string };

function mapGameToCamelCase(game: any): Game {
  return {
    id: game.id,
    userId: game.user_id,
    name: game.name,
    hours: game.hours,
    percentComplete: game.percent_complete,
    datePurchased: game.date_purchased,
    titleColour: game.title_colour,
    headerColour: game.header_colour
  };
}

export async function postGame(game: PartialGame): Promise<CreateGameQueryReturn> {
  console.log("Executing postGame query...");

  console.log({game})
  
  try {
    const result = await pool.query(
      'INSERT INTO games (user_id, name, hours, percent_complete, date_purchased, title_colour, header_colour) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [game.userId, game.name, game.hours, game.percentComplete, game.datePurchased, game.titleColour, game.headerColour]
    );

    if (result.rows.length > 0) {
      const game = mapGameToCamelCase(result.rows[0]);
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

type UpdateGameQueryReturn = { success: true; game: Game } | { success: false; error: string };

export async function patchGame(updatedGame: UpdatedGame): Promise<UpdateGameQueryReturn> {
  console.log("Executing patchGame query...");

  console.log({updatedGame})
  try {
    const result = await pool.query(
      'UPDATE games SET name=$1, hours=$2, percent_complete=$3, date_purchased=$4, title_colour=$5, header_colour=$6 WHERE id=$7 RETURNING *',
      [updatedGame.name, updatedGame.hours, updatedGame.percentComplete, updatedGame.datePurchased, updatedGame.titleColour, updatedGame.headerColour, updatedGame.id]
    );

    if (result.rows.length > 0) {
      const game = mapGameToCamelCase(result.rows[0]);
      console.log(`-> Query SUCCESS: updated entity with ID (${game.id}).`);
      return { success: true, game };
    } else {
      console.error(`-> Query FAIL: could not update game.`);
      return { success: false, error: `Could not update game.` };
    }
  } catch(err) {
    console.error(`-> Query ERROR:`, err);
    return { success: false, error: `Database error from update query: ${err}` };
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
      'SELECT * FROM games WHERE user_id = $1;', 
      [userId]
    );

    if (result.rows.length > 0) {
      const games = result.rows.map(mapGameToCamelCase);
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