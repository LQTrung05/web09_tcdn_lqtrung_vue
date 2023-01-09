export default{
  toggleForm(context) {
    context.commit('toggleForm');
  },
  toggleProgressLoading(context) {
    context.commit('toggleProgressLoading')
  },
  setAlert(context, alert) {
    context.commit("setAlert", alert);
  },
  toggleAlert(context) {
    context.commit("toggleAlert");
  },
  openNotice(context) {
    context.commit("openNotice");
  },
  closeNotice(context) {
    context.commit("closeNotice");
  },
  //Gán tiêu đề thêm, sửa, xóa thành công sau khi thực hiện thêm, sửa, xóa thành công
  setTitleNotice(context, title) {
    context.commit("setTitleNotice", title);
  },
}