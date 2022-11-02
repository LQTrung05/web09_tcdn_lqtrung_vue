<template>
  <div class="m-popup" :class="{displayBlock:isShow }">
    <div class="m-popup-content">
      <div class="popup-header">
        <div class="popup-title">
          <div class="popup-title-name"></div>
          <label class="m-popup-checkbox display-f">
            <input
              type="checkbox"
              class="m-input-checkbox-popup"
              tabindex="1"
            />
            <span class="m-input-checkbox-label">Là khách hàng</span>
          </label>
          <label class="m-popup-checkbox display-f">
            <input
              type="checkbox"
              class="m-input-checkbox-popup"
              tabindex="2"
            />
            <span class="m-input-checkbox-label">Là nhà cung cấp</span>
          </label>
        </div>
        <div class="popup-close">
          <div class="m-icon-24 m-icon-help" style="margin-right: 8px"></div>
          <div
            class="m-icon-24 m-icon-close m-close-add-popup js-close-form"
            title="Đóng (ESC)"
            @click="closeFormEmployee"
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
                    <div class="m-input-title-required m-input-title">Mã</div>
                    <div class="m-icon-require">&nbsp;*</div>
                  </div>
                  <input
                    type="text"
                    class="m-input-form required"
                    name="EmployeeCode"
                    maxlength="25"
                    propName="EmployeeCode"
                    id="employeeCode"
                    tabindex="3"
                  />
                  <div class="err-message err-id-employee"></div>
                </div>
                <div class="m-input-form-60 m-mb-24">
                  <div class="display-f m-mb-8">
                    <div class="m-input-title-required m-input-title">Tên</div>
                    <div class="m-icon-require">&nbsp;*</div>
                  </div>
                  <input
                    type="text"
                    class="m-input-form required"
                    name="EmployeeName"
                    maxlength="128"
                    id="employeeName"
                    propName="EmployeeName"
                    tabindex="4"
                  />
                  <div class="err-message"></div>
                </div>
              </div>
            </div>
            <div class="m-col-2">
              <div class="m-layout-form-40-60 display-f">
                <div class="m-pr-6 m-mb-24">
                  <div class="m-mb-8">
                    <div class="m-input-title">Ngày sinh</div>
                  </div>
                  <input
                    type="date"
                    class="m-input-form"
                    name="DateOfBirth"
                    id="dateOB"
                    propName="DateOfBirth"
                    tabindex="5"
                  />
                  <div class="err-message">Không để trống</div>
                </div>
                <div class="m-input-form-60 m-mb-24">
                  <div class="m-mb-8">
                    <div class="m-input-title">Giới tính</div>
                  </div>
                  <div class="m-radio-group">
                    <label class="m-con-radio">
                      <input
                        type="radio"
                        class="m-input-radio"
                        value="1"
                        name="Gender"
                        checked
                        id="rdMale"
                        tabindex="6"
                      />
                      <span class="m-radio-label">Nam</span>
                    </label>
                    <label class="m-con-radio">
                      <input
                        type="radio"
                        class="m-input-radio"
                        value="0"
                        id="rdFemale"
                        name="Gender"
                        tabindex="6"
                      />
                      <span class="m-radio-label">Nữ</span>
                    </label>
                    <label class="m-con-radio">
                      <input
                        type="radio"
                        class="m-input-radio"
                        value="0"
                        name="Gender"
                        id="rdOther"
                        tabindex="6"
                      />
                      <span class="m-radio-label">Khác</span>
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
                  <div class="m-input-title-required m-input-title">Đơn vị</div>
                  <div class="m-icon-require">&nbsp;*</div>
                </div>

                <div class="dropdownlist dropdown-department">
                  <input
                    type="hidden"
                    name="DepartmentId"
                    id="departmentID"
                    propName="DepartmentId"
                  />
                  <input
                    class="input dropdownlist__input required"
                    name="DepartmentName"
                    tabindex="7"
                    readonly="true"
                    id="departmentName"
                    propName="DepartmentName"
                    type="text"
                  />

                  <div
                    class="dropdownlist__button btn-department"
                    id="btn-"
                    tabindex="8"
                  >
                    <div
                      class="m-icon-arrow-dropdown m-icon-16"
                      style="margin: 0 auto; align-self: center"
                    ></div>
                  </div>
                  <div class="dropdownlist__data top-100 dropdown-department">
                    <div class="m-combo-menu-content">
                      <table class="m-menu-table">
                        <tbody class="m-menu-items m-departments-list"></tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="err-message err-department-not-null"></div>
              </div>
              <div class="m-input-form-100 m-mb-24">
                <div class="m-mb-8">
                  <div class="m-input-title">Chức danh</div>
                </div>
                <input
                  type="text"
                  class="m-input-form"
                  name="EmployeePosition"
                  id="position"
                  maxlength="128"
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
                    <div class="m-input-title" title="Số chứng minh nhân dân">
                      Số CMND
                    </div>
                  </div>
                  <input
                    type="text"
                    class="m-input-form"
                    name="IdentityNumber"
                    id="identityNumber"
                    maxlength="20"
                    propName="IdentityNumber"
                    tabindex="9"
                  />
                  <div class="err-message"></div>
                </div>
                <div class="m-input-form-40 m-mb-24">
                  <div class="m-mb-8">
                    <div class="m-input-title">Ngày cấp</div>
                  </div>
                  <input
                    type="date"
                    class="m-input-form"
                    name="IdentityDate"
                    id="identityDate"
                    propName="IdentityDate"
                    tabindex="10"
                  />
                  <div class="err-message"></div>
                </div>
              </div>
              <div class="m-input-form-100 m-mb-24">
                <div class="m-mb-8">
                  <div class="m-input-title">Nơi cấp</div>
                </div>
                <input
                  type="text"
                  class="m-input-form"
                  name="IdentityPlace"
                  id="identityPlace"
                  propName="IdentityPlace"
                  tabindex="12"
                />
                <div class="err-message">Không để trống</div>
              </div>
            </div>
          </div>
          <div class="m-form-content-1-col display-f">
            <div class="m-input-form-100 m-mb-24">
              <div class="m-mb-8">
                <div class="m-input-title">Địa chỉ</div>
              </div>
              <input
                type="text"
                class="m-input-form m-input-form-100"
                name="Address"
                propName="Address"
                id="address"
                tabindex="13"
              />
              <div class="err-message">Không để trống</div>
            </div>
          </div>

          <div class="m-form-content-3-col m-mb-24">
            <div class="m-input-form-33 m-pr-6">
              <div class="m-mb-8">
                <div class="m-input-title" title="Điện thoại di động">
                  ĐT di động
                </div>
              </div>
              <input
                type="text"
                class="m-input-form"
                name="TelephoneNumber"
                id="telephoneNumber"
                propName="TelephoneNumber"
                tabindex="14"
              />
              <div class="err-message">Không để trống</div>
            </div>

            <div class="m-input-form-33 m-pr-6">
              <div class="m-mb-8">
                <div class="m-input-title" title="Điện thoại cố định">
                  ĐT cố định
                </div>
              </div>
              <input
                type="text"
                class="m-input-form"
                name="PhoneNumber"
                id="phoneNumber"
                propName="PhoneNumber"
                tabindex="15"
              />
              <div class="err-message">Không để trống</div>
            </div>
            <div class="m-input-form-33 m-pr-6">
              <div class="m-mb-8">
                <div class="m-input-title">Email</div>
              </div>
              <input
                type="text"
                id="emailEmployee"
                class="m-input-form"
                name="Email"
                propName="Email"
                tabindex="16"
              />
              <div class="err-message"></div>
            </div>
          </div>

          <div class="m-form-content-3-col m-mb-24">
            <div class="m-input-form-33 m-pr-6">
              <div class="m-mb-8">
                <div class="m-input-title">Tài khoản ngân hàng</div>
              </div>
              <input
                type="text"
                class="m-input-form"
                name="BankAccountNumber"
                id="bankAccount"
                propName="BankAccountNumber"
                tabindex="17"
              />
              <div class="err-message"></div>
            </div>
            <div class="m-input-form-33 m-pr-6">
              <div class="m-mb-8">
                <div class="m-input-title">Tên ngân hàng</div>
              </div>
              <input
                type="text"
                class="m-input-form"
                id="bankName"
                name="BankName"
                propName="BankName"
                tabindex="18"
              />
              <div class="err-message">Không để trống</div>
            </div>
            <div class="m-input-form-33 m-pr-6">
              <div class="m-mb-8">
                <div class="m-input-title">Chi nhánh</div>
              </div>
              <input
                type="text"
                class="m-input-form"
                id="bankBranch"
                name="BankBranchName"
                propName="BankBranchName"
                tabindex="19"
              />
              <div class="err-message">Không để trống</div>
            </div>
          </div>

          <div class="m-form-footer">
            <div class="m-form-part-cancel">
              <Button btnText="Hủy" addClass="m-btn" @click.prevent="closeFormEmployee" tabindex="22"></Button>
            </div>
            <div class="m-form-part-submit">
              <Button btnText="Cất" addClass="m-btn" tabindex="21"></Button>

              <Button btnText="Cất và thêm" tabindex="20"></Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../components/base/BaseButton.vue";
export default {
  name: "PopupDetailEmployee",
  props:['isShow'],
  components: {
    Button
  },
  data() {
    return {
      isClose:false
    }
  },
  methods: {
    /**
     * Hàm đóng form chi tiết nhân viên
     * Author: LQTrung (1/11/2022)
     */
    closeFormEmployee() {
       this.$emit("showFormEmployee",false);
    },
  },
};
</script>

<style scoped>
@import url("../css/components/popup.css");
</style>