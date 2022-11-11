import formMode from "@/enums/formMode";

export default {
  employees: [],
  employee: {},
  isShowForm: false,
  isShowSuccessNotice: false,
  isShowProgress: false,
  isShowAlert: false,
  titleForm: "",
  titleNotice: "",
  formMode: formMode.insert,
  alert: {
    type: "",
    message: ""
  },
  filter: {
    pageSize: 10,
    pageNumber: 1,
    employeeFilter: null
  },
  totalEmployee: 0,
  totalPage: 0,
  //Phần module department
  departments: []
}
