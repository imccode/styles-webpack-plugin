# styles-webpack-plugin

:kissing_heart:一个处理样式资源的webpack插件。

特性：支持`.css` `.less` `.scss` `.sass` `.styl` `stylus` `.sss` 样式文件处理，运行环境按需补丁(css前缀)、自动分包、代码压缩、生成gizp、开发环境缓存构建。

:point_right:
[![github](https://img.shields.io/github/release-date/imccode/styles-webpack-plugin.svg)](https://github.com/imccode/styles-webpack-plugin/releases)
[![npm-version](https://img.shields.io/npm/v/styles-webpack-plugin.svg)](https://www.npmjs.com/package/styles-webpack-plugin)
[![webpack](https://img.shields.io/badge/webpack-%3E%20%3D%204.0.0-blue.svg)](https://webpack.js.org/)
[![nodejs](https://img.shields.io/badge/node-%3E%20%3D%2010.0.0-blue.svg)](https://nodejs.org/)
[![license](https://img.shields.io/npm/l/styles-webpack-plugin.svg)](https://www.npmjs.com/package/styles-webpack-plugin)
[![pull request](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/imccode/styles-webpack-plugin/pulls)

## 安装获取

```shell
yarn add styles-webpack-plugin -D

npm install styles-webpack-plugin -D

pnpm install styles-webpack-plugin -D
```

## 使用方式

```javascript
const StylesWebpackPlugin = require('styles-webpack-plugin')

module.exports = {
  plugins: [new StylesWebpackPlugin()]
}
```

```javascript
const StylesWebpackPlugin = require('styles-webpack-plugin')

module.exports = {
  plugins: [
    new StylesWebpackPlugin({
      cssLoader: {
        modules: true
      },
      framework: {
        vue: true
      }
    })
  ]
}
```

## 注意

项目默认使用`postcss`进行样式转码，见[源码](./src/postcssConfig.ts)

默认使用的插件：

- `postcss-import` 处理css模块导入
- `postcss-preset-env` 构建目标环境，按需自动添加浏览器支持的样式前缀
- `postcss-url` 处理cssurl转换

## 配置项

具体配置项的数据类型见[types.ts](./src/types.ts)

- `cacheDirectory` 生成缓存目录。 生成环境默认不开启，开发环境默认: `'./node_modules/.cache/style'`
- `cssLoader` css-loader配置 详见：<https://github.com/webpack-contrib/css-loader>
- `framework.vue` vue框架特殊处理 false
- `gzip` 脚本文件的gizp压缩。默认开启，详见：<https://github.com/webpack-contrib/compression-webpack-plugin>

按照[postcssConfig](https://github.com/postcss/postcss#usage)配置要求，例如创建`postcss.config.js`文件，最终会和默认配置合并。

按照[browserslist](https://github.com/browserslist/browserslist#queries)配置要求，例如创建`.browserslistrc`，最终采用browserslist的配置要求生成代码。
