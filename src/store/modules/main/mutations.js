export default{
  toggleForm(state) {
    state.isShowForm = !state.isShowForm;
  },
  
  toggleProgressLoading(state) {
    state.isShowProgress = !state.isShowProgress;
  },
  setAlert(state, alert) {
    state.alert = alert;
  },
  toggleAlert(state) {
    state.isShowAlert = !state.isShowAlert;
  },
  openNotice(state){
    state.isShowSuccessNotice = true; 
  },
  closeNotice(state){
    state.isShowSuccessNotice = false;
  },
  //Gán tiêu đề thêm, sửa, xóa thành công sau khi thực hiện thêm, sửa, xóa thành công
  setTitleNotice(state, titleNotice) {
    state.titleNotice = titleNotice;
  },
}