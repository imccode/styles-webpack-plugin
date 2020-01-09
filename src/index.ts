import path from 'path'
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
   * package时候存在vue依赖
   */
  hasVue(compiler: Compiler) {
    const { dependencies = {}, devDependencies = {} } = require(path.resolve(
      compiler.context,
      'package.json'
    ))
  
    return dependencies.vue || devDependencies.vue
  }

  /**
   * 执行插件
   * @param compiler
   */
  apply(compiler: Compiler) {
    this.options = mergeOptions(this.options, compiler)
    const isVue = this.hasVue(compiler)
    plugins(this.options, compiler)
    if (isVue) {
      compiler.options.module.rules.push(...rules(this.options, compiler, isVue))
    } else {
      compiler.hooks.afterEnvironment.tap('StyleWebpackPlugin', () => {
        compiler.options.module.rules.push(...rules(this.options, compiler, isVue))
      })
    }
  }
}

export * from './types'
export { StylesWebpackPlugin }
export default StylesWebpackPlugin
module.exports = StylesWebpackPlugin