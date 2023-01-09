import axios from 'axios'
import state from "./state"
import CONST_API from '../../../constant/api'
// import PROVINCE_LIST_API from '../../../constant/api'
import resourceVN from '../../../resource/resourceVN'
import formMode from '../../../enums/formMode'
import ProviderType from '../../../enums/providerType'
// import state from './state'
export default {
  // Hàm lấy danh sách nhà cung cấp theo trang
  async getProviderList(context) {
    try {
      context.dispatch("toggleProgressLoading");
      const res = await axios.get(
        `${CONST_API}/Provider/SearchAndPaging`, { params: { keyword: state.providerFilter.keywordForFilter, limit: state.providerFilter.pageSize, pageNumber: state.providerFilter.pageNumber } }
      );
      context.commit('getProviderList', res.data);
    } catch (error) {
      console.log(error);
    }
    finally {
      context.dispatch("toggleProgressLoading");
    }
  },
  /**
   * Hàm lấy mã nhân viên mới phục vụ chức năng thêm mới nhân viên
   * @param {*} context 
   * Author: LQTrung (8/11/2022)
   */
  getNewProviderCode(context) {
    try {
      axios.get(`${CONST_API}/Provider/NewProviderCode`)
        .then(response => context.commit('getNewProviderCode', response.data))
    } catch (error) {
      console.log(error);
    }
  },
  //Hàm thêm mới một nhà cung cấp
  async insertAProvider(context) {
    try {
      //Trước khi thêm thì cần xem lại nhà cung cấp là nhân viên hay là cá nhân, là khách hàng hay không, để dữ liệu đưa vào được đúng
      context.dispatch("formatProvider");
      context.dispatch("toggleProgressLoading");
      await axios
        .post(`${CONST_API}/Provider`, state.provider)
        .then((response) => {
          state.providerID = response.data;
          if (state.providerGroupIDListIsChoosed.length > 0)
            context.dispatch("insertMultiProviderGroup");
          if (state.bankAccountList.length > 0)
            context.dispatch("insertMultiBankAccount");
          if (state.anotherAddressList.length > 0)
            context.dispatch("insertAnotherAddressList");
          //Load lại dữ liệu
          context.dispatch("getProviderList");
          context.dispatch("getPaymentTermList");
          if (state.providerFormMode == formMode.insert) {
            //Đóng form
            context.dispatch("toggleProviderForm");
            //Bật thông báo thêm thành công
            context.dispatch("openNotice");
          } else if (state.providerFormMode == formMode.insertAndAdd) {
            setTimeout(() => {
              // context.dispatch("toggleProgressLoading");
              //Bật thông báo thêm thành công
              context.dispatch("openNotice");
            }, 500);
            context.dispatch("setDetailProvider", {
              ProviderType: ProviderType.isOrganization,
              IsCustomer: false,
            });
            context.dispatch("setPurchasingStaff", {});
            context.dispatch("setAnotherAddressList", []);
            context.dispatch("setProviderGroupIDListIsChoosed", []);
            context.dispatch("setProviderGroupCodeListIsChoosed", []);
            context.dispatch("setBankAccountList", []);
            context.dispatch("setAnotherAddressList", []);

            context.dispatch("getNewProviderCode");
          }
          context.dispatch("setTitleNotice", resourceVN.MESSAGE_ALERT.insertProviderSuccessful);
          setTimeout(() => {
            context.dispatch("closeNotice");
          }, 5000);
        })
        .catch((res) => {
          this.alert = {
            title: resourceVN.MESSAGE_ALERT.alertTitle,
            type: "danger",
            message: res.response.data.Data[0],
          };
          // context.dispatch("toggleProgressLoading");
          context.dispatch("setAlert", this.alert);
          context.dispatch("toggleAlert");
        });
    } catch (error) {
      this.alert = {
        title: resourceVN.MESSAGE_ALERT.alertTitle,
        type: "danger",
        message: resourceVN.MESSAGE_ALERT.errorInsert,
      };
      context.dispatch("setAlert", this.alert);
      context.dispatch("toggleAlert");
    } finally {
      context.dispatch("toggleProgressLoading");
    }
  },
  //Hàm sửa thông tin của một nhà cung cấp
  async updateAProvider(context) {
    try {
      context.dispatch("formatProvider");
      context.dispatch("toggleProgressLoading");
      await axios
        .put(`${CONST_API}/Provider/${state.provider.ProviderID}`, state.provider)
        .then(() => {
          state.providerID = state.provider.ProviderID;
          //Lúc sửa thì ta sẽ xóa hết những nhóm nhà cung cấp cũ của 1 nhà cung cấp, và thêm mới lại từ đầu
          if (state.providerGroupCodeListIsChoosed.length > 0) {
            context.dispatch("deleteProviderGroupList");
            context.dispatch("insertMultiProviderGroup");
          }
          //Nếu ban đầu không có nhóm nhà cung cấp nào, sau khi sửa thì thêm mới nhà cung cấp vào, thì lúc đó chỉ việc thêm chứ không cần phải xóa danh sách cũ nữa
          else if (state.providerGroupCodeListIsChoosed.length == 0) {
            context.dispatch("insertMultiProviderGroup");
          }
          //Bây giờ còn trường hợp từ có nhà cung cấp thành không còn nhà cung cấp nào thì chỉ xóa thôi chứ không thêm

          if (state.bankAccountList.length > 0) {
            context.dispatch("deleteBankAccountList");
            context.dispatch("insertMultiBankAccount");
          }
          else
            context.dispatch("insertMultiBankAccount");

          if (state.anotherAddressList.length > 0) {
            context.dispatch("deleteAnotherAddressList");
            context.dispatch("insertAnotherAddressList");
          }
          else
            context.dispatch("insertAnotherAddressList");

          //Load lại dữ liệu
          context.dispatch("getProviderList");
          context.dispatch("getPaymentTermList");
          if (state.providerFormMode == formMode.update) {
            //Đóng form
            context.dispatch("toggleProviderForm");
            //Bật nút progress, tự tắt sau 0.5s
            context.dispatch("openNotice");
          } else if (state.providerFormMode == formMode.updateAndAdd) {
            setTimeout(() => {
              //Bật thông báo sửa thành công
              context.dispatch("openNotice");
            }, 500);
            context.dispatch("setDetailProvider", {
              ProviderType: ProviderType.isOrganization,
              IsCustomer: false,
            });
            context.dispatch("setPurchasingStaff", {});
            context.dispatch("setAnotherAddressList", []);
            context.dispatch("setProviderGroupIDListIsChoosed", []);
            context.dispatch("setProviderGroupCodeListIsChoosed", []);
            context.dispatch("setBankAccountList", []);
            context.dispatch("setAnotherAddressList", []);
            context.dispatch("getNewProviderCode");
          }
          context.dispatch("setTitleNotice", resourceVN.MESSAGE_ALERT.updateProviderSuccessful);

          setTimeout(() => {
            context.dispatch("closeNotice");
          }, 5000);
        })
        .catch((res) => {
          this.alert = {
            title: resourceVN.MESSAGE_ALERT.alertTitle,
            type: "danger",
            message: res.response.data.Data[0],
          };
          context.dispatch("setAlert", this.alert);
          context.dispatch("toggleAlert");
        });
    } catch (error) {
      this.alert = {
        title: resourceVN.MESSAGE_ALERT.alertTitle,
        type: "danger",
        message: resourceVN.MESSAGE_ALERT.errorUpdate,
      };
      context.dispatch("setAlert", this.alert);
      context.dispatch("toggleAlert");
    } finally {
      context.dispatch("toggleProgressLoading");
    }
  },
  //Hàm xóa một nhà cung cấp
  async deleteAProvider(context) {
    try {
      await axios.delete(`${CONST_API}/Provider/${state.provider.ProviderID}`)
        .then(() => {
          context.dispatch("toggleAlert");
          // context.dispatch("toggleProgressLoading");
          //Load lại dữ liệu
          context.dispatch("getProviderList");
          context.dispatch("setTitleNotice", resourceVN.MESSAGE_ALERT.deleteSuccessful);
          setTimeout(() => {
            // context.dispatch("toggleProgressLoading");
            //Bật thông báo xóa thành công
            context.dispatch("openNotice");
          }, 500);
          setTimeout(() => {
            context.dispatch("closeNotice");
          }, 5000);

          //Quay về trang đầu nếu đã xóa tất cả nhân viên ở trang cuối cùng
          if (state.providerFilter.pageNumber == state.totalProviderPage && state.providerList.length == 1) {
            context.dispatch("setFilter", {
              pageSize: state.providerFilter.pageSize,
              pageNumber: 1,
              employeeFilter: state.providerFilter.employeeFilter
            })
          }
          context.dispatch("getProviderList")
          //Cập nhật lại bản ghi cuối cùng của paging
          context.dispatch("setLastProvider")
        })
        .catch((res) => {
          this.alert = {
            title: resourceVN.MESSAGE_ALERT.alertTitle,
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
  //Hàm xóa hàng loạt nhà cung cấp
  async deleteBatchProvider(context) {
    try {
      await axios.post(`${CONST_API}/Provider/DeleteBatch`, state.providerIDListDeleted)
        .then(() => {
          context.dispatch("toggleAlert");
          // context.dispatch("toggleProgressLoading");
          //Load lại dữ liệu
          context.dispatch("getProviderList");
          context.dispatch("setProviderIDListDeleted", []);
          context.dispatch("setTitleNotice", resourceVN.MESSAGE_ALERT.deleteSuccessful);
          setTimeout(() => {
            // context.dispatch("toggleProgressLoading");
            //Bật thông báo xóa thành công
            context.dispatch("openNotice");
          }, 500);
          setTimeout(() => {
            context.dispatch("closeNotice");
          }, 5000);

          //Quay về trang đầu nếu đã xóa tất cả nhân viên ở trang cuối cùng
          if (state.providerFilter.pageNumber == state.totalProviderPage && state.providerList.length == 1) {
            context.dispatch("setFilter", {
              pageSize: state.providerFilter.pageSize,
              pageNumber: 1,
              employeeFilter: state.providerFilter.employeeFilter
            })
          }
          context.dispatch("getProviderList")
          //Cập nhật lại bản ghi cuối cùng của paging
          context.dispatch("setLastProvider")
        })
        .catch((res) => {
          this.alert = {
            title: resourceVN.MESSAGE_ALERT.alertTitle,
            type: "danger",
            message: res.response.data,
          };
          context.dispatch("setAlert", this.alert);
          context.dispatch("toggleAlert");
        });

    } catch (error) {
      console.log(error);
    }
  },
  /**
   * Hàm export danh sách nhà cung cấp ở trang hiện tại ra file excel
   * @param {*} context 
   */
  async exportProviderListToExcel(context) {
    try {
      await axios
        .get(`${CONST_API}/Provider/ExportExcelFile`, { params: { keyword: state.providerFilter.keywordForFilter, limit: state.providerFilter.pageSize, pageNumber: state.providerFilter.pageNumber } }, {
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
          link.setAttribute("download", "Danh_sach_nha_cung_cap.xlsx");
          document.body.appendChild(link);
          link.click();
        });


    } catch (error) {
      console.log(error);
    
    }finally {
      context.dispatch("toggleProgressLoading");
    }
  },
  //Format lại dữ liệu của nhà cung cấp, nhà chung cấp chỉ là 1 trong 2 kiểu tổ chức hoặc cá nhân
  formatProvider() {
    //Nếu là tổ chức thì phải xóa những thông tin của cá nhân đi
    if (state.provider.ProviderType == ProviderType.isOrganization) {
      state.provider.EmailOfIndividual = "";
      state.provider.PhoneOfIndividual = "";
      state.provider.LandPhoneOfIndividual = "";
      state.provider.IdentityNumber = "";
      state.provider.IdentityDate = null;
      state.provider.IdentityPlace = "";
    }
    //Nếu là cá nhân thì các thuộc tính của tổ chức phải null
    if (state.provider.ProviderType == ProviderType.isIndividual) {
      state.provider.Phone = "";
      state.provider.Website = "";
      state.provider.ContactFullname = "";
      state.provider.ContactEmail = "";
      state.provider.ContactPhone = "";

      state.provider.FullNameInvoiceRecipient = "";
      state.provider.EmailInvoiceRecipient = "";
      state.provider.PhoneInvoiceRecipient = "";
      state.provider.AccountReceivableID = null;
    }
    //Nếu không là khách hàng thì các thuộc tính là khách hàng phải được xóa đi trước khi thêm
    if (!state.provider.IsCustomer) {
      state.provider.FullNameInvoiceRecipient = "";
      state.provider.EmailInvoiceRecipient = "";
      state.provider.PhoneInvoiceRecipient = "";
      state.provider.AccountReceivableID = null;
    }
  },
  setDetailProvider(context, provider) {
    context.commit("setDetailProvider", provider)
  },
  setProviderFormMode(context, formMode) {
    context.commit("setProviderFormMode", formMode);
  },
  setLastProvider(context) {
    context.commit("setLastProvider");
  },
  setProviderFilter(context, filter) {
    context.commit("setProviderFilter", filter);
  },
  toggleProviderForm(context) {
    context.commit("toggleProviderForm");
  },
  toggleFilterProviderForm(context) {
    context.commit("toggleFilterProviderForm")
  },
  toggleProviderGroupForm(context) {
    context.commit("toggleProviderGroupForm")
  },
  togglePaymentTermForm(context) {
    context.commit("togglePaymentTermForm")
  },
  setChooseAllProvider(context, value) {
    context.commit("setChooseAllProvider", value);
  },
  setProviderIDListDeleted(context, providerIDListDeleted) {
    context.commit("setProviderIDListDeleted", providerIDListDeleted)
  },
  setHowToDeleteProvider(context, mode) {
    context.commit("setHowToDeleteProvider", mode);
  },
  //Lưu thông tin của nhân viên mua hàng
  setPurchasingStaff(context, staff) {
    context.commit("setPurchasingStaff", staff);
  },
  /**
   * Lấy thông tin chi tiết của một nhân viên mua hàng theo ID
   */
  async getPurchasingStaff(context, employeeIDIsChoosed) {
    try {
      //item ở đây có thể là state.Employee hoặc state.PurchasingStaff
      await axios.get(`${CONST_API}/Employees/${employeeIDIsChoosed}`)
        .then(response => context.commit('getPurchasingStaff', response.data))
    } catch (error) {
      console.log(error);
    }
  },

  //Cập nhật title của fom nhà cung cấp
  setTitleProviderForm(context, title) {
    context.commit("setTitleProviderForm", title);
  },

  //Phần module lọc theo nhiều tiêu chí
  setProviderTypeCondition(context,condition){
    context.commit("setProviderTypeCondition", condition);
  },
  setProviderGroupCondition(context,condition){
    context.commit("setProviderGroupCondition", condition);
  },
  setLiabilityStatusCondition(context,condition){
    context.commit("setLiabilityStatusCondition", condition);
  },
  setStatusCondition(context,condition){
    context.commit("setStatusCondition", condition);
  },
  setProvinceCondition(context,condition){
    context.commit("setProvinceCondition", condition);
  },
  setDistrictCondition(context,condition){
    context.commit("setDistrictCondition", condition);
  },
  setVillageCondition(context,condition){
    context.commit("setVillageCondition", condition);
  },

  //Lấy danh sách các tỉnh thành từ API Online, lấy toàn bộ hoặc lấy theo tên tìm kiếm đều được
  async getProvinceList(context, keyword){
      try {
         const res = await axios.get(
          "https://vn-public-apis.fpo.vn/provinces/getAll", { params: {limit: -1,q:keyword , cols:'name,name_with_type' } }
        );
        context.commit('getProvinceList', res.data.data.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
  },
  //Lấy các Quận/Huyện theo id của Tỉnh thành phố
  async getDistrictList(context, keyword){
    try {
      const res = await axios.get(
       "https://vn-public-apis.fpo.vn/districts/getByProvince", { params: {provinceCode:state.provinceCondition.code ,limit: -1,q:keyword , cols:'name,name_with_type' } }
     );
     context.commit('getDistrictList', res.data.data.data);
     console.log(res.data);
   } catch (error) {
     console.log(error);
   }
  },
  //async getVillageList(context){

  // },
  // Phần module paymentTerm
  //Lấy danh sách các điều khoản
  getPaymentTermList(context) {
    try {
      axios.get(`${CONST_API}/PaymentTerm`)
        .then(response => context.commit('getPaymentTermList', response.data))
    } catch (error) {
      console.log(error);
    }
  },
  //Lấy thông tin chi tiết của 1 điều khoản
  async getDetailPaymentTerm(context, paymentTermIDIsChoosed) {
    try {
      await axios.get(`${CONST_API}/PaymentTerm/${paymentTermIDIsChoosed}`)
        .then(response => context.commit('getDetailPaymentTerm', response.data))
    } catch (error) {
      console.log(error);
    }
  },
  setPaymentTerm(context, paymentTermIsChoose) {
    context.commit("setPaymentTerm", paymentTermIsChoose);
  },
  //Thêm mới một điều khoản thanh toán
  insertPaymentTerm(context) {
    try {
      axios
        .post(`${CONST_API}/PaymentTerm`, state.paymentTerm)
        .then(() => {
          context.dispatch("toggleProgressLoading");
          //Load lại dữ liệu
          context.dispatch("getPaymentTermList");
          if (state.paymentTermMode == formMode.insert) {
            //Bật nút progress, tự tắt sau 0.5s
            setTimeout(() => {
              context.dispatch("toggleProgressLoading");
              //Đóng form thêm mới điều khoản thanh toán
              context.dispatch("togglePaymentTermForm");
              state.provider.DueTime = state.paymentTerm.DueTime;
              context.dispatch("setTitleNotice", resourceVN.MESSAGE_ALERT.insertPaymentTermSuccessful);
              context.dispatch("openNotice");
            }, 700);
          } else if (state.paymentTermMode == formMode.insertAndAdd) {
            setTimeout(() => {
              context.dispatch("toggleProgressLoading");
              state.provider.DueTime = state.paymentTerm.DueTime;
              context.dispatch("setPaymentTerm", {});
              context.dispatch("setTitleNotice", resourceVN.MESSAGE_ALERT.insertPaymentTermSuccessful);
              context.dispatch("openNotice");
            }, 500);

          }
          setTimeout(() => {
            context.dispatch("closeNotice");
          }, 5000);
        })
        .catch((res) => {
          console.log(res),
            this.alert = {
              title: resourceVN.MESSAGE_ALERT.alertTitle,
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
  //Xét chế độ cất hoặc cất và thêm trong form thêm mới điều khoản thanh toán
  setpaymentTermMode(context, formMode) {
    context.commit("setpaymentTermMode", formMode);
  },

  //Module AccountPayable
  getAccountPayableList(context) {
    try {
      axios.get(`${CONST_API}/AccountPayable`)
        .then(response => context.commit('getAccountPayableList', response.data))
    } catch (error) {
      console.log(error);
    }
  },
  //Lấy thông tin chi tiết của 1 tài khoản công nợ phải trả
  async getDetailAccountPayable(context, accountPayableIDIsChoosed) {
    try {
      await axios.get(`${CONST_API}/AccountPayable/${accountPayableIDIsChoosed}`)
        .then(response => context.commit('getDetailAccountPayable', response.data))
    } catch (error) {
      console.log(error);
    }
  },
  setAccountPayable(context, accountPayableIsChoose) {
    context.commit("setAccountPayable", accountPayableIsChoose);
  },

  //Module ccountReceivable
  getAccountReceivableList(context) {
    try {
      axios.get(`${CONST_API}/AccountReceivable`)
        .then(response => context.commit('getAccountReceivableList', response.data))
    } catch (error) {
      console.log(error);
    }
  },
  //Lấy thông tin chi tiết của 1 tài khoản công nợ phải thu
  async getDetailAccountReceivable(context, accountReceivableIDIsChoosed) {
    try {
      await axios.get(`${CONST_API}/AccountReceivable/${accountReceivableIDIsChoosed}`)
        .then(response => context.commit('getDetailAccountReceivable', response.data))
    } catch (error) {
      console.log(error);
    }
  },
  setAccountReceivable(context, accountReceivableIsChoose) {
    context.commit("setAccountReceivable", accountReceivableIsChoose);
  },

  //Module ProviderGroup
  getProviderGroupList(context) {
    try {
      axios.get(`${CONST_API}/ProviderGroup`)
        .then(response => context.commit('getProviderGroupList', response.data))
    } catch (error) {
      console.log(error);
    }
  },
  //Thêm mới một nhóm nhà cung cấp
  async insertProviderGroup(context) {
    try {
      await axios
        .post(`${CONST_API}/ProviderGroup`, state.providerGroup)
        .then(() => {
          context.dispatch("toggleProgressLoading");
          //Load lại dữ liệu
          context.dispatch("getProviderGroupList");
          if (state.providerGroupMode == formMode.insert) {
            context.dispatch("toggleProviderGroupForm");
            context.dispatch("toggleProgressLoading");
            context.dispatch("setTitleNotice", resourceVN.MESSAGE_ALERT.insertProviderGroupSuccessful);
            context.dispatch("openNotice");

            // context.dispatch("setProviderGroupCodeListIsChoosed", state.providerGroup.ProviderGroupCode);
          } else if (state.providerGroupMode == formMode.insertAndAdd) {
            setTimeout(() => {
              context.dispatch("toggleProgressLoading");
            }, 500);
            context.dispatch("setTitleNotice", resourceVN.MESSAGE_ALERT.insertProviderGroupSuccessful);
            context.dispatch("openNotice");
            context.dispatch("setProviderGroup", {});
          }
          setTimeout(() => {
            context.dispatch("closeNotice");
          }, 5000);
        })
        .catch((res) => {
          console.log(res),
            this.alert = {
              title: resourceVN.MESSAGE_ALERT.alertTitle,
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
  setProviderGroup(context, providerGroupIsChoose) {
    context.commit("setProviderGroup", providerGroupIsChoose);
  },
  setProviderGroupIDListIsChoosed(context, item) {
    context.commit("setProviderGroupIDListIsChoosed", item);
  },
  setProviderGroupCodeListIsChoosed(context, item) {
    context.commit("setProviderGroupCodeListIsChoosed", item);
  },
  setParentProviderGroup(context, parentProviderGroup) {
    context.commit("setParentProviderGroup", parentProviderGroup);
  },
  setProviderGroupMode(context, formMode) {
    context.commit("setProviderGroupMode", formMode)
  },

  // Module Provider_ProviderGroup
  //Thêm mới nhiều nhóm nhà cung cấp của 1 nhà cung cấp
  async insertMultiProviderGroup(context) {
    try {
      await axios
        .post(`${CONST_API}/Provider_ProviderGroups/${state.providerID}`, state.providerGroupIDListIsChoosed)
        .then((res) => {
          //Log xem đã thêm được nhóm nhà cung cấp chưa
          //Nếu thêm đúng rồi thì sẽ tiếp tục chạy các API khác
          console.log(res);
        })
        .catch((res) => {
          console.log(res),
            this.alert = {
              title: resourceVN.MESSAGE_ALERT.alertTitle,
              type: "danger",
              message: resourceVN.MESSAGE_ALERT.errorInsert,
            };
          context.dispatch("setAlert", this.alert);
          context.dispatch("toggleAlert");
        });
    } catch (error) {
      this.alert = {
        title: resourceVN.MESSAGE_ALERT.alertTitle,
        type: "danger",
        message: resourceVN.MESSAGE_ALERT.errorInsert,
      };
      context.dispatch("setAlert", this.alert);
      context.dispatch("toggleAlert");
      console.log(error);
    }
  },
  //Lấy ra danh sách các Nhóm nhà cung cấp thuộc nhà cung cấp được chọn
  async getProviderListByProviderID(context, providerIDIsChoosed) {
    try {
      const response = await axios.get(`${CONST_API}/Provider_ProviderGroups/GetAllRecordsByID`, { params: { providerID: providerIDIsChoosed } })
      const providerGroupCodeList = [];
      for (const item of response.data) {
        providerGroupCodeList.push(item.ProviderGroupCode);
      }
      context.dispatch("setProviderGroupCodeListIsChoosed", providerGroupCodeList)
    } catch (error) {
      console.log(error);
    }
  },
  //Hàm xóa các nhóm nhà cung cấp của 1 nhà cung cấp
  async deleteProviderGroupList(context) {
    try {
      await axios
        .delete(
          `${CONST_API}/Provider_ProviderGroups/DeleteBatch/${state.provider.ProviderID}`
        )
        .catch((res) => {
          this.alert = {
            title: resourceVN.MESSAGE_ALERT.alertTitle,
            type: "danger",
            message: res.response.data,
          };
          context.dispatch("setAlert", this.alert);
          context.dispatch("toggleAlert");
        });

    } catch (error) {
      console.log(error);
    }
  },


  //Module BankAccount
  async getBankAccountList(context) {
    try {
      await axios.get(`${CONST_API}/BankAccountProvider/GetAllByProviderID`, { params: { providerID: state.provider.ProviderID } })
        .then(response => context.commit('setBankAccountList', response.data))
    } catch (error) {
      console.log(error);
    }
  },
  //Hàm thêm mới nhiều tài khoản ngân hàng của một nhà cung cấp
  async insertMultiBankAccount(context) {
    try {
      await axios
        .post(`${CONST_API}/BankAccountProvider/${state.providerID}`, state.bankAccountList)
        .then((res) => {
          //Log xem đã thêm được nhóm nhà cung cấp chưa
          //Nếu thêm đúng rồi thì sẽ tiếp tục chạy các API khác
          console.log(res);
        })
        .catch((res) => {
          console.log(res),
            this.alert = {
              title: resourceVN.MESSAGE_ALERT.alertTitle,
              type: "danger",
              message: resourceVN.MESSAGE_ALERT.errorInsert,
            };
          context.dispatch("setAlert", this.alert);
          context.dispatch("toggleAlert");
        });
    } catch (error) {
      this.alert = {
        title: resourceVN.MESSAGE_ALERT.alertTitle,
        type: "danger",
        message: resourceVN.MESSAGE_ALERT.errorInsert,
      };
      context.dispatch("setAlert", this.alert);
      context.dispatch("toggleAlert");
      console.log(error);
    }
  },
  //Hàm xóa các tài khoản ngân hàng của 1 nhà cung cấp
  async deleteBankAccountList(context) {
    try {
      await axios
        .delete(
          `${CONST_API}/BankAccountProvider/${state.provider.ProviderID}/deleteARecord`
        )
        .catch((res) => {
          this.alert = {
            title: resourceVN.MESSAGE_ALERT.alertTitle,
            type: "danger",
            message: res.response.data,
          };
          context.dispatch("setAlert", this.alert);
          context.dispatch("toggleAlert");
        });

    } catch (error) {
      console.log(error);
    }
  },
  setBankAccountList(context, bankAccountList) {
    context.commit("setBankAccountList", bankAccountList)
  },
  setBankAccount(context, bankAccountIsChoosed) {
    context.commit("setBankAccount", bankAccountIsChoosed);
  },

  // Module Another address
  setAnotherAddressList(context, anotherAddressList) {
    context.commit("setAnotherAddressList", anotherAddressList);
  },
  //Hàm thêm mới nhiều địa chỉ khác của một nhà cung cấp
  async insertAnotherAddressList(context) {
    try {
      await axios
        .post(`${CONST_API}/AnotherAddressOfProvider/${state.providerID}`, state.anotherAddressList)
        .catch((res) => {
          console.log(res),
            this.alert = {
              title: resourceVN.MESSAGE_ALERT.alertTitle,
              type: "danger",
              message: resourceVN.MESSAGE_ALERT.errorInsert,
            };
          context.dispatch("setAlert", this.alert);
          context.dispatch("toggleAlert");
        });
    } catch (error) {
      this.alert = {
        title: resourceVN.MESSAGE_ALERT.alertTitle,
        type: "danger",
        message: resourceVN.MESSAGE_ALERT.errorInsert,
      };
      context.dispatch("setAlert", this.alert);
      context.dispatch("toggleAlert");
      console.log(error);
    }
  },

  //Hàm xóa các địa chỉ khác của 1 nhà cung cấp
  async deleteAnotherAddressList(context) {
    try {
      await axios
        .delete(
          `${CONST_API}/AnotherAddressOfProvider/${state.provider.ProviderID}/deleteARecord`
        )
        .catch((res) => {
          this.alert = {
            title: resourceVN.MESSAGE_ALERT.alertTitle,
            type: "danger",
            message: res.response.data,
          };
          context.dispatch("setAlert", this.alert);
          context.dispatch("toggleAlert");
        });

    } catch (error) {
      console.log(error);
    }
  },
  //Hàm lấy danh sách các địa chỉ khác của một nhà cung cấp
  async getAnotherAddressList(context, providerID) {
    try {
      await axios.get(`${CONST_API}/AnotherAddressOfProvider/GetAllByProviderID`, { params: { providerID: providerID } })
        .then(response => context.commit('getAnotherAddressList', response.data))
    } catch (error) {
      console.log(error);
    }
  },

}