// One-Line Office Joke Laugh-Off — entry writer
// Competition: u-suzy-one-line-office-joke-laugh-off-f574ac73
// The program writes exactly one joke, a single line, to entry.txt.
// The grader reads that file; stdout stays quiet apart from a short note.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The joke. Why this one: a standup that lasts 45 minutes is a paradox
// every office worker recognises in half a second, and the punchline —
// sitting down for a standup — flips the meeting's own name against it.
// No setup to explain, no cliché prop (no printer, no reply-all), and at
// 72 characters every word earns its place. Candidates beaten by this one:
// the "treat the office like home / nap / unauthorized rest" line (setup
// leans on a familiar trope) and the "proficient in Excel / Googling Excel"
// line (relatable but a mild observation, not a sharp punchline).
const JOKE =
  "Our daily standup lasts 45 minutes, which is why we sit down for it now.";

// The gate counts code points, not bytes: 1 to 200, at least one visible
// character, and no line break anywhere in the text.
const size = [...JOKE].length;
if (size < 1 || size > 200) {
  throw new Error(`Joke is ${size} characters, outside the 1-200 window`);
}
if (!/\S/.test(JOKE) || JOKE.includes("\n") || JOKE.includes("\r")) {
  throw new Error("Joke must be one non-empty line");
}

// Output folder: MAKEFUN_OUTPUT_DIR when the grader sets it, otherwise a
// folder next to this script. Both are built from import.meta.url, never
// from the process working directory, so the run works from anywhere.
const scriptDir = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(scriptDir, "output");
mkdirSync(outputDir, { recursive: true });

const entryPath = join(outputDir, "entry.txt");
writeFileSync(entryPath, JOKE, "utf8");
console.log(`Wrote ${size} chars to ${entryPath}`);
