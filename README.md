# jest-starter
jest 学习笔记
## 项目启动
```
// 安装依赖
npm install

// 运行测试用例
npm run test
```
## 相关文档
* [Jest 实践指南](https://github.yanhaixiang.com/jest-tutorial/basic/tdd/#%E5%AE%9E%E6%88%98)

## DAY1 总结（1208）
### 测试能带来的收益
* `优化流程：`bug 越早发现，修复成本越低（减少返工次数）
* `保证质量：`产品需求不能保证百分百完善，覆盖所有逻辑
* `优化更新项目的后盾：`一定量的测试覆盖率，对于项目后续的优化带来信心，有助于整个项目的未来发展合改进
* `测试驱动开发（TDD）：`利用单测强大的 Mock 能力将依赖项 Mock 掉，开发只需关注某个函数、服务的开发，不会受依赖项的干扰，只要保证测试通过率 100%，就不用担心列子是否过期
* `用例即是使用说明书`
* `提升个人能力`

### 转译器
Jest 本身不做代码转译工作，在执行测试时，它会调用已有的 转译器/编译器 来做代码转译。
#### 常用转译器
* TSC: ts-jest（使用时，ts-jest 和 jest 大版本保持一致，减少兼容问题，Jest 类型声明：@types/jest）
* babel
### 路径简写
* `../../src/utils/sum` ==> `utils/sum`
```js
// jest.config.js
module.exports = {
  moduleDirectories: ["node_modules", "src"],
  // ...
}
```
tsconfig.json 还需要做以下配置
```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "utils/*": ["src/utils/*"]
    }
  }
}
```
* `../../src/utils/sum` ==> `@/utils/sum`
```js
// jest.config.js
module.exports = {
  "moduleNameMapper": {
    "@/(.*)": "<rootDir>/src/$1"
  },
  // ...
}
```
tsconfig.json 还需要做以下配置
```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```
* 如何让两者共用一套配置(实测：使用 pathsToModuleNameMapper 会报错)： 
可以用 ts-jest 里的工具函数 pathsToModuleNameMapper 来把 tsconfig.json 里的 paths 配置复制到 jest.config.js 里的 moduleNameMapper
```js
// jest.config.js
const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  // [...]
  // { prefix: '<rootDir/>' }
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
}
```

### 如何全局 Mock
把 Mock 的内容所在路径('./tests/jest-setup.ts')配置到 `setupFilesAfterEnv` 中
```js
module.exports = {
  setupFilesAfterEnv: ['./tests/jest-setup.ts'],
};
```
设置了之后，jest-setup.ts 会在每个测试文件执行前先执行一次。
* `setupFilesAfterEnv` 和 `setupFiles` 的区别: 
  * setupFiles 是在 引入测试环境（比如下面的 jsdom）之后 执行的代码
  * setupFilesAfterEnv 则是在 安装测试框架之后 执行的代码

* jsdom 实现一套 Node.js 环境下的 Web 标准 API，只需做如下设置：
```js
module.exports = {
  testEnvironment: "jsdom",
}
```

### Mock 网络地址
* 通过手动 Mock location 来 Mock 网址
```js
Object.defineProperty(window, 'location', {
  writable: true,
  value: { href: 'https://google.com?a=1&b=2', search: '?a=1&b=2' },
});
```
* 通过 `jest-environment-jsdom-global` 库把 `jsdom` 绑定到全局上
```js
// jest.config.js
module.exports = {
  testEnvironment: 'jest-environment-jsdom-global'
};
```
使用 jsdom 设置网址
```js
global.jsdom.reconfigure({
  url: "https://www.baidu.com?a=1&b=2",
});
```
处理类型提示问题
```ts
// src/types/global.d.ts
declare namespace globalThis {
  var jsdom: any;
}
```
* 通过 jest-location-mock 来 Mock Location