import CompressionWebpackPlugin from 'compression-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import { Compiler, Plugin } from 'webpack'
import { StyleWebpackPluginOptions } from './types'

export default (options: StyleWebpackPluginOptions, compiler: Compiler) => {
  if (compiler.options.mode !== 'production') return

  const plugins: Plugin[] = [
    /**
     * 压缩css, 添加前缀等
     */
    new OptimizeCssAssetsPlugin({
      /**
       * 压缩器cssnano
       */
      cssProcessor: require('cssnano'),
      /**
       * 压缩相关配置
       */
      cssProcessorOptions: {
        /**
         * 删除注释
         */
        discardComments: {
          removeAll: true
        }
      },
      canPrint: false
    }),
    /**
     * 多文件css提取到一个文件 或 chunk
     */

    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].min.css',
      chunkFilename: 'css/[name].[contenthash:8].min.css'
    })
  ]

  // 对css文件进行gzip
  if (options.gzip !== false) {
    plugins.push(
      new CompressionWebpackPlugin({
        cache: options.cacheDirectory,
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.css$/,
        threshold: 1024,
        minRatio: 0.8,
        ...options.gzip
      })
    )
  }

  compiler.options.plugins.push(...plugins)
}
