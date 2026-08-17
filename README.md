# Portfolio starter — glass blob + smooth scroll

Run it:

```
npm install
npm run dev
```

Open localhost:3000 — you'll see the hero (name + glass blob) and one
placeholder "Selected work" section below it, so you can feel the
Lenis smooth scroll + blob-reacts-to-velocity effect right away.

Deploy free: push this to a GitHub repo, import it at vercel.com,
zero config needed for Next.js — it just builds and deploys.

The blob is calm by default (`distort: 0.25`) and rises to `0.75` +
faster morph speed the faster you scroll, easing back down when you
stop — that's the whole signature effect, driven by
`lib/scroll-store.ts` which Lenis writes to and R3F reads every frame
with no re-renders.

Next to add when you're ready: floating tool chips in the hero,
real project data in the work list, about/contact sections.
