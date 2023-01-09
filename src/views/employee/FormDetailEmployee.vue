<template>
  <div class="m-popup">
    <div class="m-popup-content">
      <div class="popup-header">
        <div class="popup-title">
          <div class="popup-title-name">{{ titleForm }}</div>
          <label class="m-popup-checkbox display-f">
            <input
              type="checkbox"
              class="m-input-checkbox-popup"
              tabindex="1"
              value="1"
            />
            <span class="m-input-checkbox-label">{{
              propertyName.isCustomer
            }}</span>
          </label>
          <label class="m-popup-checkbox display-f">
            <input
              type="checkbox"
              class="m-input-checkbox-popup"
              tabindex="2"
            />
            <span class="m-input-checkbox-label">{{
              propertyName.isProvider
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
            @click="toggleForm"
          ></div>
        </div>
      </div>
      <div class="popup-content">
        <form action="" id="m-form-employee">
          <div class="m-form-content-4-col display-f">
            <div class="m-col-1">
              <div class="m-layout-form-40-60 display-f">
                <Input
                  ref="focusMe"
                  class="m-pr-6 m-mb-24"
                  :inputLabel="propertyName.employeeCode"
                  :inputWidth="'m-input-width-40'"
                  :validateType="'required'"
                  v-model="employee.EmployeeCode"
                  :errorMess="errorInput.employeeCode"
                  :tabIndex="3"
                />

                <Input
                  class="m-mb-24"
                  :inputLabel="propertyName.employeeName"
                  :inputWidth="'m-input-width-60'"
                  :validateType="'required'"
                  v-model="employee.EmployeeName"
                  :errorMess="errorInput.employeeName"
                  :tabIndex="4"
                />
              </div>
            </div>
            <div class="m-col-2">
              <div class="m-layout-form-40-60 display-f">
                <Input
                  :inputLabel="propertyName.dateOfBirth"
                  class="m-pr-6 m-mb-24"
                  :inputType="'date'"
                  :inputWidth="'m-input-width-40'"
                  v-model="employee.DateOfBirth"
                  :errorMess="errorInput.dateOfBirth"
                  :tabIndex="5"
                />
                <div class="m-input-width-60 m-mb-24">
                  <div class="m-mb-8">
                    <div class="m-input-title">{{ propertyName.gender }}</div>
                  </div>
                  <div class="m-radio-group">
                    <label class="m-con-radio">
                      <input
                        type="radio"
                        class="m-input-radio"
                        name="Gender"
                        v-model="employee.Gender"
                        @change="
                          (func) =>
                            (employee.Gender = parseInt(func.target.value))
                        "
                        value="0"
                        tabindex="6"
                      />
                      <span class="m-radio-label">{{ text.male }}</span>
                    </label>
                    <label class="m-con-radio">
                      <input
                        type="radio"
                        class="m-input-radio"
                        name="Gender"
                        @change="
                          (func) =>
                            (employee.Gender = parseInt(func.target.value))
                        "
                        value="1"
                        v-model="employee.Gender"
                        tabindex="6"
                      />
                      <span class="m-radio-label">{{ text.female }}</span>
                    </label>
                    <label class="m-con-radio">
                      <input
                        type="radio"
                        class="m-input-radio"
                        name="Gender"
                        @change="
                          (func) =>
                            (employee.Gender = parseInt(func.target.value))
                        "
                        value="2"
                        v-model="employee.Gender"
                        tabindex="6"
                      />
                      <span class="m-radio-label">{{ text.other }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="m-form-conten-2-col">
            <div class="m-col-1">
              <div class="m-input-width-100 m-mb-24">
                <!-- method map() sẽ tạo ra 1 mảng mới từ mảng departments, và mảng này chỉ có danh sách các departmentName -->
                <ComboboxTable
                  :permitAdd="'false'"
                  :width100="true"
                  :headers="departmentTableHeaders"
                  :dataList="
                    departments
                  "
                  :dataColumnList="getDataColumnList"
                  :errorMess="errorInput.departmentId"
                  :lableValue="propertyName.departmentName"
                  :marginBottom="true"
                  :widthValue100="true"
                  v-model="employee.DepartmentName"
                  :isShowList="isShowList"
                  :topValue="'2%'"
                  @chooseItem="chooseDepartment"
                >
                </ComboboxTable>
              </div>
              <div class="m-input-width-100 m-mb-24">
                <div class="m-mb-8">
                  <div class="m-input-title m-mb-4">
                    {{ propertyName.employeePosition }}
                  </div>
                </div>
                <input
                  type="text"
                  class="m-input-form"
                  name="EmployeePosition"
                  id="position"
                  maxlength="128"
                  v-model="employee.PositionName"
                  propName="EmployeePosition"
                  tabindex="11"
                />
                <div class="err-message"></div>
              </div>
            </div>
            <div class="m-col-2">
              <div class="m-layout-form-40-60 display-f">
                <Input
                  class="m-pr-6 m-mb-24"
                  :inputLabel="propertyName.identityNumber"
                  :inputWidth="'m-input-width-60'"
                  v-model="employee.IdentityNumber"
                  :title="propertyName.identityNumberToolTip"
                  :tabIndex="9"
                />
                <Input
                  :inputLabel="propertyName.identityDate"
                  class="m-mb-24"
                  :inputType="'date'"
                  :inputWidth="'m-input-width-40'"
                  v-model="employee.IdentityDate"
                  :errorMess="errorInput.identityDate"
                  :tabIndex="10"
                />
              </div>
              <Input
                :inputLabel="propertyName.identityPlace"
                class="m-mb-24"
                :inputType="'text'"
                :inputWidth="'m-input-width-100'"
                v-model="employee.IdentityPlace"
                :tabIndex="12"
              />
            </div>
          </div>
          <div class="m-form-content-1-col display-f">
            <Input
              :inputLabel="propertyName.address"
              class="m-mb-24"
              :inputType="'text'"
              :inputWidth="'m-input-width-100'"
              v-model="employee.Address"
              :tabIndex="13"
            />
          </div>

          <div class="m-form-content-3-col m-mb-24">
            <Input
              :inputLabel="propertyName.phoneNumber"
              class="m-pr-6"
              :inputType="'text'"
              :inputWidth="'m-input-form-33'"
              v-model="employee.PhoneNumber"
              :tabIndex="14"
              :title="propertyName.phoneNumberToolTip"
            />

            <Input
              :inputLabel="propertyName.landPhone"
              class="m-pr-6"
              :inputType="'text'"
              :inputWidth="'m-input-form-33'"
              v-model="employee.LandPhone"
              :tabIndex="15"
              :title="propertyName.landPhoneToolTip"
            />

            <Input
              :inputLabel="propertyName.email"
              class="m-pr-6"
              :inputType="'text'"
              :inputWidth="'m-input-form-33'"
              v-model="employee.Email"
              :errorMess="errorInput.emailEmployee"
              :tabIndex="16"
            />
          </div>

          <div class="m-form-content-3-col m-mb-24">
            <Input
              :inputLabel="propertyName.bankAccountNumber"
              class="m-pr-6"
              :inputType="'text'"
              :inputWidth="'m-input-form-33'"
              v-model="employee.BankAccountNumber"
              :tabIndex="17"
            />
            <Input
              :inputLabel="propertyName.bankName"
              class="m-pr-6"
              :inputType="'text'"
              :inputWidth="'m-input-form-33'"
              v-model="employee.BankName"
              :tabIndex="18"
            />
            <Input
              :inputLabel="propertyName.bankBranchName"
              class="m-pr-6"
              :inputType="'text'"
              :inputWidth="'m-input-form-33'"
              v-model="employee.BankBranchName"
              :title="propertyName.bankBranchNameTooltip"
              :tabIndex="19"
            />
          </div>

          <div class="m-form-footer">
            <div class="m-form-part-cancel">
              <Button
                :btnText="text.cancel"
                :secondaryButton="true"
                :buttonBorder="true"
                :radius4="true"
                addClass="m-btn"
                class="unset-pading"
                @click="toggleForm"
                tabindex="22"
              ></Button>
            </div>
            <div class="m-form-part-submit">
              <div class="m-form-part-save">
                <Button
                  :btnText="text.store"
                  :buttonBorder="true"
                  :secondaryButton="true"
                  addClass="m-btn"
                  tabindex="21"
                  @click.prevent="save"
                ></Button>
              </div>
              <Button
                :btnText="text.storeAndAdd"
                tabindex="20"
                @click.prevent="saveAndReset"
                class="unset-pading"
              ></Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Button from "../../components/base/BaseButton.vue";
import Input from "../../components/base/BaseInput.vue";
import ComboboxTable from "../../components/base/BaseComboboxTable.vue";
import FormMode from "../../enums/formMode";
import resourceVN from "../../resource/resourceVN";

// const me = this;
export default {
  name: "PopupDetailEmployee",
  components: {
    Button,
    Input,
    ComboboxTable,
  },
  created() {
    const me = this;
    me.getDepartments();
    if (me.formMode == FormMode.insert) {
      me.getNewEmployeeCode();
    }
  },
  mounted() {
    //focus vào ô Mã nhân viên
    // this.$refs.focusMe.focus();
    this.$refs.focusMe.$el.querySelector("input").focus();
  },
  data() {
    return {
      isShowList: false,
      errorInput: {
        employeeCode: "",
        employeeName: "",
        departmentId: "",
        dateOfBirth: "",
        emailEmployee: "",
        identityDate: "",
      },
      department: {
        departmentId: "",
        departmentName: "",
      },
      departmentTableHeaders:[
        {
          name: "Tên phòng ban"
        },
      ],
      alert: {
        title: "",
        type: "",
        message: "",
      },
      propertyName: resourceVN.PROPERTY_NAME,
      text: resourceVN.TEXT,
    };
  },
  computed: mapGetters([
    "isShowForm",
    "departments",
    "titleForm",
    "employee",
    "formMode",
    "alert",
    "newEmployeeCode",
  ]),
  methods: {
    ...mapActions([
      "toggleForm",
      "toggleProgressLoading",
      "toggleNoticeMessage",
      "toggleAlert",
      "getEmployees",
      "getDepartments",
      "setTitleNotice",
      "setDetailEmployee",
      "setFormMode",
      "setAlert",
      "insertEmployee",
      "updateEmployee",
      "getNewEmployeeCode",
    ]),

    /**
     * Hàm đóng, mở danh sách đơn vị
     * Author: LQTrung (1/11/2022)
     */
    toggleList() {
      this.isShowList = !this.isShowList;
    },

    //Hàm hiển thị tiêu đề trên data list
    getDataColumnList(departmentIsChoose) {
      var arr = [departmentIsChoose.DepartmentName]
      return arr;
    },
    /**
     * Hàm chọn tên đơn vị trong dropdownlist
     * @param {departmentIsChoose} phòng ban được chọn
     * Author: LQTrung (4/11/2022)
     */
    chooseDepartment(departmentIsChoosed) {
      const me = this;
      console.log(departmentIsChoosed);
      me.employee.DepartmentName = departmentIsChoosed.DepartmentName;
      for (const department of me.departments) {
        if (department.DepartmentName === departmentIsChoosed.DepartmentName)
          me.employee.DerpartmentID = department.DerpartmentID;
      }
    },

    /**
     * Hàm validate mã nhân viên
     * Author: LQTrung (4/11/2022)
     */
    validateEmployeeCode() {
      const me = this;
      //Validate mã nhân viên
      let regex = /(\d+)$/;
      if (!me.employee.EmployeeCode)
        me.errorInput.employeeCode = "Mã không để trống";
      else if (!regex.exec(me.employee.EmployeeCode))
        me.errorInput.employeeCode = "Mã phải kết thúc là số";
    },

    /**
     * Hàm validate các trường kiểu date
     * @param: value
     * Author: LQTrung (4/11/2022)
     */
    validateDateTime(value, titleInput) {
      let dateTime = new Date(value);
      let errorMessage = "";
      if (dateTime > new Date()) {
        errorMessage = titleInput + " không lớn hơn ngày hiện tại";
      }
      return errorMessage;
    },
    /**
     * Hàm validate email đúng định dạng
     * Author: LQTrung (4/11/2022)
     */
    validateEmail(value) {
      /* eslint-disable no-useless-escape */
      let errorMessage = "";
      let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!regexEmail.exec(value)) errorMessage = "Email sai định dạng";
      if (!value) errorMessage = "";
      return errorMessage;
    },

    /**
     * Hàm validate dữ liệu nhâp vào form
     * Author: LQTrung (4/11/2022)
     */
    validateForm() {
      const me = this;
      me.errorInput = {
        employeeCode: "",
        employeeName: "",
        departmentId: "",
        dateOfBirth: "",
        emailEmployee: "",
        identityDate: "",
      };
      this.validateEmployeeCode();

      //Validate tên nhân viên
      if (!me.employee.EmployeeName) {
        me.errorInput.employeeName = "Tên không để trống";
      }
      //Validate phòng ban
      if (!me.employee.DerpartmentID) {
        me.errorInput.departmentId = "Đơn vị không để trống";
      }
      //Validate ngày sinh
      me.errorInput.dateOfBirth = this.validateDateTime(
        me.employee.DateOfBirth,
        "Ngày sinh"
      );
      //Validate ngày cấp
      me.errorInput.identityDate = this.validateDateTime(
        me.employee.IdentityDate,
        "Ngày cấp"
      );
      //Validate Email phải đúng định dạng
      me.errorInput.emailEmployee = this.validateEmail(me.employee.Email);
      if (
        me.errorInput.employeeCode ||
        me.errorInput.employeeName ||
        me.errorInput.departmentId ||
        me.errorInput.dateOfBirth ||
        me.errorInput.identityDate ||
        me.errorInput.emailEmployee
      )
        return false;
      //Nếu validate đúng hết thì trả về true để phục vụ quá trình thêm mới
      return true;
    },

    /**
     * Hàm kích nút "Cất" để thêm mới hoặc sửa và đóng form sau khi xong
     * Author: LQTrung(8/11/2022)
     */
    save() {
      // trước khi lưu thì validate dữ liệu
      const me = this;
      let isValid = me.validateForm();

      //Chuyển về chế độ Cất
      if (me.formMode == FormMode.insertAndAdd) me.setFormMode(FormMode.insert);
      else if (me.formMode == FormMode.updateAndAdd)
        me.setFormMode(FormMode.update);

      if (isValid) {
        if (me.formMode == FormMode.insert) {
          me.employee.CreatedBy = "LQTrung";
          me.insertEmployee(me.employee);
        } else if (me.formMode == FormMode.update) {
          me.employee.ModifiedBy = "LQTrung";
          me.updateEmployee(me.employee);
        }
      }
    },

    /**
     * Hàm kích nút "Cất và thêm" để thêm mới hoặc sửa và reset form để tiếp tục thêm mới
     * Author: LQTrung(8/11/2022)
     */
    saveAndReset() {
      const me = this;
      let isValid = me.validateForm();
      //Chuyển về chết độ Sửa và reset lại form để thêm mới
      if (me.formMode == FormMode.update) me.setFormMode(FormMode.updateAndAdd);
      else me.setFormMode(FormMode.insertAndAdd);

      if (isValid) {
        if (me.formMode == FormMode.insertAndAdd) {
          me.employee.CreatedBy = "LQTrung";
          me.insertEmployee(me.employee);
        } else if (me.formMode == FormMode.updateAndAdd) {
          me.employee.ModifiedBy = "LQTrung";
          me.updateEmployee(me.employee);
        }
      }
    },
  },
};
</script>

<style scoped>
@import url("../../css/components/popup.css");
</style>