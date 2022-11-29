import formMode from "@/enums/formMode";
import noticeAction from "@/enums/noticeAction";

export default {
  //Danh sách nhân viên
  employees: [],
  //Thông tin chi tiết 1 nhân viên
  employee: {},
  isShowForm: false,
  isShowSuccessNotice: false,
  isShowProgress: false,
  isShowAlert: false,
  titleForm: "",
  titleNotice: "",
  formMode: formMode.insert,
  noticeAction: noticeAction.deleteAEmployee,
  //Kiểu và nội dung của cảnh báo
  alert: {
    type: "",
    message: ""
  },
  //Dữ liệu tìm kiếm và phân trang
  filter: {
    pageSize: 10,
    pageNumber: 1,
    employeeFilter: null
  },
  //Tổng số nhân viên 
  totalEmployee: 0,
  //Tổng số trang 
  totalPage: 0,
  //Bản ghi cuối cùng của database, dùng trong paging
  lastRecord:0,
  //Danh sách ID của các nhân viên được chọn để xóa
  listIDEmployeeSelected:[],
  isCheckedAll: false,
  //Phần module department
  departments: []
}
