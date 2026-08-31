import assert from "node:assert/strict";
import { test } from "node:test";
import {
  MIN_SUBMIT_MS,
  RATE_LIMIT_MAX,
  allowedOrigins,
  clientIp,
  escapeHtml,
  isAllowedOrigin,
  isHoneypot,
  isRateLimited,
  isTooFast,
  sanitizeHeader,
} from "./contact";

test("escapeHtml encodes markup", () => {
  assert.equal(
    escapeHtml(`<img src=x onerror="alert(1)">`),
    "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;"
  );
});

test("sanitizeHeader strips CR/LF", () => {
  assert.equal(sanitizeHeader("Hola\r\nBcc: victim@x.com"), "Hola Bcc: victim@x.com");
});

test("isHoneypot detects filled trap field", () => {
  assert.equal(isHoneypot(""), false);
  assert.equal(isHoneypot("   "), false);
  assert.equal(isHoneypot("Acme"), true);
});

test("isTooFast rejects missing, future and sub-2s timestamps", () => {
  const now = 10_000;
  assert.equal(isTooFast(undefined, now), true);
  assert.equal(isTooFast("nope", now), true);
  assert.equal(isTooFast(now - 500, now), true);
  assert.equal(isTooFast(now - MIN_SUBMIT_MS, now), false);
});

test("isRateLimited trips after max hits in the window", () => {
  const store = new Map<string, number[]>();
  const t0 = 1_000_000;
  assert.equal(isRateLimited("1.1.1.1", t0, store), false);
  assert.equal(isRateLimited("1.1.1.1", t0 + 1, store), false);
  assert.equal(isRateLimited("1.1.1.1", t0 + 2, store), false);
  assert.equal(isRateLimited("1.1.1.1", t0 + 3, store), true);
  assert.equal(RATE_LIMIT_MAX, 3);
});

test("clientIp prefers platform headers over spoofable first forwarded hop", () => {
  const headers = new Headers({
    "x-forwarded-for": "9.9.9.9, 1.1.1.1",
    "x-real-ip": "8.8.8.8",
  });
  assert.equal(clientIp(headers), "8.8.8.8");
});

test("isAllowedOrigin rejects missing origin and unknown hosts", () => {
  const opts = { baseUrl: "https://gustavobaranda.com", nodeEnv: "production" };
  assert.equal(isAllowedOrigin(null, opts), false);
  assert.equal(isAllowedOrigin("https://evil.test", opts), false);
  assert.equal(isAllowedOrigin("https://gustavobaranda.com", opts), true);
  assert.equal(
    allowedOrigins({ ...opts, vercelUrl: "preview.vercel.app" }).has(
      "https://preview.vercel.app"
    ),
    true
  );
});
