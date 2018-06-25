'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

//配置express数据服务模拟
const express = require('express')
const app = express()
var appData = require('../data.json')//加载本地数据文件
var seller = appData.seller//获取对应的本地数据
var createOrder = appData.createOrder
var getPrice = appData.getPrice
var getNewsList = appData.getNewsList123
var login = appData.login
var ratings = appData.ratings
var getOrderList = appData.getOrderList
var apiRoutes = express.Router()
app.use('/api', apiRoutes)

const HOST = process.env.HOST
const PORT = process.env.PORT + 1 && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true})
    },
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,

    // these devServer options should be customized in /config/index.js
    devServer: {

        //配置express数据服务模拟接口
        before(app) {
            app.get('/api/seller', (req, res) => {
                res.json({
                    errno: 0,
                    data: seller
                })//接口返回json数据，上面配置的数据seller就赋值给data请求后调用
            }),
            app.get('/api/getNewsList', (req, res) => {
                res.json({
                    errno: 0,
                    data: getNewsList
                })
            }),
            app.get('/api/ratings', (req, res) => {
                res.json({
                    errno: 0,
                    data: ratings
                })
            }),
                app.get('/api/login', (req, res) => {
                    res.json({
                        errno: 0,
                        data: login
                    })
                }),
            app.post('/api/foods', function (req, res) { // 注意这里改为post就可以了
                res.json({
                    errno: 0,
                    data: foods
                });
            }),
                app.post('/api/getPrice', function (req, res) { // 注意这里改为post就可以了
                    res.json({
                        errno: 0,
                        data: getPrice
                    });
                }),
                app.post('/api/createOrder', function (req, res) { // 注意这里改为post就可以了
                    res.json({
                        errno: 0,
                        data: createOrder
                    });
                }),
                app.post('/api/getOrderList', function (req, res) { // 注意这里改为post就可以了
                    res.json({
                        errno: 0,
                        data: getOrderList
                    });
                })
        },

        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
                {from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html')},
            ],
        },
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay
            ? {warnings: false, errors: true}
            : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll,
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.dev.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ]
})

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
            // add port to devServer config
            devWebpackConfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
                },
                onErrors: config.dev.notifyOnErrors
                    ? utils.createNotifierCallback()
                    : undefined
            }))

            resolve(devWebpackConfig)
        }
    })
})

//配置jsonServer数据服务模拟
var jsonServer = require('json-server') //引入文件
var apiServer = jsonServer.create(); //创建服务器
var apiRouter = jsonServer.router('db.json') //引入json 文件
var middlewares = jsonServer.defaults(); //返回JSON服务器使用的中间件。
apiServer.use(middlewares)
apiServer.use('/api', apiRouter)
apiServer.listen(9527, function () { //json服务器端口:9527
    console.log('JSON Server is running')  //json server成功运行会在git bash里面打印出'JSON Server is running'
})
