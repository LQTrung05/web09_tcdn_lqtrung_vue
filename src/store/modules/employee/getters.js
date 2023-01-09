const filter = state => state.filter
const formMode = state => state.formMode
const totalEmployee = state => state.totalEmployee
const totalPage = state => state.totalPage
const titleForm = state => state.titleForm
const employees = state => state.employees
const employee = state => state.employee
const lastRecord = state => state.lastRecord
const listIDEmployeeSelected = state => state.listIDEmployeeSelected
const isCheckedAll = state => state.isCheckedAll
const departments = state => state.departments
const noticeAction = state => state.noticeAction

export default {
  filter,
  totalEmployee,
  totalPage,
  titleForm,
  employees,
  employee,
  formMode,
  lastRecord,
  listIDEmployeeSelected,
  isCheckedAll,
  noticeAction,
  departments
}