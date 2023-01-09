<template>
    <div class="header">
        <div class="m-company-name">
            <div class="m-header-icon m-icon-24 m-icon-three-stripes"></div>
            <div class="m-branch-name">{{text.nameCompany}}</div>
            <div class="m-navbar-icon m-icon-14 m-icon-chevron-down-bold"></div>
        </div>
        <div class="m-user-name">
            <div class="m-navbar-icon align-seft-center m-icon-24 m-mr-24 m-icon-bell"></div>
            <img class="m-user-image " src="../../assets/img/default-avatar.jpg" alt="User image">

            <div class="m-user align-seft-center">Lưu Quang Trung</div>
            <div class="m-navbar-icon align-seft-center m-icon-14 m-icon-chevron-down"></div>
        </div>
    </div>
</template>
<script>
import resourceVN from "../../resource/resourceVN"
export default {
  name:"TheHeader",
  components:"",
  props:[],
  methods: {
    
  },
  data() {
    return {
      propertyName: resourceVN.PROPERTY_NAME,
      text: resourceVN.TEXT,
    }
  },

}
</script>
<style scoped>
  @import url("../../css/layout/header.css");
</style>