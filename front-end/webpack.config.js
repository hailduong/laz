const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// TODO: External config file
// TODO: Different config for different env
// TODO: Config EsLint
// TODO: Update the README file

let config = {
	mode: 'development',
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
	],
	watch: true,
	devtool: 'source-map',
	devServer: {
		contentBase: './',
		host: 'localhost',
		port: '3000',
		inline: true
	}
};


module.exports = config;
