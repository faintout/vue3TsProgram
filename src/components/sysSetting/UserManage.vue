<template>
   <div class="user_manage">
        <div class="operation_area">
            <div class="add_button" v-if="isAdmin==1" @click="editUserShow(0)"><i class="el-icon-plus"></i><span>新增</span></div>
        </div>
        <div class="table_area">
            <div class="tab_Title">
                <table>
                    <thead>
                        <tr>
                            <th width="35%">登录名</th>
                            <th width="35%">用户昵称</th>
                            <th width="30%">操作</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="tab_content">
                <table>
                    <tbody>
                        <tr v-for="(item,index) in userList" :key="index">
                            <td width="35%">{{item.username}}</td>
                            <td width="35%">{{item.nickname}}</td>
                            <td width="30%" >
                                <span class="select_pointer" style="margin-left: 1.5rem; color: #0eb1d7;" v-if="item.id==isAdmin||isAdmin==1" @click="editUserShow(1,item)">编辑</span>
                                <span class="select_pointer" style="margin-left: 1.5rem; color: #0eb1d7;" v-if="item.id==isAdmin||isAdmin==1" @click="editUserShow(2,item)">重置密码</span>
                                <span class="select_pointer" style="margin-left: 1.5rem; color: #0eb1d7;" v-if="item.id!=1&&isAdmin==1" @click="deleteUser(item)">移除</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

         <!--增改用户弹框-->
        <el-dialog
                :show-close="false"
                v-model="editUserDialogShow"
                :lock-scroll="true"
                center
                width="30%"
                >
                <div class="title_dialog">
                    <div class="title-bg" style="height: 95%;width: 30%;">
                        <span>{{titleType==0?'新增用户':titleType==1?'编辑用户':'重置密码'}}</span>
                    </div>
                </div>
                <div class="edit_box" v-if="titleType!=2"><span class="label">登录名称：&nbsp;</span><el-input v-model="userName" auto-complete="new-password" placeholder="请输入用户登录名"></el-input></div>
                <div class="edit_box" v-if="titleType!=2"><span class="label">用户昵称：&nbsp;</span><el-input v-model="nickName" auto-complete="new-password" placeholder="请输入用户昵称"></el-input></div>
                <div class="edit_box" :class="{margin_box:titleType==2}"><span :class="{label:titleType!=2}">密码：&nbsp;</span><el-input type="password" v-model="passWord" auto-complete="new-password" :placeholder=placeholderText></el-input></div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" round size="small" @click="editUserDialogShow = false">取消</el-button>
                <el-button style="background:rgb(52, 126, 204);" type="primary" size="small" round @click="saveSetting">设置</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent,ref ,reactive,toRefs,onMounted} from 'vue'
import { useRoute,useRouter} from 'vue-router'
import {UserAjax} from "@/utils/ajaxUtil"
import {Encryption} from "@/utils/encryption"
import {ElMessage,ElMessageBox} from "element-plus"
export default defineComponent({
   name:'',
   components:{},
   setup(props,context){
       const encryption = new Encryption()
       const state = reactive({
           editUserDialogShow:false,
           id:0,
           userName:'',
           passWord:'',
           nickName:'',
           titleType:0,
           userList:[],
           isAdmin:0,
           placeholderText:''
       })
       onMounted(() => {
           let userInfo:any = localStorage.getItem('userInfo')
           state.isAdmin = JSON.parse(userInfo).id
           methods.getUserList()
       })
       const methods = {
           //获取用户列表
            getUserList(){
                UserAjax.getUserList().then((data:any)=>{
                    state.userList = data
                })
            },
            
            //编辑弹框显隐
            editUserShow(type,val){
                    state.userName = ''
                    state.nickName = ''
                    state.passWord = ''
                state.titleType = type
                if(type==1||type==2){
                    state.userName = val.username
                    state.nickName = val.nickname
                    state.id=val.id
                    state.placeholderText = '请输入新密码'
                }else{
                    state.userName = ''
                    state.passWord = ''
                    state.placeholderText = '请输入密码'
                }
                state.editUserDialogShow = true
            },
            
            //设置
            saveSetting(){
                if(state.userName == '' || (state.titleType==0&&state.passWord == '') || state.nickName == ''){
                    ElMessage.warning('请输入用户信息！')
                } else if(state.passWord.indexOf(' ')!=-1){
                    ElMessage.warning('密码中不能包含空格！')
                } else if(state.passWord == ''){
                    ElMessage.warning('密码为空,请重新输入！')
                }else{
                    if(state.titleType == 0){
                    methods.addUser()
                    }else{
                    methods.updateUser()
                    }
                    state.editUserDialogShow = false
                }
            },
            
            //新增用户接口
            addUser(){
                let params = {
                    "username": state.userName,
                    "password": encryption.MD5encrypt(state.passWord),
                    "nickname": state.nickName
                };
                UserAjax.addUser(params).then(data=>{
                    methods.getUserList()
                })
            },

            //更新用户接口
            updateUser(){
                let userInfo={
                    "id":state.id,
                    "username": state.userName,
                    "nickname": state.nickName
                };
                let params = (state.passWord&&state.passWord!='')?{...userInfo,password:encryption.MD5encrypt(state.passWord)}:userInfo
                UserAjax.updateUser(params).then(data=>{
                    methods.getUserList()
                })
            },
            
            //删除用户接口
            deleteUser(item){
                ElMessageBox.confirm('确定移除该用户', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let param = {
                        "id":item.id
                    }
                     UserAjax.deleteUser(param).then(() => {
                    methods.getUserList()
                })
                }).catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '已取消'
                    });
                });
            }
       }
       return {
           ...toRefs(state),
           ...methods
        }
   }
})
</script>
<style scope lang="less">
.user_manage {
        height: 100%;
        width: 100%;
        .operation_area{
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
        .add_button {
            font-size: 1rem;
            cursor: pointer;
            margin-right: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 5rem;
            height: 1.5rem;
            border: 1px solid rgb(24, 81, 130);
            border-radius: 1.5rem;
            text-align: center;
            box-shadow: 0 0 1.5rem rgb(24, 81, 130) inset;
        }
        .el-input{
            width: 50%; 
        }
        .el-input__inner{
            border-radius:0.3rem;
            height:3rem;
        }
        .edit_box{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
            .label{
                display: inline-block;
                width: 8rem;
                text-align: right;
            }
        }
        .table_area{
            margin:0 0.5rem;
            width: calc(100% - 1rem);
            height: calc(100% - 4rem);
        }
        .margin_box{
            margin: 3rem;
        }
    }
</style>