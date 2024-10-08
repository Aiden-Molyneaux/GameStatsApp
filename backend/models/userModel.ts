import pool from '../config/db';

interface User {
  id: number;
  username: string;
  password: string;
  email: string | null;
  favouriteGame: string | null;
  preferredPlatform: string | null;
  numberOfGames: number | null;
}

type PostUserQueryReturn = { success: true; user: User } | { success: false; error: string };

export async function postUser(username: string, hashedPassword: string): Promise<PostUserQueryReturn> {
  console.log("Executing postUser query...");

  try {
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      console.log(`-> Query SUCCESS: created user with id ${user.id}.`);
      return { success: true, user } 
    } else {
      console.log(`-> Query FAILURE: could not create user.`)
      return { success: false, error: `Could not create user.`}
    }
  } catch (err) {
    console.error("-> Query ERROR:", err);
    return { success: false, error: `Database error from postUser query: ${err}` };
  }
};

type FindUserByUsernameQueryReturn = { success: true; existingUser: User } | { success: false; error: string };

export async function findUserByUsername(username: string): Promise<FindUserByUsernameQueryReturn> {
  console.log("Executing findUserByUsername query...");
  
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1', 
      [username]
    );

    if (result.rows.length > 0) {
      console.log(`-> Query SUCCESS: found user with given username.`);
      return { success: true, existingUser: result.rows[0]}
    } else {
      console.log(`-> Query FAILURE: no user found with given username '${username}'.`)
      return { success: false, error: `No user found with given username '${username}'.`}
    }
  } catch (err) {
    console.error("-> Query ERROR:", err);
    return { success: false, error: `Database error from findUserByUsername query with username (${username}): ${err}` };
  }
};