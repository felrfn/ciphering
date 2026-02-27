// Hill Cipher - matrix multiplication mod 26
// Key is provided as a flat array of numbers (n*n values for n×n matrix, n=2 or 3)

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function modInverse(a: number, m: number): number {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  throw new Error(`No modular inverse for value ${a} mod ${m}`);
}

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

function det2(m: number[][]): number {
  return m[0][0] * m[1][1] - m[0][1] * m[1][0];
}

function det3(m: number[][]): number {
  return (
    m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
    m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
    m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
  );
}

function inverseMatrix(matrix: number[][]): number[][] {
  const n = matrix.length;
  if (n === 2) {
    const det = mod(det2(matrix), 26);
    if (gcd(det, 26) !== 1)
      throw new Error("Key matrix is not invertible mod 26.");
    const detInv = modInverse(det, 26);
    return [
      [mod(detInv * matrix[1][1], 26), mod(-detInv * matrix[0][1], 26)],
      [mod(-detInv * matrix[1][0], 26), mod(detInv * matrix[0][0], 26)],
    ];
  } else if (n === 3) {
    const det = mod(det3(matrix), 26);
    if (gcd(det, 26) !== 1)
      throw new Error("Key matrix is not invertible mod 26.");
    const detInv = modInverse(det, 26);
    // Cofactor matrix
    const cof: number[][] = Array.from({ length: 3 }, () => Array(3).fill(0));
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const minor: number[][] = [];
        for (let i = 0; i < 3; i++) {
          if (i === r) continue;
          const row: number[] = [];
          for (let j = 0; j < 3; j++) {
            if (j === c) continue;
            row.push(matrix[i][j]);
          }
          minor.push(row);
        }
        cof[r][c] = mod(
          ((r + c) % 2 === 0 ? 1 : -1) * det2(minor) * detInv,
          26,
        );
      }
    }
    // Transpose cofactor (adjugate * detInv already applied)
    const inv: number[][] = Array.from({ length: 3 }, () => Array(3).fill(0));
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        inv[r][c] = cof[c][r];
      }
    }
    return inv;
  }
  throw new Error("Only 2×2 and 3×3 matrices are supported.");
}

function matVecMul(matrix: number[][], vec: number[]): number[] {
  return matrix.map((row) =>
    mod(
      row.reduce((sum, val, j) => sum + val * vec[j], 0),
      26,
    ),
  );
}

export function parseKeyMatrix(keyStr: string): number[][] {
  const nums = keyStr
    .trim()
    .split(/[\s,]+/)
    .map((s) => parseInt(s, 10));
  if (nums.some(isNaN))
    throw new Error("Key must be numbers separated by spaces or commas.");
  if (nums.length === 4) {
    return [
      [nums[0], nums[1]],
      [nums[2], nums[3]],
    ];
  } else if (nums.length === 9) {
    return [
      [nums[0], nums[1], nums[2]],
      [nums[3], nums[4], nums[5]],
      [nums[6], nums[7], nums[8]],
    ];
  }
  throw new Error("Key must have 4 values (2×2) or 9 values (3×3).");
}

function hillProcess(text: string, matrix: number[][]): string {
  const n = matrix.length;
  const upper = text.toUpperCase().replace(/[^A-Z]/g, "");
  // Pad to multiple of n
  let padded = upper;
  while (padded.length % n !== 0) padded += "X";
  let result = "";
  for (let i = 0; i < padded.length; i += n) {
    const vec = Array.from(
      { length: n },
      (_, j) => padded.charCodeAt(i + j) - 65,
    );
    const enc = matVecMul(matrix, vec);
    result += enc.map((v) => String.fromCharCode(v + 65)).join("");
  }
  return result;
}

export function hillEncrypt(plaintext: string, keyStr: string): string {
  const matrix = parseKeyMatrix(keyStr);
  return hillProcess(plaintext, matrix);
}

export function hillDecrypt(ciphertext: string, keyStr: string): string {
  const matrix = parseKeyMatrix(keyStr);
  const inv = inverseMatrix(matrix);
  return hillProcess(ciphertext, inv);
}
