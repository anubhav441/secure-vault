import CryptoJS from 'crypto-js';

const deriveKey = (masterPassword: string, salt: string): string => {
  const iterations = 100000;
  const keySize = 256 / 32;
  const key = CryptoJS.PBKDF2(masterPassword, salt, {
    keySize: keySize,
    iterations: iterations,
    hasher: CryptoJS.algo.SHA256,
  });
  return key.toString(CryptoJS.enc.Hex);
};

export const encryptData = (data: object, masterPassword: string, salt: string): string => {
  const key = deriveKey(masterPassword, salt);
  const dataString = JSON.stringify(data);
  const iv = CryptoJS.lib.WordArray.random(128 / 8);
  const encrypted = CryptoJS.AES.encrypt(dataString, CryptoJS.enc.Hex.parse(key), {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return iv.toString(CryptoJS.enc.Hex) + '::' + encrypted.toString();
};

export const decryptData = <T>(encryptedString: string, masterPassword: string, salt: string): T | null => {
  try {
    const key = deriveKey(masterPassword, salt);
    const parts = encryptedString.split('::');
    if (parts.length !== 2) throw new Error("Invalid encrypted data format.");

    const iv = CryptoJS.enc.Hex.parse(parts[0]);
    const ciphertext = parts[1];
    const bytes = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Hex.parse(key), {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedString) throw new Error("Decryption failed: resulted in empty string.");
    return JSON.parse(decryptedString) as T;
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};