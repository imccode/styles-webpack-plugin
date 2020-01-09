import path from 'path'
import { Compiler } from 'webpack'
import { StylesWebpackPluginOptions } from './types'

export default (options: StylesWebpackPluginOptions = {}, compiler: Compiler) => {
  // 默认配置
  const defaultOptions: StylesWebpackPluginOptions = {
    cacheDirectory:
      compiler.options.mode === 'production'
        ? false
        : path.resolve(compiler.context, 'node_modules/.cache', 'style')
  }

  const mergeOptions: StylesWebpackPluginOptions = {
    ...defaultOptions,
    ...options,
    cssLoader: options.cssLoader || {}
  }

  if (options.cacheDirectory && typeof options.cacheDirectory === 'string') {
    mergeOptions.cacheDirectory = options.cacheDirectory
  }

  return mergeOptions
}
