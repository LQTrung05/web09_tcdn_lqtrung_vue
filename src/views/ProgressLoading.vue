<template>
  <div class="loading-data" v-if="isShowProgress">
        <img src="../assets/loading.svg" alt="" class="img-loading">
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed:mapState({
    isShowProgress: (state) =>state.isShowProgress,
  }),
}
</script>
<style scoped>
@import url("../css/components/loading.css");
</style>