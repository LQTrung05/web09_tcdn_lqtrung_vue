<template>
  <div class="header-table">
    <div class="m-header-left display-f">
      <div class="check-all-arrow m-mr-12">
        <div class="mi mi-24 mi-arrow-check-all"></div>
      </div>
      <div class="position-relative">
        <Button
          class="extentions-btn m-mr-12"
          :secondaryButton="true"
          :radius30="true"
          :buttonBorderWrap="true"
          :btnText="`Thực hiện hàng loạt`"
          :withIcon="true"
          :buttonHeight="`34px`"
          @click="openExtensionAction"
        >
        </Button>
        <div class="wrapper-multiple-action" v-if="isShowExtensionAction">
          <div class="delete-batch" @click="deleteBatchRecord">Xóa</div>
          <div class="merge-record">Gộp</div>
        </div>
      </div>
      <div class="position-relative">
        <Button
          class="extentions-btn"
          :secondaryButton="true"
          :radius30="true"
          :buttonBorderWrap="true"
          :btnText="`Lọc`"
          :withIcon="true"
          @click="toggleFilterForm"
          :buttonHeight="`34px`"
        >
        </Button>
        <!-- Form lọc nhà cung cấp theo điều kiện -->
        <FilterProviderForm v-if="isShowFiterProviderForm"></FilterProviderForm>
      </div>
    </div>
    <div class="m-search-area">
      <div class="m-search-area-content">
        <input
          type="text"
          class="m-border-input-search"
          :placeholder="text.searchPlaceHolder"
          @keyup="searchRecordByKeyword($event.target.value)"
        />
        <div class="m-icon-16 m-icon-search"></div>
      </div>
      <!-- Nút refresh lại dữ liệu -->
      <div
        class="m-btn-refresh m-icon-24 m-icon-refresh"
        :title="text.refreshToolTip"
        @click="refreshData"
      ></div>
      <!-- Nút xuất excel danh sách nhân viên -->
      <div
        class="m-icon-excel m-icon-24 m-icon-excel"
        :title="text.exportProviderListToolTip"
        @click="exportExcelFile"
      ></div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Button from "../base/BaseButton.vue";
import FilterProviderForm from "../../views/provider/FilterProviderForm.vue";
import resourceVN from "../../resource/resourceVN";
export default {
  components: { Button, FilterProviderForm },
  computed: mapGetters(["isShowFiterProviderForm", "providerIDListDeleted"]),
  data() {
    return {
      text: resourceVN.TEXT,
      isShowExtensionAction: false,
    };
  },
  methods: {
    ...mapActions(["toggleFilterProviderForm"]),
    toggleFilterForm() {
      const me = this;
      me.toggleFilterProviderForm();
    },
    openExtensionAction() {
      const me = this;
      if (me.providerIDListDeleted.length > 1)
        me.isShowExtensionAction = !me.isShowExtensionAction;
    },
    deleteBatchRecord() {
      const me = this;
      me.$emit("deleteBatchRecord");
      me.isShowExtensionAction = !me.isShowExtensionAction;
    },
    exportExcelFile(){
      const me = this;
      me.$emit("exportExcelFile");
    },
    searchRecordByKeyword(keyword) {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
    }
    this.timer = setTimeout(() => {
      this.$emit("searchRecordByKeyword", keyword);
    }, 300);

    },
  },
};
</script>
<style scoped>
@import url("../../css/components/table.css");
.m-header-left.display-f {
  align-items: center;
  margin-left: 20px;
}
/* .filter-button-wrapper{
  position: relative;
} */
.wrapper-multiple-action {
  position: absolute;
  z-index: 10;
  border: 1px solid #ccc;
  width: 100px;
  background: #fff;
  right: 11px;
}
.delete-batch,
.merge-record {
  padding: 8px;
}
.delete-batch:hover,
.merge-record:hover {
  background: #babec5;
  cursor: pointer;
}
</style>