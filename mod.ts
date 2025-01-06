/**
 * ASCII symbol of all of the supported temperature units.
 */
export type TemperatureUnitsSymbolASCII =
	| "C"
	| "De"
	| "F"
	| "K"
	| "N"
	| "R"
	| "Re"
	| "Ro";
const unitsSymbolASCII: readonly TemperatureUnitsSymbolASCII[] = ["C", "De", "F", "K", "N", "R", "Re", "Ro"];
const unitSI: TemperatureUnitsSymbolASCII = "K";
/**
 * Names of all of the supported temperature units.
 */
export type TemperatureUnitsNames =
	| "Celsius"
	| "Delisle"
	| "Fahrenheit"
	| "Kelvin"
	| "Newton"
	| "Rankine"
	| "Réaumur"
	| "Reaumur"
	| "Rømer"
	| "Roemer"
	| "Romer";
const unitsNames: Record<TemperatureUnitsSymbolASCII, readonly TemperatureUnitsNames[]> = {
	C: ["Celsius"],
	De: ["Delisle"],
	F: ["Fahrenheit"],
	K: ["Kelvin"],
	N: ["Newton"],
	R: ["Rankine"],
	Re: ["Réaumur", "Reaumur"],
	Ro: ["Rømer", "Roemer", "Romer"]
};
/**
 * Symbols of all of the supported temperature units.
 */
export type TemperatureUnitsSymbols =
	| "°C"
	| "°De"
	| "D"
	| "°F"
	| "K"
	| "°N"
	| "°R"
	| "Ra"
	| "°Ré"
	| "r"
	| "°Rø";
const unitsSymbols: Record<TemperatureUnitsSymbolASCII, readonly TemperatureUnitsSymbols[]> = {
	C: ["°C"],
	De: ["°De", "D"],
	F: ["°F"],
	K: ["K"],
	N: ["°N"],
	R: ["°R", "Ra"],
	Re: ["°Ré", "r"],
	Ro: ["°Rø"]
};
export type TemperatureUnitsInput = TemperatureUnitsSymbolASCII | TemperatureUnitsNames | TemperatureUnitsSymbols;
const unitsInputs: Record<TemperatureUnitsSymbolASCII, readonly TemperatureUnitsInput[]> = Object.fromEntries(unitsSymbolASCII.map((unitSymbolASCII: TemperatureUnitsSymbolASCII): [TemperatureUnitsSymbolASCII, readonly TemperatureUnitsInput[]] => {
	return [unitSymbolASCII, [unitSymbolASCII, ...unitsNames[unitSymbolASCII], ...unitsSymbols[unitSymbolASCII]]];
})) as Record<TemperatureUnitsSymbolASCII, readonly TemperatureUnitsInput[]>;
interface UnitConverter {
	fromSI: (valueSI: number) => number;
	toSI: (valueCurrent: number) => number;
}
const unitsConverters: Record<TemperatureUnitsSymbolASCII, UnitConverter> = {
	C: {
		fromSI(valueSI: number): number {
			return (valueSI - 273.15);
		},
		toSI(valueCurrent: number): number {
			return (valueCurrent + 273.15);
		}
	},
	De: {
		fromSI(valueSI: number): number {
			return ((373.15 - valueSI) * 1.5);
		},
		toSI(valueCurrent: number): number {
			return (373.15 - valueCurrent / 1.5);
		}
	},
	F: {
		fromSI(valueSI: number): number {
			return (valueSI * 1.8 - 459.67);
		},
		toSI(valueCurrent: number): number {
			return ((valueCurrent + 459.67) / 1.8);
		}
	},
	K: {
		fromSI(valueSI: number): number {
			return valueSI;
		},
		toSI(valueCurrent: number): number {
			return valueCurrent;
		}
	},
	N: {
		fromSI(valueSI: number): number {
			return ((valueSI - 273.15) * 0.33);
		},
		toSI(valueCurrent: number): number {
			return (valueCurrent / 0.33 + 273.15);
		}
	},
	R: {
		fromSI(valueSI: number): number {
			return (valueSI * 1.8);
		},
		toSI(valueCurrent: number): number {
			return (valueCurrent / 1.8);
		}
	},
	Re: {
		fromSI(valueSI: number): number {
			return ((valueSI - 273.15) * 0.8);
		},
		toSI(valueCurrent: number): number {
			return (valueCurrent * 1.25 + 273.15);
		}
	},
	Ro: {
		fromSI(valueSI: number): number {
			return ((valueSI - 273.15) * 0.525 + 7.5);
		},
		toSI(valueCurrent: number): number {
			return ((valueCurrent - 7.5) / 0.525 + 273.15);
		}
	}
};
export interface TemperatureUnitMeta {
	/**
	 * Whether is the SI unit (International System of Units) of the temperature.
	 */
	isSIUnit: boolean;
	/**
	 * Names of the temperature unit. The standard name is at the first index.
	 */
	names: string[];
	/**
	 * ASCII symbol of the temperature unit. Majorly use for internal index.
	 */
	symbolASCII: string;
	/**
	 * Symbols of the temperature unit. The standard symbol is at the first index.
	 */
	symbols: string[];
}
/**
 * Resolve unit input as ASCII symbol of the unit.
 * @param {string} parameterName Name of the parameter.
 * @param {string} input Input.
 * @returns {TemperatureUnitsSymbolASCII} ASCII symbol of the unit.
 */
function resolveUnitInput(parameterName: string, input: string): TemperatureUnitsSymbolASCII {
	for (const [key, value] of Object.entries(unitsInputs)) {
		if (value.includes(input as TemperatureUnitsInput)) {
			return key as TemperatureUnitsSymbolASCII;
		}
	}
	throw new RangeError(`\`${input}\` (parameter \`${parameterName}\`) is not a supported temperature unit! Only accept these values: ${Array.from(new Set<string>(Object.values(unitsInputs).flat())).sort().join(", ")}`);
}
/**
 * Resolve unit meta.
 * @param {TemperatureUnitsSymbolASCII} input Input.
 * @returns {TemperatureUnitMeta} Meta of the unit.
 */
function resolveUnitMeta(input: TemperatureUnitsSymbolASCII): TemperatureUnitMeta {
	return {
		isSIUnit: input === unitSI,
		names: [...unitsNames[input]],
		symbolASCII: input,
		symbols: [...unitsSymbols[input]]
	};
}
/**
 * Convert between units of the temperature.
 */
export class Temperature {
	#table: Map<TemperatureUnitsSymbolASCII, number> = new Map<TemperatureUnitsSymbolASCII, number>();
	/**
	 * @param {number} fromValue From value.
	 * @param {TemperatureUnitsInput} [fromUnit="K"] From unit.
	 */
	constructor(fromValue: number, fromUnit: TemperatureUnitsInput = "K") {
		if (Number.isNaN(fromValue)) {
			throw new RangeError(`\`${fromValue}\` (parameter \`fromValue\`) is not a number!`);
		}
		const fromUnitSymbolASCII: TemperatureUnitsSymbolASCII = resolveUnitInput("fromUnit", fromUnit);
		this.#table.set(fromUnitSymbolASCII, fromValue);
		if (fromUnitSymbolASCII !== unitSI) {
			this.#table.set(unitSI, unitsConverters[fromUnitSymbolASCII].toSI(fromValue));
		}
		for (const [unitSymbolASCII, unitConverter] of Object.entries(unitsConverters)) {
			if (!this.#table.has(unitSymbolASCII as TemperatureUnitsSymbolASCII)) {
				this.#table.set(unitSymbolASCII as TemperatureUnitsSymbolASCII, unitConverter.fromSI(this.#table.get(unitSI)!));
			}
		}
	}
	/**
	 * Get values of all of the units.
	 * @returns {Record<TemperatureUnitsSymbolASCII, number>} Values of all of the units.
	 */
	toObject(): Record<TemperatureUnitsSymbolASCII, number> {
		return Object.fromEntries(this.#table.entries()) as Record<TemperatureUnitsSymbolASCII, number>;
	}
	/**
	 * Get value of the unit with standard symbol.
	 * @param {TemperatureUnitsInput} [toUnit="K"] To unit.
	 * @returns {string} Value of the unit with standard symbol.
	 */
	toString(toUnit: TemperatureUnitsInput = "K"): string {
		const toUnitSymbolASCII: TemperatureUnitsSymbolASCII = resolveUnitInput("toUnit", toUnit);
		return `${this.#table.get(toUnitSymbolASCII)!} ${unitsSymbols[toUnitSymbolASCII][0]}`;
	}
	/**
	 * Get value of the unit.
	 * @param {TemperatureUnitsInput} [toUnit="K"] To unit.
	 * @returns {number} Value of the unit.
	 */
	toValue(toUnit: TemperatureUnitsInput = "K"): number {
		return this.#table.get(resolveUnitInput("toUnit", toUnit))!;
	}
	/**
	 * Get meta of the unit.
	 * @param {TemperatureUnitsInput} [unit="K"] Unit.
	 * @returns {TemperatureUnitMeta} Meta of the unit.
	 */
	static unit(unit: TemperatureUnitsInput = "K"): TemperatureUnitMeta {
		return resolveUnitMeta(resolveUnitInput("unit", unit));
	}
	/**
	 * Get meta of the units.
	 * @returns {TemperatureUnitMeta[]} Meta of the units.
	 */
	static units(): TemperatureUnitMeta[] {
		return unitsSymbolASCII.map((key: TemperatureUnitsSymbolASCII): TemperatureUnitMeta => {
			return resolveUnitMeta(key);
		});
	}
}
export default Temperature;
/**
 * Convert between units of the temperature.
 * @param {number} fromValue From value.
 * @param {TemperatureUnitsInput} [fromUnit="K"] From unit.
 * @param {TemperatureUnitsInput} [toUnit="K"] To unit.
 * @returns {number} Value of the unit.
 */
export function convertTemperature(fromValue: number, fromUnit: TemperatureUnitsInput = "K", toUnit: TemperatureUnitsInput = "K"): number {
	return new Temperature(fromValue, fromUnit).toValue(toUnit);
}
