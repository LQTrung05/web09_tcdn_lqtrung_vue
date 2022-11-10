<template>
  <div class="m-paging">
    <div class="m-paging-left">Tổng số: <b>1000</b> bản ghi</div>
    <div class="m-paging-right">
      <div class="m-paging-right-option">
        <div class="dropdownlist">
          <input
            class="input dropdownlist__input"
            type="text"
            value="10 bảng ghi 1 trang"
          />
          <button class="btn-pagination" @click="toggleList" >
            <div 
              class="m-icon-arrow-dropdown m-icon-16"
              style="align-self: center"
            ></div>
          </button>
          <div  v-if="isShowList" class="dropdownlist__data numbers-record-in-a-page bottom-100">
            <div class="data-item">10 bản ghi 1 trang</div>
            <div class="data-item">20 bản ghi 1 trang</div>
            <div class="data-item">30 bản ghi 1 trang</div>
            <div class="data-item">40 bản ghi 1 trang</div>
          </div>
        </div>
      </div>
      <div class="m-paging-right-page">
        <button class="m-btn-first">Trước</button>
        <button class="m-btn-first selected">1</button>
        <button class="m-btn-first">2</button>
        <button class="m-btn-first">3</button>
        <button class="m-btn-last">Sau</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowList:false
    }
  },
  methods:{
    toggleList(){
      this.isShowList = !this.isShowList;
    }
  }
};
</script>
<style scoped>
  @import url("../css/components/paging.css");
</style>