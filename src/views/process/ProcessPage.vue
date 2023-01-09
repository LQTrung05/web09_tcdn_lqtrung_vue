<template>
    <ul class="ms-tabs-ul">
      <li class="ms-tabs-li active-item" @click="openProcessPage">
        <div class="ms-label tab-label">Quy trình</div>
      </li>
      <li class="ms-tabs-li" @click="openCashPage">
        <div class="ms-label tab-label">Thu, chi tiền</div>
      </li>
      <li class="ms-tabs-li">
        <div class="ms-label tab-label">Kiểm kê</div>
      </li>
      <li class="ms-tabs-li">
        <div class="ms-label tab-label">Dự báo dòng tiền</div>
      </li>
      <li class="ms-tabs-li">
        <div class="ms-label tab-label">Báo cáo</div>
      </li>
    </ul>
    <router-view name="menu"></router-view>
    <router-view name="process"></router-view>

    
</template>
<script>
export default {
  methods: {
    openProcessPage(){
        this.$router.push({name:"home"})
    },
    openCashPage(){
        this.$router.push({ name: "payment"})
    },
  },
}
</script>
<style scoped>
.body {
  background-color: #f1f1f1;
  height: calc(100vh - 56px);
  margin-left: 200px;
  overflow: auto;
}

.ms-tabs-ul {
  display: flex;
  list-style-type: none;
  border-bottom: 2px solid #babec5;
  margin: 14px 0 0 20px;
  padding: 0;
}
.ms-tabs-li > .ms-label {
  padding: 15px 20px;
}

.ms-tabs-li:hover {
  color: #2ca01c;
  cursor: pointer;
}

</style>