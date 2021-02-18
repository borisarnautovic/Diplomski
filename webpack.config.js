const HtmlWebPackPlugin = require("html-webpack-plugin");
const  CleanWebpackPlugin  = require('clean-webpack-plugin');
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
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
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
            {
                test: /\.(jpg|png|svg|gid)$/,
                use: 
                [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img',
                            publicPath: 'public/'                            
                        }
                    }
                ]
            },
        ]        
        
    },             

}