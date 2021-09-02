
# triangular-arbitrage2

`triangular-arbitrage2` Is an open source automated triangular arbitrage trading program。

<a href="README.md">查看中文</a>

## Technology Architecture

- Development language:  [typescript](https://github.com/microsoft/TypeScript)
- Technical library: [rxjs](https://github.com/ReactiveX/rxjs) 、[nestjs](https://github.com/nestjs/nest)
- Cryptocurrency related library: [ccxt](https://github.com/ccxt/ccxt) 、[binance](https://github.com/tiagosiebler/binance)
- Test library: [jest](https://github.com/facebook/jest)
- Virtual environment container: docker
- database: mysql 8.0
- Dependency management tools: [yarn](https://github.com/yarnpkg/yarn) （Not npm）

## Disclaimer

- `triangular-arbitrage2` is NOT a sure-fire profit machine. Use it AT YOUR OWN RISK.
- Cryptocurrency is still an experiment, and therefore so is `triangular-arbitrage2`. Meaning, both may fail at any time.
- `triangular-arbitrage2`Divided into `Basic` (free version) and `Pro` (Paid version).
  - `Basic`(Free version), there is no real trading function, you need to add this function yourself, and bear the risks arising from it.
  - `Pro`(Paid version), I am responsible for ensuring and maintaining the accuracy of this robot's strategy and transactions. The percentage profit is not guaranteed, and the risks arising from the transaction shall be borne by myself.
- Never leave the bot un-monitored for long periods of time.  `triangular-arbitrage2` doesn't know when to stop, so be prepared to stop it if too much loss occurs.

## Robot description

|  | Basic(Free version) | Pro(Paid version) |
|--|--|--|
| Open source | ○ | △ |
| Command line application | ○ | ○ |
| Supported exchanges | 1（binance） | 1+n (binance+Other exchanges) |
| Multiple types of logging | ○ | ○ |
| Automatic calculation of transaction fees | ○ | ○ |
| Simulated transaction | ○ | ○ |
| Real transaction | × | ○ |
| Income statement| × | ○ |
| Multiple execution strategies | × | ○ |
| Maintenance and support | github issue | real time |

- For the paid version, you can contact us for consultation through the following methods
  - email: zlq4863947@gmail.com
  - qq: 442540141

## Donate

Program development is not easy and requires a lot of time and energy. If anyone contributes to the development, I would be very grateful.

### BTC

`1J3hX6en3147VtEJvS2WbFrJ1emNcfcTdz`

### ETH
  
`0x8bb4a5f034B4822E0D1B51f4E07ce1eee7Bc8D8C`

## License: GPL3
