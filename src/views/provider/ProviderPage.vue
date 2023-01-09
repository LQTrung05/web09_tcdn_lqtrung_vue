<template>
  <div class="page-content">
    <div class="page-content-header">
      <div class="page-content-title">{{ text.provider }}</div>
      <div class="page-content-button display-f">
        <div class="guide-tour display-f">
          <div class="mi mi-24 mi-tour"></div>
          <div class="tour-label">Hướng dẫn</div>
        </div>
        <!-- Button tiện ích -->
        <Button
          class="extentions-btn"
          :secondaryButton="true"
          :radius30="true"
          :buttonBorderWrap="true"
          :btnText="`Tiện ích`"
          :withIcon="true"
          :buttonHeight="`34px`"
        >
        </Button>
        <!-- Button thêm mới -->
        <Button
          :btnText="`Thêm`"
          :buttonBorder="false"
          :radius30="true"
          @click="openFormInsertProvider"
        ></Button>
      </div>
    </div>
    <div>
      <div class="back display-f justify back-all-di">
        <div class="mi mi-16 mi-chevron-left--primary"></div>
        <a>Tất cả danh mục</a>
      </div>
    </div>
    <Overview
      :moneyColumn1="150"
      :moneyColumn2="1500000"
      :moneyColumn3="150"
      :textColumn1="`Nợ quá hạn`"
      :textColumn2="`Tổng nợ phải trả`"
      :textColumn3="`Đã thanh toán (30 ngày gần nhất)`"
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
        <FormDetailProvider v-if="isShowProviderForm"></FormDetailProvider>
        <!-- Phần Alert cảnh báo  -->
        <BaseAlertDialog @chooseHowToDelete ="chooseHowToDelete"></BaseAlertDialog>
        <BaseNotice></BaseNotice>
      </div>
    </div>
  </div>
</template>

<script>
import BaseAlertDialog from "../../components/base/BaseAlertDialog.vue";
import BaseNotice from '../../components/base/BaseNotice.vue'
import Button from "../../components/base/BaseButton.vue";
import ProviderTable from "../../views/provider/ProviderTable.vue";
import Paging from "../provider/PagingProviderPage.vue";
import Overview from "../../components/base/BaseOverview.vue";
import FormDetailProvider from "./formDetailProvider/FormDetailProvider.vue";
import ProgressLoading from "../../components/base/BaseProgressLoading.vue";
import resourceVN from "../../resource/resourceVN";
import noticeAction from '../../enums/noticeAction'
import ProviderType from "../../enums/providerType";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    BaseAlertDialog,
    BaseNotice,
    Button,
    Overview,
    ProviderTable,
    Paging,
    FormDetailProvider,
    ProgressLoading,
  },
  created() {
    const me = this;
    me.getProviderList();
    me.getPaymentTermList();
    me.getAccountReceivableList();
    me.getAccountPayableList();
    me.getProviderGroupList();
    me.getEmployees();
  },
  data() {
    return {
      text: resourceVN.TEXT,
    };
  },
  computed: mapGetters(["isShowProviderForm", "isShowFiterProviderForm","modeHowToDeleteProvider"]),
  methods: {
    ...mapActions([
      "toggleProviderForm",
      "toggleProgressLoading",
      "setTitleProviderForm",
      "setDetailProvider",
      "setPaymentTerm",
      "setAccountPayable",
      "setAccountReceivable",
      "getProviderGroupList",
      "getProviderList",
      "getPaymentTermList",
      "getAccountReceivableList",
      "getAccountPayableList",
      "getEmployees",
      "setProviderGroupCodeListIsChoosed",
      "deleteAProvider",
      "deleteBatchProvider",
      "setChooseAllProvider",
      "setBankAccountList",
      "setAnotherAddressList",
      "getNewProviderCode",
    ]),
    openFormInsertProvider() {
      // Reset lai form roi moi mo ra
      const me = this;
      //me.setFormMode(formMode.insert);
      me.toggleProgressLoading();
      me.setDetailProvider({
        ProviderType: ProviderType.isOrganization,
        IsCustomer: false,
        PaymentTermID: null,
        AccountPayableID: null,
        AccountReceivableID: null,
        EmployeeID: null,
        IdentityDate: null,
        DueTime: 0,
        MaximumDebt: 0,
      });
      me.getNewProviderCode();
      //Gọi API lấy danh sách điều khoản thanh toán
      me.setPaymentTerm({});
      me.setAccountPayable({});
      me.setAccountReceivable({});
      me.setBankAccountList([]);
      me.setAnotherAddressList([]);
      me.setProviderGroupCodeListIsChoosed([]);
      setTimeout(() => {
        me.setTitleProviderForm(me.text.insertProvider);
        me.toggleProgressLoading();
        me.toggleProviderForm();
      }, 500);
    },
    //Hàm xác nhận chọn xóa 1 hay xóa nhiều bản ghi
    chooseHowToDelete(){
      const me = this;
      if (me.modeHowToDeleteProvider == noticeAction.deleteAProvider) 
        me.deleteAProvider();
      else if (me.modeHowToDeleteProvider == noticeAction.deleteBatchProvider)
      {
        me.deleteBatchProvider();
        me.setChooseAllProvider(false);
      }
    }
  },
};
</script>

<style>
@import url("../../css/layout/body.css");
.page-content-button {
  justify-content: center;
  align-items: center;
}
.guide-tour {
  position: relative;
  margin-right: 10px;
}
.guide-tour .tour-label {
  white-space: nowrap;
  padding-left: 5px;
  color: #0075c0;
  font-size: 13px;
}
.back-all-di {
  cursor: pointer;
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
  margin-left: 24px;
}
.justify {
  justify-items: center;
  align-items: center;
}
.back-all-di > a {
  color: #0075c0;
}
.back-all-di:hover,
.back-all-di:visited {
  cursor: pointer;
}
</style>