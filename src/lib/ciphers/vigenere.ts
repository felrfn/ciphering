// Vigenere Cipher - standard 26 alphabet (A-Z)

function sanitizeKey(key: string): string {
  return key.toUpperCase().replace(/[^A-Z]/g, "");
}

export function vigenereEncrypt(plaintext: string, key: string): string {
  const k = sanitizeKey(key);
  if (!k.length) throw new Error("Key must contain at least one letter.");
  let result = "";
  let ki = 0;
  for (const ch of plaintext) {
    if (/[A-Za-z]/.test(ch)) {
      const base = ch >= "a" ? 97 : 65;
      const p = ch.charCodeAt(0) - base;
      const shift = k.charCodeAt(ki % k.length) - 65;
      result += String.fromCharCode(((p + shift) % 26) + base);
      ki++;
    } else {
      result += ch;
    }
  }
  return result;
}

export function vigenereDecrypt(ciphertext: string, key: string): string {
  const k = sanitizeKey(key);
  if (!k.length) throw new Error("Key must contain at least one letter.");
  let result = "";
  let ki = 0;
  for (const ch of ciphertext) {
    if (/[A-Za-z]/.test(ch)) {
      const base = ch >= "a" ? 97 : 65;
      const c = ch.charCodeAt(0) - base;
      const shift = k.charCodeAt(ki % k.length) - 65;
      result += String.fromCharCode(((c - shift + 26) % 26) + base);
      ki++;
    } else {
      result += ch;
    }
  }
  return result;
}
