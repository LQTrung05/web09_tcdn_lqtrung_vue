<template>
  <div class="combobox dropdown-department">
    <div
      class="lable-dropdown"
      :class="{
        'm-mb-4': marginBottom,
      }"
    >
      {{ lableValue }}
    </div>
    <div class="wrap-input-combobox">
      <input
        class="m-input-form"
        :class="{
          'm-input-form-error': errorMess,
        }"
        type="text"
        :value="modelValue"
        @input="updateInput"
        :placeholder="placeholderValue"
      />
      <div v-if="errorMess" class="err-message">
        {{ errorMess }}
      </div>
      <div
        class="combobox__button"
        :style="{ top: topValue, right:rightValue }"
        @click="loadDataList"
      >
        <div
          class="m-icon-arrow-dropdown m-icon-16"
          style="margin: 0 auto; align-self: center"
        ></div>
      </div>
    </div>
    <div
      class="combobox__data top-103 dropdown-department"
      :class="{ 'width-100': widthValue100, 'overflow-y': setOverflowY }"
      v-if="isShowList"
    >
      <div v-for="(item, index) in dataList" :key="index">
        <div class="data-item" @click="chooseItem(item)">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: [
    "lableValue",
    "errorMess",
    //Danh sách các bản ghi sẽ hiển thị 
    "dataList",
    "selectedItem",
    "topValue",
    "rightValue",
    "placeholderValue",
    "widthValue100",
    "setOverflowY",
    "modelValue",
    "marginBottom",
  ],
  emits: ["update:modelValue","chooseItem"],
  
  methods: {
    /**
     * Hàm đóng, mở danh sách đơn vị
     * Author: LQTrung (1/11/2022)
     */
    loadDataList() {
      const me = this;
      me.isShowList = !me.isShowList;
      me.$emit("loadDataList");
    },
    chooseItem(item) {
      const me = this;
      me.$emit("chooseItem", item);
      me.isShowList = !me.isShowList;

      // me.toggleList();
    },
    // updateSearch(e) {
    //   this.searchValue = e.target.value;
    // },
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
  data() {
    return {
      isShowList: false,
      searchValue: "",
    };
  },
};
</script>
<style scoped>
@import url("../../css/components/combobox.css");
</style>