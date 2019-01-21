const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackMerge = require('webpack-merge');

module.exports = env => {

	const PRODUCTION_ENV = 'production';
	const DEV_ENV = 'development';
	const ENV = env.NODE_ENV || DEV_ENV;
	console.log('webpack is running in', ENV, 'env');

	let config = {
		entry: {
			'laz': ['./src/index.js']
		},
		output: {
			path: path.resolve(__dirname, 'assets'),
			publicPath: '/',
			filename: '[name].js',
			library: '[name]',
			libraryTarget: 'umd'
		},
		module: {
			rules: [
				{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					include: path.resolve(__dirname, 'src'),
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-react'],
							plugins: ['@babel/plugin-proposal-class-properties']
						}
					}
				},
				{
					test: /\.(sa|sc|c)ss$/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						'sass-loader',
					],
				},
				{
					test: /\.(ttf|eot|svg|jpg|png|woff|woff2|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					use: 'base64-inline-loader?name=[name].[ext]'
				},
			]
		},
		plugins: [
			new webpack.NoEmitOnErrorsPlugin(),
			new MiniCssExtractPlugin({
				filename: "[name].css"
			})
		]

	};

	// Setup for dev env
	if (ENV === DEV_ENV) {

		const devConfig = {
			mode: 'development',
			devtool: 'source-map',
			watch: true,
			devServer: {
				contentBase: './',
				host: 'localhost',
				port: '3000',
				inline: true
			}
		};

		config = webpackMerge.smart(config, devConfig);
	}

	// Setup for prod env
	else if (ENV === PRODUCTION_ENV) {
		const prodConfig = {
			mode: 'production',
			module: {
				rules: [
					{
						test: /\.m?js$/,
						exclude: /(node_modules|bower_components)/,
						include: path.resolve(__dirname, 'src'),
						use: {
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-react'],
								plugins: ['@babel/plugin-proposal-class-properties']
							}
						}
					},
					{
						test: /\.(sa|sc|c)ss$/,
						use: [
							MiniCssExtractPlugin.loader,
							'css-loader',
							{
								loader: "sass-loader",
								options: {
									outputStyle: "compressed"
								}
							}
						],
					}
				]
			},
			optimization: {
				minimize: true
			},
		};

		config = webpackMerge.smart(config, prodConfig);
	}

	return config;
}
;




