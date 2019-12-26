import { StyleWebpackPluginOptions, PostcssConfigType } from './types'
import { Compiler } from 'webpack'
import path from 'path'

export default (options: StyleWebpackPluginOptions = {}, compiler: Compiler) => {
  // 默认配置
  const defaultOptions: StyleWebpackPluginOptions = {
    cacheDirectory:
      compiler.options.mode === 'production'
        ? false
        : path.resolve(compiler.context, 'node_modules/.cache', 'style'),
    postcssConfigType: PostcssConfigType.add
  }

  const mergeOptions: StyleWebpackPluginOptions = {
    ...defaultOptions,
    ...options,
    framework: options.framework || {},
    cssLoader: options.cssLoader || {}
  }

  if (options.cacheDirectory && typeof options.cacheDirectory === 'string') {
    mergeOptions.cacheDirectory = options.cacheDirectory
  }

  return mergeOptions
}
