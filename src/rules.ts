import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { Compiler, RuleSetRule, RuleSetUse, RuleSetUseItem } from 'webpack'
import postcssConfig from './postcssConfig'
import { StylesWebpackPluginOptions } from './types'

export default (options: StylesWebpackPluginOptions, compiler: Compiler) => {

  const rules: RuleSetRule[] = []

  /**
   * 提取样式到单个css文件
   */
  const miniCssExtractConf: RuleSetUseItem = {
    loader: MiniCssExtractPlugin.loader,
    options: {
      hmr: false,
      reloadAll: true
    }
  }

  const styleLoaderName = options.framework.vue ? 'vue-style-loader' : 'style-loader'

  /**
   * 样式loader配置
   *
   * 通用loader配置
   */
  const commonLoaders: RuleSetUse = [
    /**
     * 提取到单个css文件
     *
     * 或者
     *
     * 生成css样式为html行内样式
     */
    compiler.options.mode === 'development' ? { loader: styleLoaderName } : miniCssExtractConf,
    /**
     * 处理其他预编译样式生成的css
     */
    { loader: 'css-loader', options: options.cssLoader ? options.cssLoader : {} },
    /**
     * 用postcss处理特殊需求
     *
     * 如：添加浏览器前缀
     */
    {
      loader: 'postcss-loader',
      options: postcssConfig(compiler)
    }
  ]

  /**
   * 启用缓存
   */
  if (compiler.options.mode === 'development' && options.cacheDirectory) {
    commonLoaders.unshift({
      loader: 'cache-loader',
      options: {
        /**
         * 默认development环境启用
         */
        cacheDirectory: options.cacheDirectory
      }
    })
  }

  rules.push(
    ...[
      /**
       * css、sss文件样式处理
       */
      { test: /\.(c|s)ss$/, use: commonLoaders },
      /**
       * less文件样式处理
       */
      { test: /\.less$/, use: [...commonLoaders, { loader: 'less-loader' }] },
      /**
       * scss文件样式处理
       */
      { test: /\.scss$/, use: [...commonLoaders, { loader: 'sass-loader' }] },
      /**
       * sass文件样式处理
       */
      { test: /\.sass$/, use: [...commonLoaders, { loader: 'sass-loader', options: {
        indentedSyntax: true
      } }] },
      /**
       * styl、stylus文件样式处理
       */
      { test: /\.styl(us)$/, use: [...commonLoaders, { loader: 'stylus-loader' }] }
    ]
  )

  return rules
}
