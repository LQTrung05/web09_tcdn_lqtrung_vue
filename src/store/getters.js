const alert = state => state.alert
const filter = state => state.filter
const formMode = state => state.formMode
const totalEmployee = state => state.totalEmployee
const totalPage = state => state.totalPage
const titleForm = state => state.titleForm
const titleNotice = state=> state.titleNotice
const employees = state => state.employees
const employee = state => state.employee
const isShowForm = state => state.isShowForm
const isShowAlert = state => state.isShowAlert
const isShowProgress = state =>state.isShowProgress
const isShowSuccessNotice = state => state.isShowSuccessNotice
const lastRecord = state => state.lastRecord
const listIDEmployeeSelected = state => state.listIDEmployeeSelected
const isCheckedAll = state => state.isCheckedAll
const departments = state => state.departments
const noticeAction = state => state.noticeAction

export default {
  filter,
  totalEmployee,
  totalPage,
  isShowForm,
  titleForm,
  titleNotice,
  employees,
  employee,
  formMode,
  alert,
  isShowAlert,
  isShowProgress,
  isShowSuccessNotice,
  lastRecord,
  listIDEmployeeSelected,
  isCheckedAll,
  noticeAction,
  departments
}
