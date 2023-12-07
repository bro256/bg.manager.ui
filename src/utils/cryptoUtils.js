import CryptoJS from "crypto-js";

  export const encryptPassword = (password, derivedKey) => {
    try {
      console.log("Encrypting password...");
  
      // Convert the derived key from hexadecimal to WordArray
      const key = CryptoJS.enc.Hex.parse(derivedKey);
  
      // Generate a random IV
      const iv = CryptoJS.lib.WordArray.random(16); // Increase IV length for GCM
  
      // Encrypt the password using AES-CBC
      const encrypted = CryptoJS.AES.encrypt(password, key, {
        iv: iv,
      });
  
      // Extract the ciphertext and IV
      const encryptedPassword = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
      const encryptionIv = iv.toString(CryptoJS.enc.Base64);
  
      console.log("Encrypted Password:", encryptedPassword);
      console.log("Encryption IV:", encryptionIv);
  
      return {
        encryptedPassword,
        encryptionIv,
      };
    } catch (error) {
      console.error("Error during encryption:", error);
      throw error;
    }
  };
  

  export const decryptPassword = (encryptedPassword, encryptionIv, derivedKey) => {
    try {
      console.log("Decrypting password...");
  
      // Convert the derived key from hexadecimal to WordArray
      const key = CryptoJS.enc.Hex.parse(derivedKey);
  
      // Convert IV from Base64 to WordArray
      const iv = CryptoJS.enc.Base64.parse(encryptionIv);
  
      // Decrypt the password using AES-CBC
      const decrypted = CryptoJS.AES.decrypt(
        {
          ciphertext: CryptoJS.enc.Base64.parse(encryptedPassword),
          iv: iv,
          salt: null, // Not needed for GCM
          key: key,
          algorithm: "AES-CBC",
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
          blockSize: 4,
          formatter: CryptoJS.format.OpenSSL,
        },
        key,
        {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        }
      );
  
      // Convert the decrypted WordArray to a UTF-8 string
      const decryptedPassword = decrypted.toString(CryptoJS.enc.Utf8);
      console.log("Decrypted Password:", decryptedPassword);
      return decryptedPassword;
    } catch (error) {
      console.error("Error during decryption:", error);
      throw error;
    }
  };