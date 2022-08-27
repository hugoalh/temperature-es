# Temperature (NodeJS)

[`Temperature.NodeJS`](https://github.com/hugoalh-studio/temperature-nodejs)
[![GitHub Contributors](https://img.shields.io/github/contributors/hugoalh-studio/temperature-nodejs?label=Contributors&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/temperature-nodejs/graphs/contributors)
[![GitHub Issues](https://img.shields.io/github/issues-raw/hugoalh-studio/temperature-nodejs?label=Issues&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/temperature-nodejs/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr-raw/hugoalh-studio/temperature-nodejs?label=Pull%20Requests&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/temperature-nodejs/pulls)
[![GitHub Discussions](https://img.shields.io/github/discussions/hugoalh-studio/temperature-nodejs?label=Discussions&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/temperature-nodejs/discussions)
[![GitHub Stars](https://img.shields.io/github/stars/hugoalh-studio/temperature-nodejs?label=Stars&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/temperature-nodejs/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/hugoalh-studio/temperature-nodejs?label=Forks&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/temperature-nodejs/network/members)
![GitHub Languages](https://img.shields.io/github/languages/count/hugoalh-studio/temperature-nodejs?label=Languages&logo=github&logoColor=ffffff&style=flat-square)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hugoalh-studio/temperature-nodejs?label=Grade&logo=codefactor&logoColor=ffffff&style=flat-square)](https://www.codefactor.io/repository/github/hugoalh-studio/temperature-nodejs)
[![License](https://img.shields.io/static/v1?label=License&message=MIT&style=flat-square)](./LICENSE.md)

| **Release** | **Latest** (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/temperature-nodejs?label=%20&style=flat-square)) | **Pre** (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh-studio/temperature-nodejs?label=%20&style=flat-square)) |
|:-:|:-:|:-:|
| [**GitHub**](https://github.com/hugoalh-studio/temperature-nodejs/releases) ![GitHub Total Downloads](https://img.shields.io/github/downloads/hugoalh-studio/temperature-nodejs/total?label=%20&style=flat-square) | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/temperature-nodejs?sort=semver&label=%20&style=flat-square) | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh-studio/temperature-nodejs?include_prereleases&sort=semver&label=%20&style=flat-square) |
| [**NPM**](https://www.npmjs.com/package/@hugoalh/temperature) ![NPM Total Downloads](https://img.shields.io/npm/dt/@hugoalh/temperature?label=%20&style=flat-square) | ![NPM Latest Release Version](https://img.shields.io/npm/v/@hugoalh/temperature/latest?label=%20&style=flat-square) | ![NPM Latest Pre-Release Version](https://img.shields.io/npm/v/@hugoalh/temperature/pre?label=%20&style=flat-square) |

## 📝 Description

A NodeJS module to convert temperature units.

Units of temperature are from [Wikipedia - Conversion of scales of temperature](https://en.wikipedia.org/wiki/Conversion_of_scales_of_temperature).

| **Unit** | **Symbol (Standard)** | **Symbol (Exclusive)** | **Name (Upper Camel Case)** | **Name (Lower Camel Case)** |
|:-:|:-:|:-:|:-:|:-:|
| Kelvin ***\[SI\]*** | `K` |  | `Kelvin` | `kelvin` |
| Celsius | `C` |  | `Celsius` | `celsius` |
| Delisle | `D` | `De` | `Delisle` | `delisle` |
| Fahrenheit | `F` |  | `Fahrenheit` | `fahrenheit` |
| Rankine | `R` / `Ra` |  |`Rankine` | `rankine` |
| Réaumur | `Re` / `r` |  | `Reaumur` | `reaumur` |
| Rømer | `Ro` |  | `Roemer` / `Romer` | `roemer` / `romer` |
| Sir Isaac Newton's degree of temperature (Newton) | `N` |  | `Newton` | `newton` |

### 📋 Note

- Degree symbol (`°`) is not used in here.
- In order to fulfill the JavaScript namespace naming requirement, some characters are replaced (e.g.: `é` to `e`, `ø` to `o`).
- This module uses the built in JavaScript `Number` type, which is a floating point number with a limited precision of 64 bits, about 16 digits. Floating point numbers round-off errors can occur during calculations:
  ```js
  0.1 + 0.2;
  //=> 0.30000000000000004
  ```
  In most cases, round-off errors do not matter, they have no significant impact on the results. However, it looks ugly when displaying output to a user. A solution is to limit the precision just below the actual precision of 16 digits in the displayed output:
  ```js
  (0.1 + 0.2).toPrecision(14);
  //=> 0.3
  ```

### ⚖ Conversion

<table>
<tr>
<td align="center"><b>Unit</b></td>
<td align="center"><b>To SI Unit</b></td>
<td align="center"><b>From SI Unit</b></td>
</tr>
<tr>
<td align="center">Celsius</td>
<td align="center">

$$K = C + 273.15$$

</td>
<td align="center">

$$C = K - 273.15$$

</td>
</tr>
<tr>
<td align="center">Delisle</td>
<td align="center">

$$K = 373.15 - D \div 1.5$$

</td>
<td align="center">

$$D = (373.15 - K) \times 1.5$$

</td>
</tr>
<tr>
<td align="center">Fahrenheit</td>
<td align="center">

$$K = (F + 459.67) \div 1.8$$

</td>
<td align="center">

$$F = K \times 1.8 - 459.67$$

</td>
</tr>
<tr>
<td align="center">Rankine</td>
<td align="center">

$$K = R \div 1.8$$

</td>
<td align="center">

$$R = K \times 1.8$$

</td>
</tr>
<tr>
<td align="center">Réaumur</td>
<td align="center">

$$K = Re \times 1.25 + 273.15$$

</td>
<td align="center">

$$Re = (K - 273.15) \times 0.8$$

</td>
</tr>
<tr>
<td align="center">Rømer</td>
<td align="center">

$$K = (Ro - 7.5) \div 0.525 + 273.15$$

</td>
<td align="center">

$$Ro = (K - 273.15) \times 0.525 + 7.5$$

</td>
</tr>
<tr>
<td align="center">Sir Isaac Newton's degree of temperature (Newton)</td>
<td align="center">

$$K = N \div 0.33 + 273.15$$

</td>
<td align="center">

$$N = (K - 273.15) \times 0.33$$

</td>
</tr>
</table>

## 📚 Documentation

### Getting Started

#### Install

- NodeJS >= v6.9.0
- NPM >= v3.10.8

```sh
npm install @hugoalh/temperature
```

#### Use In CommonJS

```js
const Temperature = require("@hugoalh/temperature");
```

#### Use In ModuleJS

```js
import Temperature from "@hugoalh/temperature";
```

### API

#### Class

```ts
new Temperature(value: number, unit?: string = "K"): Temperature
Temperature.difference(a: Temperature, b: Temperature): TemperatureDifference
```

### Example

```js
new Temperature(25, "C").K
//=> 298.15

new Temperature(298.15).C
//=> 25
```