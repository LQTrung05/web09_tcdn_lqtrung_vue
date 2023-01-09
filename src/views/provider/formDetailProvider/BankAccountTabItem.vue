<template>
  <div class="wrap-tab-item">
    <div class="content-tab-item ">
      <table class="m-table-bank-account">
        <thead>
          <tr>
            <th>Số tài khoản</th>
            <th>Tên ngân hàng</th>
            <th>Chi nhánh</th>
            <th>Tỉnh/TP của ngân hàng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in accountList" :key="index">
            <td>
              <BaseInput
                :valueInputWidth="'140px'"
                v-model="row.BankAccountNumber"
              />
            </td>
            <td>
              <BaseInput
                :valueInputWidth="'170px'"
                v-model="row.BankAccountName"
              />
            </td>
            <td>
              <BaseInput :valueInputWidth="'150px'" v-model="row.BankBranch" />
            </td>
            <td>
              <BaseInput :valueInputWidth="'200px'" v-model="row.OpenedAt" />
            </td>
            <td>
              <div
                class="icon-delete-row mi-delete mi mi-16"
                @click="deleteRow(index)"
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="action-with-table display-f">
      <BaseButton
        :secondaryButton="true"
        :radius4="true"
        :buttonBorder="true"
        :buttonHeight="'24px'"
        :btnText="'Thêm dòng'"
        class="m-mr-8 unset-pading"
        @click="addRow"
      ></BaseButton>
      <BaseButton
        :secondaryButton="true"
        :buttonBorder="true"
        :radius4="true"
        :buttonHeight="'24px'"
        :btnText="'Xóa hết dòng'"
        class="unset-pading"
        @click="deleteAllRow"
      ></BaseButton>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import BaseInput from "../../../components/base/BaseInput.vue";
import BaseButton from "../../../components/base/BaseButton.vue";
export default {
  components: {
    BaseInput,
    BaseButton,
  },
  mounted() {
    const me = this;
    me.setRows();
  },
  created(){
  },
  watch:{
    accountList:{
      handler(value){
         this.$emit("data",value); 
      },
      deep:true
    }
  },
  computed: mapGetters(["bankAccountList","provider"]),
  methods: {
    ...mapActions(["getBankAccountList"]),
    
    setRows() {
      const me = this;

      for (const item of me.bankAccountList) {
        me.accountList.push(item);
      }
    },
    deleteRow(row) {
      const me = this;
      me.accountList.splice(row,1);
    },
    addRow() {
      const me = this;
      me.accountList.push({});
    },
    deleteAllRow() {
      const me = this;
      me.accountList.splice(0, (me.accountList.length-1))
    },
  },
  props: {},
  data() {
    return {
      rows: 1,
      accountList: [],
    };
  },
};
</script>
<style scoped>
@import url("../../../css/components/tabComponent.css");
.m-table-bank-account {
  border-spacing: 0;
  width: 100%;
}
.m-table-bank-account tr {
  height: 44px;
  text-align: left;
}
.m-table-bank-account tbody tr {
  background-color: #e5f3ff;
}
.m-table-bank-account tbody tr:hover {
  background-color: #f2f9ff;
  cursor: pointer;
}
.m-table-bank-account tr th {
  font-family: "notosans-bold";
  background-color: #eeeeee;
  text-transform: uppercase;
}
.m-table-bank-account th {
  padding: 0 20px 0 10px;
  border-left: 1px solid #babec5;
  border-bottom: 1px solid #babec5;
}
.m-table-bank-account td {
  padding: 0 10px;
  border-left: 1px dotted #babec5;
  border-bottom: 1px solid #babec5;
}
.m-table-bank-account th:first-child,
.m-table-bank-account td:first-child {
  border-left: unset;
}
.style-input-account-table {
  padding: 0 10px;
}
.m-input-width-100 {
  width: 100% !important;
}
.action-with-table {
  padding: 0 10px;
}
.content-tab-item{
  max-height: 160px;
  overflow-y: auto;
}
</style>