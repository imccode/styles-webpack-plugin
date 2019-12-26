import CompressionPlugin = require('compression-webpack-plugin')

/**
 * style-webpack-plugin 样式资源 插件的可配参数
 */
export interface StyleWebpackPluginOptions {
  /**
   * 启用缓存，指定缓存路径
   *
   * 默认development环境启用
   */
  cacheDirectory?: string | boolean

  /**
   * css-loader的options配置
   */
  cssLoader?:
    | false
    | {
        /**
         * 启用/禁用 CSS 模块和设置模式
         */
        modules?: boolean | Function
        /**
         * 未来可能引入的配置
         */
        [key: string]: any
      }
  /**
   * 框架支持情况
   */
  framework?: {
    /** 支持vue 框架编译 */
    vue?: boolean
  }
  /**
   * 资源生成gzip
   * docs: https://github.com/webpack-contrib/compression-webpack-plugin
   */
  gzip?: false | CompressionPlugin.Options<any>
  /** postcss配置的类型 */
  postcssConfigType?: PostcssConfigType
}

export enum PostcssConfigType {
  /** 完全自定义的配置 */
  custom = 'custom',
  /** 追加的方式 */
  add = 'add'
}

/**
 * postcss 插件类型
 */
export type PostcssPlugins = (
  loader?: object
) => Array<(...args: any) => object> | { [key: string]: any }

/**
 * postcss配置
 *
 * docs: https://github.com/postcss/postcss#usage
 */
export interface PostcssConfiguration {
  /**
   * postcss采用什么语法
   */
  ident?: string
  /**
   * postcss插件
   */
  plugins?: PostcssPlugins
  /**
   * 未来可能引入的配置
   */
  [key: string]: any
}

/**
 * CosmiconfigResult
 */
export type SmartCosmiconfigResult<T> = {
  /**
   * 配置
   */
  config: T
  /**
   * 配置文件路径
   */
  filepath: string
  /**
   * 配置是否为空
   */
  isEmpty?: boolean
} | null
