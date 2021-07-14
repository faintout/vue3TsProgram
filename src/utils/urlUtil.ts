/**
 * Desc: 所有请求的url管理
 * User: ChenJiaLei
 * Date: 2019/7/23
 * Time: 下午1:42
 */
interface UrlModel{
    [propName:string]:string
}
 const Url:UrlModel = {


    /**************** 信源 /channel *****************/
    // 获取信源状态
    getChannelStatusUrl: "/channel/getChannelStatus",
    // 获取信源列表URL
    getChannelListUrl: "/channel/getChannelList",


    /**************** 日志 /log *****************/
    // 获取切换日志
    getSwitchLogUrl: "/log/getSwitchLog",


    /**************** 系统 /sys *****************/
    //设置同步SOP
    // setSyncSopUrl:"/sys/ipConfig",
    /**************** 用户 /user *****************/
    //用户登录
    userLoginUrl:'/user/login',
    //用户登出
    userLogoutUrl:'/user/logout',
    //用户查询
    getUserListUrl:'/user/all',
    //新增用户
    addUserUrl:'/user/register',
    //删除用户
    deleteUserUrl:'/user/delete',
    //用户更新
    updateUserUrl:'/user/update'
};

export default Url;
