const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');


module.exports = env => {
    const isEnvDevelopment = env === 'development';
    const isEnvProduction = env === 'production';

    return {
        mode: isEnvDevelopment ? 'development' : 'production',
        entry: {
            app: './src/index.tsx',
        },


        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.(css)$/i,
                    exclude: /node_modules/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    use: 'file-loader',
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new CopyPlugin({
                patterns: [
                    { from: 'public/manifest.json', to: '.' },
                    { from: 'public/images', to: '.' }
                ],
            }),
            new HtmlWebpackPlugin({
                template: './public/index.html',
                minify: 'auto',
            }),
            new WorkboxPlugin.GenerateSW({
                cacheId: 'fagertun_pwa',
                exclude: [/\.(?:png|jpg|jpeg|svg)$/],
                skipWaiting: true,
                runtimeCaching: [{
                        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'images',
                            expiration: {
                                maxEntries: 50,
                            },
                        },
                    }],
            })
        ],
        output: {
            filename: '[name].bundle.[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
        },
        optimization: {
            minimize: isEnvProduction,
            moduleIds: 'deterministic',
            runtimeChunk: { name: entrypoint => `runtimechunk~${entrypoint.name}` },
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },
    }
}



