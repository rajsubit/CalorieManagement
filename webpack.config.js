var path = require('path');
var image_path = path.join(__dirname, "/react/images/");

module.exports = {
	devtool: "source-map",
	entry: "./react/main.js",
	output: {
		filename: "bundle.js",
		path: path.join(__dirname, "static/scripts"),
	},
	module: {
		rules: [
			{
	        	test: /\.(js|jsx)$/,
	        	exclude: /node_modules/,
	        	use: {
			        loader: 'babel-loader',
			        options: {
			          presets: ['es2015', 'react'],
			        }
			    }
        	},
        	{
				test: /\.(jpg|png|ico)$/,
				use: ['file-loader'],
				include: image_path,
			}
		]
	},
	plugins: []
};
