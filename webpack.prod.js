const path = require('path');
const buildPath = path.resolve(__dirname, 'dist');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'source-map',

	entry: {
		main: './src/js/main.js',
		index: './src/js/index.js',
		fourofour: './src/js/404.js',
	},

	output: {
		filename: '[name].[hash:20].js',
		path: buildPath,
	},

	module: {
		rules: [
			// load JS
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env'],
				},
			},
			// load CSS
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			// load images (base64 < 8192B)
			{
				test: /\.(png|jpg|gif|webp)$/,
				type: 'asset/resource',
				generator: {
					filename: 'img/[name][hash].[ext]',
				},
			},
			// load icons
			{
				test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
				type: 'asset/resource',
			},
			// load svg
			/*{
				test: /\.svg$/,
				use: ["file-loader"]
			}*/
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			inject: true,
			chunks: ['main', 'index'],
			filename: 'index.html',
		}),
		new HtmlWebpackPlugin({
			template: './src/404.html',
			inject: true,
			chunks: ['main', 'fourofour'],
			filename: '404.html',
		}),
	],
};
