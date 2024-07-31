import pool from '../config/db';

interface User {
  id: number;
  username: string;
  password: string;
  email: string | null;
  favouritegame: string | null;
  preferredplatform: string | null;
  numberofgames: number | null;
}

export async function createUser(username: string, hashedPassword: string): Promise<User> {
  console.log("Executing createUser query...");
  const result = await pool.query(
    'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
    [username, hashedPassword]
  );

  console.log("Query executed successfully:");
  return result.rows[0] as User;
};

export async function findUserByUsername(username: string): Promise<User | null> {
  try {
    console.log("Executing findUserByUsername query...");
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1', 
      [username]
    );

    console.log("Query executed successfully:");
    return result.rows[0] ? (result.rows[0] as User) : null;
  } catch (err) {
    console.error("Error executing query:", err);
    throw err;
  }
};