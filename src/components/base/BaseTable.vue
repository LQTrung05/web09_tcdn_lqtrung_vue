<template>
  <div class="wrap-table-primary heigh-table">
    <table class="m-table">
      <thead>
        <tr>
          <th>
            <input
              @click="clickCheckAll"
              id="checkboxAll"
              class="text-align-center"
              type="checkbox"
              v-model="chooseAllProvider"
            />
          </th>
          <th
            v-for="(header, index) in headers"
            :key="index"
            :style="{ 'min-width': header.minWidth }"
            :title="header.title"
          >
            {{ header.name }}
          </th>
          <th class="text-align-center" style="min-width: 100px">
            {{ text.function.toUpperCase() }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in dataList"
          :key="index"
          :class="{ 'm-checked': item.isChecked }"
          @dblclick="openDetailForm(item)"
        >
          <td
            @dblclick.stop
            class="text-align-center"
            :class="{ 'm-checked': item.isChecked }"
          >
            <input
              @change="rowChecked(item)"
              class="m-input-checkbox"
              type="checkbox"
              v-model="item.isChecked"
            />
          </td>
          <td v-for="(value, index) in dataColumnList(item)" :key="index">
            {{ value }}
          </td>

          <td
            class="text-align-center show-contexMenu"
            @dblclick.stop
            :style="{ 'z-index': dataList.length - index }"
            :class="{ 'm-checked': item.isChecked }"
          >
            <div class="function-col">
              <div class="function-col__update">
                <button class="btn-edit-epl" @click="openDetailForm(item)">
                  {{ text.update }}
                </button>
              </div>
              <div class="function-col__menu m-ml-8" :title="text.otherAction">
                <button>
                  <div class="m-icon-16 m-icon-arrow-down-blue"></div>
                </button>
                <div class="child-multi-choices" style="min-width: 120px">
                  <div
                    class="duplication m-chil-dd"
                    @click="duplicateData(item)"
                  >
                    {{ text.duplicate }}
                  </div>
                  <div
                    class="delete-epl m-chil-dd"
                    @click="confirmDelete(item)"
                  >
                    {{ text.delete }}
                  </div>
                  <div class="pause m-chil-dd">
                    {{ text.stopUsing }}
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import resourceVN from "../../resource/resourceVN";
import { mapGetters } from "vuex";
export default {
  props: ["headers", "dataList", "dataColumnList"],
  emits: [
    "openDetailForm",
    "confirmDelete",
    "update:modelValue",
    "rowChecked",
    "clickCheckAll",
  ],
  computed: mapGetters(["chooseAllProvider"]),
  methods: {
    openDetailForm(data) {
      this.$emit("openDetailForm", data);
    },
    confirmDelete(data) {
      this.$emit("confirmDelete", data);
    },
    rowChecked(item) {
      this.$emit("rowChecked", item);
    },
    clickCheckAll() {
      this.$emit("clickCheckAll");
    },
  },
  data() {
    return {
      text: resourceVN.TEXT,
    };
  },
};
</script>
<style scoped>
@import url("../../css/components/table.css");
/* Css phần xóa nhiều bản ghi */
.m-delete-multiple-area {
  display: flex;
  align-items: center;
}
.text-is-selected,
.cancel-selected {
  margin-right: 16px;
}
.cancel-selected {
  color: #e60000;
}
.cancel-selected:hover {
  cursor: pointer;
  color: #eb3333;
}
.m-icon-refresh {
  opacity: 100%;
  color: #000;
}
.m-icon-refresh:hover {
  opacity: 50%;
}
.m-checked {
  background-color: #f1ffef;
}
</style>