<template>
   <div class="login">
        <div class="login_content">
            <div class="project_info">
                <div class="project_name">
                    <span class="name_highlight">智能切换管理系统</span>
                    <!-- <span class="sys_name">调度系统</span> -->
                </div>
                <div class="feature_display">
                    <div class="feature_info">
                        <div class="feature_icon"><img class="icon_size" src="@/assets/images/inset_icon.png"></div>
                        <div class="feature_name">全嵌入式平台</div>
                    </div>
                    <div class="feature_info">
                        <div class="feature_icon"><img class="icon_size" src="@/assets/images/pad_icon.png"></div>
                        <div class="feature_name">集成垫播</div>
                    </div>
                    <div class="feature_info">
                        <div class="feature_icon"><img class="icon_size" src="@/assets/images/PID.png"></div>
                        <div class="feature_name">PID映射</div>
                    </div>
                </div>
            </div>
            <div class="login_in">
                <div class="login_box">
                    <div class="login_head"><img src="@/assets/images/login_head.png"><span class="head_title">用户登录</span></div>
                    <div class="input_bg">
                        <el-input v-model="userName" placeholder="请输入账号"></el-input>
                    </div>
                    <div class="input_bg">
                        <el-input v-model="passWord" type="password" placeholder="请输入密码" @keyup.enter.native="enterSystem"></el-input>
                    </div>
                    <div class="enter" @click="enterSystem"><span>登录</span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Encryption } from "@/utils/encryption"
import { UserAjax } from "@/utils/ajaxUtil"
import { defineComponent,ref ,reactive,toRefs,onMounted} from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute,useRouter} from 'vue-router'
export default defineComponent({
   name:'',
   components:{},
   setup(props,context){
       const router = useRouter()
       const state = reactive({
           userName:"",
           passWord:"",
           encryption:new Encryption(),
           
       })
       onMounted(() => {

       })
       const methods = {
           //登录方法
           enterSystem() {
                if (state.userName === '' || state.passWord === '') {
                    ElMessage.warning('账号或密码不能为空，请重新输入！');
                } else {
                    methods.userLogin()
                }
            },
            userLogin() {
                let params = {
                   "username": state.userName,
                   "password": state.encryption.MD5encrypt(state.passWord)
                };
                let $this = this;
                UserAjax.userLogin(params).then(
                    (res):any => {
                        // 返回的信息已经过加密，后续取出时需先encryption.decrypt()解密
                        let {data} = res as any
                        localStorage.setItem("userInfo",JSON.stringify(data));
                        router.push("/duty")
                    },
                    () => {}
                )
            },
       }
       return {
           ...toRefs(state),
           ...methods
        }
   }
})
</script>
<style lang="less">
     .login {
        height: 100%;
        width: 100%;
        position: relative;
        background-image: url("@/assets/images/login_bg.png");
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: center;

        .login_content {
            width: 85%;
            height: 50%;
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        .project_info {
            padding: 5rem 5rem 6rem 0;
            width: calc(55% - 5rem);
            height: calc(100% - 11rem);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
        }

        .login_in {
            width: 45%;
            height: 100%;
            display: flex;
            align-items: center;
        }

        .login_box {
            width: calc(80% - 9rem);
            height: calc(90% - 9rem);
            padding: 4.5rem;
            background: url("@/assets/images/box.png") no-repeat;
            background-size: 100% 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .name_highlight {
            color: #EC9D18;
            font-size: 3.5rem;
            letter-spacing: 1rem;
        }

        .sys_name {
            letter-spacing: 1rem;
            font-size: 1.8rem;
        }

        .project_name {
            width: 100%;
            text-align: center;
        }

        .feature_display {
            width: 80%;
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        .feature_info {
            flex: 1;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
        }

        .feature_icon {
            width: 5rem;
            height: 5rem;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .feature_name {
            margin-top: 0.5rem;
            font-size: 1rem;
        }

        .login_head {
            position: relative;
            margin-bottom: 1rem;
        }

        .head_title {
            color: rgba(0, 132, 255, 1);
            font-size: 1rem;
            position: absolute;
            left: calc(50% - 2.5rem);
            top: 0;
        }

        .el-input {
            height: 100%;
        }

        .el-input__inner {
            font-size: 1rem;
            height: 100%;
            border-radius: 0.5rem;
            border: none;
        }

        .input_bg {
            margin-top: 1.5rem;
            width: 90%;
            height: 18%;
            background: url("@/assets/images/input.png") no-repeat;
            background-size: 100% 100%;
        }

        .enter {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 18%;
            margin-top: 2.5rem;
            width: 90%;
            background: url("@/assets/images/button.png") no-repeat;
            background-size: 100% 100%;
        }
       @media (max-height: 700px) {
           .enter{
               margin-top: 1.5rem;
           }
       }
    }
</style>