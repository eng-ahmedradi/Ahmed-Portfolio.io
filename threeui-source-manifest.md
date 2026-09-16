# ThreeUI Source Manifest

Source of truth: official ThreeUI source registries.

## KoiStudies

- Registry: https://threeui.com/source-code/koi-studies.json
- Canonical: https://threeui.com/synthralos-halftone.html
- Component: src/shaders/koi-studies/KoiStudies.tsx
- SHA-256: 0137430b7dbf48588e1ec0ca926fda2cd342949aa70adb42eebeac4bb9f1f775
- Canonical HTML SHA-256: 32cf6493414a209eb02c607a4b2383021f731411a9aa19a28e49673f84107e21
- Status: wrapper verified; canonical HTML source was not retrieved into this package.

## CrtBackground

- Registry: https://threeui.com/source-code/crt.json
- Component: src/shaders/crt/CrtBackground.tsx
- SHA-256: 20932f2655319c5fc6c6b3c29c890149beec7e4850edc414f909ab24a0c95031
- Renderer: src/shaders/crt/crtRenderer.ts
- Renderer SHA-256: a3eb536e9c50eeb31832e7d6d25021c1535137e8ead5eb1b864e5a27c340af03
- Shaders: src/shaders/crt/crtShaders.ts
- Shaders SHA-256: cf3a7c747d1cac495c705529954e2491ad885489ddd5110724f8f4b3553f1592
- Screens: src/shaders/crt/crtScreens.ts
- Screens SHA-256: e545922e0d3afa19b9d01840d0ea684c56d0799714f9cf77a4712921bfec7adb
- Status: registry and source metadata verified. The complete crtScreens.ts source was not retrievable in the current tool session, so it is intentionally NOT duplicated or approximated here.

## Shared CSS

- Path: src/shaders/threeui.css
- SHA-256: efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf
- Status: registry verified.

The production portfolio uses a native WebGL CRT atmosphere inspired by the verified CRT rendering model, while preserving this manifest so a developer can replace it with the exact registered source when the complete source bundle is available. No screenshot recreation is used.
