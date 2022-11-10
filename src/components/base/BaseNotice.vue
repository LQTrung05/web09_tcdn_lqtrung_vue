<template>
  <div class="success-message" v-if="isShowSuccessNotice">
    <div class="success-message-right">
      <div class="ico-success m-icon-32 m-icon-success-32"></div>
      <div class="title-success">Thành công!</div>
      <div class="content-success">{{titleNotice}}</div>
    </div>
    <div class="icon-closs m-icon-close-notice m-icon-16"></div>
  </div>
</template>
<script>
// import state from '@/store/state'
import {mapState} from 'vuex'
export default {
  props:[],
  computed:mapState({
      isShowSuccessNotice:(state)=>state.isShowSuccessNotice,
      titleNotice: (state)=>state.titleNotice,
    }),
  data() {
    return {
    }
  },
  methods:{

  }
};
</script>
<style scoped>
@import url("../../css/components/notice.css");
</style>