<template>
    <div class="nav">
        <div class="nav_name">智能切换管理系统</div>
        <div class="nav_control">
            <div class="control">
                <router-link to="/duty">实时状态</router-link>
            </div>
            <div class="control">
                <router-link to="/optionMng">配置管理</router-link>
            </div>
            <div class="control">
                <router-link to="/systemLog">系统日志</router-link>
            </div>
            <div class="control">
                <router-link to="/sysSetting">系统设置</router-link>
            </div>
            <div class="userInfo">
                <div class="userTop">
                    <div class="admin">{{nickName}}</div>
                    <div class="logout" @click="logout">退出</div>
                </div>
                <div id="dataDiv"> {{dataTime}}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    let timer:any = null
    let refreshTime:number = 1000
    import { defineComponent, reactive, ref, toRefs, onMounted,onUnmounted } from 'vue'
    import { Encryption } from "@/utils/encryption"
    import moment from 'moment'
    import { useRoute, useRouter } from 'vue-router'
    import {UserAjax} from '@/utils/ajaxUtil'
    interface stateModel {
            dataTime: string | null,
            nickName: string | null,
            userList: any,
    }
    export default defineComponent({
        name: '',
        components: {},
        setup(props, context) {
            const router = useRouter()
            const encryption = new Encryption()
            const state: stateModel = reactive({
                dataTime: null,
                nickName: null,
                userList: [],
            })

            const methods = {
                logout()  {
                    UserAjax.userLogout().then(
                    data => {
                        router.push("/login")
                    },
                    () => {})
                },
                getSysDateTime() {
                    state.dataTime = moment().format('YYYY-MM-DD HH:mm:ss');
                    timer = setTimeout(() => {
                        methods.getSysDateTime()
                    }, refreshTime);
                },
                showNickname() {
                    // encryption.decrypt(localStorage.getItem('userInfo'))
                    let userInfo:any = localStorage.getItem('userInfo')
                    state.nickName = JSON.parse(userInfo).nickname;
                },
            }

            onMounted(() => {
                methods.showNickname()
                methods.getSysDateTime();
            })
            onUnmounted(()=>{
                timer&&clearTimeout(timer)
            })
            return {
                ...toRefs(state),
                ...methods
            }
        }
    })
</script>
<style lang="less">
.nav {
	height: 9.917%;
    display:flex;
	align-items:center;
	background: url('@/assets/images/group.png');
	background-size: 100% 100%;
	position: relative;
	.nav_name {
		width: 32%;
		font-size:2.4rem;
		color: #ffffff;
    text-align: left;
    padding-left: 61px;
	}
	.nav_control {
		width:32.86%;
		// height: 100%;
		display:flex;
	    justify-content: space-around;
		.control {
			display:flex;
	        justify-content: center;
			width: 17.87%;
			height: 100%;
			font-size: 1.53rem;
			font-weight: 400;
			color: #83cafa;
			cursor: pointer;
            text-align: center;
			a {
				display: block;
				width: 100%;
				height: 100%;
				font-size: 1.6rem;
				padding:25% 0;
				font-weight: 400;
				color: #83cafa;

				&.router-link-active{
				width: 96px;
				font-size: 1.53rem;
				color: #ffa800;
				background-image: url('@/assets/images/nav_select.png');
				background-repeat: no-repeat;
				background-position: 50% 78%;
				}
			}
    }
    @media (max-width:1600px){
      .control{
        width: 17.87%;
      }		
    }
    @media (max-width:1440px){
      .control{
        width: 17.87%;
      }		
    }
    @media (max-width:1366px){
      .control{
        width: 17.87%;
      }		
    }
		.userInfo {
			position: absolute;
			right: 20px;
			top: -5px;
			color: #ffffff;
			height: 100%;
            display: flex;
			flex-direction: column;
			justify-content: center;
			.userTop {
				 display: flex;
				.admin {
					width: 105px;
					height: 30px;
					font-size: 1rem;
					text-align: left;
					padding-right: 20px;
					line-height: 30px;
          overflow: hidden!important;
text-overflow: ellipsis!important;
white-space: nowrap!important;
					// margin-left: 4.255%;
					padding-left: 25px;
					background: url('@/assets/images/user.png') no-repeat left;
					background-size: 22.4px 22.4px;
				}
				.logout {
					width: 100px;
					height: 30px;
					font-size: 1rem;
					text-align: left;
					padding-left: 25px;
					line-height: 30px;
					background: url('@/assets/images/sign_out.png') no-repeat
						left;
					background-size: 22.4px 22.4px;
					cursor: pointer;
				}
			}
			#dataDiv {
				width: 200px;
				font-size: 1.0667rem;
				text-align: left;
			}
		}
	}
}
</style>