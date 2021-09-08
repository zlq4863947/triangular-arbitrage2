# triangular-arbitrage2

<a href="https://github.com/zlq4863947/triangular-arbitrage2" target="blank">
  <p align="center">
    <img src="assets/images/logo.svg" width="180" alt="triangular-arbitrage2 Logo" />
  </p>
</a>

<p align="center"> 开源的自动化三角套利交易程序。</p>
<p align="center"> 前一版本程序地址: https://github.com/zlq4863947/triangular-arbitrage</p>

<a href="README_EN.md">see the English</a>

## 技术架构

- 开发语言:  [typescript](https://github.com/microsoft/TypeScript)
- 技术库: [rxjs](https://github.com/ReactiveX/rxjs) 、[nestjs](https://github.com/nestjs/nest)
- 数字货币相关库: [ccxt](https://github.com/ccxt/ccxt) 、[binance](https://github.com/tiagosiebler/binance)
- 测试库: [jest](https://github.com/facebook/jest)
- 虚拟环境容器: docker
- 数据库: mysql 8.0
- 依赖管理工具: [yarn](https://github.com/yarnpkg/yarn) （不是npm）

## 免责声明

- `triangular-arbitrage2` 不是万无一失、百分之百、一定盈利交易机器人。需要您自行担风险使用它。
- 数字货币仍处于萌芽实验阶段，`triangular-arbitrage2`也是如此。这意味着，两种都可能随时失败。
- `triangular-arbitrage2`分为 `Basic`(免费版) 和 `Pro`(付费版)。
  - `Basic`(免费版)，没有真实交易功能，您需要自行增加此功能，并承担由此产生的风险。
  - `Pro`(付费版)，本人负责保证和维护此机器人的策略及交易的准确无误，不保证百分比盈利，交易产生的风险需自行承担。
- 切勿让机器人长时间不受监控。 `triangular-arbitrage2` 并不知道什么时候需要停止，所以如果发生太多损失或出现问题，请准备好停止它。

## 机器人说明

|  | Basic(免费版) | Pro(付费版) |
|--|--|--|
| 开源 | ○ | △ |
| 命令行应用 | ○ | ○ |
| 支持的交易所 | 1（币安） | 1+n (币安+其他交易所) |
| 多种类日志记录 | ○ | ○ |
| 自动计算交易费率 | ○ | ○ |
| 模拟交易 | ○ | ○ |
| 真实交易 | × | ○ |
| 收益报表| × | ○ |
| 多种执行策略 | × | ○ |
| 维护与支援 | github论坛 | 实时 |

- 付费版可通过以下方式联系咨询
  - email: zlq4863947@gmail.com
  - qq: 442540141

## 捐赠

程序开发不易，需要大量的时间和精力。如果有人为开发捐款，我将非常感谢。

### BTC

`1J3hX6en3147VtEJvS2WbFrJ1emNcfcTdz`

### ETH
  
`0x8bb4a5f034B4822E0D1B51f4E07ce1eee7Bc8D8C`
  

## License: GPL3
