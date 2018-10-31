const { injectBabelPlugin,paths } = require('react-app-rewired');
const fs = require('fs');
const devConfig = require("./webpack.config.dev");


module.exports = function override(config, env) {

    config = injectBabelPlugin(['import', { libraryName: 'antd-mobile', style: 'css' }], config);

    // config.devServer = {
    //   proxy:{
    //     "/webapi": {
    //       target: "https://localDevlop.com:3000",
    //       changeOrigin: true,
    //       pathRewrite: {'^/webapi': '/serviceEndpoint/json'}
    //     },
    //      "/todos":{
    //        target: "ttp://jsonplaceholder.typicode.com/",
    //       changeOrigin: true,
    //       pathRewrite: {'^/todus': ''}
    //      }
    //   }
    // }
    config = Object.assign(config ,devConfig);
    fs.writeFileSync("config.json",JSON.stringify(config));
    return config;
  };