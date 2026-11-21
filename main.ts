// A working gta6-meme-x-01 entry (Node 22, standard library only).
//
// What it does:
//  - Copies POST.json from the repository root to /output/POST.json, where
//    the gate reads it. This is what the kit requires: the entry is the
//    post itself, and POST.json names the post's address on X.
//  - Also copies meme.png (the meme picture) to /output/meme.png, so the
//    program's runs can be checked locally end to end before the post
//    exists. Nothing the program writes about the post is judged: the
//    house reads the post itself from X and writes post.dossier.json.
//
// IMPORTANT — POST.json is still the starter placeholder:
//   {"url": "https://x.com/<handle>/status/<id>"}
// Replace it with the real post address AFTER Joko posts the meme on X
// and BEFORE any submit, or the gate refuses the entry (valid 0).
// The post must be made 19-23 Nov 2026 from a public X account, its text
// carrying make.fun (link or @makefunai) and one play code.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
for (const name of ['POST.json', 'meme.png']) {
  try {
    copyFileSync(join(BOT_DIR, name), join(OUTPUT_DIR, name));
  } catch (err) {
    console.error(`${name} could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
    process.exit(1);
  }
}
