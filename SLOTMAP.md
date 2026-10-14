# ONI RONIN base — resume + GLB integration slot map

Prepared 2026-10-14 ~17:35 IST, ahead of the user's resume + GLB drop.
Goal: when he sends the two files, every placement below is mechanical — no re-reading, no guessing.

## 1. 3D model slot (his GLB)

- **Live path:** `~/workspace/oni-ronin/models/oni-samurai.glb` (6.7 MB)
- **Backup/reference copy:** `~/workspace/oni-ronin-ref/oni-samurai.glb` (identical, kept untouched)
- **Loading:** `assets/index-CL_VvDFk.js` loads the relative path `models/oni-samurai.glb`;
  position/scale are set in the scene code, not by the file. → Dropping HIS GLB onto the
  same filename/path keeps the **original size/position automatically** — exactly his demand
  ("jaisa original repo mein hai, jaisa size sab hai, waise add karna"). No code edit needed.
- Verified in the bundle: `models/oni-samurai.glb\`,e=>uf(e*.94))}...` (loader callback, 2026-10-14 check).

## 2. Image slots (11 image boxes + 1 video)

| # | Section | Slot / file | Current content |
|---|---------|-------------|-----------------|
| 1–3 | World (manifesto) | `media/services/sm/01-blood-moon-bounty.webp` | 3 visible pics (01, 02, 10 shown); 7 more in `sm/` (03–09) as spares |
| 4 | World | `media/services/sm/02-kitsune-shrine.webp` | shrine scene |
| 5 | World | `media/services/sm/10-river-of-lanterns.webp` | lantern river |
| 6 | Services | `media/services/14-gates-of-yomi.mp4` + `.webp` poster | gates-to-underworld video |
| 7–10 | Arsenal (sword area) | `media/features/masks.webp`, `stances.webp`, `rage.webp`, `yokai.webp` | 4 layers behind the 5 arsenal cards |
| 11 | Arsenal | same yomi `.mp4`/`.webp` reused as 5th layer | "Raid together" card layer |
| 12 | Editions | `media/editions/standard.webp` | Standard card art |
| 13 | Editions | `media/editions/deluxe.webp` | Deluxe card art |
| 14 | Editions | `media/editions/collector.webp` | Collector's card art |

The "talwa / sword ke aas-paas" images = the **Arsenal** section (id `arsenal`, label "Forged in blood")
— 5 weapon cards each switching one media layer. Hero carries the 3D model (sword included),
no separate sword image file.

## 3. Text/card slots (resume details go here)

- **Arsenal** (`index.html`, buttons `data-feature="0..4"`): 5 cards —
  01 Bind the mask / 02 Master the stances / 03 Unleash the oni / 04 Hunt the yokai / 05 Raid together.
  Card copy (`data-arsenal-text`) + tags (`data-arsenal-tags`) are filled from the bundle JS —
  check the JS data object when the resume arrives.
- **Editions** (`index.html` directly editable): 3 cards — Standard / Deluxe / Collector's,
  each with `edition__head`, `edition__body`, `edition__list`, `edition__price`, preorder pill.
- **World** (`index.html`): section label "The world", manifesto stats (`world__stats`, `data-count` ×4).
- **Hero** (`index.html`): `hero__statements` paragraphs, HUD labels.

## 4. What is still needed (from the user)

1. His **resume** — all details → every card (text slots above).
2. His **GLB** — dropped onto `models/oni-samurai.glb`.

Images are generated per the resume after it arrives (mask/stance/rage/yokai + edition arts +
manifesto pics — the slots are mapped; generation prompts come from resume content).

Nothing from the parked KARASU project (`~/workspace/karasu/`) is touched.
