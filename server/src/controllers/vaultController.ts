import { Response } from 'express';
import VaultItem from '../models/VaultItem';
import { AuthRequest } from '../middleware/auth';

export const getVaultItems = async (req: AuthRequest, res: Response) => {
  const items = await VaultItem.find({ user: req.user?.id });
  res.json(items);
};

export const addVaultItem = async (req: AuthRequest, res: Response) => {
  const { encryptedData } = req.body;
  const newItem = new VaultItem({
    user: req.user?.id,
    encryptedData,
  });
  const createdItem = await newItem.save();
  res.status(201).json(createdItem);
};

export const updateVaultItem = async (req: AuthRequest, res: Response) => {
    const { encryptedData } = req.body;
    const item = await VaultItem.findById(req.params.id);

    if (item && item.user.toString() === req.user?.id) {
        item.encryptedData = encryptedData || item.encryptedData;
        const updatedItem = await item.save();
        res.json(updatedItem);
    } else {
        res.status(404).json({ message: 'Item not found or user not authorized' });
    }
};

export const deleteVaultItem = async (req: AuthRequest, res: Response) => {
    const item = await VaultItem.findById(req.params.id);

    if (item && item.user.toString() === req.user?.id) {
        await item.deleteOne();
        res.json({ message: 'Item removed' });
    } else {
        res.status(404).json({ message: 'Item not found or user not authorized' });
    }
};