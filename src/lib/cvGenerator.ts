export type PatternType = "cv" | "vc" | "cvc" | "vcv" | "cvcc" | "ccvc" | "mix";

const VOWELS = ["a", "e", "i", "o", "u"];
const CONSONANTS = ["b", "d", "f", "g", "h", "k", "l", "m", "n", "p", "r", "s", "t", "v", "w", "z"];

type BasePatternType = Exclude<PatternType, "mix">;

const PATTERN_TEMPLATES: Record<BasePatternType, ("C" | "V")[]> = {
  cv: ["C", "V"],
  vc: ["V", "C"],
  cvc: ["C", "V", "C"],
  vcv: ["V", "C", "V"],
  cvcc: ["C", "V", "C", "C"],
  ccvc: ["C", "C", "V", "C"],
};

const BASE_PATTERNS: BasePatternType[] = ["cv", "vc", "cvc", "vcv", "cvcc", "ccvc"];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateOne(patternType: PatternType, length: number): string {
  const resolved = patternType === "mix" ? pickRandom(BASE_PATTERNS) : patternType;
  const template = PATTERN_TEMPLATES[resolved];
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
