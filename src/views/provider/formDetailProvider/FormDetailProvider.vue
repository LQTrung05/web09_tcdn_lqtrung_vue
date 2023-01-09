<template>
  <div class="m-popup">
    <div class="m-popup-content">
      <div class="popup-header">
        <div class="popup-title">
          <div class="popup-title-name">{{ titleProviderForm }}</div>
          <div class="m-radio-group">
            <label class="m-con-radio">
              <input
                type="radio"
                class="m-input-radio"
                name="Group1"
                value="0"
                v-model="provider.ProviderType"
                @change="
                  (func) => {
                    provider.ProviderType = parseInt(func.target.value);
                    setDetailProvider(provider);
                  }
                "
              />
              <span class="m-radio-label">{{ propertyName.organization }}</span>
            </label>
            <label class="m-con-radio">
              <input
                type="radio"
                class="m-input-radio"
                name="Group1"
                value="1"
                v-model="provider.ProviderType"
                @change="
                  (func) => {
                    provider.ProviderType = parseInt(func.target.value);
                    setDetailProvider(provider);
                  }
                "
              />
              <span class="m-radio-label">{{ propertyName.individual }}</span>
            </label>
          </div>
          <label class="m-popup-checkbox display-f margin-left-100">
            <input
              type="checkbox"
              class="m-input-checkbox-popup"
              tabindex="1"
              value="true"
              v-model="provider.IsCustomer"
              @click="
                (func) => {
                  provider.IsCustomer = !provider.IsCustomer;
                  setDetailProvider(provider);
                }
              "
            />
            <span class="m-input-checkbox-label">{{
              propertyName.isCustomer
            }}</span>
          </label>
        </div>
        <div class="popup-close">
          <div
            class="m-icon-24 m-icon-help"
            style="margin-
            right: 8px"
            :title="text.helpToolTip"
          ></div>
          <div
            class="m-icon-24 m-icon-close m-close-add-popup js-close-form"
            :title="text.close"
            @click="closeProviderForm"
          ></div>
        </div>
      </div>
      <div class="popup-content">
        <form action="" id="m-form-employee">
          <div class="m-form-content-2-col">
            <div class="m-col-1">
              <div class="m-row-1 display-f" v-if="provider.ProviderType === 0">
                <Input
                  ref="focusMe"
                  class="m-pr-6 m-mb-24"
                  :inputLabel="propertyName.taxCode"
                  :inputWidth="'m-input-width-40'"
                  v-model="provider.TaxCode"
                  :errorMess="errorInput.taxCode"
                  :tabIndex="3"
                />
                <Input
                  class="m-mb-24"
                  :inputLabel="propertyName.providerCode"
                  :inputWidth="'m-input-width-60'"
                  :validateType="'required'"
                  v-model="provider.ProviderCode"
                  :errorMess="errorInput.providerCode"
                  :tabIndex="4"
                />
              </div>
              <div class="m-row-1 display-f" v-else>
                <Input
                  class="m-pr-6 m-mb-24"
                  :inputLabel="propertyName.providerCode"
                  :inputWidth="'m-input-width-60'"
                  :validateType="'required'"
                  v-model="provider.ProviderCode"
                  :errorMess="errorInput.providerCode"
                  :tabIndex="4"
                />
                <Input
                  ref="focusMe"
                  class="m-mb-24"
                  :inputLabel="propertyName.taxCode"
                  :inputWidth="'m-input-width-40'"
                  v-model="provider.TaxCode"
                  :errorMess="errorInput.taxCode"
                  :tabIndex="3"
                />
              </div>
              <div
                class="m-row-2 m-input-width-100 m-mb-24"
                v-if="provider.ProviderType === 0"
              >
                <Input
                  :inputLabel="propertyName.providerName"
                  :validateType="'required'"
                  class="m-mb-24"
                  :inputType="'text'"
                  :inputWidth="'m-input-width-100'"
                  v-model="provider.ProviderName"
                  :errorMess="errorInput.providerName"
                  :tabIndex="10"
                />
              </div>
              <div class="m-row-2 m-layout-form-30-70 m-mb-24" v-else>
                <div class="m-input-title m-mb-4">
                  {{ propertyName.providerName }}
                </div>
                <div class="display-f">
                  <Combobox
                    :widthValue100="'true'"
                    :setOverflowY="'true'"
                    :dataList="title"
                    :selectedItem="provider.Prefix"
                    :isShowList="isShowList"
                    @chooseItem="chooseTitle"
                    :topValue="'1px'"
                    :placeholderValue="text.title"
                    class="m-input-width-30 m-pr-6"
                    v-model="provider.Prefix"
                  >
                  </Combobox>
                  <Input
                    :inputWidth="'width-100'"
                    :placeholderValue="text.fullName"
                    :errorMess="errorInput.providerName"
                    v-model="provider.ProviderName"
                  />
                </div>
              </div>
              <div class="m-input-width-100 m-mb-24">
                <div class="display-f m-mb-8">
                  <div class="m-input-title-required m-input-title m-mb-4">
                    {{ propertyName.address }}
                  </div>
                </div>
                <textarea
                  rows="2"
                  maxlength="255"
                  class="m-input-textarea"
                  placeholder="VD:Số 24, Từ Liêm, Hà Nội"
                  v-model="provider.Address"
                ></textarea>
                <div class="err-message"></div>
              </div>
            </div>
            <div class="m-col-2">
              <div
                class="m-layout-form-40-60 display-f"
                v-if="provider.ProviderType === 0"
              >
                <Input
                  :inputLabel="propertyName.phoneNumber"
                  class="m-pr-6 m-mb-24"
                  :inputType="'text'"
                  :inputWidth="'m-input-width-40'"
                  v-model="provider.Phone"
                  :tabIndex="5"
                />
                <Input
                  :inputLabel="propertyName.website"
                  class="m-pr-6 m-mb-24"
                  :inputType="'text'"
                  :inputWidth="'m-input-width-60'"
                  v-model="provider.Website"
                  :tabIndex="5"
                />
              </div>
              <ComboboxMultiChoices
                :permitAdd="true"
                :rightValue="'-1px'"
                :lableValue="propertyName.providerGroup"
                :headers="providerGroupHeaders"
                :dataList="providerGroupList"
                :dataColumnList="providerGroupColumnList"
                :listProviderGroupIsChoose="providerGroupCodeListIsChoosed"
                @toggleAddForm="openProviderGroupForm"
                @chooseItem="addProviderGroup"
                @deleteCell="deleteCell"
                class="m-mr-8 m-mb-24"
              />
              <ComboboxTable
                :permitAdd="true"
                :topValue="'1px'"
                :lableValue="propertyName.purchasingStaff"
                :headers="employeeTableHeaders"
                :dataList="employees"
                :dataColumnList="employeeColumnList"
                v-model="purchasingStaff.EmployeeName"
                :width100="true"
                @toggleAddForm="openEmployeeForm"
                @chooseItem="choosePurchasingStaff"
                class="m-mr-8"
              >
              </ComboboxTable>
            </div>
          </div>
          <div class="m-form-content-1-col display-f">
            <TabsWrapper>
              <TabItem title="Thông tin liên hệ">
                <ContactInformationOrganization
                  v-if="provider.ProviderType === 0"
                ></ContactInformationOrganization>

                <ContactInformationIndividual v-else>
                </ContactInformationIndividual>
              </TabItem>
              <TabItem title="Điều khoản thanh toán" >
                <PaymentTabItem> </PaymentTabItem>
              </TabItem>
              <TabItem title="Tài khoản ngân hàng" >
                <BankAccountTabItem @data="setBankAccount($event)">
                </BankAccountTabItem>
              </TabItem>

              <TabItem title="Địa chỉ khác">
                <OtherAddress @data="setAnotherAddresses($event)">
                </OtherAddress>
              </TabItem>

              <TabItem title="Ghi chú">
                <div class="wrap-tab-item">
                  <div class="content-tab-item flex-direction-column">
                    <div class="lable-tab-item m-mb-4">Ghi chú</div>
                    <textarea
                      cols="30"
                      rows="9"
                      class="note-tab-item"
                      v-model="provider.Note"
                    ></textarea>
                  </div>
                </div>
              </TabItem>
            </TabsWrapper>
          </div>

          <div class="m-form-footer">
            <div class="m-form-part-cancel">
              <Button
                :btnText="text.cancel"
                :secondaryButton="true"
                :buttonBorder="true"
                :radius4="true"
                addClass="m-btn"
                @click="closeProviderForm"
                class="unset-pading"
                tabindex="22"
              ></Button>
            </div>
            <div class="m-form-part-submit">
              <Button
                :btnText="text.store"
                addClass="m-btn"
                tabindex="21"
                :buttonBorder="true"
                :secondaryButton="true"
                @click.prevent="save"
              ></Button>
              <Button
                :btnText="text.storeAndAdd"
                tabindex="20"
                @click.prevent="saveAndReset"
                class="unset-pading"
              ></Button>
            </div>
          </div>
          <ProviderGroupForm v-if="isShowProviderGroupForm"></ProviderGroupForm>
          <EmployeeForm v-if="isShowForm"></EmployeeForm>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Button from "../../../components/base/BaseButton.vue";
import Input from "../../../components/base/BaseInput.vue";
import Combobox from "../../../components/base/BaseCombobox.vue";
import ComboboxTable from "../../../components/base/BaseComboboxTable.vue";
import FormMode from "../../../enums/formMode";
import TabsWrapper from "../../../components/base/BaseTab/TabWrapper.vue";
import TabItem from "../../../components/base/BaseTab/TabItem.vue";
import ContactInformationOrganization from "./ContactInformationOrganizationTabItem.vue";
import ContactInformationIndividual from "./ContactInformationIndividualTabItem.vue";
import PaymentTabItem from "./PaymentTabItem.vue";
import BankAccountTabItem from "./BankAccountTabItem.vue";
import OtherAddress from "./OtherAddressTabItem.vue";
import ProviderGroupForm from "../ProviderGroupForm.vue";
import EmployeeForm from "../../employee/FormDetailEmployee.vue";
import resourceVN from "../../../resource/resourceVN";
import ComboboxMultiChoices from "../../../components/base/BaseComboboxMultiChoice.vue";
import Gender from "../../../enums/gender";
// import { provide } from '@vue/runtime-core';
// import ProviderType from "../../../enums/providerType"

export default {
  name: "PopupDetailProvider",
  components: {
    Button,
    Input,
    Combobox,
    ComboboxTable,
    TabsWrapper,
    TabItem,
    ContactInformationOrganization,
    ContactInformationIndividual,
    PaymentTabItem,
    BankAccountTabItem,
    OtherAddress,
    ProviderGroupForm,
    EmployeeForm,
    ComboboxMultiChoices,
  },
  created() {
    const me = this;
    if (me.providerFormMode == FormMode.insert) {
      me.getNewProviderCode();
    }
  },
  mounted() {
    const me = this;
    //focus vào ô Mã nhân viên
    me.$refs.focusMe.$el.querySelector("input").focus();

    // me.loadBankAccountListByProviderID();
  },
  computed: mapGetters([
    "isShowProviderForm",
    "departments",
    "titleProviderForm",
    "provider",
    "providerFormMode",
    "alert",
    "employee",
    "employees",
    "purchasingStaff",
    "newEmployeeCode",
    "isShowProviderGroupForm",
    "isShowForm",
    "providerGroupList",
    "providerGroupIDListIsChoosed",
    "providerGroupCodeListIsChoosed",
  ]),
  methods: {
    ...mapActions([
      "toggleProviderForm",
      "toggleProgressLoading",
      "toggleNoticeMessage",
      "toggleAlert",
      "getEmployees",
      "setTitleNotice",
      "setDetailProvider",
      "setProviderFormMode",
      "setAlert",
      "insertAProvider",
      "updateEmployee",
      "getNewProviderCode",
      "toggleProviderGroupForm",
      "toggleForm",
      "getPaymentTermList",
      "getAccountPayableList",
      "getAccountReceivableList",
      "setPurchasingStaff",
      "getBankAccountList",
      "setBankAccountList",
      "setProviderGroupCodeListIsChoosed",
      "setProviderGroupIDListIsChoosed",
      "insertMultiProviderGroup",
      "setAnotherAddressList",
      "getAnotherAddressList",
      "updateAProvider",
      "setProviderGroup",
      "setParentProviderGroup",
      "setTitleForm",
      "setFormMode",
      "setDetailEmployee",
    ]),
    //Hàm thêm vào state danh sách tài khoản ngân hàng của một nhà cung cấp khi thêm mới
    setBankAccount(value) {
      this.setBankAccountList(value);
    },
    //Hàm thêm vào state danh sách các địa chỉ khác của một nhà cung cấp khi thêm mới
    setAnotherAddresses(value) {
      this.setAnotherAddressList(value);
    },
    /**
     * Hàm chọn cách xưng hô trong tên nhà cung cấp
     * CreatedBy: LQTrung (19/12/2022)
     */
    chooseTitle(selectedTitle) {
      const me = this;
      me.selectedTitle = selectedTitle;
      console.log("title");
    },
    // loadBankAccountListByProviderID() {
    //   const me = this;
    //   if (me.provider.ProviderID) {
    //     //Lấy danh sách các tài khoản ngân hàng của nhà cung cấp được chọn
    //     me.getBankAccountList(me.provider.ProviderID);
    //   }
    // },
    //Mở form thông tin chi tiết nhóm nhà cung cấp
    openProviderGroupForm() {
      const me = this;
      me.toggleProviderGroupForm();
      me.setProviderGroup({});
      me.setParentProviderGroup({});
      me.temp = me.providerGroupCodeListIsChoosed;
    },
    /**
     * Hàm validate mã nhà cung cấp
     * Author: LQTrung (26/12/2022)
     */
    validateProviderCode() {
      const me = this;
      let regex = /(\d+)$/;
      if (!me.provider.ProviderCode)
        me.errorInput.providerCode = "Mã không để trống";
      else if (!regex.exec(me.provider.ProviderCode))
        me.errorInput.providerCode = "Mã phải kết thúc là số";
    },
    /**
     * Hàm validate mã số thuế
     * Author: LQTrung (26/12/2022)
     */
    validateTaxCode() {
      const me = this;
      let regex1 = /(\d{10}-\d{3})$/;
      let regex2 = /\d{10}$/;
      if (!me.provider.TaxCode) {
        me.errorInput.taxCode = "";
        return;
      }
      if (
        !regex1.exec(me.provider.TaxCode) &&
        !regex2.exec(me.provider.TaxCode)
      )
        me.errorInput.taxCode = "Mã gồm 10 hoặc 13 chữ số";
      if (regex1.exec(me.provider.TaxCode) || regex2.exec(me.provider.TaxCode))
        me.errorInput.taxCode = "";
    },
    /**
     * Hàm validate dữ liệu nhâp vào form
     * Author: LQTrung (26/12/2022)
     */
    validateProviderForm() {
      const me = this;
      me.errorInput = {
        taxCode: "",
        providerCode: "",
        providerName: "",
      };
      me.validateTaxCode();
      //Validate mã nhân viên
      me.validateProviderCode();
      //Validate tên nhân viên
      if (!me.provider.ProviderName) {
        me.errorInput.providerName = "Tên không để trống";
      }
      if (
        me.errorInput.providerCode ||
        me.errorInput.providerName ||
        me.errorInput.taxCode
      )
        return false;
      //Nếu validate đúng hết thì trả về true để phục vụ quá trình thêm mới
      return true;
    },
    /**
     * Hàm kích nút "Cất" để thêm mới hoặc sửa và đóng form sau khi xong
     * Author: LQTrung(27/12/2022)
     */
    save() {
      // trước khi lưu thì validate dữ liệu
      const me = this;
      let isValid = me.validateProviderForm();

      //Chuyển về chế độ Cất
      if (me.providerFormMode == FormMode.insertAndAdd)
        me.setProviderFormMode(FormMode.insert);
      else if (me.providerFormMode == FormMode.updateAndAdd)
        me.setProviderFormMode(FormMode.update);

      if (isValid) {
        me.mapIDFromProviderGroupCodeList();
        //Chuyển từ kiểu bool sang int thì thằng database mới hiểu được, vì trong db đặt kiểu Tinyint.
        if (me.provider.IsCustomer) me.provider.IsCustomer = 1;
        else me.provider.IsCustomer = 0;
        if (me.providerFormMode == FormMode.insert) {
          me.provider.CreatedBy = "LQTrung";

          me.insertAProvider(me.provider);
          me.getPaymentTermList();
        } else if (me.providerFormMode == FormMode.update) {
          me.provider.ModifiedBy = "LQTrung";
          me.updateAProvider(me.provider);
        }
      }
    },
    /**
     * Hàm kích nút "Cất và Thêm" để thêm mới hoặc sửa và reset lại form sau khi xong
     * Author: LQTrung(27/12/2022)
     */
    saveAndReset() {
      const me = this;
      let isValid = me.validateProviderForm();
      //Chuyển về chết độ Sửa và reset lại form để thêm mới
      if (me.providerFormMode == FormMode.update)
        me.setProviderFormMode(FormMode.updateAndAdd);
      else me.setProviderFormMode(FormMode.insertAndAdd);

      if (isValid) {
        me.mapIDFromProviderGroupCodeList();
        //Chuyển từ kiểu bool sang int thì thằng database mới hiểu được, vì trong db đặt kiểu Tinyint.
        if (me.provider.IsCustomer) me.provider.IsCustomer = 1;
        else me.provider.IsCustomer = 0;
        if (me.providerFormMode == FormMode.insertAndAdd) {
          me.provider.CreatedBy = "LQTrung";
          me.insertAProvider(me.provider);
        } else if (me.providerFormMode == FormMode.updateAndAdd) {
          me.provider.ModifiedBy = "LQTrung";
          me.updateAProvider(me.provider);
        }
      }
    },
    //Thêm các nhóm nhà cung cấp vào 1 list
    addProviderGroup(providerGroup) {
      const me = this;
      
      me.temp = me.providerGroupCodeListIsChoosed;
      let flag = 0;
      //Duyệt tìm xem nhóm nhà cung cấp được chọn đã có trong danh sách được chọn chưa
      for (const item of me.temp) {
        if (providerGroup.ProviderGroupCode == item) {
          flag = 1;
          break;
        }
      }
      //Nếu chưa có trong list,thì tức là bạn muốn thêm nó vào
      if (flag == 0) me.temp.push(providerGroup.ProviderGroupCode);
      //Nếu mà đã có rồi mà chọn tiếp thì tức là muốn xóa nó khỏi list
      else {
        //Mảng arrayTerm này sẽ làm nhiệm vụ xóa cái nhóm nhà cung cấp được chọn ra khỏi danh sách
        const arrayTerm = me.temp.filter(
          (item) => item != providerGroup.ProviderGroupCode
        );
        //Gán lại danh sách các nhóm nhà cung cấp để hiển thị lên màn hình
        me.temp = arrayTerm;
      }
      me.setProviderGroupCodeListIsChoosed(me.temp);
    },
    //Hàm xóa những nhà cung cấp được chọn trên combobox multi choice
    deleteCell(providerGroupDelete) {
      const me = this;
      
      //Mảng arrayTerm này sẽ làm nhiệm vụ xóa cái nhóm nhà cung cấp được chọn ra khỏi danh sách
      const arrayTerm = me.temp.filter((item) => item != providerGroupDelete);
      //Gán lại danh sách các nhóm nhà cung cấp để hiển thị lên màn hình
      me.temp = arrayTerm;
      me.setProviderGroupCodeListIsChoosed(me.temp);
    },
    //Hàm lấy ra những ProviderGroupID tương ứng với các ProviderCode trong mảng temp
    mapIDFromProviderGroupCodeList() {
      const me = this;
      const tempArrayProviderGroupID = [];
      //Tìm các ProviderGroupID tương ứng với những ProviderGroupCode ở trong danh sách providerGroupCodeListIsChoosed để phục vụ thêm mới
      for (const providerGroupCodeIsChoose of me.providerGroupCodeListIsChoosed) {
        for (const providerGroupCode of me.providerGroupList) {
          if (providerGroupCodeIsChoose === providerGroupCode.ProviderGroupCode)
            tempArrayProviderGroupID.push(providerGroupCode.ProviderGroupID);
        }
      }
      me.setProviderGroupIDListIsChoosed(tempArrayProviderGroupID);
    },
    openEmployeeForm() {
      // Reset lai form roi moi mo ra
      const me = this;
      me.setFormMode(FormMode.insert);
      me.setDetailEmployee({ Gender: Gender.male });
      me.setTitleForm(me.text.insertEmployee);
      me.toggleForm();
    },
    //Đóng form thông tin chi tiết
    closeProviderForm() {
      const me = this;
      me.setPurchasingStaff({});
      me.toggleProviderForm();
    },
    //Hàm chọn những column hiển thị lên combobox nhóm nhà cung cấp
    providerGroupColumnList(providerGroup) {
      const arr = [
        providerGroup.ProviderGroupCode,
        providerGroup.ProviderGroupName,
      ];
      return arr;
    },
    //Hàm chọn những column hiển thị lên cobobox nhân viên mua hàng
    employeeColumnList(employee) {
      const arr = [employee.EmployeeCode, employee.EmployeeName];
      return arr;
    },
    //Hàm chọn nhân viên mua hàng
    choosePurchasingStaff(staffIsChoose) {
      const me = this;
      me.setPurchasingStaff(staffIsChoose);
      me.provider.EmployeeID = staffIsChoose.EmployeeID;
    },
  },
  data() {
    return {
      isShowList: false,
      errorInput: {
        taxCode: "",
        providerCode: "",
        providerName: "",
      },
      alert: {
        title: "",
        type: "",
        message: "",
      },
      title: ["Anh", "Chị", "Bà", "Bạn", "Miss", "Mr", "Mrs", "Ông"],
      selectedTitle: "",
      //Mảng temp chứa những nhóm nhà cung cấp mà 1 nhà cung cấp nằm trong đó, phục vụ cho việc hiển thị dữ liệu lên combobox
      temp: [],
      propertyName: resourceVN.PROPERTY_NAME_OF_PROVIDER,
      text: resourceVN.TEXT,
      providerGroupHeaders: [
        {
          name: resourceVN.PROVIDER_GROUP.providerGroupCode,
          minWidth: "145px",
        },
        {
          name: resourceVN.PROVIDER_GROUP.providerGroupName,
          minWidth: "200px",
        },
      ],
      employeeTableHeaders: [
        {
          name: resourceVN.PROPERTY_NAME.employeeCode,
          minWidth: "200px",
        },
        {
          name: resourceVN.PROPERTY_NAME.employeeName,
          minWidth: "200px",
        },
      ],
    };
  },
};
</script>

<style scoped>
@import url("../../../css/components/popup.css");
@import url("../../../css/components/tabComponent.css");
.m-radio-group {
  padding-left: 13px;
}
.m-radio-group input[type="radio"] {
  width: 20px;
}
.margin-left-100 {
  margin-left: 100px;
}
.m-row-2 {
  align-items: baseline;
}
.lable-tab-item {
  font-family: notosans-simidbold;
}
</style>