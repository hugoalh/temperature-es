# Temperature (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh/temperature-es](https://img.shields.io/github/v/release/hugoalh/temperature-es?label=hugoalh/temperature-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh/temperature-es")](https://github.com/hugoalh/temperature-es)
[![JSR: @hugoalh/temperature](https://img.shields.io/jsr/v/@hugoalh/temperature?label=@hugoalh/temperature&labelColor=F7DF1E&logo=jsr&logoColor=000000&style=flat "JSR: @hugoalh/temperature")](https://jsr.io/@hugoalh/temperature)
[![NPM: @hugoalh/temperature](https://img.shields.io/npm/v/@hugoalh/temperature?label=@hugoalh/temperature&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/temperature")](https://www.npmjs.com/package/@hugoalh/temperature)

An ES (JavaScript & TypeScript) module to convert between units of the temperature.

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

|  | **Remote** | **JSR** | **NPM** |
|:--|:--|:--|:--|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ❓ | ✔️ |
| **[Cloudflare Workers](https://workers.cloudflare.com/)** | ❌ | ❓ | ✔️ |
| **[Deno](https://deno.land/)** >= v1.42.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v16.13.0 | ❌ | ❓ | ✔️ |

> [!NOTE]
> - It is possible to use this module in other methods/ways which not listed in here, however those methods/ways are not officially supported, and should beware maybe cause security issues.

### #️⃣ Resources Identifier

- **Remote - GitHub Raw:**
  ```
  https://raw.githubusercontent.com/hugoalh/temperature-es/{Tag}/mod.ts
  ```
- **JSR:**
  ```
  [jsr:]@hugoalh/temperature[@{Tag}]
  ```
- **NPM:**
  ```
  [npm:]@hugoalh/temperature[@{Tag}]
  ```

> [!NOTE]
> - For usage of remote resources, it is recommended to import the entire module with the main path `mod.ts`, however it is also able to import part of the module with sub path if available, but do not import if:
>
>   - it's path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
>   - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
>   - it's symbol has an underscore prefix (e.g.: `_bar`, `_foo`).
>
>   These elements are not considered part of the public API, thus no stability is guaranteed for them.
> - For usage of JSR or NPM resources, it is recommended to import the entire module with the main entrypoint, however it is also able to import part of the module with sub entrypoint if available, please visit the [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub entrypoints.
> - It is recommended to use this module with tag for immutability.

### 🛡️ Runtime Permissions

*This module does not request any runtime permission.*

## 🧩 APIs

- ```ts
  class Temperature {
    constructor(fromValue: number, fromUnit: TemperatureUnitsInputs = "K");
    toObject(): Record<TemperatureUnitsSymbolASCII, number>;
    toString(toUnit: TemperatureUnitsInputs = "K"): string;
    toValue(toUnit: TemperatureUnitsInputs = "K"): number;
    static unit(unit: TemperatureUnitsInputs = "K"): TemperatureUnitMeta;
    static units(): TemperatureUnitMeta[];
  }
  ```

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/documentation_generator/)
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
