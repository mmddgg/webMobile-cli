const { injectBabelPlugin } = require('react-app-rewired');

module.exports = function override(config, env) {
    // do stuff with the webpack config...
    config = injectBabelPlugin(['import', { libraryName: 'antd-mobile', style: 'css' }], config);
    let devServer = config.devServer || {};
    devServer.proxy = {
      ...devServer.proxy,
      "/api": {
        "target": "https://jlh5.sy-payment.site:7443/serviceEndpoint/",
        "changeOrigin": true,
        "pathRewrite": { "^/api" : "" }
      }
    };
    config.devServer = devServer;
    return config;
  };