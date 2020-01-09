import { cosmiconfigSync } from 'cosmiconfig'
import postcssImport from 'postcss-import'
import postcssPresetEnv from 'postcss-preset-env'
import postcssUrl from 'postcss-url'
import { Compiler } from 'webpack'
import { PostcssConfiguration, SmartCosmiconfigResult } from './types'

export default (compiler: Compiler) => {
  const postcssConfig = {
    ident: 'postcss',
    /**
     * 插件
     */
    plugins: [
      /**
       * 处理css模块导入
       */
      postcssImport(),
      /**
       * 处理cssurl转换
       */
      postcssUrl(),
      /**
       * 目标构建环境
       */
      postcssPresetEnv()
    ]
  }

  /**
   * 用户的postcss配置
   */
  const userPostcssConfig: SmartCosmiconfigResult<PostcssConfiguration> = cosmiconfigSync(
    'postcss'
  ).search()

  if (userPostcssConfig) {
    const { plugins }: PostcssConfiguration = userPostcssConfig.config
    if (plugins) {
      let errors = []
      let userPlugins = []
      if (Array.isArray(plugins)) {
        userPlugins = plugins
      } else if (typeof plugins === 'function') {
        userPlugins = plugins()
      } else if (typeof plugins === 'object') {
        userPlugins = Object.keys(plugins)
          .map(name => {
            try {
              const postcssModule = require(name)
              return postcssModule(plugins[name])
            } catch (error) {
              errors.push(error.toString())
            }
          })
          .filter(item => !!item)
      } else {
        errors.push('Postcss plugins configuration error, Type should be Array, Function, Object')
      }

      postcssConfig.plugins = [...postcssConfig.plugins, ...userPlugins]

      compiler.hooks.emit.tap('StylesWebpackPlugin', compilation => {
        errors.length > 0 && Array.prototype.push.apply(compilation.errors, errors)
      })
    }
  }

  return postcssConfig
}
