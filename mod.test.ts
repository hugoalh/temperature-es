import { deepStrictEqual } from "node:assert";
import { Temperature } from "./mod.ts";
Deno.test("1", { permissions: "none" }, async (t) => {
	const instance = new Temperature(25, "C");
	console.log(instance.toObject());
	await t.step("To String", () => {
		deepStrictEqual(instance.toString("K"), "298.15 K");
	});
	await t.step("To Value", () => {
		deepStrictEqual(instance.toValue("K"), 298.15);
	});
});
Deno.test("2", { permissions: "none" }, async (t) => {
	const instance = new Temperature(298.15, "K");
	console.log(instance.toObject());
	await t.step("To String", () => {
		deepStrictEqual(instance.toString("C"), "25 °C");
	});
	await t.step("To Value", () => {
		deepStrictEqual(instance.toValue("C"), 25);
	});
});
