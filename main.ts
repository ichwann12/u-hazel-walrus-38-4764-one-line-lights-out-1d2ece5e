// One Line, Lights Out — make.fun entry runner.
// Reads entry.txt from this repo and writes it verbatim to the output
// directory given by MAKEFUN_BOT_DIR (or MAKEFUN_OUTPUT_DIR).
// Stdlib only, no network, no wall clock: the output is deterministic.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(fileURLToPath(import.meta.url));
const entry = readFileSync(join(repoDir, "entry.txt"), "utf8");

// The harness tells us where to put the entry via MAKEFUN_BOT_DIR
// (preferred) or MAKEFUN_OUTPUT_DIR (fallback); either may be set,
// so prefer the first and only error when neither is present.
const outDir = process.env.MAKEFUN_BOT_DIR ?? process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("Set MAKEFUN_BOT_DIR or MAKEFUN_OUTPUT_DIR to the output directory.");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
