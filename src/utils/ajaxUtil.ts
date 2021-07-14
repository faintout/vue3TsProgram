/**
 * Desc: 所有的Ajax请求接口
 * User: ChenJiaLei
 * Date: 2019/7/19
 * Time: 上午12:15
 */
 import Router from '@/router/routerIndex'
 import Axios from 'axios';
 import Url from "@/utils/urlUtil";
 import {ToolUtil} from "@/utils/toolUtil";
 import {ElMessage} from 'element-plus';
 import {Encryption} from '@/utils/encryption';
 let encryption = new Encryption();
 
 // 判定，做路由重定向
 Axios.interceptors.response.use((response:any) => {
     let loginFail = false;
     if (ToolUtil.isIE()) {
         // 返回结果中提示登录失败
         loginFail = response.data && !response.data.success && response.data.msg && response.data.msg.toString().indexOf("登录失败") >= 0;
     } else {
         // 非IE浏览器，请求地址和响应地址不一致，表明已重定向
         loginFail = response.request.responseURL &&  response.request.responseURL.toString().indexOf(response.config.url.toString()) < 0 && response.request.responseURL.toString().indexOf('next') >= 0;
     }
     if(loginFail) {
         // 重定向到登录页面
         Router.push({path: "/login"})
     }else {
         return response;
     }
 }, function (error) {
     if(error.config.url=="/sys/sysDateTime"){
         return Promise.reject(error);
     }else if (undefined === error.response) {
         // 重定向到登录页面
         Router.push({path: "/login"})
     } else {
         return Promise.reject(error);
     }
 });
 

 interface getDataModel {
         (url:string,params?:object,header?:object):any
 }
 /**
  * 与后台交互的通用Axios处理
  * @param url
  * @param params
  */
 const getData:getDataModel = (url, params,header) => {
     return new Promise((resolve, reject) => {
         Axios["post"](url, params,header).then(res => {
             if (!res || res.headers.warning === "redirect") {
                 // 重定向到登录页面
                 Router.push({path: "/login"})
             } else {
                 resolve(res.data);
             }
         }).catch(err => {
             reject(err);
         })
     })
 };
 
 

 
 /**
  * 信源相关接口
  */
 const ChannelAjax = {
 
     // 获取信源状态，主动触发一次上报
     getChannelStatus() {
         return new Promise((resolve, reject) => {
             getData(Url.getChannelStatusUrl, {}).then(res => {
                 if (res.success) {
                     resolve(res);
                 } else {
                     ElMessage.error("获取信源状态失败：" + res.msg);
                     reject();
                 }
             }, err => {
                     ElMessage.error("获取信源状态失败：" + err.msg);
                     reject();
             });
         });
     },
 
     // 获取信源列表
     getChannelList: () => {
         return new Promise((resolve, reject) => {
             getData(Url.getChannelListUrl, {}).then(res => {
                 if (res.success) {
                     resolve(res.data);
                 } else {
                     ElMessage.error("获取信源失败！");
                     reject();
                 }
             }, err => {
                 ElMessage.error("获取信源失败：" + err.msg);
                 reject();
             });
         });
     },
 
     
 
 };
 

 
 /**
  * 日志相关接口
  */
 const LogAjax = {
 
     // 获取实时切换日志，触发一次主动上报
     getSwitchLogRealTime(params) {
         return new Promise((resolve, reject) => {
             getData(Url.getSwitchLogUrl,params).then(res => {
                 if (res.success) {
                     resolve(res);
                 } else {
                      ElMessage.error("获取实时切换日志失败！");
                      reject();
                 }
             }, err => {
                 ElMessage.error("获取实时切换日志失败：" + err.msg);
                 reject();
             });
         });
     },
 
 };
 
 
 /**
  * 系统管理相关接口
  */
 const SysAjax = {
 
       // 设置SOP同步
       setSyncSop: (params) => {
         return new Promise((resolve, reject) => {
           getData(Url.setSyncSopUrl, params).then(res => {
             if (res.success) {
                 ElMessage.success("同步成功！");
                 resolve(res);
             } else {
               ElMessage.error("同步失败！");
               reject();
             }
           }, err => {
             ElMessage.error("同步失败：" + err.msg);
             reject();
           });
         });
       },
 };
 
 
 /**
  * 用户相关接口
  */
 const UserAjax = {
 
      // 用户登录
      userLogin: (params:{username:string,password:string}) => {
         return new Promise((resolve, reject) => {
           getData(Url.userLoginUrl,params).then(res=> {
             if (res.success) {
                 resolve(res);
             } else {
               ElMessage.error("登录失败，请重试！");
               reject();
             }
           }, err => {
             ElMessage.error("登录失败：" + err.msg);
             reject();
           });
         });
       },
 
      // 用户登出
      userLogout: (params?:object) => {
         return new Promise((resolve, reject) => {
           getData(Url.userLogoutUrl,params).then(res => {
             if (res.success) {
                 //ElMessage.success("退出成功！");
                 resolve(res);
             } else {
               ElMessage.error("退出失败，请重试！");
               reject();
             }
           }, err => {
             ElMessage.error("退出失败：" + err.msg);
             reject(err);
           });
         });
       },
 
      // 用户查询
      getUserList: () => {
         return new Promise((resolve, reject) => {
           getData(Url.getUserListUrl,{}).then(res => {
             if (res.success) {
                 resolve(res.data);
             } else {
               ElMessage.error("获取用户列表失败");
               reject();
             }
           }, err => {
             ElMessage.error("获取用户列表失败：" + err.msg);
             reject();
           });
         });
       },
 
      // 新增用户
      addUser: (params) => {
         return new Promise((resolve, reject) => {
           getData(Url.addUserUrl,params).then(res => {
             if (res.success) {
                 ElMessage.success("添加用户成功！");
                 resolve(res);
             } else {
               ElMessage.error("添加用户失败，请重试！");
               reject();
             }
           }, err => {
             ElMessage.error("添加用户失败：" + err.msg);
             reject();
           });
         });
       },
 
      // 删除用户
      deleteUser: (params) => {
         return new Promise((resolve, reject) => {
           getData(Url.deleteUserUrl,params).then(res => {
             if (res.success) {
                 ElMessage.success("删除用户成功！");
                 resolve(res);
             } else {
               ElMessage.error("删除用户失败，请重试！");
               reject();
             }
           }, err => {
             ElMessage.error("删除用户失败：" + err.msg);
             reject();
           });
         });
       },
 
      // 用户更新
      updateUser: (params) => {
         return new Promise((resolve, reject) => {
           getData(Url.updateUserUrl,params).then(res => {
             if (res.success) {
                 ElMessage.success("更新成功！");
                 resolve(res);
             } else {
               ElMessage.error("更新失败，请重试！");
               reject();
             }
           }, err => {
             ElMessage.error("更新失败：" + err.msg);
             reject();
           });
         });
       },
 };
 
 
 export {
     ChannelAjax,
     LogAjax,
     UserAjax,
     SysAjax,
 }
 