const path = require('path');

module.exports = {
    mode: 'development',
    entry: './dist/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'demo.bundle.js',
    },
};
