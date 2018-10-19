import es6Promise from "es6-promise";
import fetch from "isomorphic-fetch";
import { Toast }from "antd-mobile";
import NProgress  from "nprogress";
es6Promise.polyfill();
NProgress.configure({ easing: 'ease', speed: 100,minimum : 0.2 });

function checkErrStatus(res , opt){
  if(res.status !== 200 ){
    Toast.fail(`[${opt.url}] is err [${res.status}]`);
  } 
  return res;
}

export default function sendRequest(url,opt = {}){
    if( !url || Object.prototype.toString.call(url) !== "[object String]"){
      Toast.fail("sendRequest's url must be String");
      return;
    }
    let option = {
        method : 'get' 
    };
    if(opt.headers){
      option.headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        ...opt.headers
      };
      delete opt.headers;
   }
    NProgress.start();
     return fetch("https://jlh5.sy-payment.site:7443/serviceEndpoint/json",{
         ...option,
         ...opt
     })
      .then( res=>checkErrStatus(res , {...opt ,url}))
      .then(
        res=>res.json()
      )
      .then(
        res=>{
          NProgress.done();
          return res;
        }
      )
      .catch((err)=>{
        NProgress.done();
        Toast.fail(err);
      })
}

