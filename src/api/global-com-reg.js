import * as qs from 'qs';
import axios from "axios";
// import VueCookie from 'vue-cookie'
import Apis from './api';
window.Apis = Apis;
window.urlPrefix = 'https://mpwechat.leanapp.cn';

export default {
  install: Vue => {

    // Vue.use(VueCookie);

    // 4. 添加一个实例方法
    Vue.prototype.$dialog = function (template) {
      alert(template);
    };

    // axios
    Vue.prototype.$axios = axios;

    /**
     *
     * @param {*String} api
     * @param {*Object } options
     * @param {*Boolean} filterFlag =ture 针对returncode 不等于0 是否当作错误回掉，即是否reject，默认
     * @param {*String} method
     */
    Vue.prototype.$fetch = function (api, options = {}, filterFlag = true, method = "post") {

      /**
       * debug test code ...
       */


      let urlPrefix = window.urlPrefix || '';
      // filterFlag 是否过滤returncode 不等0的情况
      var that = this;
      let data = {
        ...options
      };


      // var params = new URLSearchParams();
      var params = qs.stringify(data)
      var url = urlPrefix + window.Apis[api];
      if (method === 'get') {
        if (urlPrefix.indexOf('?') === -1) {
          url += '?';
        }
        url += params;
      }

      var req = axios({
        method: method,
        url: url,
        data: params,
      })

      return new Promise((resolve, reject) => {
        req.then((response) => {
          let code = response.data && response.data.error && response.data.error.returnCode * 1;
          if (code === 0) {
            resolve(response.data);
          } else {
            if (filterFlag) {
              alert(response.data.error.returnUserMessage)
              reject(response.data);
            } else {
              resolve(response.data);
            }
          }
        }, (erro) => {
          reject(erro);
        })
      });
    }

  }
};
