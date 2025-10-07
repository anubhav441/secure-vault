import mongoose from 'mongoose';

const vaultItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  encryptedData: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const VaultItem = mongoose.model('VaultItem', vaultItemSchema);
export default VaultItem;