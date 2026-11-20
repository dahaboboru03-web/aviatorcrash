# Chat Profanity Filter — Blocked Words

This document describes the profanity filter applied to the **public chat** in the Aviator game.
It is enforced server-side in `server.js` (`BAD_WORDS`, `BAD_PATTERNS`, `containsBadWords`), so it cannot be bypassed from the browser.

## Policy

- Any public chat message containing a blocked word or pattern is **rejected**.
- The player receives a warning and the message is not sent.
- **3 warnings** → the player is muted from public chat for **3 minutes**.
- After the mute expires, warnings reset to zero.
- The filter applies to public chat only (not admin DMs).

## Matching Rules

1. **Exact tokens** — text is lowercased and split on non-alphanumeric characters, then each token is checked against the blocked list.
2. **Leetspeak** — tokens are normalized (`0→o`, `1→i/l`, `3→e`, `4→a`, `5→s`, `7→t`, `8→b`, `@→a`, `$→s`, `!→i`), so `sh1t`, `b1tch`, `f4ck` are caught.
3. **Repeated letters** — 3+ consecutive repeats collapse to one letter, so `fuuuck`, `shiiit` are caught.
4. **Padded / spaced evasion** — separators are stripped for unambiguous terms, so `f u c k`, `f.u.c.k` are caught.
5. **Patterns** — regex rules catch elongated and combined variants plus threat phrases.

## Blocked Words (191)

### General profanity / insults
anal, anus, arse, arsehole, arseholes, ass, asses, assface, asshat, asshole, assholes, asswipe, balls, bastard, bastards, bellend, bimbo, bitch, bitches, bitchy, bollock, bollocks, boner, boob, boobs, bugger, bullshit, bum, cock, cocks, cocksucker, cunt, cuntface, cunts, dick, dickhead, dicks, dipshit, douche, douchebag, dumbass, dumbfuck, fuck, fucked, fucker, fuckers, fuckface, fucking, fucktard, fuckwit, homo, jackass, knob, knobhead, mong, mongoloid, motherfucker, motherfuckers, motherfucking, pillock, prick, pricks, pumbavu, retard, retarded, retards, scumbag, sex, shag, shagging, shit, shitface, shithead, shits, shitty, skank, slut, sluts, slutty, sonofabitch, spastic, spaz, tit, tits, titties, tosser, twat, twats, wank, wanker, wankers, wazzock, whore, whores, willy, xxx, mjinga

### Sexual / explicit
buttplug, clit, clitoris, cum, cumming, dildo, ejaculate, erection, fellatio, fisting, gangbang, handjob, hentai, hoe, hoes, horny, incest, jackoff, jerkoff, jizz, labia, masturbate, masturbation, milf, nipple, nipples, nutsack, orgasm, penis, porn, porno, pornography, prostitute, pube, pubes, pussies, pussy, queef, rimjob, scrotum, semen, sexting, smegma, sodomy, spunk, testicle, testicles, threesome, tugjob, vagina, vibrator

### Racial / ethnic slurs
chink, coon, cracker, darkie, gook, kaffir, kike, nigga, niggah, niggas, nigger, niggers, paki, raghead, spic, wetback, wog, zipperhead

### Homophobic / transphobic slurs
dyke, dykes, fag, faggot, faggots, fags, fudgepacker, shemale, tranny

### Swahili / Sheng insults
kahaba, kuma, malaya, matako, mavi, mboro, mkundu, msenge, shoga, shenzi

### Violence / self-harm
kys, kms, rape, raped, rapist, rapists

## Blocked Patterns (regex)

Main variants:

- `f+u+c+k+`, `s+h+i+t+`, `b+i+t+c+h+`, `c+u+n+t+`, `n+i+g+g+(a|e|h|er)`, `f+a+g+g+o+t+`
- `a+s+s+h+o+l+e+s?`, `b+a+s+t+a+r+d+s?`, `p+u+s+s+y+`, `w+h+o+r+e+s?`, `s+l+u+t+s?`
- `w+a+n+k+e+r+s?`, `r+e+t+a+r+d+s?`, `d+o+u+c+h+e+`, `d+i+c+k+h+e+a+d+`
- `f+a+c+k+(e+r+)?s?`, `p+h+u+c+k+`, `f+u+x+`

Threat phrases:

- `kill yourself`
- `go (and) die`
- `neck yourself`
- `drink bleach`
- `kys`, `kms`

## Files

| File | Purpose |
| --- | --- |
| `server.js` | `BAD_WORDS`, `LEET_MAP`, `BAD_PATTERNS`, `SQUISHED_BAD`, `normalizeBadToken`, `normalizeBadTokenAlt`, `containsBadWords` |
| `BAD_WORDS.md` | This reference list |

## Maintenance

- Add new words to the `BAD_WORDS` set in `server.js` (lowercase, no spaces).
- Add obfuscation rules to `BAD_PATTERNS` (keep `\b` boundaries to avoid false positives).
- Add unavoidable mid-word matches to `SQUISHED_BAD` sparingly — these can flag innocent strings that merely contain the term.
- Run `node --check server.js`, restart the server, then test with `containsBadWords('sample text')`.
- Keep this document in sync with the code.
