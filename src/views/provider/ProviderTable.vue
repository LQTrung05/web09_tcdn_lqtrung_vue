<template>
  <HeaderTable
    @deleteBatchRecord="deleteBatchRecord"
    @searchRecordByKeyword="searchRecordByKeyword"
    @exportExcelFile="exportProviderListToExcel"
  ></HeaderTable>
  <BaseTable
    :headers="headers"
    :dataList="providerList"
    :dataColumnList="dataProviderColumnList"
    @modifyForm="modifyForm"
    @selectDuplicate="selectDuplicate"
    @confirmDelete="confirmDeleteProvider"
    @clickCheckAll="clickCheckAll"
    @checkOne="checkOne"
    @openDetailForm="openProviderGroupForm"
    @rowChecked="rowChecked"
  />
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import HeaderTable from "../../components/base/BaseHeaderTable.vue";
import BaseTable from "../../components/base/BaseTable.vue";
import resourceVN from "../../resource/resourceVN";
import noticeAction from "../../enums/noticeAction";
import formMode from "../../enums/formMode";
import providerTyper from "../../enums/providerType";
export default {
  components: {
    BaseTable,
    HeaderTable,
  },
  computed: mapGetters([
    "providerList",
    "provider",
    "providerFilter",
    "providerIDListDeleted",
    "chooseAllProvider",
    "providerList",
    "purchasingStaff",
    "paymentTermList",
    "accountPayableList",
    "accountReceivableList",
  ]),
  methods: {
    ...mapActions([
      "setTitleProviderForm",
      "setDetailProvider",
      "toggleProviderForm",
      "toggleProviderForm",
      "setPurchasingStaff",
      "setPaymentTerm",
      "setAccountPayable",
      "setAccountReceivable",
      "getPurchasingStaff",
      "getDetailPaymentTerm",
      "getDetailAccountPayable",
      "getDetailAccountReceivable",
      "getProviderListByProviderID",
      "settemporatyProviderGroup",
      "setHowToDeleteProvider",
      "setAlert",
      "toggleAlert",
      "getBankAccountList",
      "getAnotherAddressList",
      "setProviderFormMode",
      "setChooseAllProvider",
      "setProviderIDListDeleted",
      "setProviderFilter",
      "getProviderList",
      "mapIDFromProviderGroupCodeList",
      "exportProviderListToExcel",
    ]),
    //H??m format ti???n t??? khi ????a l??n m??n h??nh
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    //H??m format ki???u nh?? cung c???p
    formatProviderType(value) {
      if (value === providerTyper.isOrganization)
        return resourceVN.PROPERTY_NAME_OF_PROVIDER.organization;
      else if (value === providerTyper.isIndividual)
        return resourceVN.PROPERTY_NAME_OF_PROVIDER.individual;
      else return "";
    },
    openProviderGroupForm(provider) {
      const me = this;
      me.setDetailProvider(provider);
      if (me.provider.IsCustomer == 1) me.provider.IsCustomer = true;
      else me.provider.IsCustomer = false;
      //L???y ra danh s??ch c??c Nh??m nh?? cung c???p thu???c nh?? cung c???p ???????c ch???n
      me.getProviderListByProviderID(provider.ProviderID);
      // //L???y danh s??ch c??c t??i kho???n ng??n h??ng c???a nh?? cung c???p ???????c ch???n
      me.getBankAccountList(provider.ProviderID);
      //L???y danh s??ch c??c ?????a ch??? kh??c c???a nh?? cung c???p ???????c ch???n
      me.getAnotherAddressList(provider.ProviderID);
      //Map Purchasing staff, v?? PurchasingStaff thu???c m???t b???ng kh??c, m?? b???ng Provider ch??? l??u th??ng tin ID c???a staff n??n ph???i Map th?? hi???n th??? l??n form chi ti???t m???i ????ng ???????c
      if (me.provider.EmployeeID) me.getPurchasingStaff(provider.EmployeeID);
      //Map PaymentTerm
      if (me.provider.PaymentTermID)
        me.getDetailPaymentTerm(provider.PaymentTermID);
      //Map AccountPayable
      if (me.provider.AccountPayableID)
        me.getDetailAccountPayable(provider.AccountPayableID);
      //Map AccountReceiable
      if (me.provider.AccountReceivableID)
        me.getDetailAccountReceivable(provider.AccountReceivableID);

      me.mapIDFromProviderGroupCodeList();
      me.setProviderFormMode(formMode.update);
      me.setTitleProviderForm("S???a nh?? cung c???p");
      me.toggleProviderForm();
    },
    /**
     * ????a nh???ng nh?? cung c???p ???????c check v??o trong danh s??ch s??ch
     */
    rowChecked(provider) {
      const me = this;
      //N???u danh s??ch x??a m?? ??ang r???ng, cho providerIDList v??? r???ng
      if (me.providerIDListDeleted.length === 0) me.providerIDList = [];
      //B??? check 1 d??ng trong table
      if (me.providerIDListDeleted.includes(provider.ProviderID)) {
        me.providerIDList = me.providerIDListDeleted.filter(
          (item) => item != provider.ProviderID
        );
        me.setProviderIDListDeleted(me.providerIDList);
      }
      //Check 1 d??ng trong table
      else {
        var index = me.providerIDList.length;
        if (index == 0) me.providerIDList[index] = provider.ProviderID;
        else me.providerIDList[index] = provider.ProviderID;

        me.setProviderIDListDeleted(me.providerIDList);
      }
      //N???u t???t c??? c??c d??ng ???????c check, th?? check all ???????c hi???n
      if (me.providerIDListDeleted.length == me.providerList.length)
        me.setChooseAllProvider(true);
      else me.setChooseAllProvider(false);
    },
    /**
     * Ch???n checkbox check all tr??n header table
     */
    clickCheckAll() {
      console.log("H??");
      const me = this;
      if (me.chooseAllProvider) {
        me.providerList.forEach((item) => {
          item.isChecked = false;
          me.setChooseAllProvider(false);
          me.setProviderIDListDeleted([]);
          me.providerIDList = [];
        });
      } else {
        let i = 0;
        me.providerList.forEach((item) => {
          item.isChecked = true;
          me.setChooseAllProvider(true);
          me.providerIDList[i] = item.ProviderID;
          i++;
        });
        me.setProviderIDListDeleted(me.providerIDList);
      }
    },
    confirmDeleteProvider(provider) {
      const me = this;
      me.setHowToDeleteProvider(noticeAction.deleteAProvider);
      me.alert = {
        title: me.text.confirmDelete,
        type: "confirmDelete",
        message: `B???n c?? th???c s??? mu???n x??a nh?? cung c???p c?? m?? <${provider.ProviderCode}> kh??ng?`,
      };
      me.setDetailProvider(provider);
      me.setAlert(me.alert);
      me.toggleAlert();
    },
    /**
     * K??ch n??t x??a h??ng lo???t b???n ghi
     * Author: LQTrung (29/12/2022)
     */
    deleteBatchRecord() {
      const me = this;
      me.setHowToDeleteProvider(noticeAction.deleteBatchProvider);
      me.alert = {
        title: "X??c nh???n x??a?",
        type: "confirmDelete",
        message: "B???n c?? th???c s??? mu???n x??a c??c nh?? cung c???p ???????c ch???n kh??ng?",
      };
      me.setAlert(me.alert);
      me.toggleAlert();
    },
    //T??m ki???m nh?? cung c???p theo keyword
    searchRecordByKeyword(value) {
      const me = this;
      me.setProviderFilter({
        pageSize: me.providerFilter.pageSize,
        pageNumber: 1,
        keywordForFilter: value,
      });
      me.getProviderList();
    },
    //Danh s??ch c??c column s??? hi???n th??? l??n m??n h??nh
    dataProviderColumnList(provider) {
      var array = [
        provider.ProviderCode,
        provider.ProviderName,
        this.formatPrice(provider.MaximumDebt),
        provider.TaxCode,
        provider.Address,
        provider.Phone,
        this.formatProviderType(provider.ProviderType),
        provider.LegalRepresentative,
        provider.Note,
      ];
      return array;
    },
  },
  data() {
    return {
      alert: {
        type: "",
        message: "",
      },
      text: resourceVN.TEXT,
      headers: [
        {
          name: resourceVN.PROPERTY_NAME_OF_PROVIDER.providerCode.toUpperCase(),
          minWidth: "170px",
        },
        {
          name: resourceVN.PROPERTY_NAME_OF_PROVIDER.providerName.toUpperCase(),
          minWidth: "200px",
        },
        {
          name: resourceVN.PROPERTY_NAME_OF_PROVIDER.maxDebt.toUpperCase(),
          minWidth: "140px",
          textAlignRight: "true",
        },
        {
          name: resourceVN.PROPERTY_NAME_OF_PROVIDER.taxCode.toUpperCase(),
          minWidth: "150px",
        },

        {
          name: resourceVN.PROPERTY_NAME_OF_PROVIDER.address.toUpperCase(),
          minWidth: "140px",
        },
        {
          name: resourceVN.PROPERTY_NAME_OF_PROVIDER.phoneNumber.toUpperCase(),
          minWidth: "140px",
        },
        {
          name: resourceVN.PROPERTY_NAME_OF_PROVIDER.providerTyper.toUpperCase(),
          minWidth: "170px",
        },
        {
          name: resourceVN.PROPERTY_NAME_OF_PROVIDER.legalRepresentative.toUpperCase(),
          minWidth: "170px",
          title:
            resourceVN.PROPERTY_NAME_OF_PROVIDER.legalRepresentativeTooltip,
        },

        {
          name: resourceVN.PROPERTY_NAME_OF_PROVIDER.note.toUpperCase(),
          minWidth: "140px",
        },
      ],
      providerIDList: [],
    };
  },
};
</script>