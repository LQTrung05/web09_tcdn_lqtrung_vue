export default {
  getEmployees(state, employees) {
    state.employees = employees.Data;
    state.totalEmployee = employees.TotalRecord;
    state.totalPage = employees.TotalPage;
    for (var emp of state.employees) {
      if (emp.DateOfBirth) {
        emp.DateOfBirth = emp.DateOfBirth.split('T')[0]
      }
      if (emp.IdentityDate) {
        emp.IdentityDate = emp.IdentityDate.split('T')[0]
      }
    }
  },
  
  getNewEmployeeCode(state,employeeCode){
    state.employee.EmployeeCode = employeeCode;
  },
  
  toggleNoticeMessage(state) {
    state.isShowSuccessNotice = !state.isShowSuccessNotice;
  },
  
  
  setTitleForm(state, titleForm) {
    state.titleForm = titleForm;
  },
  
  setDetailEmployee(state, employee) {
    state.employee = JSON.parse(JSON.stringify(employee));
  },
  setFormMode(state, formMode) {
    state.formMode = formMode;
  },
  setNoticeAction(state, noticeAction){
    state.noticeAction = noticeAction;
  },
  setFilter(state,filter){
    state.filter = filter;
  },
  setLastRecord(state){
    if(state.filter.pageNumber == state.totalPage)
      state.lastRecord = state.totalEmployee
      else state.lastRecord = (state.filter.pageNumber * state.filter.pageSize)
  },
  setListDeleteEmployee(state, employeeIDListDeleted){
    state.listIDEmployeeSelected = employeeIDListDeleted;
  },
  setCheckAllEmployee(state, value){
    state.isCheckedAll = value;
  },
  
  listIDEmployeeSelected(state, listID){
    state.listIDEmployeeSelected = listID
  },
  
  // module department
  getDepartments(state, departments) {
    state.departments = departments;
  }
}