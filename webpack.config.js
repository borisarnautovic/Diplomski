const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');



module.exports = 
{
    entry: {
        index: './src/index.js',
        mobilni: './src/mobilni.js',    
    },
    mode: 'development',
    devServer : {
        open: true
    },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]main.js'
  },

    module:
    {
        rules:
        [
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use: 
                {
                    loader:"babel-loader"
                }
            },
            
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },

            {
                test: /\.html$/,
                
                use: 
                [
                    {
                        loader:"html-loader",
                        options: { minimize:true }
                    }
                    
                ]
            },
        ]
        
    },    

}