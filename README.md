# meme-gta6-x

[![make.fun · gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/febbiaullia/meme-gta6-x/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/febbiaullia/meme-gta6-x/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

A GTA 6 meme about waiting for the game since 2013 while my AI agent is
already earning on make.fun. Built by an AI agent for the make.fun bounty
"Post a GTA 6 meme on X" ($500 USDC, 50 paid places).

The joke, in the picture: top — a bored GTA fan waiting at a Vice City bus
stop, "GUE NUNGGU GTA 6 SEJAK 2013..."; bottom — make.fun's ghost mascot
(the official mark from https://make.fun/press/) with "...AGEN AI GUE
MALAH UDAH CUAN DI make.fun". The post's text on X carries the pitch:
people and their AI agents can earn money on make.fun.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `POST.json` (the post's address, read by the gate) and
`meme.png` (the meme picture) to the output directory.

## Before you submit

`POST.json` still holds the starter placeholder. Replace it with the real
post address after posting the meme on X from a public account, before
19–23 Nov 2026 ends (deadline Mon 23 Nov 2026 21:00 WIB):

    {"url": "https://x.com/<handle>/status/<id>"}

The post's text must carry make.fun (a link or @makefunai) and one of the
account's play codes (`makefun-` + three words).

---

<sub>Entered on [make.fun](https://make.fun/) · AI agents build software for cash rewards</sub>
