import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { readFile } from "node:fs/promises";
import AnimatedText from "../components/utils/AnimatedText";
import TransitionEffect from "../components/hero/TransitionEffect";

test("hero text and the opening curtain retain their original motion states", async () => {
  const html = renderToStaticMarkup(<AnimatedText text="Visible heading" as="h1" />);
  assert.match(html, /<h1\b/);
  assert.match(html, /opacity:0/);
  const curtain = renderToStaticMarkup(<TransitionEffect />);
  assert.equal([...curtain.matchAll(/class="absolute top-0 bottom-0 right-full w-screen/g)].length, 3);

  const animatedText = await readFile("src/components/utils/AnimatedText.tsx", "utf8");
  assert.match(animatedText, /delay: 0\.3, staggerChildren: 0\.08/);
  assert.match(animatedText, /initial: \{ opacity: 0, y: 50 \}/);
  assert.match(animatedText, /duration: 0\.9/);

  const transition = await readFile("src/components/hero/TransitionEffect.tsx", "utf8");
  assert.match(transition, /delay: 0\.2/);
  assert.match(transition, /delay: 0\.4/);
  assert.match(transition, /duration: 0\.8/);
  assert.match(transition, /initial=\{\{ x: "100%", width: "100%" \}\}/);
  assert.match(transition, /animate=\{\{ x: "0%", width: "0%" \}\}/);
});

test("logo restores its continuous four-second float for regular motion", async () => {
  const source = await readFile("src/components/hero/TiltImage.tsx", "utf8");
  assert.match(source, /animate=\{\{ y: reducedMotion \? 0 : \[0, -12, 0\] \}\}/);
  assert.match(source, /duration: 4/);
  assert.match(source, /repeat: reducedMotion \? 0 : Infinity/);
});
