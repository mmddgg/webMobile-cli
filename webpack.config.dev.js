
module.exports = {
    devServer :{
        proxy: {
            '/webapi':{
              target : "https://jlh5.sy-payment.site:7443/serviceEndpoint/json" ,
               changeOrigin : true,
               secure:false,
               //pathRewrite:{ "^/webapi":'/serviceEndpoint/json'}
              } 
        }
   }
};