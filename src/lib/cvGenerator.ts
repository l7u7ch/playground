export type PatternType = "cv" | "vc" | "cvc" | "vcv" | "cvcc" | "ccvc";

const VOWELS = ["a", "e", "i", "o", "u"];
const CONSONANTS = ["b", "d", "f", "g", "h", "k", "l", "m", "n", "p", "r", "s", "t", "v", "w", "z"];

const PATTERN_TEMPLATES: Record<PatternType, ("C" | "V")[]> = {
  cv: ["C", "V"],
  vc: ["V", "C"],
  cvc: ["C", "V", "C"],
  vcv: ["V", "C", "V"],
  cvcc: ["C", "V", "C", "C"],
  ccvc: ["C", "C", "V", "C"],
};

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateOne(patternType: PatternType, length: number): string {
  const template = PATTERN_TEMPLATES[patternType];
  let result = "";
  while (result.length < length) {
    for (const t of template) {
      result += t === "C" ? pickRandom(CONSONANTS) : pickRandom(VOWELS);
    }
  }
  return result.slice(0, length);
}

export function generateStrings(patternType: PatternType, length: number, count: number): string[] {
  return Array.from({ length: count }, () => generateOne(patternType, length));
}
