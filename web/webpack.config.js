const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');


module.exports = env => {
    const isEnvDevelopment = env === 'development';
    const isEnvProduction = env === 'production';

    return {
        mode: isEnvDevelopment ? 'development' : 'production',
        devtool: isEnvDevelopment ? 'inline-source-map' : false,
        entry: {
            app: {
                import: './src/index.tsx',
                dependOn: "vendor",
            },
            vendor: ["react", "react-dom"],
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
                    { from: 'public/_redirects', to: '.' },
                    { from: 'public/images', to: '.' }
                ],
            }),
            new HtmlWebpackPlugin({
                template: './public/index.html',
                minify: 'auto',
                inlineSource: 'runtime~.+\\.js',
            }),
            isEnvProduction ? new WorkboxPlugin.GenerateSW({
                cacheId: 'fagertun_pwa',
                exclude: [/\.(?:png|jpg|jpeg|svg)$/, /_redirects/],
                skipWaiting: true,
                runtimeCaching: [{
                    urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'images',
                        expiration: {
                            maxEntries: 50,
                        },
                    }
                },
                    {
                    urlPattern: new RegExp('^https://n45k2lw1.api.sanity.io/*'),
                    handler: 'StaleWhileRevalidate',
                    options: {
                        cacheName: 'sanity',
                        expiration: {
                            maxAgeSeconds: 3 * 24 * 60 * 60,
                            purgeOnQuotaError: true,
                        }
                    },
                }],
            }) : false
        ].filter(Boolean),
        output: {
            filename: '[name].bundle.[chunkhash].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
        },
        optimization: {
            minimize: isEnvProduction,
            moduleIds: 'deterministic',
            // runtimeChunk: true,
            runtimeChunk: { name: entrypoint => `runtimechunk~${entrypoint.name}` },
            splitChunks: {
                chunks: 'all',
                // cacheGroups: {
                //     vendor: {
                        // test: /[\\/]node_modules[\\/]/,
                        // name: 'vendors',
                        // chunks: 'all',
                    // },
                // },
            },
        },
    }
}



