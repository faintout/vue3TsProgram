<template>
       <div class="switchLog channel_area">
        <div class="operation_area">
            <div style="width:18%">
                <div class="select_title">信源名称</div>
                <el-input style="width:70%" v-model="channelName" placeholder="请输入关键字" @keyup.13.native="search"></el-input>
            </div>
            <div style="width:16%">
                <div class="select_title">事件类型</div>
                <el-select style="width:75%" v-model="TypeValue" placeholder="请选择">
                    <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <!-- <div style="width:15%">
                <div class="select_title">事件原因</div>
                <el-input style="width:60%" v-model="switchReason" placeholder="请输入关键字"></el-input>
            </div> -->
            <div style="width:39%">
                <div class="time_title">事件时间</div>
                <el-date-picker
                    style="width:80%;margin-left:1rem;height:1.8rem;"
                    v-model="switchTime"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format = "YYYY-MM-DD HH:mm:ss"
                    >
                </el-date-picker>
                <div class="export_btn" style="width:8%;margin-left:1rem;" @click="search">查询</div>
            </div>
            <div class="export_log">
                <span class="export_btn" @click="exportLog">导出</span>
            </div>
        </div>
        <div class="table_region">
            <div class="tab_Title">
                <table>
                    <thead>
                        <tr>
                            <th width="20%">事件时间</th>
                            <th width="10%">信源名称</th>
                            <th width="10%">事件类型</th>
                            <th width="18%">事件描述</th>
                            <th width="42%">事件原因</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="tab_content">
                <table>
                    <tbody>
                        <tr v-for="item in switchLogList" :key="item.id" :style="{'color':(item.switchType==2&&item.happen==1)?'#FF0000':(item.switchType==2&&item.happen==0)?'#00CC00':'#fff'}">
                            <td width="20%">{{item.switchTime}}</td>
                            <td width="10%">{{item.name}}</td>
                            <td width="10%">{{item.switchType==0?'自动切换':item.switchType==1?'手动切换':'系统故障'}}</td>
                            <td width="18%">{{item.switchDetail}}</td>
                            <td width="42%">{{item.switchReason}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="pagination">
            <el-pagination
                v-if="total>per_page"
                background
                @current-change="handleCurrentChange"
                :current-page.sync="page"
                :page-size="per_page"
                layout="total,prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,ref ,reactive,toRefs,onMounted} from 'vue'
import { useRoute,useRouter} from 'vue-router'
import moment from "moment";
import { LogAjax } from "@/utils/ajaxUtil";
export default defineComponent({
   name:'switchLog',
   components:{},
   setup(props,context){
       const state = reactive({
           typeOptions: [{ value: 0, label: '全部' },{ value: 1, label: '自动切换' }, { value: 2, label: '手动切换' }, { value: 3, label: '系统故障' }],
           switchReason: '',
           TypeValue: null,
           channelName: '',
           page: 1,
           per_page: 30,
           switchLogList: [],
           checkAll: '',
           switchTime: [moment().startOf('day'), moment().endOf('day')],
           total: 0,
       })
       onMounted(() => {
           methods.getSwitchLog()
       })
       const methods = {
           //获取事件类型
            getEventType(){
               
           },
           handleCurrentChange(val) {
                state.page = val
                methods.getSwitchLog()
            },
            search() {
                methods.getSwitchLog()
            },
            // 获取切换日志
            getSwitchLog() {
                let switchTimeStart = moment(state.switchTime[0]).format('YYYY-MM-DD HH:mm:ss')
                let switchTimeEnd = moment(state.switchTime[1]).format('YYYY-MM-DD HH:mm:ss')
                let filters = {
                    switchTimeStart,
                    switchTimeEnd,
                    "switchReason": state.switchReason==""?null:state.switchReason,
                    "name": state.channelName==""?null:state.channelName,
                    "switchType": state.TypeValue,
                }
                let params = {
                    "page": state.page,
                    "per_page": state.per_page,
                    "filters": filters
                }
                LogAjax.getSwitchLogRealTime(params).then((res:any) => {
                    state.total = res.total
                    res.data.map((item) => {
                        item.isChecked = false
                    })
                    state.switchLogList = res.data
                })
            },

            exportLog() {
                methods.getSwitchLogDownload()
            },

            //下载切换日志
            getSwitchLogDownload() {
                let filters = {
                    "boardName":(state as any).boardName?.boardName||null,
                    "channelName": !state.channelName?null:state.channelName,
                    "switchType": state.TypeValue,
                    "switchReason": !state.switchReason?null:state.switchReason,
                    "switchTimeStart": (state.switchTime && state.switchTime.length > 0) ? moment(state.switchTime[0]).format("YYYY-MM-DD HH:mm:ss") : null,
                    "switchTimeEnd": (state.switchTime && state.switchTime.length > 0) ? moment(state.switchTime[1]).format("YYYY-MM-DD HH:mm:ss") : null,
                };
                let url = "/log/switchLogDownload?filters=" + JSON.stringify(filters)+'&ran='+Math.random()
                console.log(url);
                window.open(url);
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
.switchLog {
        display: flex;
        flex-direction: column;
        align-items: center;
        .operation_area {
            position: relative;
            height: 7%;
            width: calc(100% - 4rem);
            padding: 1rem 2rem 0;
            font-size: 1rem;
            .time_title {
                width: 70px;
                text-align: right;
            }

            .export_log {
                position: absolute;
                top:calc(50% - 0.3rem);
                right: 2rem;
            }

            .export_btn {
                cursor: pointer;
                color: #fff;
                height: 1.3rem;
                font-size: 0.9rem;
                padding: 0.1rem 1.3rem;
                border: 1px solid rgb(24, 81, 130);
                border-radius: 1.5rem;
                text-align: center;
                line-height: 1.3rem;
                background: #153161;
                box-shadow: 0 0 1.5rem rgb(24, 81, 130) inset;
            }

            .export_btn:hover {
                background: rgb(52, 126, 204);
            }
        }

        .operation_area,
        .operation_area>div {
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        .table_region {
            height: 85%;
            width: 98%;
        }

        .pagination {
            height: 6%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        //单页面内 element ui 样式复写
        .el-select>.el-input {
            width: 90%;
        }

        .el-input__inner {
            border-radius: 0.3rem;
        }

        .el-range-input {
            background: none;
            color: #fff;
        }

        .el-range-separator {
            color: #fff;
            line-height: 18px;
        }

        .el-range__icon,.el-pagination__jump,.el-pagination__total{
            color: #fff;
        }
    }
</style>