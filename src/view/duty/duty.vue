<template>
    <div class="content_main">
        <div class="channel_area trans" :class="{channel_area_show_log: showSwitchLog}">
            <!--操作区域-->
            <div class="operation_area operation_area_bottom">
                <el-input v-model="searchKeyWord" placeholder="请输入关键字" suffix-icon="el-icon-search">
                </el-input>
            </div>
            <!--通道展示区域-->
            <div class="content_area" :style="{'width': channelDetailIsLock ? 'calc(75.5% - 1rem)' : 'calc(100% - 1rem)'}">
                <template v-for="(channel,index) in channelList" :key="index">
                    <div class="channel_item"  v-if="searchShow(channel)">
                    <div class="item_title">
                        <span :title="channel.name">{{channel.name}}</span>
                        <div class="item_img" @click="showDetail(channel,index)">
                            <img src="./../../assets/images/detail.png">
                        </div>
                    </div>
                    <div class="item_content">
                        <div class="switch">
                                    <!-- @change="changeSwitchMode(channel)" -->
                            <el-switch
                                    class="switchStyle"
                                    :value="channel.switchMode"
                                    active-color="#FF8400"
                                    active-text="手动"
                                    active-value="1"
                                    inactive-value="0"
                                    inactive-text="自动"
                                    inactive-color="#0083D9">
                            </el-switch>
                        </div>
                        <div class="outPut_area">
                            <div class="outPut_item">
                                <div class="status">
                                    <img v-if="channel.mainOutPutStatus == 1" src="./../../assets/images/green.png">
                                    <img v-if="channel.mainOutPutStatus == 0" src="./../../assets/images/red.png">
                                    <img v-if="channel.mainOutPutStatus == -1" src="./../../assets/images/gray.png">
                                </div>
                                <div class="outPut">
                                    <img v-if="channel.outPuting == 0" src="./../../assets/images/main.png">
                                    <img v-else-if="channel.outPuting != 0" 
                                        src='./../../assets/images/main_grey.png'>
                                </div>
                            </div>
                            <div class="outPut_item">
                                <div class="status">
                                    <img v-if="channel.bakOutPutStatus == 1" src="./../../assets/images/green.png">
                                    <img v-if="channel.bakOutPutStatus == 0" src="./../../assets/images/red.png">
                                    <img v-if="channel.bakOutPutStatus == -1" src="./../../assets/images/gray.png">
                                </div>
                                <div class="outPut">
                                    <img v-if="channel.outPuting == 1" src="./../../assets/images/bak.png">
                                    <img v-else-if="channel.outPuting != 1" 
                                        src="./../../assets/images/bak_grey.png">
                                </div>
                            </div>
                            <!-- <div class="outPut_item">
                                <div class="status">
                                    <img v-if="channel.auxOutPutStatus == 1" src="./../../assets/images/green.png">
                                    <img v-if="channel.auxOutPutStatus == 0" src="./../../assets/images/red.png">
                                     <img v-if="channel.auxOutPutStatus == -1" src="./../../assets/images/gray.png">
                                </div>
                                <div class="outPut">
                                    <img v-if="channel.outPuting == 2" src="./../../assets/images/auxiliary.png">
                                    <img v-else-if="channel.outPuting != 2" @click="switchOutPut(channel, 2)"
                                        src="./../../assets/images/aux_grey.png">
                                </div>
                            </div> -->
                        </div>
                    </div>
                    </div>
                </template>
                
            </div>
        </div>

        <!--码流详情-->
        <div class="detailBtn trans"
            :style="{'right': showChannelDetail ? '25%' : '0%','opacity': showChannelDetail ? '0': '1'}"
            @click="getChannelDetail()">
            <img src="../../assets/images/left_icon.png"> 
            </div>
        <div class="channel_detail_area trans" :style="{'width': showChannelDetail ?'26%' : '0%'}">
            <ChannelDetail :showDetail="selectChannel" :selectRoad="selectChannel&&selectChannel.outPutDetial"
                @islocked="getIslocked"></ChannelDetail>
        </div>

        <!--日志展示区域-->
        <div class="switchLogBtn trans"
            :style="{'bottom': showSwitchLog ? 'calc(30% + 0.5rem)' : '0','left': channelDetailIsLock ? 'calc(40% - 50px)' : 'calc(50% - 50px)'}"
            @click="showSwitchLog = !showSwitchLog">系统日志</div>
        <div class="switchLog_area trans"
            :style="{'height': showSwitchLog ? '29%' : '0%','width': channelDetailIsLock ? 'calc(75% - 1rem)' : 'calc(100% - 1rem)','border':showSwitchLog?'1px solid rgb(46, 120, 233)':'none'}">
            <!-- <switch-log-list v-if="showSwitchLog"></switch-log-list> -->
        </div>

    </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  onMounted,
  provide,
  watch
} from "vue";
import { useRoute, useRouter } from "vue-router";
// import SwitchLogList from "@/components/duty/switchLogList.vue";
import ChannelDetail from "@/components/duty/channelDetail.vue";
import { ChannelAjax } from "@/utils/ajaxUtil";
// import {WSClient} from "@/utils/webSocketUtil";

export default defineComponent({
  name: "duty",
  components: {  ChannelDetail },
  setup(props, context) {
      const router = useRouter()
    const state = reactive({
      // 通道列表
                channelList: [],
                // 搜索关键字
                searchKeyWord: "",
                // 展示切换日志 默认为false
                showSwitchLog: false,
                // 选中的通道
                selectChannel: null,
                //展示码流详情 默认false
                showChannelDetail: false,
                //码流详情是否锁定 默认false
                channelDetailIsLock: false,
                //确定点击通道索引，实时更新
                selectedIndex: -1,
    });
    watch(state.channelList,(newValue,oldValue)=>{
       if (state.showChannelDetail) {
                    if(state.selectedIndex!=-1){//锁定详情，点击实时切换
                        state.selectChannel = state.channelList[state.selectedIndex]
                    }else if(sessionStorage.detailList){//锁定详情，页面切换，保存在sessionStorage，定位上次点开详情
                        state.selectChannel = JSON.parse(sessionStorage.detailList)
                    }
                }
    })
    onMounted(() => {
      
            methods.getChannelStatus();
    });
    const methods = {
            //获取是否锁定码流详情
            getIslocked(data) {
                state.channelDetailIsLock = data
            },
            // 获取通道状态
            getChannelStatus() {
                ChannelAjax.getChannelStatus().then((res:any) => {
                    methods.makeChannelList(res.data);
                });
            },

            // 拼装通道列表，用于整体界面展示
            makeChannelList(data) {
                // _.each(data, (channel) => {
                //     channel.switchMode += "";
                // });
                state.channelList = data;
            },

            // // 创建webSocket订阅事件
            // createSocketEvent() {
            //     let ws = new WSClient();
            //     if (!ws.wsClient && !ws.connected) {
            //         ws.connect(() => {
            //             ws.wsClient.on("channelStatus", (res) => {
            //                 if (res.success && res.data) {
            //                     state.makeChannelList(res.data);
            //                 }
            //             })
            //         });
            //     } else {
            //         ws.wsClient.on("channelStatus", (res) => {
            //             if (res.success && res.data) {
            //                 state.makeChannelList(res.data);
            //             }
            //         })
            //     }
            // },

            // 修改切换模式
            // changeSwitchMode(channel) {
            //     let switchMode = channel.switchMode==1?0:1
            //     let params = {
            //         chan: parseInt(channel.chan),
            //         switchMode: parseInt(switchMode)
            //     };
            //     ChannelAjax.setChannelSwitchMode(params).then(() => {
            //         state.getChannelStatus();
            //         console.log("通道" + channel.name + "的切换模式修改为：" + channel.switchMode);
            //     })
            // },


            // 搜索事件，判定通道是否展示
            searchShow(channel) {
                let isSearch = true;
                let searchText = channel.name+channel.outPutDetial.address+channel.mainDetail.address+channel.bakDetail.address+channel.auxDetail.address;
                isSearch = searchText.toLowerCase().indexOf(state.searchKeyWord.toLowerCase()) >= 0;
                channel.isSearch = isSearch;
                return isSearch;
            },

            getChannelDetail(){
                if(state.selectedIndex!=-1){//锁定详情，点击实时切换
                    state.selectChannel = state.channelList[state.selectedIndex]
                }else if(sessionStorage.detailList){//锁定详情，页面切换，保存在sessionStorage，定位上次点开详情
                    state.selectChannel = JSON.parse(sessionStorage.detailList)
                }else{//左滑详情框初始化为第一个通道详情
                    state.selectedIndex = 0
                    state.selectChannel = state.channelList[state.selectedIndex]
                }
                if(!state.channelDetailIsLock){
                    state.showChannelDetail= !state.showChannelDetail
                }
            },

            // 查看详情
            showDetail(channel, index) {
                state.selectChannel = channel;
                if(state.showChannelDetail&&(state.selectedIndex == index) && (!state.channelDetailIsLock)){
                    state.showChannelDetail = false
                }else{
                    state.showChannelDetail = true
                }
                 state.selectedIndex = index
            }
    };
    provide("showDetail", state.selectChannel); //爷孙传值
    return {
      ...toRefs(state),
      ...methods,
    };
  },
});
</script>
<style scope lang="less">
</style>