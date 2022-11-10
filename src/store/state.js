import formMode from "@/enums/formMode";

export default{
  employees: [],
  employee:{},
  isShowForm: false,
  isShowSuccessNotice: false,
  isShowProgress:false,
  isShowAlert:false,
  titleForm:"",
  titleNotice:"",
  alert:{
    type:"",
    message:""
  },
  formMode: formMode.insert,
  //Phần module department
  departments:[]
}
