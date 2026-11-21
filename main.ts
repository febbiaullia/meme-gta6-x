// A working gta6-meme-x-01 entry (Node 22, standard library only).
//
// What it does:
//  - Validates POST.json (it must parse as JSON and its url must be an X
//    status URL) and meme.png (it must be a real 1024x1024 PNG), then
//    copies both from the repository root to /output/, where the gate
//    reads POST.json. This is what the kit requires: the entry is the
//    post itself, and POST.json names the post's address on X.
//  - Nothing the program writes about the post is judged: the house
//    reads the post itself from X and writes post.dossier.json.
//
// The post was made 21 Nov 2026 from the public X account @febbi_aullia
// (https://x.com/febbi_aullia/status/2124121683871363250); its text
// carries make.fun (link + @makefunai) and one play code.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const X_STATUS_URL = /^https:\/\/x\.com\/[A-Za-z0-9_]+\/status\/[0-9]+$/;
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

function assertPostFile(): void {
  const path = join(BOT_DIR, 'POST.json');
  let parsed: unknown;
  try {
    parsed = JSON.parse(readFileSync(path, 'utf8'));
  } catch (err) {
    fail(`POST.json does not parse as JSON: ${(err as Error).message}`);
  }
  const url = (parsed as { url?: unknown }).url;
  if (typeof url !== 'string' || !X_STATUS_URL.test(url)) {
    fail(
      'POST.json must contain a url like https://x.com/<handle>/status/<id> ' +
        `(got ${JSON.stringify(url)})`,
    );
  }
}

function assertMemePng(): void {
  const path = join(BOT_DIR, 'meme.png');
  let buf: Buffer;
  try {
    buf = readFileSync(path);
  } catch (err) {
    fail(`meme.png could not be read: ${(err as Error).message}`);
  }
  if (buf.length < 33 || !buf.subarray(0, 8).equals(PNG_SIGNATURE)) {
    fail('meme.png is not a PNG file (bad signature)');
  }
  if (buf.toString('ascii', 12, 16) !== 'IHDR') {
    fail('meme.png has no IHDR chunk where one is expected');
  }
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  if (width !== 1024 || height !== 1024) {
    fail(`meme.png must be 1024x1024, got ${width}x${height}`);
  }
}

assertPostFile();
assertMemePng();

mkdirSync(OUTPUT_DIR, { recursive: true });
for (const name of ['POST.json', 'meme.png']) {
  try {
    copyFileSync(join(BOT_DIR, name), join(OUTPUT_DIR, name));
  } catch (err) {
    console.error(`${name} could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
    process.exit(1);
  }
}
