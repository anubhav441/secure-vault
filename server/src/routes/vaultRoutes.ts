import express from 'express';
import { getVaultItems, addVaultItem, updateVaultItem, deleteVaultItem } from '../controllers/vaultController';
import { protect } from '../middleware/auth';
const router = express.Router();

router.route('/').get(protect, getVaultItems).post(protect, addVaultItem);
router.route('/:id').put(protect, updateVaultItem).delete(protect, deleteVaultItem);

export default router;