const providerList = state => state.providerList
const provider = state => state.provider
const isShowProviderForm = state => state.isShowProviderForm
const providerFilter = state => state.providerFilter
const titleProviderForm = state => state.titleProviderForm
const providerID = state => state.providerID
const providerFormMode = state => state.providerFormMode
const totalProvider = state => state.totalProvider
const totalProviderPage = state => state.totalProviderPage
const isShowFiterProviderForm = state => state.isShowFiterProviderForm
const isShowProviderGroupForm = state => state.isShowProviderGroupForm
const isShowPaymentTermForm = state => state.isShowPaymentTermForm
const purchasingStaff = state => state.purchasingStaff
const chooseAllProvider = state => state.chooseAllProvider
const providerIDListDeleted = state => state.providerIDListDeleted
const modeHowToDeleteProvider = state => state.modeHowToDeleteProvider
const lastProvider = state => state.lastProvider
const providerTypeListCondition = state=> state.providerTypeListCondition
const providerTypeCondition = state=> state.providerTypeCondition
const providerGroupCondition = state=> state.providerGroupCondition
const liabilityStatusListCondition = state=> state.liabilityStatusListCondition
const liabilityStatusCondition = state=> state.liabilityStatusCondition
const statusListCondition = state=> state.statusListCondition
const statusCondition = state=> state.statusCondition
const provinceCondition = state=> state.provinceCondition
const districtCondition = state=> state.districtCondition
const villageCondition = state=> state.villageCondition
const provinceList = state=> state.provinceList
const districtList = state=> state.districtList
const villageList = state=> state.villageList
//Module PaymentTerm
const paymentTermList = state => state.paymentTermList
const paymentTerm = state => state.paymentTerm
const paymentTermMode = state => state.paymentTermMode

//Module AccountPayable 
const accountPayableList = state => state.accountPayableList
const accountPayable = state => state.accountPayable

//Module AccountReceivable
const accountReceivableList = state => state.accountReceivableList
const accountReceivable = state => state.accountReceivable

//Module providerGroup
const providerGroupList = state => state.providerGroupList
const providerGroup = state => state.providerGroup
const providerGroupIDListIsChoosed = state => state.providerGroupIDListIsChoosed
const providerGroupCodeListIsChoosed = state => state.providerGroupCodeListIsChoosed
const parentProviderGroup = state => state.parentProviderGroup
const providerGroupMode = state => state.providerGroupMode

//Module BankAccount
const bankAccountList = state => state.bankAccountList
const bankAccount = state => state.bankAccount

const anotherAddressList = state => state.anotherAddressList
export default {
  providerList,
  provider,
  //Dữ liệu nhà cung cấp để phân trang, tìm kiếm
  providerFilter,
  providerID,
  providerFormMode,
  titleProviderForm,
  //Tổng số nhà cung cấp 
  totalProvider,
  //Tổng số trang 
  totalProviderPage,
  //Hiển thị form nhà cung cấp
  isShowProviderForm,
  isShowFiterProviderForm,
  isShowProviderGroupForm,
  isShowPaymentTermForm,
  purchasingStaff,
  chooseAllProvider,
  providerIDListDeleted,
  modeHowToDeleteProvider,
  lastProvider,
  providerTypeListCondition,
  providerTypeCondition,
  providerGroupCondition,
  liabilityStatusListCondition,
  liabilityStatusCondition,
  statusListCondition,
  statusCondition,
  provinceCondition,
  districtCondition,
  villageCondition,
  provinceList,
  districtList,
  villageList,
  //Module PaymentTerm
  paymentTermList,
  paymentTerm,
  paymentTermMode,

  //Module AccountPayable 
  accountPayableList,
  accountPayable,

  //Module AccountReceivable
  accountReceivableList,
  accountReceivable,


  //Module ProviderGroup
  providerGroupList,
  providerGroup,
  providerGroupIDListIsChoosed,
  providerGroupCodeListIsChoosed,
  parentProviderGroup,
  providerGroupMode,

  //MODULE BANKACCOUNT
  bankAccountList,
  bankAccount,
  //MODULE ANOTHERADDRESS
  anotherAddressList,
}
