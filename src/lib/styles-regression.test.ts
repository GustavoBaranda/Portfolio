import assert from "node:assert/strict";
import { test } from "node:test";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";
import { COLOR_MAP } from "../data/aboutData";

function rgb(hex: string) {
  return [0, 2, 4].map((start) => parseInt(hex.replace("#", "").slice(start, start + 2), 16));
}
function contrast(a: number[], b: number[]) {
  const luminance = (color: number[]) => color.map((n) => {
    const s = n / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  }).reduce((sum, n, i) => sum + n * [0.2126, 0.7152, 0.0722][i], 0);
  const x = luminance(a), y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}
function colorClass(classes: string, kind: string, dark: boolean) {
  const tokens = classes.split(" ");
  const token = tokens.find((s) => s.startsWith(`${dark ? "dark:" : ""}${kind}-`)) ?? tokens.find((s) => s.startsWith(`${kind}-`))!;
  const hex = token.match(/\[#([0-9a-f]+)\]/i)?.[1] ?? (token.includes("white") ? "ffffff" : "0f172a");
  return { color: rgb(hex), alpha: Number(token.match(/\/(\d+)$/)?.[1] ?? 100) / 100 };
}

test("experience and education text palettes meet 4.5:1 on their declared card and chip backgrounds", () => {
  for (const [name, scheme] of Object.entries(COLOR_MAP)) {
    for (const dark of [false, true]) {
      const base = rgb(dark ? "111b2e" : "f8fafc");
      for (const [textClasses, background] of [[scheme.heading, ""], [scheme.badge, scheme.badge], [scheme.skillText, scheme.skillBg]]) {
        const text = colorClass(textClasses, "text", dark).color;
        const bg = background ? colorClass(background, "bg", dark) : { color: base, alpha: 1 };
        const composite = bg.color.map((n, i) => n * bg.alpha + base[i] * (1 - bg.alpha));
        const ratio = contrast(text, composite);
        assert.ok(ratio >= 4.5, `${name} ${dark ? "dark" : "light"} ${textClasses}: ${ratio.toFixed(2)}`);
      }
    }
  }
});

test("semantic text and input boundaries retain contrast on both theme surfaces", async () => {
  const css = postcss.parse(await readFile(resolve("src/app/globals.css"), "utf8"));
  const themes: Map<string, string>[] = [];
  const contactBorders: string[] = [];
  css.walkRules((rule) => {
    if (rule.selector === ":root" || rule.selector.startsWith(":root.dark")) {
      const vars = new Map<string, string>();
      rule.walkDecls((decl) => { vars.set(decl.prop, decl.value); });
      themes.push(vars);
    }
    if (rule.selector === "#contact" || rule.selector.endsWith(' #contact')) {
      rule.walkDecls("--contact-field-border", (decl) => { contactBorders.push(decl.value); });
    }
  });
  assert.equal(themes.length, 2);
  assert.deepEqual(contactBorders, ["#8491a3", "#64748b"]);
  for (const [index, theme] of themes.entries()) {
    for (const background of ["--canvas", "--surface", "--surface-card"]) {
      for (const foreground of ["--text", "--muted"]) {
        const ratio = contrast(rgb(theme.get(foreground)!), rgb(theme.get(background)!));
        assert.ok(ratio >= 4.5, `${foreground} on ${background}: ${ratio.toFixed(2)}`);
      }
    }
    assert.ok(contrast(rgb(theme.get("--muted")!), rgb(theme.get("--surface")!)) >= 3);
    for (const background of ["--surface", "--surface-card"]) {
      const ratio = contrast(rgb(contactBorders[index]), rgb(theme.get(background)!));
      assert.ok(ratio >= 3, `contact border on ${background}: ${ratio.toFixed(2)}`);
    }
  }
});

test("contact fields use soft semantic borders with distinct interaction states", async () => {
  const source = await readFile(resolve("src/app/globals.css"), "utf8");
  const root = postcss.parse(source);
  const declarations = new Map<string, Map<string, string>>();
  root.walkRules((rule) => {
    if (!rule.selector.includes("#contact form")) return;
    const values = new Map<string, string>();
    rule.walkDecls((decl) => { values.set(decl.prop, decl.value); });
    declarations.set(rule.selector, values);
  });

  const base = declarations.get('#contact form :is(input, textarea):not([name="company"])');
  assert.equal(base?.get("border-color"), "var(--contact-field-border)");
  assert.match(base?.get("transition") ?? "", /border-color 180ms ease/);

  const hover = [...declarations].find(([selector]) => selector.includes(":hover:not(:focus):not(:disabled)"))?.[1];
  assert.equal(hover?.get("border-color"), "color-mix(in srgb, var(--contact-field-border) 75%, var(--accent))");
  const focus = [...declarations].find(([selector]) => selector.includes(":focus:not([aria-invalid"))?.[1];
  assert.equal(focus?.get("border-color"), "var(--accent)");
  const disabled = [...declarations].find(([selector]) => selector.endsWith(":disabled"))?.[1];
  assert.equal(disabled?.get("background-color"), "var(--surface-card)");
  assert.equal(disabled?.get("opacity"), "0.65");

  assert.doesNotMatch(source, /not\(\[aria-invalid="true"\]\):not\(:focus\)[^{]*\{[\s\S]*?border-color:\s*var\(--muted\)/);
  assert.match(source, /\[aria-invalid="true"\][^{]*\{\s*border-color: #e11d48;/);
  assert.match(source, /data-theme="dark"[^{]*aria-invalid="true"[^{]*\{[\s\S]*?border-color: #fb7185;/);
});

test("hamburger keeps its header slot geometry without CSS overriding its Motion keyframes", async () => {
  const root = postcss.parse(await readFile(resolve("src/app/globals.css"), "utf8"));
  let control = false;
  root.walkRules((rule) => {
    if (rule.selector === ".mobile-navigation-dialog > .mobile-menu-control") {
      control = true;
      const dimensions = new Map<string, string>();
      rule.walkDecls((decl) => { dimensions.set(decl.prop, decl.value); });
      assert.equal(dimensions.get("width"), "2.5rem");
      assert.equal(dimensions.get("height"), "2.5rem");
    }
    if (rule.selector.includes(".menu-toggle")) {
      rule.walkDecls((decl) => {
        assert.ok(!["transform", "rotate", "top", "left", "opacity", "border-width"].includes(decl.prop));
      });
    }
  });
  assert.equal(control, true);
});

test("Tailwind actually generates semantic, alpha and dark utilities from the global stylesheet", async () => {
  const from = resolve("src/app/globals.css");
  const { css } = await postcss([tailwind({ base: process.cwd(), optimize: false })]).process(await readFile(from, "utf8"), { from });
  const root = postcss.parse(css);
  const expected = new Map([
    [".text-foreground", ["color", "var(--text)"]],
    [".text-muted", ["color", "var(--muted)"]],
    [".text-muted-foreground", ["color", "var(--muted)"]],
    [".bg-border", ["background-color", "var(--border)"]],
    [".ring-offset-background", ["--tw-ring-offset-color", "var(--canvas)"]],
  ]);
  root.walkRules((rule) => {
    const wanted = expected.get(rule.selector);
    if (wanted && rule.nodes.some((node) => node.type === "decl" && node.prop === wanted[0] && node.value === wanted[1])) expected.delete(rule.selector);
  });
  assert.deepEqual([...expected.keys()], []);
  assert.ok(css.includes(".border-soft\\/50"));
  assert.ok(css.includes(".text-foreground\\/80"));
  assert.ok(css.includes("[data-theme=\"dark\"]") || css.includes("[data-theme=dark]"));
  assert.ok(css.includes("prefers-reduced-motion: reduce"));
});
