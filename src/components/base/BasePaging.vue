<template>
  <div class="m-paging">
    <div class="m-paging-left">
      {{ text.total }}: <b>{{ totalRecord }}</b>
    </div>
    <div class="m-paging-right">
      <div class="text-number-record">{{ text.numberRecordPerPage }}:</div>
      <div class="m-paging-right-option">
        <div class="dropdownlist">
          <div class="page-size">{{ pageSize }}</div>
          <div
            class="icon-choose-page-size m-icon-14 m-icon-chevron-down-bold"
            @click="toggleList"
          ></div>

          <!-- combobox chọn số lượng bản ghi trên 1 trang -->
          <div v-if="isShowList" class="numbers-record-in-a-page bottom-100">
            <div
              class="data-item"
              v-for="(item, index) in options"
              :key="index"
              @click="selectNumberRecord(item)"
            >
              {{ item }}
              <div
                v-if="item === pageSize"
                class="m-icon-checkbox-active m-icon-14 m-item-icon-is-choose"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div style="padding-left: 16px">
        {{ recordStart }} - {{ recordEnd }}
        {{ text.record }}
      </div>
      <div class="m-paging-right-page">
        <button
          :disabled="pageNumber == 1"
          :class="{ opacity: pageNumber == 1 }"
          class="m-btn-first"
          @click="selectFrontPage"
        >
          <div class="icon-choose-page-size m-icon-14 m-icon-arrow-left"></div>
        </button>
        <button
          :disabled="pageNumber == totalPage"
          :class="{ opacity: pageNumber == totalPage }"
          class="m-btn-last"
          @click="selectNextPage"
        >
          <div class="icon-choose-page-size m-icon-14 m-icon-arrow-right"></div>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import resourceVN from "../../resource/resourceVN";

export default {
  props: [
    "totalRecord",
    "totalPage",
    "pageSize",
    "recordStart",
    "recordEnd",
    "pageNumber",
    "isShowList"
  ],
  methods: {
    toggleList() {
      this.$emit("toggleList")
    },
    selectNumberRecord(item) {
      this.$emit("selectNumberRecord", item); 
    },
    selectFrontPage() {
      this.$emit("selectFrontPage");
    },
    selectNextPage(){
      this.$emit("selectNextPage");
    }
  },
  data() {
    return {
      options: ["10", "20", "30", "50", "100"],
      text: resourceVN.TEXT,
    };
  },
};
</script>
<style scoped>
@import url("../../css/components/paging.css");
.m-btn-first,
.m-btn-last {
  padding: 0 !important;
}
.m-btn-first,
.m-btn-last:hover {
  cursor: pointer;
}
</style>