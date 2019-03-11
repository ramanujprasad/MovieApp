'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ScriptExtPlugin = require('script-ext-html-webpack-plugin');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = function () {
    return {
        /**
         * Entry points for the program
         * 'vendor' - All third-party dependencies of the application
         * 'application' - Application code
         */
        entry: {
            'app': './src/main.ts'
        },
        mode: 'development',
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true
                })
            ]
        },

        /**
        * Bundle output definitions
        * Defines how output bundles are generated and named
        */
        output: {
            path: __dirname + '/dist',
            filename: 'app.js'
        },

        /**
        * List of extensions that webpack should try to resolve
        */
        resolve: {
            extensions: ['.ts', '.js']
        },

        /**
        * Module Loaders for webpack
        * Teach webpack how to read various types of referenced dependencies
        */
        module: {

            // Configured loaders
            rules: [

                // Typescript loader
                {
                    test: /\.ts$/,
                    loaders: ['@ngtools/webpack']
                },

                // CSS loader
                {
                    test: /\.css$/,
                    loader: 'raw-loader'
                },

                // SCSS loader
                {
                    test: /\.(scss)$/,
                    use: [{
                      loader: 'style-loader', // inject CSS to page
                    }, {
                      loader: 'css-loader', // translate CSS into CommonJS modules
                    }, {
                      loader: 'postcss-loader', // run post CSS actions
                      options: {
                        plugins: function () { // post css plugins, can be exported to postcss.config.js
                          return [
                            require('precss'),
                            require('autoprefixer')
                          ];
                        }
                      }
                    }, {
                      loader: 'sass-loader' // compile Sass to CSS
                    }]
                },

                // Font file loader (mostly for bootstrap/font-awesome)
                {
                    test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                    loader: 'file-loader'
                },

                // HTML file loader (for ngx templates)
                {
                    test: /\.html$/,
                    loader: 'raw-loader'
                },

                // Removing this will cause deprecation warnings to appear.
                {
                    test: /[\/\\]@angular[\/\\].+\.js$/,
                    parser: {
                        system: true
                    }
                }
            ]
        },

        /**
        * Webpack plugins
        */
        plugins: [
            new CopyWebpackPlugin([
                { from: 'src/assets', to: 'assets'}
            ]),
            new HtmlWebpackPlugin({
                template: __dirname + '/src/index.html',
                output: __dirname + '/dist',
                inject: 'head'
            }),
            new ScriptExtPlugin({
                defaultAttribute: 'defer'
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                Util: 'exports-loader?Util!bootstrap/js/dist/util'
            }),
            new AngularCompilerPlugin({
               tsConfigPath: './tsconfig.json',
               entryModule: './src/app/app.module#AppModule',
               sourceMap: true
            }),
            new MiniCssExtractPlugin({
                filename: 'bundle.css'
            })
        ]
    };
}
