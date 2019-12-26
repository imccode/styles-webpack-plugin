import { Compiler, Configuration } from 'webpack';
import { StyleWebpackPluginOptions } from './types';
/**
 * 样式webpack插件
 */
declare class StyleWebpackPlugin {
    options: StyleWebpackPluginOptions;
    webpackConfig: Configuration;
    constructor(options?: StyleWebpackPluginOptions);
    /**
     * 执行插件
     * @param compiler
     */
    apply(compiler: Compiler): void;
}
export * from './types';
export { StyleWebpackPlugin };
export default StyleWebpackPlugin;
