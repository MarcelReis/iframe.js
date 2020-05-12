const path = require("path");

module.exports = {
	mode: "development",
	entry: {
		player: "./src/player.js",
		iframe: "./src/iframe.js",
	},
	output: {
		path: path.resolve(__dirname, "dist/js/"),
		filename: "[name].js",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: "babel-loader",
			},
		],
	},
	devtool: "inline-source-map",
};
