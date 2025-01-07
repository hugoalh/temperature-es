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
	| "Reaumur"
	| "Réaumur"
	| "Roemer"
	| "Romer"
	| "Rømer";
/**
 * Symbols of all of the supported temperature units.
 */
export type TemperatureUnitsSymbols =
	| "°C"
	| "°De"
	| "°F"
	| "°N"
	| "°R"
	| "°Ré"
	| "°Rø"
	| "D"
	| "K"
	| "r"
	| "Ra";
/**
 * Inputs of all of the supported temperature units.
 */
export type TemperatureUnitsInputs = TemperatureUnitsSymbolASCII | TemperatureUnitsNames | TemperatureUnitsSymbols;
export interface TemperatureUnitMeta<A extends string = string, N extends string[] | readonly string[] = string[], S extends string[] | readonly string[] = string[]> {
	/**
	 * Whether is the SI unit (International System of Units) of the temperature.
	 */
	isSIUnit: boolean;
	/**
	 * Names of the temperature unit. The standard name is at the first index.
	 */
	names: N;
	/**
	 * ASCII symbol of the temperature unit. Majorly use for internal index.
	 */
	symbolASCII: A;
	/**
	 * Symbols of the temperature unit. The standard symbol is at the first index.
	 */
	symbols: S;
}
interface UnitInfo extends Omit<TemperatureUnitMeta<TemperatureUnitsSymbolASCII, readonly TemperatureUnitsNames[], readonly TemperatureUnitsSymbols[]>, "isSIUnit"> {
	fromSI: (valueSI: number) => number;
	toSI: (valueCurrent: number) => number;
}
const units: readonly Readonly<UnitInfo>[] = [
	{
		names: ["Celsius"],
		symbolASCII: "C",
		symbols: ["°C"],
		fromSI(valueSI: number): number {
			return (valueSI - 273.15);
		},
		toSI(valueCurrent: number): number {
			return (valueCurrent + 273.15);
		}
	},
	{
		names: ["Delisle"],
		symbolASCII: "De",
		symbols: ["°De", "D"],
		fromSI(valueSI: number): number {
			return ((373.15 - valueSI) * 1.5);
		},
		toSI(valueCurrent: number): number {
			return (373.15 - valueCurrent / 1.5);
		}
	},
	{
		names: ["Fahrenheit"],
		symbolASCII: "F",
		symbols: ["°F"],
		fromSI(valueSI: number): number {
			return (valueSI * 1.8 - 459.67);
		},
		toSI(valueCurrent: number): number {
			return ((valueCurrent + 459.67) / 1.8);
		}
	},
	{
		names: ["Kelvin"],
		symbolASCII: "K",
		symbols: ["K"],
		fromSI(valueSI: number): number {
			return valueSI;
		},
		toSI(valueCurrent: number): number {
			return valueCurrent;
		}
	},
	{
		names: ["Newton"],
		symbolASCII: "N",
		symbols: ["°N"],
		fromSI(valueSI: number): number {
			return ((valueSI - 273.15) * 0.33);
		},
		toSI(valueCurrent: number): number {
			return (valueCurrent / 0.33 + 273.15);
		}
	},
	{
		names: ["Rankine"],
		symbolASCII: "R",
		symbols: ["°R", "Ra"],
		fromSI(valueSI: number): number {
			return (valueSI * 1.8);
		},
		toSI(valueCurrent: number): number {
			return (valueCurrent / 1.8);
		}
	},
	{
		names: ["Réaumur", "Reaumur"],
		symbolASCII: "Re",
		symbols: ["°Ré", "r"],
		fromSI(valueSI: number): number {
			return ((valueSI - 273.15) * 0.8);
		},
		toSI(valueCurrent: number): number {
			return (valueCurrent * 1.25 + 273.15);
		}
	},
	{
		names: ["Rømer", "Roemer", "Romer"],
		symbolASCII: "Ro",
		symbols: ["°Rø"],
		fromSI(valueSI: number): number {
			return ((valueSI - 273.15) * 0.525 + 7.5);
		},
		toSI(valueCurrent: number): number {
			return ((valueCurrent - 7.5) / 0.525 + 273.15);
		}
	}
];
const unitSI: TemperatureUnitsSymbolASCII = "K";
/**
 * Resolve unit input.
 * @param {string} parameterName Name of the parameter.
 * @param {string} input Input.
 * @returns {Readonly<UnitInfo>} ASCII symbol of the unit.
 */
function resolveUnitInput(parameterName: string, input: string): Readonly<UnitInfo> {
	for (const unit of units) {
		if (
			input === unit.symbolASCII ||
			unit.names.includes(input as TemperatureUnitsNames) ||
			unit.symbols.includes(input as TemperatureUnitsSymbols)
		) {
			return unit;
		}
	}
	throw new RangeError(`\`${input}\` (parameter \`${parameterName}\`) is not a supported temperature unit! Only accept these values: ${Array.from(new Set<string>(units.flatMap(({
		names,
		symbolASCII,
		symbols
	}: Readonly<UnitInfo>): string[] => {
		return [...names, symbolASCII, ...symbols];
	})).values()).sort().join(", ")}`);
}
/**
 * Resolve unit meta.
 * @param {TemperatureUnitsSymbolASCII} input Input.
 * @returns {TemperatureUnitMeta} Meta of the unit.
 */
function resolveUnitMeta(input: TemperatureUnitsSymbolASCII): TemperatureUnitMeta {
	const {
		names,
		symbols
	} = resolveUnitInput("$internal", input);
	return {
		isSIUnit: input === unitSI,
		names: [...names],
		symbolASCII: input,
		symbols: [...symbols]
	};
}
/**
 * Convert between units of the temperature.
 */
export class Temperature {
	#table: Map<TemperatureUnitsSymbolASCII, number> = new Map<TemperatureUnitsSymbolASCII, number>();
	/**
	 * @param {number} fromValue From value.
	 * @param {TemperatureUnitsInputs} [fromUnit="K"] From unit.
	 */
	constructor(fromValue: number, fromUnit: TemperatureUnitsInputs = "K") {
		if (Number.isNaN(fromValue)) {
			throw new RangeError(`\`${fromValue}\` (parameter \`fromValue\`) is not a number!`);
		}
		const fromUnitInfo: Readonly<UnitInfo> = resolveUnitInput("fromUnit", fromUnit);
		this.#table.set(fromUnitInfo.symbolASCII, fromValue);
		if (fromUnitInfo.symbolASCII !== unitSI) {
			this.#table.set(unitSI, fromUnitInfo.toSI(fromValue));
		}
		for (const unit of units) {
			if (!this.#table.has(unit.symbolASCII)) {
				this.#table.set(unit.symbolASCII, unit.fromSI(this.#table.get(unitSI)!));
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
	 * @param {TemperatureUnitsInputs} [toUnit="K"] To unit.
	 * @returns {string} Value of the unit with standard symbol.
	 */
	toString(toUnit: TemperatureUnitsInputs = "K"): string {
		const {
			symbolASCII,
			symbols
		}: Readonly<UnitInfo> = resolveUnitInput("toUnit", toUnit);
		return `${this.#table.get(symbolASCII)!} ${symbols[0]}`;
	}
	/**
	 * Get value of the unit.
	 * @param {TemperatureUnitsInputs} [toUnit="K"] To unit.
	 * @returns {number} Value of the unit.
	 */
	toValue(toUnit: TemperatureUnitsInputs = "K"): number {
		return this.#table.get(resolveUnitInput("toUnit", toUnit).symbolASCII)!;
	}
	/**
	 * Get meta of the unit.
	 * @param {TemperatureUnitsInputs} [unit="K"] Unit.
	 * @returns {TemperatureUnitMeta} Meta of the unit.
	 */
	static unit(unit: TemperatureUnitsInputs = "K"): TemperatureUnitMeta {
		return resolveUnitMeta(resolveUnitInput("unit", unit).symbolASCII);
	}
	/**
	 * Get meta of the units.
	 * @returns {TemperatureUnitMeta[]} Meta of the units.
	 */
	static units(): TemperatureUnitMeta[] {
		return units.map(({ symbolASCII }: Readonly<UnitInfo>): TemperatureUnitMeta => {
			return resolveUnitMeta(symbolASCII);
		});
	}
}
export default Temperature;
/**
 * Convert between units of the temperature.
 * @param {number} fromValue From value.
 * @param {TemperatureUnitsInputs} [fromUnit="K"] From unit.
 * @param {TemperatureUnitsInputs} [toUnit="K"] To unit.
 * @returns {number} Value of the unit.
 */
export function convertTemperature(fromValue: number, fromUnit: TemperatureUnitsInputs = "K", toUnit: TemperatureUnitsInputs = "K"): number {
	return new Temperature(fromValue, fromUnit).toValue(toUnit);
}
