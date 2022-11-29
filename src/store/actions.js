import axios from 'axios'
import state from './state'
import formMode from '../enums/formMode'
import Gender from '../enums/gender'
export default {

  /**
   * Hàm lấy danh sách nhân viên theo điều kiện phân
   * @param {*} context 
   * Author: LQTrung (8/11/2022)
   */
  getEmployees(context) {
    try {
      axios.get('http://localhost:8080/api/v1/Employees/SearchAndPaging', { params: { limit: state.filter.pageSize, pageNumber: state.filter.pageNumber, keyword: state.filter.employeeFilter } },)
        .then(response => context.commit('getEmployees', response.data))
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * Hàm lấy mã nhân viên mới phục vụ chức năng thêm mới nhân viên
   * @param {*} context 
   * Author: LQTrung (8/11/2022)
   */
  getNewEmployeeCode(context) {
    try {
      axios.get('http://localhost:8080/api/v1/Employees/NewEmployeeCode')
        .then(response => context.commit('getNewEmployeeCode', response.data))
    } catch (error) {
      console.log(error);
    }
  },
  /**
     * Hàm thêm mới nhân viên
     * @param {object} nhân viên được thêm mới
     * Author: LQTrung (09/11/2022)
     */
  insertEmployee(context) {
    try {
      axios
        .post("http://localhost:8080/api/v1/Employees", state.employee)
        .then(() => {
          context.dispatch("toggleProgressLoading");
          //Load lại dữ liệu
          context.dispatch("getEmployees");
          if (state.formMode == formMode.insert) {
            //Đóng form
            context.dispatch("toggleForm");
            //Bật nút progress, tự tắt sau 0.5s
            setTimeout(() => {
              context.dispatch("toggleProgressLoading");
              //Bật thông báo thêm thành công
              context.dispatch("openNotice");
            }, 500);
          } else if (state.formMode == formMode.insertAndAdd) {
            setTimeout(() => {
              context.dispatch("toggleProgressLoading");
              //Bật thông báo thêm thành công
              context.dispatch("openNotice");
            }, 500);
            context.dispatch("setDetailEmployee", { Gender: Gender.male });
            context.dispatch("getNewEmployeeCode");
          }
          context.dispatch("setTitleNotice", "Thêm nhân viên thành công");
          setTimeout(() => {
            context.dispatch("closeNotice");
          }, 5000);
        })
        .catch((res) => {
          console.log(res),
            this.alert = {
              type: "danger",
              message: res.response.data.Data[0],
            };
          context.dispatch("setAlert", this.alert);
          context.dispatch("toggleAlert");
        });
    } catch (error) {
      console.log(error);
    }
  },

  /**
     * Hàm cập nhật nhân viên
     * @param {context} thông tin mới của nhân viên muốn cập nhật
     * Author: LQTrung (09/11/2022)
  */
  updateEmployee(context) {
    try {
      axios
        .put(
          `http://localhost:8080/api/v1/Employees/${state.employee.EmployeeID}`, state.employee)
        .then(() => {
          context.dispatch("toggleProgressLoading");
          //Load lại dữ liệu
          context.dispatch("getEmployees");
          if (state.formMode == formMode.update) {
            //Đóng form
            context.dispatch("toggleForm");
            //Bật nút progress, tự tắt sau 0.5s
            setTimeout(() => {
              context.dispatch("toggleProgressLoading");
              //Bật thông báo sửa thành công
              context.dispatch("toggleNoticeMessage");
            }, 500);
          } else if (state.formMode == formMode.updateAndAdd) {
            setTimeout(() => {
              context.dispatch("toggleProgressLoading");
              context.dispatch("openNotice");
            }, 500);
            context.dispatch("setDetailEmployee", { Gender: Gender.male });
            context.dispatch("getNewEmployeeCode");

          }
          context.dispatch("setTitleNotice", "Sửa nhân viên thành công");
          setTimeout(() => {
            context.dispatch("closeNotice");
          }, 5000);
        })
        .catch((res) => {
          this.alert = {
            type: "danger",
            message: res.response.data.Data[0],
          };
          context.dispatch("setAlert", this.alert);
          context.dispatch("toggleAlert");
        });
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Hàm xóa nhân viên được chọn
   * @param {*} context
   * Author: LQTrung (09/11/2022)
   */
  deleteEmployee(context) {
    try {
      axios
        .delete(
          `http://localhost:8080/api/v1/Employees/${state.employee.EmployeeID}`
        )
        .then(() => {
          context.dispatch("toggleAlert");
          context.dispatch("toggleProgressLoading");
          //Load lại dữ liệu
          context.dispatch("getEmployees");
          context.dispatch("setTitleNotice", "Xóa thành công");
          setTimeout(() => {
            context.dispatch("toggleProgressLoading");
            //Bật thông báo xóa thành công
            context.dispatch("openNotice");
          }, 500);
          setTimeout(() => {
            context.dispatch("closeNotice");
          }, 5000);

          //Quay về trang đầu nếu đã xóa tất cả nhân viên ở trang cuối cùng
          if (state.filter.pageNumber == state.totalPage && state.employees.length == 1) {
            context.dispatch("setFilter", {
              pageSize: state.filter.pageSize,
              pageNumber: 1,
              employeeFilter: state.filter.employeeFilter
            })
          }
          context.dispatch("getEmployees")
          //Cập nhật lại bản ghi cuối cùng của paging
          context.dispatch("setLastRecord")
        })
        .catch((res) => {
          this.alert = {
            type: "danger",
            message: res.response.data.Data[0],
          };
          context.dispatch("setAlert", this.alert);
          context.dispatch("toggleAlert");
        });

    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Hàm xóa nhiều nhân viên cùng lúc
   * @param {*} context 
   * Author: LQTrung (9/11/2022)
   */
  deleteBatchEmployee(context) {
    try {
      axios
        .post(
          `http://localhost:8080/api/v1/Employees/DeleteBatch`, state.listIDEmployeeSelected
        )
        .then(() => {
          context.dispatch("toggleAlert");
          context.dispatch("toggleProgressLoading");
          //Load lại dữ liệu
          context.dispatch("getEmployees");
          context.dispatch("setTitleNotice", "Xóa thành công");
          setTimeout(() => {
            context.dispatch("toggleProgressLoading");
            //Bật thông báo xóa thành công
            context.dispatch("openNotice");
          }, 500);
          setTimeout(() => {
            context.dispatch("closeNotice");
          }, 5000);

          //Quay về trang đầu nếu đã xóa tất cả nhân viên ở trang cuối cùng
          if (state.filter.pageNumber == state.totalPage && state.employees.length == state.listIDEmployeeSelected.length) {
            context.dispatch("setFilter", {
              pageSize: state.filter.pageSize,
              pageNumber: 1,
              employeeFilter: state.filter.employeeFilter
            })
          }
          context.dispatch("getEmployees")
          //Cập nhật lại bản ghi cuối cùng của paging
          context.dispatch("setLastRecord")
          context.dispatch("setCheckAllEmployee",false);
          context.dispatch("setListDeleteEmployee",[]);
        });

    } catch (error) {
      this.alert = {
        type: "danger",
        message: error.response.UsersMsg,
      };
      context.dispatch("setAlert", this.alert);
      context.dispatch("toggleAlert");
    }
  },
  /**
   * Hàm export danh sách nhân viên ra file excel
   * @param {*} context 
   */
  exportExcel() {
    try {
      axios
        .get("http://localhost:8080/api/v1/Employees/ExportExcelFile", {
          responseType: "blob"
        })
        .then(response => {
          const url = URL.createObjectURL(
            new Blob([response.data], {
              type: "application/vnd.ms-excel"
            })
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "file.xlsx");
          document.body.appendChild(link);
          link.click();
        });


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
  toggleAlert(context) {
    context.commit("toggleAlert");
  },
  setTitleForm(context, title) {
    context.commit("setTitleForm", title);
  },
  //Gán tiêu đề thêm, sửa, xóa thành công sau khi thực hiện thêm, sửa, xóa thành công
  setTitleNotice(context, title) {
    context.commit("setTitleNotice", title);
  },
  //Thay đổi thông tin chi tiết 1 nhân viên
  setDetailEmployee(context, employee) {
    context.commit("setDetailEmployee", employee);
  },
  setFormMode(context, mode) {
    context.commit("setFormMode", mode);
  },
  setNoticeAction(context, noticeAction) {
    context.commit("setNoticeAction", noticeAction);
  },
  setAlert(context, alert) {
    context.commit("setAlert", alert);
  },
  setFilter(context, filter) {
    context.commit("setFilter", filter);
  },
  setLastRecord(context) {
    context.commit("setLastRecord")
  },
  setListDeleteEmployee(context, employeeIDListDeleted) {
    context.commit("setListDeleteEmployee", employeeIDListDeleted)
  },
  setCheckAllEmployee(context, value) {
    context.commit("setCheckAllEmployee", value);
  },
  openNotice(context) {
    context.commit("openNotice");
  },
  closeNotice(context) {
    context.commit("closeNotice");
  },
  listIDEmployeeSelected(context, listID) {
    context.commit("listIDEmployeeSelected", listID);
  },

  // Phần module department
  getDepartments(context) {
    try {
      axios.get('http://localhost:8080/api/v1/Department')
        .then(response => context.commit('getDepartments', response.data))
    } catch (error) {
      console.log(error);
    }
  }
}