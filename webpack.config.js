const path = require("path");

module.exports = {
	entry: {
		player: "./src/player.js",
		iframe: "./src/iframe.js",
	},
	output: {
		path: path.resolve(__dirname, "dist/js/"),
		filename: "[name].js",
	},
	module: {
		rules: [{ test: /\.js$/, use: "babel-loader" }],
	},
};
