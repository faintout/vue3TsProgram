<template>
   <div>option</div>
</template>

<script lang="ts">
import { defineComponent,ref ,reactive,toRefs,onMounted} from 'vue'
import { useRoute,useRouter} from 'vue-router'
export default defineComponent({
   name:'channel',
   components:{},
   setup(props,context){
       const state = reactive({

       })
       onMounted(() => {

       })
       const methods = {

       }
       return {
           ...toRefs(state),
           ...methods
        }
   }
})
</script>
<style scope lang="less">
</style>