<template>
  <div class="combobox dropdown-department">
    <div class="lable-dropdown m-mb-4">{{ lableValue }}</div>
    <div class="wrap-combobox-content">
      <div class="wrap-input-combobox">
        <input
          class="m-input-form"
          :class="{ 'm-input-form-error': errorMess }"
          type="text"
          :value="modelValue"
          @input="updateInput"
          :placeholder="placeholderValue"
        />
        <div v-if="errorMess" class="err-message">
          {{ errorMess }}
        </div>
        <div class="wrap-icon">
          <div
            class="combobox__button"
            :style="{ top: topValue, right:rightValue }"
            @click="toggleList"
          >
            <div
              class="m-icon-arrow-dropdown m-icon-16"
              style="margin: 0 auto; align-self: center"
            ></div>
          </div>
          <div
            class="combobox__button right-31 border-right border-radius-none"
            :style="{ top: topValue }"
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
      <div
        class="combobox__data dropdown-department"
        v-if="isShowList"
        :class="{'width-100': width100 === true}"
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
              @click ="chooseItem(item)"
            >
              <td v-for="(value, index) in dataColumnList(item)" :key="index">
                {{ value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
    // Danh s??ch c??c c???t ti??u ????? trong table
    "headers",
    //Danh s??ch c??c d??ng d??? li???u c?? trong table
    "dataList",
    //S??? l?????ng c???t c?? trong 1 d??ng c???a table
    "dataColumnList",
    //???n hi???n icon th??m ngay tr??n input
    "permitAdd",
    "width100",
  ],
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
    /**
     * H??m ????ng, m??? danh s??ch ????n v???
     * Author: LQTrung (1/11/2022)
     */
    toggleList() {
      this.isShowList = !this.isShowList;
    },
    chooseItem(item) {
      const me = this;
      me.toggleList();
      me.$emit("chooseItem", item);
    },
    toggleAddForm(){
      this.$emit("toggleAddForm");
    }
  },
  data() {
    return {
      isShowList: false,
    };
  },
};
</script>
<style scoped>
@import url("../../css/components/combobox.css");
.border-right {
  border-right: 1px solid #babec5;
}
</style>