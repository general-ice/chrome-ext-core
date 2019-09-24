const path = require('path');

const projectPath = path.join(__dirname);
const distPath = path.join(projectPath, 'dist/content');
const srcPath = path.join(projectPath, 'src');

module.exports = {
    entry: path.join(projectPath, 'src/index.js'),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve:  {
        extensions: ['*', '.js', '.jsx'],
        modules: [
            path.join(projectPath, 'node_modules'),
            srcPath,
        ]
    },
    output: {
        path: distPath,
        filename: 'bundle.js',
        publicPath: "/"
    },
    devServer: {
        contentBase: distPath,
        historyApiFallback: true,
    },
    devtool: 'source-map',
};