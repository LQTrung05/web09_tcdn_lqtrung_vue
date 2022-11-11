import axios from 'axios'
import state from './state'
export default {
  getEmployees(context) {
    try {
      axios.get('https://amis.manhnv.net/api/v1/Employees/filter',{params:{pageSize: state.filter.pageSize, pageNumber:state.filter.pageNumber,employeeFilter:state.filter.employeeFilter}})
        .then(response => context.commit('getEmployees', response.data))
    } catch (error) {
      console.log(error);
    }
  },
  toggleForm(context) {
    context.commit('toggleForm');
  },
  toggleNoticeMessage(context) {
    context.commit('toggleNoticeMessage')
  },
  toggleProgressLoading(context) {
    context.commit('toggleProgressLoading')
  },
  toggleAlert(context){
    context.commit("toggleAlert");
  },
  setTitleForm(context,title){
    context.commit("setTitleForm",title);
  },
  //Gán tiêu đề thêm, sửa, xóa thành công sau khi thực hiện thêm, sửa, xóa thành công
  setTitleNotice(context,title){
    context.commit("setTitleNotice",title);
  },
  //Thay đổi thông tin chi tiết 1 nhân viên
  setDetailEmployee(context,employee){
    context.commit("setDetailEmployee",employee);
  },
  setFormMode(context,mode){
    context.commit("setFormMode",mode);
  },
  setAlert(context,alert){
    context.commit("setAlert",alert);
  },
  setFilter(context,filter){
    context.commit("setFilter",filter);
  },
  
  // Phần module department
  getDepartments(context) {
    try {
      axios.get('https://amis.manhnv.net/api/v1/Departments')
        .then(response => context.commit('getDepartments', response.data))
    } catch (error) {
      console.log(error);
    }
  }
}