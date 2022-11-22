export default {
  getEmployees(state, payload) {
    state.employees = payload.Data;
    state.totalEmployee = payload.TotalRecord;
    state.totalPage = payload.TotalPage;
    for (var emp of state.employees) {
      if (emp.DateOfBirth) {
        emp.DateOfBirth = emp.DateOfBirth.split('T')[0]
      }
      if (emp.IdentityDate) {
        emp.IdentityDate = emp.IdentityDate.split('T')[0]
      }
    }
  },
  getNewEmployeeCode(state,payload){
    state.employee.EmployeeCode = payload;
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
  setTitleForm(state, payload) {
    state.titleForm = payload;
  },
  //Gán tiêu đề thêm, sửa, xóa thành công sau khi thực hiện thêm, sửa, xóa thành công
  setTitleNotice(state, payload) {
    state.titleNotice = payload;
  },
  setDetailEmployee(state, payload) {
    state.employee = JSON.parse(JSON.stringify(payload));
  },
  setFormMode(state, payload) {
    state.formMode = payload;
  },
  setAlert(state, payload) {
    state.alert = payload;
  },
  setFilter(state,payload){
    state.filter = payload;
  },
  openNotice(state){
    state.isShowSuccessNotice = true; 
  },
  closeNotice(state){
    state.isShowSuccessNotice = false;
  },
  // module department
  getDepartments(state, payload) {
    state.departments = payload;
  }
}