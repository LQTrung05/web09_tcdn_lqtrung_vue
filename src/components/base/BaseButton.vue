<template>
  <div>
    <button class="m-button" :class="addClass" :disabled="btnDisable">{{ btnText }}</button>
  </div>
</template>

<script>
export default {
  props:{
     addClass: {
      type:String
     },
     btnText:{
      type: String
     },
     btnDisable:{
        type: Boolean,
        default: false
     }
  },
  data() { 
    return {
    }
  }
}
</script>
<style scoped>
    @import url("../../css/components/button.css");
</style>
