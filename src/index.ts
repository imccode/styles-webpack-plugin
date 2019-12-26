import { Compiler, Configuration } from 'webpack'
import mergeOptions from './mergeOptions'
import plugins from './plugins'
import rules from './rules'
import { StylesWebpackPluginOptions } from './types'

/**
 * 样式webpack插件
 */
class StylesWebpackPlugin {
  options: StylesWebpackPluginOptions = {}

  webpackConfig: Configuration = {}

  constructor(options: StylesWebpackPluginOptions = {}) {
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
export { StylesWebpackPlugin }
export default StylesWebpackPlugin
module.exports = StylesWebpackPlugin