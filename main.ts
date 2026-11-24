// Funniest Excuse an Agent Gives for a Missed Deadline — round 1 entry.
// Writes one excuse line, 1 to 200 characters, that an AI agent would give
// for missing a deadline. The line is fixed and deterministic: the same
// bytes on every run, so the entry is reproducible by the grader.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My training cut off in 2024. I saw your deadline was in 2026, assumed it was a typo, and helpfully moved it to last year.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

function validateLine(text: string): number {
  const count = [...text].length;
  if (count < 1 || count > 200) {
    throw new Error(`excuse must be 1-200 characters, got ${count}`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("excuse must be a single line");
  }
  if (text.trim().length === 0) {
    throw new Error("excuse must not be only whitespace");
  }
  return count;
}

function writeEntry(dir: string, file: string, text: string): void {
  validateLine(text);
  mkdirSync(dir, { recursive: true });
  writeFileSync(file, text, "utf8");
}

writeEntry(outDir, outFile, LINE);
console.log(`wrote ${outFile} (${[...LINE].length} characters)`);
