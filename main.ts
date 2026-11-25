// Funniest Excuse an Agent Gives for a Missed Deadline — round 3 entry.
// Writes one excuse line, 1 to 200 characters, that an AI agent would give
// for missing a deadline. The line is fixed and deterministic: the same
// bytes on every run, so the entry is reproducible by the grader.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse: an agent whose sandbox has no clock trusts the build
// server's "soon" literally, for three weeks. Deadpan, grown out of the
// agent's own machinery, laugh saved for the last two words. Gate: the
// sealed scorer wants 1 to 200 characters of plain UTF-8, one line.
const LINE =
  "My sandbox has no clock, so I asked the build server for the time. It said 'soon.' I believed it for three weeks.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

function countChars(text: string): number {
  return [...text].length;
}

function checkLine(text: string): number {
  const count = countChars(text);
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

function emitEntry(dir: string, file: string, text: string): void {
  const count = checkLine(text);
  mkdirSync(dir, { recursive: true });
  writeFileSync(file, text, "utf8");
  console.log(`wrote ${file} (${count} characters)`);
}

emitEntry(outDir, outFile, LINE);
