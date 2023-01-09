<template>
  <div class="dropdown-provider-group">
    <div class="lable-dropdown m-mb-4">{{ lableValue }}</div>
    <div>
      <div class="wrap-input-combobox display-f">
        <div class="supper-wrap-content-list">
          <div class="display-f wrap-content-list">
            <div
              v-for="(cell, index) in listProviderGroupIsChoose"
              :key="index"
              class="item-list display-f"
            >
              <div class="item-content">{{cell}}</div>
              <div class="item-icon mi mi-16 mi-close--small m-ml-4 " @click="deleteCell(cell)"></div>
            </div>
            <input
              class="m-input-mutil-choise"
              :value="modelValue"
              @input="updateInput"
              size="1"
            />
          </div>
        </div>
        <div class="wrap-icon display-f">
          <div
            class="combobox__button display-f"
            :style="{ top: topValue, right:rightValue }"
            @click="toggleList"
          >
            <div
              class="m-icon-arrow-dropdown m-icon-16"
              style="margin: 0 auto; align-self: center"
            ></div>
          </div>
          <div
            class="
              combobox__button
              right-31
              display-f
              border-right border-radius-none
            "
            :style="{ top: topValue  }"
            v-if="permitAdd === true"
            @click="toggleAddForm"
          >
            <div
              class="m-icon-plus m-icon-16"
              style="margin: 0 auto; align-self: center"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="combobox__data dropdown-department"
      v-if="isShowList"
      :class="{ 'width-100': width100 === true }"
    >
      <table class="m-combobox-table">
        <thead>
          <tr>
            <th
              v-for="(header, index) in headers"
              :key="index"
              :class="header.class"
              :style="{ 'min-width': header.minWidth }"
              :title="header.title"
            >
              {{ header.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in dataList"
            :key="index"
            :class="{ 'm-checked': item.isChecked }"
            @click="chooseItem(item)"
          >
            <td v-for="(value, index) in dataColumnList(item)" :key="index">
              {{ value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  props: [
    "lableValue",
    "errorMess",
    "modelValue",
    "topValue",
    "rightValue",
    "placeholderValue",
    // Danh sách các cột tiêu đề trong table
    "headers",
    //Danh sách các dòng dữ liệu có trong table
    "dataList",
    //Số lượng cột có trong 1 dòng của table
    "dataColumnList",
    //Ẩn hiện icon thêm ngay trên input
    "permitAdd",
    "width100",
    //Danh sách các nhóm nhà cung cấp của một nhà cung cấp
    "listProviderGroupIsChoose",
    //ID của item được chọn
    "IDItem",

  ],
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
    /**
     * Hàm đóng, mở danh sách đơn vị
     * Author: LQTrung (1/11/2022)
     */
    toggleList() {
      this.isShowList = !this.isShowList;
    },
    chooseItem(item) {
      this.$emit("chooseItem", item);
    },
    deleteCell(item){
      this.$emit("deleteCell",item);
    },
    toggleAddForm() {
      this.$emit("toggleAddForm");
    },
  },
  data() {
    return {
      isShowList: false,
    };
  },
};
</script>
<style scoped>

.border-right {
  border-right: 1px solid #babec5;
}
.wrap-input-combobox {
  border: 1px solid red;
  display: flex;
  min-height: 32px;
  border: 1px solid #babec5;
  border-radius: 2px;
  background-color: #fff;
  overflow: hidden;
}
.supper-wrap-content-list{
  width: calc(100% - 64px);
}
.wrap-content-list {
  flex-basis: 100%;
  flex-grow: 1;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 0 0 10px;
}
.item-list {
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: #f0f0f0;
  padding: 2px 3px 2px 5px;
  margin: 3px;
  max-width: calc(100% - 50px);
  overflow: hidden;
  text-overflow: ellipsis;
}
.m-input-mutil-choise {
  width: auto !important;
  min-width: 50px;
  /* border: none; */
  border: none;
  font-size: 13px;
  padding-right: unset;
  text-overflow: ellipsis;
  background-color: transparent;
  display: flex;
  flex-grow: 1;
}
.m-input-mutil-choise:focus{
  border: none;
}
.dropdown-provider-group{
  position: relative;
}
.combobox__button {
  width: 32px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: -webkit-fill-available;
  position: absolute;
  
}
.combobox__button:hover{
  background-color: #babec5;
}
.combobox__data{
  width: 100%;
}
.item-icon:hover{
  cursor: pointer;
}
</style>