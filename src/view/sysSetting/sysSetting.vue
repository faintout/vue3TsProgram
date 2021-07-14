<template>
     <div class=content_main>
    <div class="channel_area">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="userManage"><UserManage v-if="modules == 0"></UserManage></el-tab-pane>
        <el-tab-pane label="其他配置" name="otherConfig"><OtherConfig v-if="modules == 1"></OtherConfig></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref ,reactive,toRefs,onMounted} from 'vue'
import { useRoute,useRouter} from 'vue-router'
import UserManage from '@/components/sysSetting/UserManage.vue'
import OtherConfig from '@/components/sysSetting/OtherConfig.vue'
export default defineComponent({
   name:'',
   components:{
       UserManage,
       OtherConfig
   },
   setup(props,context){
       const state = reactive({
            activeName: 'userManage',
            modules:0,
       })
       onMounted(() => {

       })
       const methods = {
           handleClick(tab, event) {
                state.modules = tab.index
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
@import "@/assets/css/sysSetting/sysSetting.less";
</style>