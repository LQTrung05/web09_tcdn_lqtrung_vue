import formMode from "@/enums/formMode";
import noticeAction from '../../../enums/noticeAction'
export default {
  //Danh sách nhà cung cấp
  providerList: [],
  //Thông tin chi tiết một nhà cung cấp
  provider: {
  },
  //Dữ liệu tìm kiếm và phân trang nhà cung cấp
  providerFilter: {
    pageSize: 10,
    pageNumber: 1,
    keywordForFilter: ""
  },
  //Các trường dữ liệu dùng để lọc nhà cung cấp trong form lọc
  providerTypeListCondition:["Tất cả","Tổ chức","Cá nhân"],
  providerTypeCondition:"Tất cả",
  providerGroupCondition:"",
  liabilityStatusListCondition:["Tất cả","Còn nợ","Hết nợ"],
  liabilityStatusCondition:"Tất cả",
  statusListCondition:["Tất cả", "Đang sử dụng","Ngưng sử dụng"],
  statusCondition:"Tất cả",
  provinceCondition:{},
  districtCondition:{},
  villageCondition:"",

  //Các biến chứa danh sách các tỉnh, thành phố, huyện, xã.
  provinceList:[],
  districtList:[],
  villageList:[],
  //Tiêu đề của form nhà cung cấp khi thêm hoặc sửa sẽ thay đổi
  titleProviderForm:"",
  //ID của nhà cung cấp vừa được thêm mới hoặc được chọn để sửa, dùng để thêm mới nhóm nhà cung cấp, tài khoản ngân hàng, địa chỉ khác của nhà cung cấp vừa được thêm mới
  providerID:"",
  providerFormMode: formMode.insert,
  //Tổng số nhà cung cấp 
  totalProvider: 0,
  //Tổng số trang 
  totalProviderPage: 0,
  //Nhà cung cấp cuối cùng trong danh sách
  lastProvider:0,
  providerFormTitle: "",
  //Thuộc tính cho phép hiển thị form chi tiết nhà cung cấp
  isShowProviderForm: false,
  isShowFiterProviderForm: false,
  isShowProviderGroupForm: false,
  isShowPaymentTermForm: false,
  //Nhân viên mua hàng
  purchasingStaff: {},
  //Giá trị lưu khi chọn tất cả bản ghi
  chooseAllProvider: false,
  //Danh sách ID của các nhà cung cấp muốn xóa
  providerIDListDeleted:[],
  //Mode xóa 1 hay xóa nhiều bản ghi
  modeHowToDeleteProvider: noticeAction.deleteAProvider,
  //Danh sách các điều khoản thanh toán
  paymentTermList: [],
  paymentTerm: {},
  paymentTermMode: formMode.insert,

  //Tài khoản công nợ phải trả
  accountPayableList: [],
  accountPayable: {},

  //Tài khoản công nợ phải thu
  accountReceivableList: [],
  accountReceivable: {},

  //Nhóm nhà cung cấp
  providerGroupList: [],
  providerGroup: {},
  //Các ID của các nhóm nhà cung cấp thuộc 1 provider
  providerGroupIDListIsChoosed: [],
  //Đây là các mã nhóm nhà cung cấp của 1 provider
  providerGroupCodeListIsChoosed: [],

  //Cha của nhóm nhà cung cấp sẽ thêm mới
  parentProviderGroup: {},
  providerGroupMode: formMode.insert,

  //Danh sách tài khoản ngân hàng của một nhà cung cấp
  bankAccountList: [],
  bankAccount: {},
  //Địa chỉ khác của nhà cung cấp 
  anotherAddressList:[],
}
