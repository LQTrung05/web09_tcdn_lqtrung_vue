<template>
  <div class="layout-process">
    <div class="page-content">
      <div class="page-content-header">
        <div class="page-content-title">Thu chi tiền mặt</div>
        <div class="page-content-button display-f">
          <div class="guide-tour display-f">
            <div class="mi mi-24 mi-tour"></div>
            <div class="tour-label">Hướng dẫn</div>
          </div>
          <!-- Button tiện ích -->
          <!-- <Button
            class="extentions-btn"
            :secondaryButton="true"
            :radius30="true"
            :btnText="`Tiện ích`"
          >
          </Button> -->
          <!-- Button thêm mới -->
          <Button
            class="m-ml-16"
            :btnText="`Thêm chi tiền`"
            :radius30="true"
            @click="openFormInsertProvider"
          ></Button>
        </div>
      </div>
      <Overview
        :moneyColumn1="150"
        :moneyColumn2="1500000"
        :moneyColumn3="150"
        :textColumn1="`Tổng thu đầu năm đến hiện tại`"
        :textColumn2="`Tổng chi đầu năm đến hiện tại`"
        :textColumn3="`Tồn quỹ hiện tại`"
      ></Overview>
      <div class="page-content-body">
        <div class="table-content">
          <!-- Phần bảng danh sách nhà cung cấp -->
          <ProviderTable />
          <!-- Phần paging -->
          <Paging />

          <!-- Phần progress loading -->
          <ProgressLoading></ProgressLoading>
          <!-- Phần form chi tiết nhà cung cấp -->
          <FormDetailProvider v-if="isShowForm"></FormDetailProvider>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Button from "../../components/base/BaseButton.vue";
import ProviderTable from "../../views/provider/ProviderTable.vue";
import Paging from "../provider/PagingProviderPage.vue";
import Overview from "../../components/base/BaseOverview.vue";
import ProgressLoading from '../../components/base/BaseProgressLoading.vue'
import resourceVN from '../../resource/resourceVN'
export default {
  components: {
    Button,
    Overview,
    ProviderTable,
    Paging,
    ProgressLoading
  },
  data() {
    return {
      text: resourceVN.TEXT,
    };
  },
}
</script>

<style scoped>
.layout-process {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 112px);
  overflow: auto;
}
</style>