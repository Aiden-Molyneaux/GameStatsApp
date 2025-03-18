import pool from '../config/db';
import { GamerTag } from './gamerTagModel';

export interface User {
  id: number;
  username: string;
  passwordDigest: string;
  email: string | null;
  favouriteGame: string | null;
  preferredPlatform: string | null;
  numberOfGames: number | null;
}

export interface UpdatedUser {
  id: number;
  username: string;
  favouriteGame: string | null;
}

export type ModelError = {
  code: string;
  message: string;
  details?: any;
};

type PostUserQueryReturn = { user: User } | { error: ModelError };

function mapUserToCamelCase(user: any): User {
  return {
    id: user.id,
    username: user.username,
    passwordDigest: user.password_digest,
    email: user.email,
    favouriteGame: user.favourite_game,
    preferredPlatform: user.preferred_platform,
    numberOfGames: user.number_of_games
  };
}

export async function postUser(username: string, hashedPassword: string): Promise<PostUserQueryReturn> {
  console.log("Executing postUser query...");

  try {
    const result = await pool.query(
      'INSERT INTO users (username, "password_digest") VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
    );

    if (result.rows.length > 0) {
      const user = mapUserToCamelCase(result.rows[0]);

      console.log(`-> Query SUCCESS: created user with id ${user.id}.`);

      return { user }
    } else {
      console.log(`-> Query FAILURE: could not create user.`)

      return { 
        error: {
          code: 'USER_CREATION_FAILED',
          message: 'Could not create user'
        }
      }
    }
  } catch (err) {
    console.error("-> Query ERROR:", err);
    
    return {
      error: {
        code: 'DATABASE_ERROR',
        message: 'Database error during user creation'
      }
    };
  }
};

type UpdateUserQueryReturn = { success: true; user: User } | { success: false; error: string };

export async function patchUser(updatedUser: UpdatedUser): Promise<UpdateUserQueryReturn> {
  console.log("Executing patchUser query...");

  try {
    const result = await pool.query(
      'UPDATE users SET username=$1, favourite_game=$2 WHERE id=$3 RETURNING *',
      [updatedUser.username, updatedUser.favouriteGame, updatedUser.id]
    );

    if (result.rows.length > 0) {
      const user = mapUserToCamelCase(result.rows[0]);
      console.log(`-> Query SUCCESS: updated entity with ID (${user.id}).`);
      return { success: true, user };
    } else {
      console.error(`-> Query FAIL: could not update iser.`);
      return { success: false, error: `Could not update user.` };
    }
  } catch(err) {
    console.error(`-> Query ERROR:`, err);
    return { success: false, error: `Database error from update user query: ${err}` };
  }
};

type FindUserByUsernameQueryReturn = { user: User } | { error: ModelError };

export async function findUserByUsername(username: string): Promise<FindUserByUsernameQueryReturn> {
  console.log("Executing findUserByUsername query...");
  
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1', 
      [username]
    );

    if (result.rows.length > 0) {
      console.log(`-> Query SUCCESS: found user with given username (${username}).`);

      const user = mapUserToCamelCase(result.rows[0]);
      return { user }
    } else {
      console.log(`-> Query SUCCESS: no user found with given username (${username}).`);

      return { 
        error: {
          code: 'USER_NOT_FOUND',
          message: `No user found with given username (${username}).`
        }
      }
    }
  } catch (err) {
    console.error("-> Query ERROR:", err);
    return { 
      error: {
        code: 'DATABASE_ERROR',
        message: `Database error during user lookup`
      }
    };
  }
}