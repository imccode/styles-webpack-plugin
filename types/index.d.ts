import { Compiler, Configuration } from 'webpack';
import { StylesWebpackPluginOptions } from './types';
/**
 * 样式webpack插件
 */
declare class StylesWebpackPlugin {
    options: StylesWebpackPluginOptions;
    webpackConfig: Configuration;
    constructor(options?: StylesWebpackPluginOptions);
    /**
     * package时候存在vue依赖
     */
    hasVue(compiler: Compiler): any;
    /**
     * 执行插件
     * @param compiler
     */
    apply(compiler: Compiler): void;
}
export * from './types';
export { StylesWebpackPlugin };
export default StylesWebpackPlugin;
