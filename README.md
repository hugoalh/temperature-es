# Temperature (ES)

[**⚖️** MIT](./LICENSE.md)

🔗
[DistBoard @hugoalh](https://hugoalh.github.io/distboard/temperature_ecmascript)
● [GitHub](https://github.com/hugoalh/temperature-es)
● [JSR](https://jsr.io/@hugoalh/temperature)
● [NPM](https://www.npmjs.com/package/@hugoalh/temperature)

An ECMAScript module to convert between units of the temperature.

These units of the temperature are supported:

| **Unit** | **Keys** | **Symbols** |
|:--|:--|:--|
| Kelvin **\[SI\]** | `Kelvin` | `K` |
| Celsius | `Celsius` | `°C` / `C` |
| Delisle | `Delisle` | `°De` / `De` / `D` |
| Fahrenheit | `Fahrenheit` | `°F` / `F` |
| Newton \* | `Newton` | `°N` / `N` |
| Rankine | `Rankine` | `°R` / `R` / `Ra` |
| Réaumur | `Réaumur` / `Reaumur` | `°Ré` / `Re` / `r` |
| Rømer | `Rømer` / `Roemer` / `Romer` | `°Rø` / `Ro` |

**\*** Sir Isaac Newton's degree of temperature

## 🎯 Runtime Targets

Any runtime which support ECMAScript should able to use this; These runtimes are officially supported:

- **[Bun](https://bun.sh/)** >= v1.1.0
- **[Deno](https://deno.land/)** >= v2.1.0
- **[NodeJS](https://nodejs.org/)** >= v20.9.0

## 🛡️ Runtime Permissions

This does not request any runtime permission.

## #️⃣ Entrypoints

| **Name** | **Path** | **Description** |
|:--|:--|:--|
| `.` | `./mod.ts` | Default. |

> [!NOTE]
> - Different runtimes have vary support for the entrypoints, visit the runtime documentation for more information.
> - These are not part of the public APIs hence should not be used:
>   - Benchmark/Test file (e.g.: `example.bench.ts`, `example.test.ts`).
>   - Entrypoint name or path include any underscore prefix (e.g.: `_example.ts`, `foo/_example.ts`).
>   - Identifier/Namespace/Symbol include any underscore prefix (e.g.: `_example`, `Foo._example`).

## 🧩 APIs

- ```ts
  class Temperature {
    constructor(fromValue: number, fromUnit: TemperatureUnitsInputs);
    toObject(): Record<TemperatureUnitsSymbolASCII, number>;
    toString(toUnit: TemperatureUnitsInputs): string;
    toValue(toUnit: TemperatureUnitsInputs): number;
  }
  ```

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/doc)
>   - [JSR](https://jsr.io/@hugoalh/temperature)

## ✍️ Examples

- ```ts
  const instance = new Temperature(25, "C");

  instance.toValue("K");
  //=> 298.15

  instance.toString("K");
  //=> "298.15 K"
  ```
- ```ts
  const instance = new Temperature(298.15, "K");
  
  instance.toValue("C");
  //=> 25

  instance.toString("C");
  //=> "25 °C"
  ```

## 📚 External Resources

- Wikipedia
  - [Conversion of scales of temperature](https://en.wikipedia.org/wiki/Conversion_of_scales_of_temperature)
