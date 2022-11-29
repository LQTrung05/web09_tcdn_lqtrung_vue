<template>
  <div class="loading-data" v-if="isShowProgress">
        <img src="../../assets/loading.svg" alt="" class="img-loading">
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed:mapGetters([
    "isShowProgress"
  ]),
}
</script>
<style scoped>
@import url("../../css/components/loading.css");
</style>