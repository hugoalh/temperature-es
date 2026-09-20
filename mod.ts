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
export type TemperatureUnitsInputs =
	| TemperatureUnitsNames
	| TemperatureUnitsSymbolASCII
	| TemperatureUnitsSymbols;
const unitSI: TemperatureUnitsSymbolASCII = "K";
interface TemperatureUnitInfo {
	/**
	 * Names of the temperature unit. The standard name is at the first index.
	 */
	names: readonly TemperatureUnitsNames[];
	/**
	 * ASCII symbol of the temperature unit. Majorly use for internal index.
	 */
	symbolASCII: TemperatureUnitsSymbolASCII;
	/**
	 * Symbols of the temperature unit. The standard symbol is at the first index.
	 */
	symbols: readonly TemperatureUnitsSymbols[];
	convertFromSI: (valueSI: number) => number;
	convertToSI: (valueCurrent: number) => number;
}
const unitsInfo: readonly TemperatureUnitInfo[] = [
	{
		names: ["Kelvin"],
		symbolASCII: "K",
		symbols: ["K"],
		convertFromSI(valueSI: number): number {
			return valueSI;
		},
		convertToSI(valueCurrent: number): number {
			return valueCurrent;
		}
	},
	{
		names: ["Celsius"],
		symbolASCII: "C",
		symbols: ["°C"],
		convertFromSI(valueSI: number): number {
			return (valueSI - 273.15);
		},
		convertToSI(valueCurrent: number): number {
			return (valueCurrent + 273.15);
		}
	},
	{
		names: ["Delisle"],
		symbolASCII: "De",
		symbols: ["°De", "D"],
		convertFromSI(valueSI: number): number {
			return ((373.15 - valueSI) * 1.5);
		},
		convertToSI(valueCurrent: number): number {
			return (373.15 - valueCurrent / 1.5);
		}
	},
	{
		names: ["Fahrenheit"],
		symbolASCII: "F",
		symbols: ["°F"],
		convertFromSI(valueSI: number): number {
			return (valueSI * 1.8 - 459.67);
		},
		convertToSI(valueCurrent: number): number {
			return ((valueCurrent + 459.67) / 1.8);
		}
	},
	{
		names: ["Newton"],
		symbolASCII: "N",
		symbols: ["°N"],
		convertFromSI(valueSI: number): number {
			return ((valueSI - 273.15) * 0.33);
		},
		convertToSI(valueCurrent: number): number {
			return (valueCurrent / 0.33 + 273.15);
		}
	},
	{
		names: ["Rankine"],
		symbolASCII: "R",
		symbols: ["°R", "Ra"],
		convertFromSI(valueSI: number): number {
			return (valueSI * 1.8);
		},
		convertToSI(valueCurrent: number): number {
			return (valueCurrent / 1.8);
		}
	},
	{
		names: ["Réaumur", "Reaumur"],
		symbolASCII: "Re",
		symbols: ["°Ré", "r"],
		convertFromSI(valueSI: number): number {
			return ((valueSI - 273.15) * 0.8);
		},
		convertToSI(valueCurrent: number): number {
			return (valueCurrent * 1.25 + 273.15);
		}
	},
	{
		names: ["Rømer", "Roemer", "Romer"],
		symbolASCII: "Ro",
		symbols: ["°Rø"],
		convertFromSI(valueSI: number): number {
			return ((valueSI - 273.15) * 0.525 + 7.5);
		},
		convertToSI(valueCurrent: number): number {
			return ((valueCurrent - 7.5) / 0.525 + 273.15);
		}
	}
];
function resolveUnitInput(parameterName: string, input: string): TemperatureUnitInfo {
	for (const unitInfo of unitsInfo) {
		if (
			input === unitInfo.symbolASCII ||
			unitInfo.names.includes(input as TemperatureUnitsNames) ||
			unitInfo.symbols.includes(input as TemperatureUnitsSymbols)
		) {
			return unitInfo;
		}
	}
	throw new RangeError(`\`${input}\` (parameter \`${parameterName}\`) is not a supported temperature unit! Only accept these values: ${Array.from(new Set<string>(unitsInfo.flatMap(({
		names,
		symbolASCII,
		symbols
	}: TemperatureUnitInfo): string[] => {
		return [...names, symbolASCII, ...symbols];
	})).values()).sort().join(", ")}`);
}
/**
 * Convert between units of the temperature.
 */
export class Temperature {
	get [Symbol.toStringTag](): string {
		return "Temperature";
	}
	#table: Map<TemperatureUnitsSymbolASCII, number> = new Map<TemperatureUnitsSymbolASCII, number>();
	/**
	 * Initialize.
	 * @param {number} fromValue From value.
	 * @param {TemperatureUnitsInputs} fromUnit From unit.
	 */
	constructor(fromValue: number, fromUnit: TemperatureUnitsInputs) {
		if (Number.isNaN(fromValue)) {
			throw new RangeError(`\`${fromValue}\` (parameter \`fromValue\`) is not a number!`);
		}
		const {
			convertToSI,
			symbolASCII
		}: TemperatureUnitInfo = resolveUnitInput("fromUnit", fromUnit);
		this.#table.set(symbolASCII, fromValue);
		if (symbolASCII !== unitSI) {
			this.#table.set(unitSI, convertToSI(fromValue));
		}
		for (const {
			convertFromSI,
			symbolASCII
		} of unitsInfo) {
			if (!this.#table.has(symbolASCII)) {
				this.#table.set(symbolASCII, convertFromSI(this.#table.get(unitSI)!));
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
	 * @param {TemperatureUnitsInputs} toUnit To unit.
	 * @returns {string} Value of the unit with standard symbol.
	 */
	toString(toUnit: TemperatureUnitsInputs): string {
		const {
			symbolASCII,
			symbols
		}: TemperatureUnitInfo = resolveUnitInput("toUnit", toUnit);
		return `${this.#table.get(symbolASCII)!} ${symbols[0]}`;
	}
	/**
	 * Get value of the unit.
	 * @param {TemperatureUnitsInputs} toUnit To unit.
	 * @returns {number} Value of the unit.
	 */
	toValue(toUnit: TemperatureUnitsInputs): number {
		return this.#table.get(resolveUnitInput("toUnit", toUnit).symbolASCII)!;
	}
}
export default Temperature;
