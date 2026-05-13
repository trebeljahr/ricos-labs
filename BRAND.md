# Ricos Labs Brand Kit

Ricos Labs uses a charged glass mark, warm paper surfaces, and precise
TypeScript-studio typography. The identity should feel technical, tactile, and
direct rather than corporate.

## Assets

- Primary lockup: `packages/client/public/brand/ricos-labs-lockup.svg`
- Wordmark: `packages/client/public/brand/ricos-labs-wordmark.svg`
- App icon / favicon mark: `packages/client/public/brand/ricos-labs-mark.svg`
- App Router favicon source: `packages/client/src/app/icon.svg`
- Reusable React mark: `packages/client/src/components/brand/brand-mark.tsx`

Use the app icon for favicons, avatars, social previews, and compact UI marks.
Use the lockup in proposals, decks, README imagery, and places where the studio
name needs to read without surrounding context.

## Palette

| Token | Hex | Use |
| --- | --- | --- |
| Deep Ink | `#12141E` | Primary text, dark surfaces, favicon field |
| Warm Paper | `#F6EFE2` | Main background, light logo field, quiet UI |
| Signal Copper | `#D95D3E` | Primary action, active state, key accent |
| Flux Cyan | `#35C4D8` | Realtime signal, small highlight |
| Plasma Violet | `#6F4BE8` | 3D scene continuity, depth, rare emphasis |

Keep copper as the primary accent. Use cyan sparingly for realtime energy. Use
violet mostly where the WebGL/plasma scenes need continuity.

## Type

- Display: Instrument Serif
- Interface: Inter
- Code and labels: JetBrains Mono

Use display type for the studio name and major editorial headlines. Use Inter
for body and interface text. Use JetBrains Mono only for labels, metadata, and
technical texture.

## Voice

- Direct about craft.
- Warm without hype.
- Specific about shipped work.
- Comfortable with technical depth.

Good brand copy names what shipped, what stack held it together, and why it
matters. Avoid generic agency language.

## Site Usage

The current site uses the identity in:

- `packages/client/src/components/landing/nav.tsx`
- `packages/client/src/components/landing/footer.tsx`
- `packages/client/src/app/icon.svg`
- `packages/client/src/app/manifest.ts`
- `packages/client/src/app/opengraph-image.tsx`
- `packages/client/src/lib/brand.ts`
