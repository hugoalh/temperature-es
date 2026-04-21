# Temperature (ES)

[**⚖️** MIT](./LICENSE.md)

🔗
[GitHub](https://github.com/hugoalh/temperature-es)
[JSR](https://jsr.io/@hugoalh/temperature)
[NPM](https://www.npmjs.com/package/@hugoalh/temperature)

An ECMAScript module to convert between units of the temperature.

These units of the temperature are supported:

|  |  | **Names** | **Symbols** |
|:-:|:--|:--|:--|
| ***\[SI\]*** | **Kelvin** | `Kelvin` | `K` |
|  | **Celsius** | `Celsius` | `°C` / `C` |
|  | **Delisle** | `Delisle` | `°De` / `De` / `D` |
|  | **Fahrenheit** | `Fahrenheit` | `°F` / `F` |
|  | **Newton \*** | `Newton` | `°N` / `N` |
|  | **Rankine** | `Rankine` | `°R` / `R` / `Ra` |
|  | **Réaumur** | `Réaumur` / `Reaumur` | `°Ré` / `Re` / `r` |
|  | **Rømer** | `Rømer` / `Roemer` / `Romer` | `°Rø` / `Ro` |

> **\*** Sir Isaac Newton's degree of temperature

## 🔰 Begin

### 🎯 Targets

| **Runtime \\ Source** | **GitHub Raw** | **JSR** | **NPM** |
|:--|:-:|:-:|:-:|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ✔️ | ✔️ |
| **[Deno](https://deno.land/)** >= v2.1.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v20.9.0 | ❌ | ✔️ | ✔️ |

### #️⃣ Resources Identifier

- GitHub Raw
  ```
  https://raw.githubusercontent.com/hugoalh/temperature-es/{Tag}/mod.ts
  ```
- JSR
  ```
  jsr:@hugoalh/temperature[@{Tag}]
  ```
- NPM
  ```
  npm:@hugoalh/temperature[@{Tag}]
  ```

> [!NOTE]
> - It is recommended to include tag for immutability.
> - These are not part of the public APIs hence should not be used:
>   - Benchmark/Test file (e.g.: `example.bench.ts`, `example.test.ts`).
>   - Entrypoint name or path include any underscore prefix (e.g.: `_example.ts`, `foo/_example.ts`).
>   - Identifier/Namespace/Symbol include any underscore prefix (e.g.: `_example`, `Foo._example`).

### 🛡️ Runtime Permissions

*This module does not request any runtime permission.*

## 🧩 APIs

- ```ts
  class Temperature {
    constructor(fromValue: number, fromUnit?: TemperatureUnitsInputs);
    toObject(): Record<TemperatureUnitsSymbolASCII, number>;
    toString(toUnit?: TemperatureUnitsInputs): string;
    toValue(toUnit?: TemperatureUnitsInputs): number;
    static unit(unit?: TemperatureUnitsInputs): TemperatureUnitMeta;
    static units(): TemperatureUnitMeta[];
  }
  ```

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/doc/)
>   - [JSR](https://jsr.io/@hugoalh/temperature)

## ✍️ Examples

- ```ts
  new Temperature(25, "C").toValue();
  //=> 298.15
  ```
- ```ts
  new Temperature(25, "C").toString();
  //=> "298.15 K"
  ```
- ```ts
  new Temperature(298.15).toValue("C");
  //=> 25
  ```
- ```ts
  new Temperature(298.15).toString("C");
  //=> "25 °C"
  ```

## 📚 Guides

- Wikipedia
  - [Conversion of scales of temperature](https://en.wikipedia.org/wiki/Conversion_of_scales_of_temperature)
