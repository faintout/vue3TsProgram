<!--
 * @Author: LiuFengRui
 * @Date: 2021-07-12 14:18:06
 * @LastEditTime: 2021-07-12 14:29:30
 * @LastEditors: LiuFengRui
 * @Description: 
-->
<template>
  <div class="channel_detail">
    <div class="channel_title">
      <span :title="showDetail && showDetail.name" class="detail_title">{{
        showDetail && showDetail.name
      }}</span>
      <img
        v-if="!islocked"
        @click="islocked = !islocked"
        class="lock_icon"
        src="@/assets/images/open.png"
      />
      <img
        v-if="islocked"
        @click="islocked = !islocked"
        class="lock_icon"
        src="@/assets/images/lock.png"
      />
    </div>
    <div class="detail_content">
      <div class="detail_box">
        <div
          class="detail_item"
          v-for="(item, index) in detailList"
          :key="index"
        >
          <div :class="{ item_name: index != 0, out_text: index == 0 }">
            {{
              index == 0
                ? "输出"
                : index == 1
                ? "主路"
                : index == 2
                ? "备路"
                : "辅路"
            }}
          </div>
          <div class="item_content">
            <div class="left_top"></div>
            <div class="right_top"></div>
            <div class="left_bottom"></div>
            <div class="right_bottom"></div>
            <div :class="{ item_info: index != 0, info_style: index == 0 }">
              <div class="info_content">
                <span
                  >地址<span class="special">{{ item.address }}</span></span
                >
                <span
                  >码率<span class="special"
                    >{{
                      item.band ? parseFloat(item.band / 1000).toFixed(2) : 0
                    }}Mbps</span
                  ></span
                >
                <span v-if="index == 0"
                  >当前输出
                  <span class="special">{{
                    showDetail.outPuting == 0
                      ? "主"
                      : showDetail.outPuting == 1
                      ? "备"
                      : "辅"
                  }}</span>
                </span>
                <span v-if="index == 0"
                  >切换模式<span class="special">{{
                    showDetail.switchMode == 0 ? "自动" : "手动"
                  }}</span></span
                >
              </div>
            </div>
            <div class="left_right_content" v-if="index != 0">
              <div class="item_alarm info_border">
                <div class="basic_info">告警：</div>
                <div class="colum_style">
                  <!-- <div v-if="item.pids.length>0" v-for="(value,num) in item.pids" :key="num">
                                        <img style="width:10px;height:10px;" :src="value.status==0?erroSrc:rightSrc">
                                        <span>{{value.pid}}&nbsp;</span>
                                        <span v-if="value.type">({{value.type}})</span>
                                        <span v-if="value.band&&value.band>1000">&nbsp;{{parseFloat(value.band/1000).toFixed(2)}}Mbps</span>
                                        <span v-if="value.band<1000">&nbsp;{{value.band}}Kbps</span>
                                    </div> -->
                  <!-- 当前复用流 -->
                  <!-- PAT -->

                  <template v-if="item.programInfo && item.programInfo.length">
                    <div
                      class="_double_use"
                      v-for="(pidInfo, index) in item.programInfo"
                      :key="index"
                    >
                      <img
                        style="width: 10px; height: 10px"
                        :src="pidInfo.programStatus == 0 ? erroSrc : rightSrc"
                      />
                      <span>{{ pidInfo.programName }}&nbsp;</span>
                      <span>({{ pidInfo.programNum }})</span>
                      <div
                        v-for="(pid, idx) in pidInfo.programPids"
                        :key="idx"
                        class="_double_use_item"
                        style="position: relative"
                      >
                        <span class="_dashed">
                          <div class="_dashed_left"></div>
                          <div class="_dashed_right"></div>
                        </span>
                        <!-- 每个下列的菜单都有个left和right然后根据数据产生相应的 -->
                        <span style="margin-top: 2px">
                          <img
                            style="width: 10px; height: 10px"
                            :src="pid.status == 0 ? erroSrc : rightSrc"
                          />
                          <span>{{ pid.pid }}&nbsp;</span>
                          <span v-if="pid.type">({{ pid.type }})</span>
                          <span v-if="pid.band && pid.band > 1000"
                            >&nbsp;{{
                              parseFloat(pid.band / 1000).toFixed(2)
                            }}Mbps</span
                          >
                          <span v-if="pid.band < 1000"
                            >&nbsp;{{ pid.band }}Kbps</span
                          >
                        </span>
                      </div>
                    </div>
                  </template>

                  <span
                    v-if="
                      item.patInfo &&
                      item.patInfo.length == 0 &&
                      item.programInfo &&
                      item.programInfo == 0
                    "
                    >暂无数据</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { log } from "util";
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  onMounted,
  watch,
  inject,
} from "vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "channelDetail",
  components: {},
  props:{
     showDetail:Array,
  },
  setup(props, context) {
   //  const propsNew2 = inject("showDetails"); //接受爷传过来的值
   //  console.log(propsNew2,'newnew'); 
    const propsNew = props.showDetail
    const state = reactive({
      detailList: [],
      rightSrc: import("@/assets/images/green.png"),
      erroSrc: import("@/assets/images/red.png"),
      noWatchSrc: import("@/assets/images/gray.png"),
      islocked: false, //详情页是否锁定
      outInfo: {},
    });
    onMounted(() => {
       console.log(props.showDetail,'props');
       const route = useRoute()
       if (route.query.channelIsLock == "true") {
      state.islocked = route.query.channelIsLock == "true" ? true : false;
    }
    }); 
    watch(props, (newProps, oldProps) => {
      console.log(props,newProps)
    });
    const methods = {};
    return {
      ...toRefs(state),
      ...methods,
      propsNew,
    };
  },
});
</script>
<style scope lang="less">
._dashed {
  position: relative;
  width: 25px;
  height: 15px;
  display: inline-block;
}

._dashed_left {
  position: absolute;
  height: 100%;
  border: 1px solid #0b6de8;
  top: -5px;
  left: 3px;
  display: inline-block;
}

._dashed_right {
  position: relative;
  width: 89%;
  border: 1px solid #0b6de8;
  top: -1px;
  left: 3px;
  transform: translate(0px, 50%);
  display: inline-block;
}

.channel_detail {
  width: 100%;
  height: 100%;
  background: url("@/assets/images/detail_bg.png") no-repeat;
  background-size: 100% 100%;

  .channel_title {
    width: calc(100% - 4rem);
    height: 5%;
    margin: 0 1rem 0 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .detail_title {
    display: inline-block;
    font-size: 1.3rem;
    width: 90%;
    white-space: nowrap; //强制换行（中英文有效）
    overflow: hidden; //隐藏超出的内容
    text-overflow: ellipsis; //超出的内容设置成省略号
  }

  .lock_icon {
    cursor: pointer;
    width: 1.5rem;
    height: 1.5rem;
  }

  .detail_content {
    height: calc(96% - 1rem);
    width: 100%;
    margin-bottom: 1rem;
  }

  .detail_box {
    height: 100%;
    margin: 0 2rem 0 4rem;
  }

  .detail_item {
    height: 26%;
  }

  .detail_item:nth-child(1) {
    height: 15%;
  }

  .colum_style {
    height: 85%;
    width: 180%;
    overflow-y: auto;
    margin-top: 0.3rem;
    line-height: 1.3rem;
    display: flex;
    flex-direction: column;
  }

  .row_style {
    height: 70%;
    overflow-y: auto;
    padding-top: 0.8rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .row_style > div {
    width: 50%;
  }

  .item_name {
    color: #fea700;
    font-size: 1.1rem;
    line-height: 2rem;
    margin: 1rem 0 0.1rem 0;
  }

  .out_text {
    color: #fea700;
    font-size: 1.1rem;
    margin-bottom: 0.2rem;
  }

  .item_content {
    height: 84%;
    width: 100%;
    position: relative;
    background: rgba(255, 255, 255, 0.08);
    padding-bottom: 0.3rem;
  }

  .item_info {
    font-size: 1rem;
    padding: 0.3rem 0 0 0;
    margin: 0 1rem;
    border-bottom: 1px solid #12659b;
  }

  .info_border {
    font-size: 0.9em;
    padding: 0.3rem 0;
    margin: 0 1rem;
    // margin-left: .6rem;
  }

  .info_style {
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 1rem;
    padding: 0.3rem 0;
    margin: 0 1rem;
  }

  .item_alarm {
    width: 33%;
  }

  .item_pid_detail {
    height: calc(100% - 1.3rem);
    width: 65%;
  }

  .left_right_content {
    height: 70%;
    width: 100%;
    margin-top: 0.2rem;
    display: flex;
    flex-direction: row;
  }

  .special {
    font-size: 0.9rem;
    margin-left: 0.5rem;
    color: rgb(126, 194, 252);
  }

  .info_content {
    height: 70%;
    line-height: 2rem;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    margin: 0.2rem 0;
  }

  .info_content > span:nth-child(odd) {
    width: 60%;
  }

  .info_content > span:nth-child(even) {
    width: 40%;
  }

  .basic_info {
    color: rgb(26, 198, 255);
    padding-left: 0.5rem;
    border-left: 4px solid rgb(26, 198, 255);
  }

  @media screen and (max-height: 750px) {
    .detail_content {
      overflow-y: auto;
    }

    .detail_item {
      height: 28%;
    }
  }

  @media screen and (max-width: 1723px) {
    .info_border {
      font-size: 0.3em;
      margin: 0;
      margin-left: 0.6rem;
    }

    // .item_alarm {
    //     width: 33%;
    // }
    .item_pid_detail {
      width: 65%;
    }

    .detail_box {
      margin: 0 1rem 0 3rem;
    }
  }
}
</style>