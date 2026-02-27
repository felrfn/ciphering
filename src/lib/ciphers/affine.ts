// Affine Cipher - Encrypt: C = (a*P + b) mod 26, Decrypt: P = a_inv*(C - b) mod 26

const VALID_A = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];

function modInverse(a: number, m: number): number {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  throw new Error(`No modular inverse for a=${a}`);
}

export function validateAffineKey(a: number, b: number): void {
  if (!VALID_A.includes(a)) {
    throw new Error(
      `'a' must be coprime with 26. Valid values: ${VALID_A.join(", ")}`,
    );
  }
  if (b < 0 || b > 25) {
    throw new Error("'b' must be between 0 and 25.");
  }
}

export function affineEncrypt(plaintext: string, a: number, b: number): string {
  validateAffineKey(a, b);
  let result = "";
  for (const ch of plaintext) {
    if (/[A-Za-z]/.test(ch)) {
      const base = ch >= "a" ? 97 : 65;
      const p = ch.charCodeAt(0) - base;
      result += String.fromCharCode(((a * p + b) % 26) + base);
    } else {
      result += ch;
    }
  }
  return result;
}

export function affineDecrypt(
  ciphertext: string,
  a: number,
  b: number,
): string {
  validateAffineKey(a, b);
  const aInv = modInverse(a, 26);
  let result = "";
  for (const ch of ciphertext) {
    if (/[A-Za-z]/.test(ch)) {
      const base = ch >= "a" ? 97 : 65;
      const c = ch.charCodeAt(0) - base;
      result += String.fromCharCode(((aInv * (c - b + 26)) % 26) + base);
    } else {
      result += ch;
    }
  }
  return result;
}

export { VALID_A };
