import { cosmiconfigSync } from 'cosmiconfig'
import postcssImport from 'postcss-import'
import postcssPresetEnv from 'postcss-preset-env'
import postcssUrl from 'postcss-url'
import { PostcssConfiguration, SmartCosmiconfigResult } from './types'

export default () => {
  const defaultConfig: PostcssConfiguration = {
    ident: 'postcss',
    /**
     * 插件
     */
    plugins: () => [
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

  let config = defaultConfig

  if (userPostcssConfig) {
    config = userPostcssConfig.config

    const { plugins }: PostcssConfiguration = userPostcssConfig.config
    if (plugins && Array.isArray(plugins)) {
      const defaultPlugins = defaultConfig.plugins()
      if (Array.isArray(defaultPlugins)) {
        config.plugins = () => [...defaultPlugins, ...plugins]
      }
    }
  }

  return config
}
