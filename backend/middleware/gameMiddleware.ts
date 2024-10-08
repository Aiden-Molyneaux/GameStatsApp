import { Request, Response, NextFunction } from 'express';

export function validateGameId(req: Request, res: Response, next: NextFunction) {
  const gameId = req.query.gameId as string | undefined;

  if (!gameId) {
    console.log(`-> HANDLE FAILURE: game ID is required.`)
    return res.status(400).json({ error: `Game ID is required.` });
  }

  const parsedGameId = Number(gameId);

  if (isNaN(parsedGameId)) {
    console.log(`-> HANDLE FAILURE: invalid game ID (${typeof parsedGameId} ${parsedGameId}).`)
    return res.status(400).json({ error: `Invalid Game ID (${typeof parsedGameId} ${parsedGameId}).` });
  }

  next();
}