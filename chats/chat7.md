# Troubleshooting Help

_Started 2026-05-03 14:13 UTC_

---

## User

something broke?

## Assistant

I'll take a look at what's going on with the video.

_[tool: list_files]_

_[tool: show_html]_

_[tool: read_file]_

The file is huge (~6MB). Let me check what's going on.

_[tool: read_file]_

The file is 6MB and 2584 lines. Something is making it huge. Let me check what's bloating it.

_[tool: run_script]_

Three giant base64 data URIs got embedded around lines 2152-2154 — that's almost certainly what broke things (the file is now too large for the browser to parse comfortably). Let me see the context.

_[tool: run_script]_

Found it. Three large base64 images got persisted into the `TWEAK_DEFAULTS` block (~6MB total), which is what's making the file unloadable. Let me check what was there originally and look for a previous version.

_[tool: run_script]_

Yep — original defaults had empty strings for the images. The user (or a tweak save) embedded three full PNG data URIs and inflated the file to 6MB. I'll restore the empty strings — the actual uploaded images live in `uploads/` and should be re-referenced by file path or re-uploaded as needed.

Let me check if those images exist as files anywhere first.

_[tool: list_files]_

Let me extract the data URIs and save them as PNG files in uploads/, then reference them by path. That way the room-image tweaks still work, but the HTML stays small.

_[tool: run_script]_

The regex couldn't match because the lines are huge. Let me do it line-by-line.

_[tool: run_script]_

Now let me rewrite the file: replace those three giant lines with file-path references instead of data URIs.

_[tool: run_script]_

File is back down from 6MB to 117KB. Let me verify it loads.

_[tool: done]_

Fixed. The file had ballooned to ~6MB because three full PNG image uploads got persisted as base64 data URIs into the `TWEAK_DEFAULTS` block — the browser was choking trying to parse it.

What I did:
- Decoded the three embedded images and saved them as files: `uploads/tweak-singleImg.png`, `tweak-doubleImg.png`, `tweak-queenImg.png`
- Replaced the inline base64 in `TWEAK_DEFAULTS` with file-path references
- File is back to ~117KB and loads cleanly

Heads-up: if the room-image tweak control re-uploads via data URI and persists it, this will recur. Worth swapping the persistence to store paths (or `null` + a separate uploads handler) if you keep using that control heavily.Let me check the export settings in the file.

_[tool: grep]_

[Snipping resolved file-fix work to free context.]

_[tool: snip]_

## User

what will the size of the visual video be when exported to claude code and created as .mov file?

## Assistant

Let me check the export config — the canvas dimensions, framerate, codec, and bitrate determine the final file size.

_[tool: grep]_

_[tool: snip]_

Here are the actual export specs from your file:

**Resolution & duration**
- Canvas: **1080 × 1483** (square stage extended for tall content)
- Duration: **22.8 s**
- Framerate: **30 fps** → **684 frames total**

**Two export paths exist, with very different sizes:**

### 1. MP4 (no transparency) — "Render MP4"
- Codec: H.264 High @ Level 4.0 (`avc1.640028`)
- Bitrate: **12 Mbit/s** (CBR-ish via WebCodecs)
- Estimated size: **12 Mbit/s × 22.8 s ÷ 8 ≈ 34 MB**
- Real-world: typically **30–36 MB** depending on encoder overhead and keyframe placement (one keyframe every 2 s).

### 2. WebM with alpha — "Render WebM (transparent ✓)"
- Codec: VP9 with alpha channel via `MediaRecorder`
- No explicit bitrate set → MediaRecorder picks a default (Chrome usually lands around **2.5–5 Mbit/s** for this resolution).
- Estimated size: **8–15 MB**, but highly variable. Could spike higher because the alpha channel adds ~30–40 % overhead.

### About `.mov`
Neither export path produces a `.mov`. You'd get either `.mp4` (H.264, no alpha) or `.webm` (VP9 + alpha). To get a true `.mov` with alpha — the format Final Cut / Premiere prefer — you'd need to transcode the WebM offline to ProRes 4444 or Animation codec, which would balloon the file to **300–800 MB** for 22.8 s at 1080×1483 (those codecs are nearly lossless and intra-frame).

### Want it smaller?
Easy knobs in `exportVideoOffline`:
- Drop `bitrate: 12_000_000` to `6_000_000` → ~17 MB MP4, still clean for UI footage
- Drop fps to 24 → ~20 % smaller
- Crop the stage to the visible 668 × 920 region → ~60 % fewer pixels per frame

Want me to wire any of those in as a Tweak?

