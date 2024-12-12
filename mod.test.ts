import { assertEquals } from "STD/assert/equals";
import { Temperature } from "./mod.ts";
Deno.test("Conversion 1", { permissions: "none" }, async (t) => {
	const temperatureRoomFromC = new Temperature(25, "C");
	await t.step("To Object", () => {
		console.log(temperatureRoomFromC.toObject());
	});
	await t.step("To String", () => {
		assertEquals(temperatureRoomFromC.toString(), "298.15 K");
	});
	await t.step("To Value", () => {
		assertEquals(temperatureRoomFromC.toValue(), 298.15);
	});
});
Deno.test("Conversion 2", { permissions: "none" }, async (t) => {
	const temperatureRoomFromF = new Temperature(298.15);
	await t.step("To Object", () => {
		console.log(temperatureRoomFromF.toObject());
	});
	await t.step("To String", () => {
		assertEquals(temperatureRoomFromF.toString("C"), "25 °C");
	});
	await t.step("To Value", () => {
		assertEquals(temperatureRoomFromF.toValue("C"), 25);
	});
});
Deno.test("Units Meta", { permissions: "none" }, () => {
	console.log(Temperature.units());
});
