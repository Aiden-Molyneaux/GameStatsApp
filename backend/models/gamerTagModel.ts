import pool from '../config/db';

export interface PartialGamerTag {
    userId: number,
    tag: string, 
    platform: string
}

export interface GamerTag extends PartialGamerTag {
    id: number,
}

export interface UpdatedGamerTag {
    id: number,
    tag: string, 
    platform: string
}

// export interface PlatformData {
//   platform: string;
//   logo: React.JSX.Element;
// }


type CreateGamerTagQueryReturn = { success: true; gamerTag: GamerTag} | { success: false; error: string };

export async function postGamerTag(gamerTag: PartialGamerTag): Promise<CreateGamerTagQueryReturn> {
    console.log("Executing postGamerTag query...");

    console.log({gamerTag});
    try {
        const result = await pool.query(
            'INSERT INTO gamertags (user_id, tag, platform) VALUES ($1, $2, $3) RETURNING *',
            [gamerTag.userId, gamerTag.tag, gamerTag.platform]
        );

        if (result.rows.length > 0) {
            const gamerTag = result.rows[0];
            console.log(`-> Query SUCCESS: created gamerTag entity with ID (${gamerTag.id}).`);
            return { success: true, gamerTag };
          } else {
            console.error(`-> Query FAIL: could not create gamerTag.`);
            return { success: false, error: `Could not create gameTag.` };
          }

    } catch(err) {
        console.error(`-> Query ERROR:`, err);
        return { success: false, error: `Database error from create query: ${err}` };
    }
}

type UpdateGamerTagQueryReturn = { success: true; gamerTag: GamerTag} | { success: false; error: string };

export async function patchGamerTag(gamerTag: UpdatedGamerTag): Promise<UpdateGamerTagQueryReturn> {
    console.log("Executing patchGamerTag query...");

    try {
        const result = await pool.query(
            'UPDATE gamertags SET tag=$1, platform=$2 WHERE id=$3 RETURNING *',
            [gamerTag.tag, gamerTag.platform, gamerTag.id]
        );

        if (result.rows.length > 0) {
            const gamerTag = result.rows[0];
            console.log(`-> Query SUCCESS: updated gamerTag entity with ID (${gamerTag.id}).`);
            return { success: true, gamerTag };
          } else {
            console.error(`-> Query FAIL: could not update gamerTag.`);
            return { success: false, error: `Could not update gameTag.` };
          }

    } catch(err) {
        console.error(`-> Query ERROR:`, err);
        return { success: false, error: `Database error from update query: ${err}` };
    }
}

type DeleteGamerTagQueryReturn = { success: true; deletedGamerTagId: number} | { success: false; error: string };

export async function deleteGamerTag(gamerTagId: number): Promise<DeleteGamerTagQueryReturn> {
    console.log(`Executing deleteGamerTag query on entity with ID (${gamerTagId})...`);

    try {
        const result = await pool.query(
            'DELETE FROM gamertags WHERE id=$1 RETURNING id',
            [gamerTagId]
        );

        if (result.rows.length > 0) {
            const deletedGamerTagId = result.rows[0];
            console.log(`-> Query SUCCESS: deleted gamerTag entity with ID (${deletedGamerTagId.id}).`);
            return { success: true, deletedGamerTagId };
          } else {
            console.error(`-> Query FAIL: no gamerTag found with given ID (${gamerTagId}).`);
            return { success: false, error: `No gamerTag found with given ID (${gamerTagId}).` };
          }

    } catch(err) {
        console.error(`-> Query ERROR:`, err);
        return { success: false, error: `Database error from delete query with gamerTagId (${gamerTagId}): ${err}` };
    }
}

type GetGamerTagsByUserQueryReturn = { success: true; gamerTags: GamerTag[] } | { success: false; error: string };

export async function getGamerTagsByUser(userId: number): Promise<GetGamerTagsByUserQueryReturn> {
    console.log("Executing getUsersGamerTags query...");
  
    try {
      const result = await pool.query(
        'SELECT * FROM gamertags WHERE user_id = $1;', 
        [userId]
      );
  
      if (result.rows.length > 0) {
        const gamerTags = result.rows;
        console.log(`-> Query SUCCESS: fetched gamerTags for user with given ID ${userId}`);
        return { success: true, gamerTags };
      } else {
        console.log(`-> Query SUCCESS: no gamerTags found for the user with given ID (${userId}).`);
        return { success: true, gamerTags: [] };
      }
    } catch (err) {
      console.error("-> Query ERROR:", err);
      return { success: false, error: `Database error from get gamerTags by user query with user ID (${userId}): ${err}` };
    }
  };