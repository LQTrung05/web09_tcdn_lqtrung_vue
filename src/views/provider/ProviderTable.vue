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
    //Hàm format tiền tệ khi đưa lên màn hình
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    //Hàm format kiểu nhà cung cấp
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
      //Lấy ra danh sách các Nhóm nhà cung cấp thuộc nhà cung cấp được chọn
      me.getProviderListByProviderID(provider.ProviderID);
      // //Lấy danh sách các tài khoản ngân hàng của nhà cung cấp được chọn
      me.getBankAccountList(provider.ProviderID);
      //Lấy danh sách các địa chỉ khác của nhà cung cấp được chọn
      me.getAnotherAddressList(provider.ProviderID);
      //Map Purchasing staff, vì PurchasingStaff thuộc một bảng khác, mà bảng Provider chỉ lưu thông tin ID của staff nên phải Map thì hiển thị lên form chi tiết mới đúng được
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
      me.setTitleProviderForm("Sửa nhà cung cấp");
      me.toggleProviderForm();
    },
    /**
     * Đưa những nhà cung cấp được check vào trong danh sách sách
     */
    rowChecked(provider) {
      const me = this;
      //Nếu danh sách xóa mà đang rỗng, cho providerIDList về rỗng
      if (me.providerIDListDeleted.length === 0) me.providerIDList = [];
      //Bỏ check 1 dòng trong table
      if (me.providerIDListDeleted.includes(provider.ProviderID)) {
        me.providerIDList = me.providerIDListDeleted.filter(
          (item) => item != provider.ProviderID
        );
        me.setProviderIDListDeleted(me.providerIDList);
      }
      //Check 1 dòng trong table
      else {
        var index = me.providerIDList.length;
        if (index == 0) me.providerIDList[index] = provider.ProviderID;
        else me.providerIDList[index] = provider.ProviderID;

        me.setProviderIDListDeleted(me.providerIDList);
      }
      //Nếu tất cả các dòng được check, thì check all được hiện
      if (me.providerIDListDeleted.length == me.providerList.length)
        me.setChooseAllProvider(true);
      else me.setChooseAllProvider(false);
    },
    /**
     * Chọn checkbox check all trên header table
     */
    clickCheckAll() {
      console.log("HÍ");
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
        message: `Bạn có thực sự muốn xóa nhà cung cấp có mã <${provider.ProviderCode}> không?`,
      };
      me.setDetailProvider(provider);
      me.setAlert(me.alert);
      me.toggleAlert();
    },
    /**
     * Kích nút xóa hàng loạt bản ghi
     * Author: LQTrung (29/12/2022)
     */
    deleteBatchRecord() {
      const me = this;
      me.setHowToDeleteProvider(noticeAction.deleteBatchProvider);
      me.alert = {
        title: "Xác nhận xóa?",
        type: "confirmDelete",
        message: "Bạn có thực sự muốn xóa các nhà cung cấp được chọn không?",
      };
      me.setAlert(me.alert);
      me.toggleAlert();
    },
    //Tìm kiếm nhà cung cấp theo keyword
    searchRecordByKeyword(value) {
      const me = this;
      me.setProviderFilter({
        pageSize: me.providerFilter.pageSize,
        pageNumber: 1,
        keywordForFilter: value,
      });
      me.getProviderList();
    },
    //Danh sách các column sẽ hiển thị lên màn hình
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