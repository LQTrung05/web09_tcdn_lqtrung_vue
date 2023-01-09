export default {
  getProviderList(state, result) {
    state.providerList = result.Data;
    state.totalProvider = result.TotalRecord;
    state.totalProviderPage = result.TotalPage;
  },
  getNewProviderCode(state,providerCode){
    state.provider.ProviderCode = providerCode;
  },
  setDetailProvider(state, provider) {
   
    state.provider = JSON.parse(JSON.stringify(provider));
  },
  setProviderFormMode(state, formMode) {
    state.providerFormMode = formMode;
  },
  toggleProviderForm(state) {
    state.isShowProviderForm = !state.isShowProviderForm;
  },
  toggleFilterProviderForm(state) {
    state.isShowFiterProviderForm = !state.isShowFiterProviderForm;
  },
  toggleProviderGroupForm(state) {
    state.isShowProviderGroupForm = !state.isShowProviderGroupForm;
  },
  togglePaymentTermForm(state) {
    state.isShowPaymentTermForm = !state.isShowPaymentTermForm;
  },
  //Lưu thông tin của nhân viên mua hàng
  setPurchasingStaff(state, staff) {
    state.purchasingStaff = staff;
  },
  getPurchasingStaff(state, item) {
    state.purchasingStaff = item;
  },
  setTitleProviderForm(state, title){
    state.titleProviderForm = title;
  },
  //Các hàm cập nhật giá trị trong form lọc nhà cung cấp theo nhiều điều kiện
  setProviderTypeCondition(state,condition){
    state.providerTypeCondition= condition;
  },
  setProviderGroupCondition(state,condition){
    state.providerGroupCondition= condition;
  },
  setLiabilityStatusCondition(state,condition){
    state.liabilityStatusCondition= condition;
  },
  setStatusCondition(state,condition){
    state.statusCondition= condition;
  },
  setProvinceCondition(state,condition){
    state.provinceCondition= condition;
  },
  setDistrictCondition(state,condition){
    state.districtCondition= condition;
  },
  setVillageCondition(state,condition){
    state.villageCondition= condition;
  },
  getProvinceList(state, provinceList){
    state.provinceList = provinceList;
  },
  getDistrictList(state,districtList){
    state.districtList = districtList;
  },
  setChooseAllProvider(state, value){
    state.chooseAllProvider = value;
  },
  setProviderIDListDeleted(state, providerIDListDeleted)
  {
    state.providerIDListDeleted = providerIDListDeleted;
  },
  setHowToDeleteProvider(state, mode){
    state.modeHowToDeleteProvider = mode
  },
  setLastProvider(state){
    if(state.providerFilter.pageNumber == state.totalProviderPage)
      state.lastProvider = state.totalProvider
      else state.lastProvider = (state.providerFilter.pageNumber * state.providerFilter.pageSize)
  },
  setProviderFilter(state, providerFilter){
    state.providerFilter = providerFilter;
  },


  // Module paymentTerm
  getPaymentTermList(state, paymentTermList) {
    state.paymentTermList = paymentTermList;
  },
  getDetailPaymentTerm(state, item) {
    state.paymentTerm = item
  },
  setPaymentTerm(state, paymentTermIsChoose) {
    state.paymentTerm = paymentTermIsChoose;
  },
  //Thêm mới một điều khoản thanh toán
  insertPaymentTerm(state, paymentTermisInserted) {
    state.paymentTerm = paymentTermisInserted;
  },
  //Xét chế độ cất hoặc cất và thêm trong form thêm mới điều khoản thanh toán
  setpaymentTermMode(state, formMode) {
    state.paymentTermMode = formMode
  },

  //Module AccountPayable
  getAccountPayableList(state, accountPayableList) {
    state.accountPayableList = accountPayableList;
  },
  //Lấy thông tin chi tiết của 1 tài khoản công nợ phải trả
  getDetailAccountPayable(state, accountPayableIsChoose) {
    state.accountPayable = accountPayableIsChoose;
  },
  setAccountPayable(state, accountPayableIsChoose) {
    state.accountPayable = accountPayableIsChoose;
  },

  //MODULE ACCOUNTRECEIVABLE
  getAccountReceivableList(state, accountReceivableList) {
    state.accountReceivableList = accountReceivableList;
  },

  //Lấy thông tin chi tiết của 1 tài khoản công nợ phải thu
  getDetailAccountReceivable(state, accountReceivable) {
    state.accountReceivable = accountReceivable;
  },
  setAccountReceivable(state, accountReceivable) {
    state.accountReceivable = accountReceivable;
  },

  //MODULE PROVIDERGROUP
  getProviderGroupList(state, providerGroupList) {
    state.providerGroupList = providerGroupList;
  },
  setProviderGroup(state, providerGroupIsChoose) {
    state.providerGroup = providerGroupIsChoose
  },
  setProviderGroupIDListIsChoosed(state, item) {
    state.providerGroupIDListIsChoosed = item;
  },
  setProviderGroupCodeListIsChoosed(state, item) {
    state.providerGroupCodeListIsChoosed = item;
  },
  setParentProviderGroup(state, parentProviderGroup) {
    state.parentProviderGroup = parentProviderGroup;
  },
  setProviderGroupMode(state, formMode) {
    state.providerGroupMode = formMode
  },
  insertProviderGroup(state, providerGroup) {
    state.providerGroup = providerGroup;
  },

  //MODULE PROVIDER_PROVIDERGROUP

  //MODULE BANKACCOUNT
  // getBankAccountList(state, bankAccountList) {
  //   state.bankAccountList = bankAccountList;
  // },
  setBankAccountList(state, bankAccountList) {
    state.bankAccountList = bankAccountList;
  },
  setBankAccount(state, bankAccountIsChoosed) {
    state.bankAccount = bankAccountIsChoosed;
  },

  // Module Another address
  //Hàm thêm mới các địa chỉ khác của một nhà cung cấp vào state
  setAnotherAddressList(state, anotherAddressList) {
    state.anotherAddressList = anotherAddressList;
  },
  //Hàm cập nhật danh sách các địa chỉ khác của nhà cung cấp
  getAnotherAddressList(state, anotherAddressList) {
    state.anotherAddressList = anotherAddressList
  }
}