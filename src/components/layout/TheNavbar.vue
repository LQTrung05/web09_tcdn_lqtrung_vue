<template>
  <div class="navbar">
        <div class="nav-logo">
            <div class="sibar"></div>
            <img class="m-logo-icon" src="../../assets/img/Logo_Module_TiengViet_White.66947422.svg" alt=""
            @click="backProcessPage">
        </div>
        <div class="nav-item">
            <a href="" class="m-item-navbar">
                <div class="m-item-icon m-icon-24 m-icon-dashboard"></div>
                <div class="cl-white">{{navbarItem.overView}}</div>
            </a>
        </div>
        <div class="nav-item">
            <router-link class="m-item-navbar" :to="{name: 'home'}">
                <div class="m-item-icon m-icon-24 m-icon-cash"></div>
                <div class="cl-white">{{navbarItem.cash}}</div>
            </router-link>
        </div>
        <div class="nav-item">
            <a href="" class="m-item-navbar">
                <div class="m-item-icon m-icon-24 m-icon-bank"></div>
                <div class="cl-white">{{navbarItem.deposit}}</div>
            </a>
        </div>
        <div class="nav-item">
            <a href="" class="m-item-navbar">
                <div class="m-item-icon m-icon-24 m-icon-buy"></div>
                <div class="cl-white">{{navbarItem.purchase}}</div>
            </a>
        </div>

        <div class="nav-item">
            <a href="" class="m-item-navbar">
                <div class="m-item-icon m-icon-24 m-icon-invoice"></div>
                <div class="cl-white">{{navbarItem.manageInvoice}}</div>
            </a>
        </div>
        <div class="nav-item">
            <a href="" class="m-item-navbar">
                <div class="m-item-icon m-icon-24 m-icon-stock"></div>
                <div class="cl-white">{{navbarItem.warehouse}}</div>
            </a>
        </div>
        <div class="nav-item">
            <a href="" class="m-item-navbar">
                <div class="m-item-icon m-icon-24 m-icon-fixed-assets"></div>
                <div class="cl-white">{{navbarItem.fixedAsset}}</div>
            </a>
        </div>
        <div class="nav-item">
            <a href="" class="m-item-navbar">
                <div class="m-item-icon m-icon-24 m-icon-tax"></div>
                <div class="cl-white">{{navbarItem.tax}}</div>
            </a>
        </div>
        <div class="nav-item">
            <a href="" class="m-item-navbar">
                <div class="m-item-icon m-icon-24 m-icon-general"></div>
                <div class="cl-white">{{navbarItem.synthetic}}</div>
            </a>
        </div>
        <div class="nav-item">
            <a href="" class="m-item-navbar">
                <div class="m-item-icon m-icon-24 m-icon-budget"></div>
                <div class="cl-white">{{navbarItem.budget}}</div>
            </a>
        </div>
        <div class="nav-item">
            <a href="" class="m-item-navbar">
                <div class="m-item-icon m-icon-24 m-icon-report"></div>
                <div class="cl-white">{{navbarItem.report}}</div>
            </a>
        </div>
        <div class="nav-item">
            <a href="" class="m-item-navbar">
                <div class="m-item-icon m-icon-24 m-icon-finance"></div>
                <div class="cl-white">{{navbarItem.financialAnalysis}}</div>
            </a>
        </div>

    </div>
</template>
<script>
import resourceVN from "../../resource/resourceVN"
export default {
  name:"TheNavbar",
  components:"",
  props:[],
  methods: {
    backProcessPage(){
        this.$router.push({ name: 'home'})
    }
  },
  data() {
    return {
      navbarItem: resourceVN.NAVBAR_ITEM,
      
    }
  },

}
</script>
<style scoped>
  @import url("../../css/layout/navbar.css");
  .m-logo-icon:hover{
    cursor: pointer;
  }
</style>