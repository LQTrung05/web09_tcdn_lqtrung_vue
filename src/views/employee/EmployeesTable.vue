<template>
  <div>
    <div class="header-table">
      <!-- Phần xử lý hàng loạt(xóa nhiều) -->
      <div class="m-delete-multiple-area" v-if="listIDEmployeeSelected.length">
        <span class="text-is-selected"
          >Đã chọn
          <span class="number-row-is-selected">
            <b>{{ listIDEmployeeSelected.length }}</b></span
          >
        </span>
        <div class="cancel-selected" @click="clickCancelCheckAll">Bỏ chọn</div>
        <div>
          <Button btnText="Xóa" isSecondary @click="deleteBatch"></Button>
        </div>
      </div>
      <div></div>
      <div class="m-search-area">
        <div class="m-search-area-content">
          <input
            type="text"
            class="m-border-input-search"
            :placeholder="text.searchPlaceHolder"
            v-model="filter.employeeFilter"
            @keyup="searchEmployee"
          />
          <div class="m-icon-16 m-icon-search"></div>
        </div>
        <!-- Nút refresh lại dữ liệu -->
        <div
          class="m-btn-refresh m-icon-24 m-icon-refresh"
          :title="text.refreshToolTip"
          @click="refreshData"
        ></div>
        <!-- Nút xuất excel danh sách nhân viên -->
        <div
          class="m-icon-excel m-icon-24 m-icon-excel"
          :title="text.exportToolTip"
          @click="exportExcel"
        ></div>
      </div>
    </div>
    <div class="wrap-table-secondary">
      <table class="m-table" id="listEmployees">
        <thead>
          <tr>
            <th class="text-align-center">
              <input
                id="choose-all"
                type="checkbox"
                v-model="isCheckedAll"
                @click="clickCheckAll"
              />
            </th>
            <th
              class="text-align-left"
              fieldname="EmployeeCode"
              style="min-width: 130px"
            >
              {{ propertyName.employeeCode }}
            </th>
            <th
              class="text-align-left"
              fieldname="EmployeeName"
              style="min-width: 180px"
            >
              {{ propertyName.employeeName }}
            </th>
            <th
              class="text-align-left"
              fieldname="Gender"
              style="min-width: 110px"
            >
              {{ propertyName.gender }}
            </th>
            <th
              class="text-align-left"
              style="min-width: 130px"
              fieldname="DateOfBirth"
            >
              {{ propertyName.dateOfBirth }}
            </th>
            <th
              class="text-align-left"
              :title="propertyName.identityNumberToolTip"
              style="min-width: 150px"
            >
              {{ propertyName.identityNumber }}
            </th>
            <th class="text-align-left" style="min-width: 150px">
              {{ propertyName.employeePosition }}
            </th>
            <th class="text-align-left" style="min-width: 160px">
              {{ propertyName.departmentName }}
            </th>
            <th class="text-align-left" style="min-width: 150px">
              {{ propertyName.bankAccountNumber }}
            </th>
            <th
              class="text-align-left"
              style="min-width: 150px"
              fieldname="BankName"
            >
              {{ propertyName.bankName }}
            </th>
            <th
              class="text-align-left"
              style="min-width: 220px"
              :title="propertyName.bankBranchNameTooltip"
            >
              {{ propertyName.bankBranchName }}
            </th>
            <th class="text-align-center" style="min-width: 110px">
              {{ text.function }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in employees"
            :key="index"
            :class="{ 'm-checked': item.isChecked }"
            @dblclick="openDetailFormEmployee(item)"
          >
            <td
              class="text-align-center"
              :class="{ 'm-checked': item.isChecked }"
            >
              <input
                type="checkbox"
                class="m-input-checkbox"
                v-model="item.isChecked"
                @change="rowChecked(item.EmployeeID)"
              />
            </td>
            <td class="text-align-left">{{ item.EmployeeCode }}</td>
            <td class="text-align-left">{{ item.EmployeeName }}</td>
            <td class="text-align-left">{{ item.GenderName }}</td>
            <td class="text-align-left">
              {{ formatDateData(item.DateOfBirth) }}
            </td>
            <td class="text-align-left">{{ item.IdentityNumber }}</td>
            <td class="text-align-left">{{ item.PositionName }}</td>
            <td class="text-align-left">{{ item.DepartmentName }}</td>
            <td class="text-align-left">{{ item.BankAccountNumber }}</td>
            <td class="text-align-left">{{ item.BankName }}</td>
            <td class="text-align-left">{{ item.BankBranchName }}</td>
            <td
              class="text-align-center show-contexMenu"
              @dblclick.stop
              :style="{ 'z-index': employees.length - index }"
              :class="{ 'm-checked': item.isChecked }"
            >
              <div class="function-col">
                <div class="function-col__update">
                  <button
                    class="btn-edit-epl"
                    @click="openDetailFormEmployee(item)"
                  >
                    {{ text.update }}
                  </button>
                </div>
                <div
                  class="function-col__menu m-ml-8"
                  :title="text.otherAction"
                >
                  <button>
                    <div class="m-icon-16 m-icon-arrow-down-blue"></div>
                  </button>
                  <div class="child-multi-choices" style="min-width: 120px">
                    <div
                      class="duplication m-chil-dd"
                      @click="duplicateEmployee(item)"
                    >
                      {{ text.duplicate }}
                    </div>
                    <div
                      class="delete-epl m-chil-dd"
                      @click="confirmDeleteEmployee(item)"
                    >
                      {{ text.delete }}
                    </div>
                    <div class="pause m-chil-dd">
                      {{ text.stopUsing }}
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import formMode from "../../enums/formMode";
import resourceVN from "../../resource/resourceVN";
import { mapActions, mapGetters } from "vuex";
import noticeAction from "@/enums/noticeAction";
import Button from '../../components/base/BaseButton.vue'

export default {
  name: "BaseTable",
  components: {
    Button
  },
  created() {
    this.setLastRecord();
    this.toggleProgressLoading();
    this.getEmployees();
    setTimeout(() => {
      this.toggleProgressLoading();
    }, 1500);
  },
  computed: mapGetters([
    "employees",
    "employee",
    "filter",
    "listIDEmployeeSelected",
    "isCheckedAll",
  ]),
  methods: {
    ...mapActions([
      "getEmployees",
      "setDetailEmployee",
      "toggleForm",
      "setTitleForm",
      "setFormMode",
      "toggleAlert",
      "setAlert",
      "setFilter",
      "toggleProgressLoading",
      "getNewEmployeeCode",
      "setLastRecord",
      "setListDeleteEmployee",
      "setCheckAllEmployee",
      "setNoticeAction",
      "exportExcel",
    ]),

    /**
     * Hàm hủy các dòng trong table được chọn
     * Author: LQTrung (9/11/2022)
     */
    clickCancelCheckAll() {
      const me = this;
      me.employees.forEach((item) => {
        item.isChecked = false;
        me.setCheckAllEmployee(false);
        me.setListDeleteEmployee([]);
      });
    },
    /**
     * Kích nút xóa hàng loạt bản ghi
     * Author: LQTrung (9/11/2022)
     */
    deleteBatch() {
      const me = this;
      me.setNoticeAction(noticeAction.deleteBatchEmployee);
      me.alert = {
        title: "Xác nhận xóa?",
        type: "confirmDelete",
        message: "Bạn có thực sự muốn xóa các nhân viên được chọn không?",
      };
      me.setAlert(me.alert);
      me.toggleAlert();
    },
    /**
     * Hàm tìm kiếm nhân viên theo keyword
     * Author: LQTrung (1/11/2022)
     */
    searchEmployee() {
      const me = this;
      me.setFilter({
        pageSize: me.filter.pageSize,
        pageNumber: 1,
        employeeFilter: me.filter.employeeFilter,
      });
      me.getEmployees();
    },
    /**
     * Hàm load lại dữ liệu
     * Author: LQTrung(10/11/2022)
     */
    refreshData() {
      const me = this;
      me.toggleProgressLoading();
      setTimeout(() => {
        me.getEmployees();
        me.toggleProgressLoading();
      }, 1000);
    },
    /**
     * Hàm định dạng dữ liệu ngày tháng về dạng dd/mm/yy
     * @param value Ngày tháng nhập vào
     * @return Trả về dữ liệu ngày tháng đã chuẩn hóa về dạng dd/mm.yyyy
     * Author: LQTrung (5/11/2022)
     */
    formatDateData(value) {
      if (value) {
        value = new Date(value);
        let date = value.getDate();
        date = date < 10 ? `0${date}` : date;
        let month = value.getMonth() + 1;
        month = month < 10 ? `0${month}` : month;
        let year = value.getFullYear();
        value = `${date}/${month}/${year}`;
        return value;
      }
    },
    /**
     * Mở form chi tiết nhân viên
     * @param item nhân viên được chọn
     * Author: LQTrung (5/11/2022)
     */
    openDetailFormEmployee(item) {
      const me = this;
      me.setDetailEmployee(item);
      me.setTitleForm(me.text.detailEmployee);
      me.toggleForm();
      me.setFormMode(formMode.update);
    },
    /**
     * Đưa những nhân viên được check vào trong danh sách sách
     */
    rowChecked(employeeID) {
      const me = this;
      //Nếu danh sách xóa mà đang rỗng, cho listEmployeeID về rỗng
      if (me.listIDEmployeeSelected.length === 0) me.listEmployeeID = [];
      //Bỏ check 1 dòng trong table
      if (me.listIDEmployeeSelected.includes(employeeID)) {
        me.listEmployeeID = me.listIDEmployeeSelected.filter(
          (item) => item != employeeID
        );
        me.setListDeleteEmployee(me.listEmployeeID);
      }
      //Check 1 dòng trong table
      else {
        var index = me.listEmployeeID.length;
        if (index == 0) me.listEmployeeID[index] = employeeID;
        else me.listEmployeeID[index] = employeeID;

        me.setListDeleteEmployee(me.listEmployeeID);
      }
      //Nếu tất cả các dòng được check, thì check all được hiện
      if (me.listIDEmployeeSelected.length == me.employees.length)
        me.setCheckAllEmployee(true);
      else me.setCheckAllEmployee(false);
    },

    /**
     * Chọn checkbox check all trên header table
     */
    clickCheckAll() {
      const me = this;
      if (me.isCheckedAll) {
        me.employees.forEach((item) => {
          item.isChecked = false;
          me.setCheckAllEmployee(false);
          me.setListDeleteEmployee([]);
          me.listEmployeeID = [];
        });
      } else {
        let i = 0;
        me.employees.forEach((item) => {
          item.isChecked = true;
          me.setCheckAllEmployee(true);
          me.listEmployeeID[i] = item.EmployeeID;
          i++;
        });
        me.setListDeleteEmployee(me.listEmployeeID);
      }
    },

    /**
     * Mở form thêm mới nhân viên để nhân bản
     * @param employee nhân viên được nhân bản
     * Author: LQTrung(21/11/2022)
     */
    duplicateEmployee(employee) {
      const me = this;
      me.getNewEmployeeCode();
      me.setDetailEmployee(employee);
      me.setTitleForm(me.text.duplicateEmployee);
      me.toggleForm();
      me.setFormMode(formMode.insert);
    },
    /**
     * Hàm xác nhận xóa nhân viên được chọn
     * @param employee nhân viên muốn xóa
     * Author: LQTrung (5/11/2022)
     */
    confirmDeleteEmployee(employee) {
      const me = this;
      me.setNoticeAction(noticeAction.deleteAEmployee);
      me.alert = {
        title: me.text.confirmDelete,
        type: "confirmDelete",
        message: `Bạn có thực sự muốn xóa nhân viên <${employee.EmployeeCode}> không?`,
      };
      me.setDetailEmployee(employee);
      me.setAlert(me.alert);
      me.toggleAlert();
    },
  },
  data() {
    return {
      alert: {
        type: "",
        message: "",
      },
      propertyName: resourceVN.PROPERTY_NAME,
      text: resourceVN.TEXT,
      listEmployeeID: [],
    };
  },
};
</script>

<style scoped>
@import url("../../css/components/table.css");
/* Css phần xóa nhiều bản ghi */
.m-delete-multiple-area {
  display: flex;
  align-items: center;
}
.text-is-selected,
.cancel-selected {
  margin-right: 16px;
}
.cancel-selected {
  color: #e60000;
}
.cancel-selected:hover {
  cursor: pointer;
  color: #eb3333;
}
.m-icon-refresh{
  opacity: 100%;
  color: #000;
}
.m-icon-refresh:hover{
  opacity: 50%;
}
.m-checked {
  background-color: #f1ffef;
}
</style>