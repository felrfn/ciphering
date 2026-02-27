// Playfair Cipher - 5x5 grid (I/J combined), 26 alphabet

function buildKeySquare(key: string): string[] {
  const seen = new Set<string>();
  const square: string[] = [];
  const clean = (
    key.toUpperCase().replace(/J/g, "I") + "ABCDEFGHIKLMNOPQRSTUVWXYZ"
  ).replace(/[^A-Z]/g, "");
  for (const ch of clean) {
    if (!seen.has(ch)) {
      seen.add(ch);
      square.push(ch);
    }
  }
  return square; // 25 letters
}

function getPos(square: string[], ch: string): [number, number] {
  const idx = square.indexOf(ch);
  return [Math.floor(idx / 5), idx % 5];
}

function prepareText(text: string): string[] {
  const cleaned = text
    .toUpperCase()
    .replace(/J/g, "I")
    .replace(/[^A-Z]/g, "");
  const digraphs: string[] = [];
  let i = 0;
  while (i < cleaned.length) {
    const a = cleaned[i];
    let b = cleaned[i + 1] ?? "X";
    if (a === b) {
      b = "X";
      i++;
    } else {
      i += 2;
    }
    digraphs.push(a + b);
  }
  return digraphs;
}

function processDigraph(
  square: string[],
  a: string,
  b: string,
  direction: 1 | -1,
): string {
  const [r1, c1] = getPos(square, a);
  const [r2, c2] = getPos(square, b);
  if (r1 === r2) {
    // Same row
    return (
      square[r1 * 5 + ((c1 + direction + 5) % 5)] +
      square[r2 * 5 + ((c2 + direction + 5) % 5)]
    );
  } else if (c1 === c2) {
    // Same column
    return (
      square[((r1 + direction + 5) % 5) * 5 + c1] +
      square[((r2 + direction + 5) % 5) * 5 + c2]
    );
  } else {
    // Rectangle
    return square[r1 * 5 + c2] + square[r2 * 5 + c1];
  }
}

export function playfairEncrypt(plaintext: string, key: string): string {
  if (!key.trim()) throw new Error("Key cannot be empty.");
  const square = buildKeySquare(key);
  const digraphs = prepareText(plaintext);
  return digraphs.map(([a, b]) => processDigraph(square, a, b, 1)).join(" ");
}

export function playfairDecrypt(ciphertext: string, key: string): string {
  if (!key.trim()) throw new Error("Key cannot be empty.");
  const square = buildKeySquare(key);
  const cleaned = ciphertext.toUpperCase().replace(/[^A-Z]/g, "");
  if (cleaned.length % 2 !== 0)
    throw new Error("Ciphertext length must be even.");
  const digraphs: string[] = [];
  for (let i = 0; i < cleaned.length; i += 2) {
    digraphs.push(cleaned[i] + cleaned[i + 1]);
  }
  return digraphs.map(([a, b]) => processDigraph(square, a, b, -1)).join("");
}
