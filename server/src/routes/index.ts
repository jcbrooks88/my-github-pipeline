import type { Request, Response } from 'express';
import express from 'express';
const router = express.Router();

import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import apiRoutes from './api/index.js';

router.use('/api', apiRoutes);

// ✅ Fix: Only serve React frontend for non-API requests
router.use((req: Request, res: Response) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  return res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
});

export default router;
