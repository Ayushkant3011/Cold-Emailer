import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const algorithm = "aes-256-cbc";
const ivLength = 16;

const secretKey = process.env.ENCRYPT_SECRET;

// 🚨 HARD GUARD
if (!secretKey) {
  throw new Error("ENCRYPT_SECRET is missing in environment variables");
}

if (secretKey.length !== 32) {
  throw new Error("ENCRYPT_SECRET must be exactly 32 characters");
}

export const encrypt = (text) => {
  const iv = crypto.randomBytes(ivLength);

  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(secretKey),
    iv
  );

  let encrypted = cipher.update(text, "utf8");
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

export const decrypt = (encryptedText) => {
  const [ivHex, encryptedHex] = encryptedText.split(":");

  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey),
    Buffer.from(ivHex, "hex")
  );

  let decrypted = decipher.update(Buffer.from(encryptedHex, "hex"));
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};
