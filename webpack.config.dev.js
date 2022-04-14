const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: path.join(__dirname, "App.tsx"),
    devtool: "eval-source-map",
    devServer: {
        static: {
            directory: path.join(__dirname, "dev")
        },
        port: "80",
        open: true,
        historyApiFallback: true,
        client: {
            overlay: {
                errors: true,
                warnings: false
            }
        }
    },
    output: {
        path: path.join(__dirname, "dev"),
        filename: "fleek-rick-morty.bundle.dev.js"
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript"
                        ]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpe?g|gif|woff(2)?|svg)$/i,
                type: "asset/resource"
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".css"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(__dirname, "index.html")
        })
    ]
};