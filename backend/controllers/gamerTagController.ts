import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware'; 
import { postGamerTag, patchGamerTag, deleteGamerTag, getGamerTagsByUser } from '../models/gamerTagModel';

export async function handleFetchGamerTagsByUser(req: AuthRequest, res: Response) {
  console.log('Handling request to fetch gamertags by user...');

  if (!req.user || !req.user.id) {
    res.status(401).json({ error: 'User authorization error' });
    return;
  }
  const userId = req.user.id;

  try {
    const response = await getGamerTagsByUser(userId);

    if (response.success) {
      const gamerTags = response.gamerTags;
      return res.status(200).json({ gamerTags });
    }
      
  } catch (err) {
    return res.status(500).json({ error: `Backend server error while fetching gamertags by user: ${err}` });
  }
};

export async function handleCreateGamerTag(req: AuthRequest, res: Response) {
  console.log('Handling request to create gamertag...');
  const { tag, platform } = req.body.newGamerTag;

  if (!req.user || !req.user.id) {
    res.status(401).json({ error: 'User authorization error' });
    return;
  }
  const userId = req.user.id;

  try {
    const response = await postGamerTag({ userId, tag, platform: platform });

    if (response.success) {
      return res.status(200).json({ gamerTag: response.gamerTag });
    } {
      return res.status(400).json({ error: `Could not create gamertag.`});
    }
  } catch(err) {
    return res.status(500).json({ error: `Backend server error while creating gamertag: ${err}` });
  }
};

export async function handleUpdateGamerTag(req: AuthRequest, res: Response) {
  console.log('Handling request to update gamertag...');
  const { id, tag, platform } = req.body;

  if (!req.user || !req.user.id) {
    res.status(401).json({ error: 'User authorization error' });
    return;
  }

  try {
    const response = await patchGamerTag({ id, tag, platform });

    if (response.success) {
      return res.status(200).json({ gamertag: response.gamerTag });
    } {
      return res.status(400).json({ error: `Could not update gamertag.`});
    }
  } catch(err) {
    return res.status(500).json({ error: `Backend server error while updating gamertag: ${err}` });
  }
};

export async function handleDeleteGamerTag(req: Request, res: Response) {
  console.log('Handling request to delete gamertag...');

  const gamerTagId = Number(req.query.gamerTagId);

  try {
    const response = await deleteGamerTag(gamerTagId);

    if (response.success) {
      return res.status(200).json({ deletedGamerTagId: response.deletedGamerTagId });
    } {
      return res.status(404).json({ error: `GamerTag Entity with ID (${gamerTagId}) not found.`});
    }
  } catch (err) {
    return res.status(500).json({ error: `Backend server error while deleting gamertag: ${err}` });
  }
};