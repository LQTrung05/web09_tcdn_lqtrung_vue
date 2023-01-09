<template>
  <div class="wrap-tab-item">
    <div class="content-tab-item">
      <div class="m-column-1">
        <div class="m-row-1 display-f">
          <ComboboxTable
            :permitAdd="true"
            :topValue="'1px'"
            :lableValue="propertyName.termOfPayment"
            :headers="paymentTableHeaders"
            :dataList="paymentTermList"
            :dataColumnList="getPaymentTermColumnList"
            v-model="paymentTerm.PaymentTermName"
            @toggleAddForm="openPaymentTermForm"
            @chooseItem="choosePaymentTerm"
            class="m-mr-8"
          >
          </ComboboxTable>
          <Input
            :inputLabel="text.payWithinDays"
            :title="propertyName.legalRepresentativeTooltip"
            class="m-mr-8 m-mb-12"
            :inputType="'text'"
            :inputWidth="'m-input-width-100'"
            v-model="provider.DueTime"
            :textAlignRight="true"
          />
          <Input
            :inputLabel="text.maxDebtAllowed"
            :title="propertyName.legalRepresentativeTooltip"
            class="m-pr-6 m-mb-12"
            :inputType="'text'"
            :inputWidth="'m-input-width-100'"
            :textAlignRight="true"
            v-model="provider.MaximumDebt"
            
          />
        </div>
        <div class="m-row-2 display-f">
          <ComboboxTable
            v-if="provider.IsCustomer"
            :permitAdd="'false'"
            :topValue="'1px'"
            :lableValue="'Tài khoản công nợ phải thu'"
            :headers="accountTableHeaders"
            :dataList="accountReceivableList"
            :dataColumnList="getAccountReceivableColumnList"
            class="m-mr-8"
            v-model="accountReceivable.AccountNumber"
            @chooseItem="chooseAccountReceivable"
          >
          </ComboboxTable>
          <ComboboxTable
            :permitAdd="'false'"
            :topValue="'1px'"
            :lableValue="'Tài khoản công nợ phải trả'"
            :headers="accountTableHeaders"
            :dataList="accountPayableList"
            :dataColumnList="getAccountPayableColumnList"
            v-model="accountPayable.AccountNumber"
            @chooseItem="chooseAccountPayable"
          >
          </ComboboxTable>
        </div>
      </div>
    </div>
  </div>
  <PaymentTermForm v-if="isShowPaymentTermForm"></PaymentTermForm>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import ComboboxTable from "../../../components/base/BaseComboboxTable.vue";
import PaymentTermForm from "../PaymentTermForm.vue";
import Input from "../../../components/base/BaseInput.vue";
import resourceVN from "../../../resource/resourceVN";
export default {
  components: {
    ComboboxTable,
    Input,
    PaymentTermForm,
  },
  computed: mapGetters([
    "provider",
    "isShowPaymentTermForm",
    "paymentTermList",
    "paymentTerm",
    "accountReceivable",
    "accountPayable",
    "accountReceivableList",
    "accountPayableList",
  ]),

  methods: {
    ...mapActions([
      "togglePaymentTermForm",
      "setPaymentTerm",
      "setDetailProvider",
      "setAccountPayable",
      "setAccountReceivable",
    ]),
    //Lấy danh sách điều khoản thanh toán
    getPaymentTermColumnList(paymentTerm) {
      var array = [paymentTerm.PaymentTermCode, paymentTerm.PaymentTermName];
      return array;
    },
    //Lấy danh sách các cột của bảng Tài khoản công nợ phải thu sẽ hiển thị
    getAccountReceivableColumnList(accountReceivable) {
      var arr = [
        accountReceivable.AccountNumber,
        accountReceivable.AccountName,
      ];
      return arr;
    },
    //Lấy danh sách các cột của bảng Tài khoản công nợ phải trả sẽ hiển thị
    getAccountPayableColumnList(accountPayable) {
      var arr = [
        accountPayable.AccountNumber,
        accountPayable.AccountName,
      ];
      return arr;
    },
    // Mở form thêm mới điều khoản thanh toán
    openPaymentTermForm() {
      const me = this;
      me.togglePaymentTermForm();
      me.setPaymentTerm({});
    },
    //Chọn điều khoản thanh toán
    choosePaymentTerm(paymentTermIsChoosed) {
      const me = this;
      me.setPaymentTerm(paymentTermIsChoosed);
      me.provider.PaymentTermID = paymentTermIsChoosed.PaymentTermID;
      me.provider.DueTime = paymentTermIsChoosed.DueTime;
    },
    //Chọn tài khoản công nợ phải thu
    chooseAccountReceivable(accountReceivableIsChoose) {
      const me = this;
      me.setAccountReceivable(accountReceivableIsChoose);
      me.provider.AccountReceivableID =
        accountReceivableIsChoose.AccountReceivableID;
    },
    //Chọn tài khoản công nợ phải trả
    chooseAccountPayable(accountPayableIsChoose) {
      const me = this;
      me.setAccountPayable(accountPayableIsChoose);
      me.provider.AccountPayableID = accountPayableIsChoose.AccountPayableID;
    },
  },

  data() {
    return {
      propertyName: resourceVN.TERM_OF_PAYMENT,
      text: resourceVN.TEXT,
      paymentTableHeaders: [
        {
          name: resourceVN.TERM_OF_PAYMENT.termOfPaymentCode,
          minWidth: "200px",
        },
        {
          name: resourceVN.TERM_OF_PAYMENT.termOfPaymentName,
          minWidth: "235px",
        },
      ],
      accountTableHeaders: [
        {
          name: resourceVN.ACCOUNT_PAYABLE.accountNumber,
          minWidth: "170px",
        },
        {
          name: resourceVN.ACCOUNT_PAYABLE.accountName,
          minWidth: "170px",
        },
      ],
      fakeData: [
        {
          termCode: "NG09",
          termName: "Phải trả hết nợ",
        },
        {
          termCode: "NG09",
          termName: "Phải trả hết nợ",
        },
        {
          termCode: "NG09",
          termName: "Phải trả hết nợ",
        },
      ],
    };
  },
};
</script>
<style scoped>
@import url("../../../css/components/tabComponent.css");
</style>