import path from 'path'
import { Compiler, Configuration } from 'webpack'
import { StyleWebpackPluginOptions } from './types'
import mergeOptions from './mergeOptions'
import rules from './rules'
import plugins from './plugins'

/**
 * 样式webpack插件
 */
class StyleWebpackPlugin {
  options: StyleWebpackPluginOptions = {}

  webpackConfig: Configuration = {}

  constructor(options: StyleWebpackPluginOptions = {}) {
    this.options = options
  }

  /**
   * 执行插件
   * @param compiler
   */
  apply(compiler: Compiler) {
    this.options = mergeOptions(this.options, compiler)

    plugins(this.options, compiler)
    if (this.options.framework.vue) {
      compiler.options.module.rules.push(...rules(this.options, compiler))
    } else {
      compiler.hooks.afterEnvironment.tap('StyleWebpackPlugin', () => {
        compiler.options.module.rules.push(...rules(this.options, compiler))
      })
    }
  }
}

export * from './types'
export { StyleWebpackPlugin }
export default StyleWebpackPlugin
module.exports = StyleWebpackPlugin