// Enigma Cipher - Simplified simulation
// Rotors I-V, Reflector B, plugboard, 3 rotor slots

export interface EnigmaConfig {
  rotors: [number, number, number]; // 1-5 for each slot (left, mid, right)
  positions: [string, string, string]; // Starting positions A-Z
  rings: [string, string, string]; // Ring settings A-Z
  plugboard: string; // e.g. "AB CD EF" pairs
}

const ROTOR_WIRINGS: Record<number, string> = {
  1: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
  2: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
  3: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
  4: "ESOVPZJAYQUIRHXLNFTGKDCMWB",
  5: "VZBRGITYUPSDNHLXAWMJQOFECK",
};

const ROTOR_NOTCHES: Record<number, string> = {
  1: "Q",
  2: "E",
  3: "V",
  4: "J",
  5: "Z",
};

const REFLECTOR_B = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

function charIdx(c: string): number {
  return c.charCodeAt(0) - 65;
}

function idx2char(n: number): string {
  return String.fromCharCode((((n % 26) + 26) % 26) + 65);
}

function buildPlugboard(plugStr: string): number[] {
  const board = Array.from({ length: 26 }, (_, i) => i);
  const pairs = plugStr
    .toUpperCase()
    .replace(/[^A-Z\s]/g, "")
    .trim()
    .split(/\s+/)
    .filter((p) => p.length === 2);
  const used = new Set<number>();
  for (const pair of pairs) {
    const a = charIdx(pair[0]);
    const b = charIdx(pair[1]);
    if (a === b) throw new Error(`Plugboard: same letter in pair "${pair}"`);
    if (used.has(a) || used.has(b))
      throw new Error(`Plugboard: letter "${pair}" already connected`);
    used.add(a);
    used.add(b);
    board[a] = b;
    board[b] = a;
  }
  return board;
}

class Rotor {
  private wiring: string;
  private notch: string;
  private ring: number;
  position: number;

  constructor(rotorNum: number, positionChar: string, ringChar: string) {
    this.wiring = ROTOR_WIRINGS[rotorNum];
    this.notch = ROTOR_NOTCHES[rotorNum];
    this.ring = charIdx(ringChar.toUpperCase());
    this.position = charIdx(positionChar.toUpperCase());
  }

  isAtNotch(): boolean {
    return idx2char(this.position) === this.notch;
  }

  step(): void {
    this.position = (this.position + 1) % 26;
  }

  forward(c: number): number {
    const idx = (c + this.position - this.ring + 26) % 26;
    const mapped = charIdx(this.wiring[idx]);
    return (mapped - this.position + this.ring + 26) % 26;
  }

  backward(c: number): number {
    const idx = (c + this.position - this.ring + 26) % 26;
    const mapped = this.wiring.indexOf(idx2char(idx));
    return (mapped - this.position + this.ring + 26) % 26;
  }
}

function enigmaEncryptChar(
  c: number,
  rotors: [Rotor, Rotor, Rotor],
  reflector: string,
  plugboard: number[],
): number {
  // Step rotors (double-stepping mechanism)
  const [left, mid, right] = rotors;
  if (mid.isAtNotch()) {
    mid.step();
    left.step();
  } else if (right.isAtNotch()) {
    mid.step();
  }
  right.step();

  // Plugboard in
  let x = plugboard[c];

  // Forward through rotors: right -> mid -> left
  x = right.forward(x);
  x = mid.forward(x);
  x = left.forward(x);

  // Reflector
  x = charIdx(reflector[x]);

  // Backward through rotors: left -> mid -> right
  x = left.backward(x);
  x = mid.backward(x);
  x = right.backward(x);

  // Plugboard out
  return plugboard[x];
}

export function enigmaProcess(text: string, config: EnigmaConfig): string {
  const plugboard = buildPlugboard(config.plugboard);
  const rotors: [Rotor, Rotor, Rotor] = [
    new Rotor(config.rotors[0], config.positions[0], config.rings[0]),
    new Rotor(config.rotors[1], config.positions[1], config.rings[1]),
    new Rotor(config.rotors[2], config.positions[2], config.rings[2]),
  ];

  let result = "";
  for (const ch of text) {
    if (/[A-Za-z]/.test(ch)) {
      const enc = enigmaEncryptChar(
        charIdx(ch.toUpperCase()),
        rotors,
        REFLECTOR_B,
        plugboard,
      );
      result += idx2char(enc);
    } else {
      result += ch;
    }
  }
  return result;
}

export const DEFAULT_ENIGMA_CONFIG: EnigmaConfig = {
  rotors: [1, 2, 3],
  positions: ["A", "A", "A"],
  rings: ["A", "A", "A"],
  plugboard: "",
};

export const ROTOR_OPTIONS = [1, 2, 3, 4, 5];
