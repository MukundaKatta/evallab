import { describe, it, expect } from "vitest";
import { Evallab } from "../src/core.js";
describe("Evallab", () => {
  it("init", () => { expect(new Evallab().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Evallab(); await c.process(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Evallab(); await c.process(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
