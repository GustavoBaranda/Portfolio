import assert from "node:assert/strict";
import { test } from "node:test";
import nodemailer from "nodemailer";
import { POST } from "../app/api/contact/route";

test("route uses SMTP acceptance and preserves HTML escaping without real mail", async (t) => {
  const names = ["EMAIL_USER", "EMAIL_PASS", "NEXT_PUBLIC_BASE_URL"] as const;
  const previous = Object.fromEntries(names.map((key) => [key, process.env[key]]));
  process.env.EMAIL_USER = "recipient@example.test";
  process.env.EMAIL_PASS = "fake-test-password";
  process.env.NEXT_PUBLIC_BASE_URL = "https://gustavobaranda.com";
  let accepted: string[] = ["recipient@example.test"];
  let rejected: string[] = [];
  let failure = false;
  const messages: Record<string, unknown>[] = [];
  const create = t.mock.method(nodemailer, "createTransport", () => ({
    sendMail: async (mail: Record<string, unknown>) => {
      messages.push(mail);
      if (failure) throw new Error("private-test-provider-error");
      return { accepted, rejected };
    },
  }) as unknown as ReturnType<typeof nodemailer.createTransport>);
  t.mock.method(console, "error", () => {});
  let sequence = 0;
  const submit = (body: unknown) => POST(new Request("https://gustavobaranda.com/api/contact", {
    method: "POST",
    headers: { origin: "https://gustavobaranda.com", "content-type": "application/json", "x-real-ip": `test-${sequence++}` },
    body: JSON.stringify(body),
  }));
  const valid = { nombre: "<b>Ada</b>", email: "ada@example.test", asunto: "Consulta", mensaje: '<img src=x onerror="alert(1)">', company: "" };
  try {
    await t.test("accepted recipient permits success and escapes the email", async () => {
      assert.equal((await submit(valid)).status, 200);
      assert.equal(messages.length, 1);
      assert.equal(messages[0].to, "recipient@example.test");
      assert.equal(messages[0].replyTo, "ada@example.test");
      const html = String(messages[0].html);
      assert.ok(html.includes("&lt;b&gt;Ada&lt;/b&gt;"));
      assert.ok(html.includes("&lt;img"));
      assert.ok(!html.includes("<img"));
    });
    await t.test("empty or rejected acceptance never reports success", async () => {
      accepted = [];
      assert.equal((await submit(valid)).status, 503);
      accepted = ["recipient@example.test"];
      rejected = ["recipient@example.test"];
      assert.equal((await submit(valid)).status, 503);
    });
    await t.test("SMTP exception remains an error", async () => {
      failure = true;
      const response = await submit(valid);
      assert.equal(response.status, 503);
      assert.ok(!(await response.text()).includes("private-test-provider-error"));
    });
    await t.test("missing configuration does not create a transport", async () => {
      const count = create.mock.callCount();
      delete process.env.EMAIL_PASS;
      assert.equal((await submit(valid)).status, 503);
      assert.equal(create.mock.callCount(), count);
    });
    await t.test("invalid payload never reaches SMTP", async () => {
      const count = create.mock.callCount();
      assert.equal((await submit(null)).status, 400);
      assert.equal(create.mock.callCount(), count);
    });
  } finally {
    for (const key of names) {
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
    }
  }
});
