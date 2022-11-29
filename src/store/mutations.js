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
  toggleForm(state) {
    state.isShowForm = !state.isShowForm;
  },
  toggleNoticeMessage(state) {
    state.isShowSuccessNotice = !state.isShowSuccessNotice;
  },
  toggleProgressLoading(state) {
    state.isShowProgress = !state.isShowProgress;
  },
  toggleAlert(state) {
    state.isShowAlert = !state.isShowAlert;
  },
  setTitleForm(state, titleForm) {
    state.titleForm = titleForm;
  },
  //Gán tiêu đề thêm, sửa, xóa thành công sau khi thực hiện thêm, sửa, xóa thành công
  setTitleNotice(state, titleNotice) {
    state.titleNotice = titleNotice;
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
  setAlert(state, alert) {
    state.alert = alert;
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
  openNotice(state){
    state.isShowSuccessNotice = true; 
  },
  closeNotice(state){
    state.isShowSuccessNotice = false;
  },
  listIDEmployeeSelected(state, listID){
    state.listIDEmployeeSelected = listID
  },
  // module department
  getDepartments(state, departments) {
    state.departments = departments;
  }
}