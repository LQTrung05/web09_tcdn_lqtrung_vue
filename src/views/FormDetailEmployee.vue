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
            <span class="m-input-checkbox-label">{{propertyName.isCustomer}}</span>
          </label>
          <label class="m-popup-checkbox display-f">
            <input
              type="checkbox"
              class="m-input-checkbox-popup"
              tabindex="2"
            />
            <span class="m-input-checkbox-label">{{propertyName.isProvider}}</span>
          </label>
        </div>
        <div class="popup-close">
          <div class="m-icon-24 m-icon-help" style="margin-right: 8px" :title="text.helpToolTip"></div>
          <div
            class="m-icon-24 m-icon-close m-close-add-popup js-close-form"
            :title="text.close"
            @click="toggleForm"
          ></div>
        </div>
      </div>
      <div class="popup-content">
        <form action="" id="m-form-employee">
          <div class="m-form-content-4-col">
            <div class="m-col-1">
              <div class="m-layout-form-40-60 display-f">
                <div class="m-input-form-40 m-pr-6 m-mb-24">
                  <div class="display-f m-mb-8">
                    <div class="m-input-title-required m-input-title">{{propertyName.employeeCode}}</div>
                    <div class="m-icon-require">&nbsp;*</div>
                  </div>
                  <input
                    type="text"
                    ref="focusMe" 
                    class="m-input-form required"
                    v-model="employee.EmployeeCode"
                    :class="{ 'm-input-form-error': errorInput.employeeCode }"
                    maxlength="25"
                    tabindex="3"
                  />
                  <div class="err-message err-id-employee">
                    {{ errorInput.employeeCode }}
                  </div>
                </div>
                <div class="m-input-form-60 m-mb-24">
                  <div class="display-f m-mb-8">
                    <div class="m-input-title-required m-input-title">{{propertyName.employeeName}}</div>
                    <div class="m-icon-require">&nbsp;*</div>
                  </div>
                  <input
                    type="text"
                    class="m-input-form required"
                    v-model="employee.EmployeeName"
                    :class="{ 'm-input-form-error': errorInput.employeeName }"
                    maxlength="128"
                    id="employeeName"
                    propName="EmployeeName"
                    tabindex="4"
                  />
                  <div class="err-message">{{ errorInput.employeeName }}</div>
                </div>
              </div>
            </div>
            <div class="m-col-2">
              <div class="m-layout-form-40-60 display-f">
                <div class="m-pr-6 m-mb-24">
                  <div class="m-mb-8">
                    <div class="m-input-title">{{propertyName.dateOfBirth}}</div>
                  </div>
                  <input
                    type="date"
                    class="m-input-form"
                    v-model="employee.DateOfBirth"
                    :class="{ 'm-input-form-error': errorInput.dateOfBirth }"
                    id="dateOB"
                    propName="DateOfBirth"
                    tabindex="5"
                  />
                  <div class="err-message">{{ errorInput.dateOfBirth }}</div>
                </div>
                <div class="m-input-form-60 m-mb-24">
                  <div class="m-mb-8">
                    <div class="m-input-title">{{propertyName.gender}}</div>
                  </div>
                  <div class="m-radio-group">
                    <label class="m-con-radio">
                      <input
                        type="radio"
                        class="m-input-radio"
                        name="Gender"
                        v-model="employee.Gender"
                        @change="(e)=>(employee.Gender = parseInt(e.target.value))"
                        value= 0
                        tabindex="6"
                      />
                      <span class="m-radio-label">{{text.male}}</span>
                    </label>
                    <label class="m-con-radio">
                      <input
                        type="radio"
                        class="m-input-radio"
                        name="Gender"
                        @change="(e)=>(employee.Gender = parseInt(e.target.value))"
                        value = 1
                        v-model="employee.Gender"
                        tabindex="6"
                      />
                      <span class="m-radio-label">{{text.female}}</span>
                    </label>
                    <label class="m-con-radio">
                      <input
                        type="radio"
                        class="m-input-radio"
                        name="Gender"
                        @change="(e)=>(employee.Gender = parseInt(e.target.value))"
                        value= 2
                        v-model="employee.Gender"
                        tabindex="6"
                      />
                      <span class="m-radio-label">{{text.other}}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="m-form-conten-2-col">
            <div class="m-col-1">
              <div class="m-input-form-100 m-mb-24">
                <div class="display-f m-mb-8">
                  <div class="m-input-title-required m-input-title">
                    {{propertyName.departmentName}}
                  </div>
                  <div class="m-icon-require">&nbsp;*</div>
                </div>

                <div class="dropdownlist dropdown-department">
                  <input
                    class="input dropdownlist__input required"
                    tabindex="7"
                    readonly="true"
                    v-model="employee.DepartmentName"
                    :class="{ 'm-input-form-error': errorInput.departmentId }"
                    type="text"
                  />
                  <div
                    class="dropdownlist__button btn-department"
                    id="btn-"
                    tabindex="8"
                    @click="toggleList"
                  >
                    <div
                      class="m-icon-arrow-dropdown m-icon-16"
                      style="margin: 0 auto; align-self: center"
                    ></div>
                  </div>
                  <div
                    class="dropdownlist__data top-100 dropdown-department"
                    v-if="isShowList"
                  >
                    <div v-for="(item, index) in departments" :key="index">
                      <div class="data-item" @click="chooseDepartment(item)">
                        {{ item.DepartmentName }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="err-message err-department-not-null">
                  {{ errorInput.departmentId }}
                </div>
              </div>
              <div class="m-input-form-100 m-mb-24">
                <div class="m-mb-8">
                  <div class="m-input-title">
                    {{propertyName.employeePosition}}
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
                <div class="m-input-form-60 m-pr-6 m-mb-24">
                  <div class="m-mb-8">
                    <div class="m-input-title" :title="propertyName.identityNumberToolTip">
                      {{propertyName.identityNumber}}
                    </div>
                  </div>
                  <input
                    type="text"
                    class="m-input-form"
                    name="IdentityNumber"
                    id="identityNumber"
                    v-model="employee.IdentityNumber"
                    maxlength="20"
                    propName="IdentityNumber"
                    tabindex="9"
                  />
                  <div class="err-message"></div>
                </div>
                <div class="m-input-form-40 m-mb-24">
                  <div class="m-mb-8">
                    <div class="m-input-title">
                      {{propertyName.identityDate}}
                    </div>
                  </div>
                  <input
                    type="date"
                    class="m-input-form"
                    name="IdentityDate"
                    id="identityDate"
                    v-model="employee.IdentityDate"
                    :class="{ 'm-input-form-error': errorInput.identityDate }"
                    propName="IdentityDate"
                    tabindex="10"
                  />
                  <div class="err-message">{{ errorInput.identityDate }}</div>
                </div>
              </div>
              <div class="m-input-form-100 m-mb-24">
                <div class="m-mb-8">
                  <div class="m-input-title">
                    {{propertyName.identityPlace}}
                  </div>
                </div>
                <input
                  type="text"
                  class="m-input-form"
                  name="IdentityPlace"
                  id="identityPlace"
                  propName="IdentityPlace"
                  v-model="employee.IdentityPlace"
                  tabindex="12"
                />
                <div class="err-message"></div>
              </div>
            </div>
          </div>
          <div class="m-form-content-1-col display-f">
            <div class="m-input-form-100 m-mb-24">
              <div class="m-mb-8">
                <div class="m-input-title">
                  {{propertyName.address}}
                </div>
              </div>
              <input
                type="text"
                class="m-input-form m-input-form-100"
                name="Address"
                propName="Address"
                v-model="employee.Address"
                id="address"
                tabindex="13"
              />
              <div class="err-message"></div>
            </div>
          </div>

          <div class="m-form-content-3-col m-mb-24">
            <div class="m-input-form-33 m-pr-6">
              <div class="m-mb-8">
                <div class="m-input-title" :title="propertyName.phoneNumberToolTip">
                  {{propertyName.phoneNumber}}
                </div>
              </div>
              <input
                type="text"
                class="m-input-form"
                name="PhoneNumber"
                v-model="employee.PhoneNumber"
                id="phoneNumber"
                propName="PhoneNumber"
                tabindex="14"
              />
              <div class="err-message"></div>
            </div>

            <div class="m-input-form-33 m-pr-6">
              <div class="m-mb-8">
                <div class="m-input-title" :title="propertyName.landPhoneToolTip">
                  {{propertyName.landPhone}}
                </div>
              </div>
              <input
                type="text"
                class="m-input-form"
                name="LandPhone"
                v-model="employee.LandPhone"
                id="landPhone"
                propName="LandPhone"
                tabindex="15"
              />
              <div class="err-message"></div>
            </div>
            <div class="m-input-form-33 m-pr-6">
              <div class="m-mb-8">
                <div class="m-input-title">{{propertyName.email}}</div>
              </div>
              <input
                type="text"
                id="emailEmployee"
                class="m-input-form"
                name="Email"
                v-model="employee.Email"
                :class="{ 'm-input-form-error': errorInput.emailEmployee }"
                propName="Email"
                tabindex="16"
              />
              <div class="err-message">{{ errorInput.emailEmployee }}</div>
            </div>
          </div>

          <div class="m-form-content-3-col m-mb-24">
            <div class="m-input-form-33 m-pr-6">
              <div class="m-mb-8">
                <div class="m-input-title">{{propertyName.bankAccountNumber}}</div>
              </div>
              <input
                type="text"
                class="m-input-form"
                name="BankAccountNumber"
                id="bankAccount"
                v-model="employee.BankAccountNumber"
                propName="BankAccountNumber"
                tabindex="17"
              />
              <div class="err-message"></div>
            </div>
            <div class="m-input-form-33 m-pr-6">
              <div class="m-mb-8">
                <div class="m-input-title">{{propertyName.bankName}}</div>
              </div>
              <input
                type="text"
                class="m-input-form"
                id="bankName"
                v-model="employee.BankName"
                name="BankName"
                propName="BankName"
                tabindex="18"
              />
              <div class="err-message"></div>
            </div>
            <div class="m-input-form-33 m-pr-6">
              <div class="m-mb-8">
                <div class="m-input-title"
                     :title="propertyName.bankBranchNameTooltip" >
                     {{propertyName.bankBranchName}}</div>
              </div>
              <input
                type="text"
                class="m-input-form"
                id="bankBranch"
                v-model="employee.BankBranchName"
                name="BankBranchName"
                propName="BankBranchName"
                tabindex="19"
              />
              <div class="err-message"></div>
            </div>
          </div>

          <div class="m-form-footer">
            <div class="m-form-part-cancel">
              <Button
                :btnText="text.cancel"
                addClass="m-btn"
                @click="toggleForm"
                tabindex="22"
              ></Button>
            </div>
            <div class="m-form-part-submit">
              <div class="m-form-part-save">
                <Button
                  :btnText="text.store"
                  addClass="m-btn"
                  tabindex="21"
                  @click.prevent="save"
                ></Button>
              </div>
              <Button
                :btnText="text.storeAndAdd"
                tabindex="20"
                @click.prevent="saveAndReset"
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
import Button from "../components/base/BaseButton.vue";
import FormMode from "../enums/formMode";
import resourceVN from "../resource/resourceVN"

// const me = this;
export default {
  name: "PopupDetailEmployee",
  components: {
    Button,
  },
  created() {
    const me = this;
    me.getDepartments();
    if(me.formMode == FormMode.insert){
            me.getNewEmployeeCode();
        }
  },
  mounted() {
    //focus vào ô Mã nhân viên
    this.$refs.focusMe.focus()
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
      alert: {
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

    /**
     * Hàm chọn tên đơn vị trong dropdownlist
     * @param {departmentIsChoose} phòng ban được chọn
     * Author: LQTrung (4/11/2022)
     */
    chooseDepartment(departmentIsChoosed) {
      const me = this;
      me.employee.DerpartmentID = departmentIsChoosed.DerpartmentID;
      me.employee.DepartmentName = departmentIsChoosed.DepartmentName;
      me.isShowList = false;
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
        me.employee.DateOfBirth,"Ngày sinh");
      //Validate ngày cấp
      me.errorInput.identityDate = this.validateDateTime(
        me.employee.IdentityDate,"Ngày cấp");
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
      //let isValid = true;

      //Chuyển về chế độ Cất
      if(me.formMode == FormMode.insertAndAdd)
        me.setFormMode(FormMode.insert);
      else if(me.formMode == FormMode.updateAndAdd)
        me.setFormMode(FormMode.update);

      if (isValid) {
        if (me.formMode == FormMode.insert){
          me.employee.CreatedBy = "LQTrung";
          me.insertEmployee(me.employee);
        }
        else if (me.formMode == FormMode.update) {
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
      if (me.formMode == FormMode.update) 
        me.setFormMode(FormMode.updateAndAdd);
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
@import url("../css/components/popup.css");
</style>