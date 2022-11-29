<template>
  <div class="body">
    <div class="page-content">
      <div class="page-content-header">
        <div class="page-content-title">{{ text.employee }}</div>
        <div class="page-content-insert-btn">
          <Button
            class="btn-add-epl"
            :btnText="text.insertEmployee"
            @click="openFormInsert"
          ></Button>
        </div>
      </div>

      <div class="page-content-body">
        <div class="table-content">
          <div class="header-table">
            <div
              class="m-delete-multiple-area"
              v-if="listIDEmployeeSelected.length"
            >
              <span class="text-is-selected"
                >Đã chọn
                <span class="number-row-is-selected">
                  <b>{{ listIDEmployeeSelected.length }}</b></span
                >
              </span>
              <div class="cancel-selected" @click="clickCancelCheckAll">
                Bỏ chọn
              </div>
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
          <!-- Phần bảng danh sách nhân viên -->
          <EmployeesTable />
          <!-- Phần paging -->
          <Paging />
        </div>
      </div>
    </div>
    <!-- Phần progress loading -->
    <ProgressLoading></ProgressLoading>
    <!-- Phần popup form thêm mới nhân viên -->
    <FormDetailEmployee v-if="isShowForm" />
    <!-- Phần thông báo thêm hoặc sửa hoặc xóa thành công -->
    <Notice></Notice>
    <!-- Phần Alert cảnh báo  -->
    <Alert></Alert>
  </div>
</template>
<script>
import Button from "../../components/base/BaseButton.vue";
import EmployeesTable from "../../views/EmployeesTable.vue";
import Paging from "../../views/PagingEmployeePage.vue";
import FormDetailEmployee from "../../views/FormDetailEmployee.vue";
import Notice from "../../components/base/BaseNotice.vue";
import ProgressLoading from "../base/BaseProgressLoading.vue";
import Alert from "../../views/AlertDialog.vue";
import Gender from "../../enums/gender";
import formMode from "../../enums/formMode";
import resourceVN from "../../resource/resourceVN";
import noticeAction from "../../enums/noticeAction"
import { mapActions, mapGetters } from "vuex";

export default {
  name: "TheBody",
  components: {
    EmployeesTable,
    Paging,
    Button,
    FormDetailEmployee,
    Notice,
    ProgressLoading,
    Alert,
  },
  computed: mapGetters([
    "titleForm",
    "employees",
    "isShowForm",
    "filter",
    "formMode",
    "listIDEmployeeSelected",
    "alert",
  ]),
  created() {},
  data() {
    return {
      propertyName: resourceVN.PROPERTY_NAME,
      text: resourceVN.TEXT,
      isshow: false,
      alert: {
        type: "",
        message: "",
      },
    };
  },
  methods: {
    ...mapActions([
      "toggleForm",
      "toggleProgressLoading",
      "setTitleForm",
      "setDetailEmployee",
      "getEmployees",
      "setFilter",
      "setFormMode",
      "getNewEmployeeCode",
      "exportExcel",
      "setCheckAllEmployee",
      "setListDeleteEmployee",
      "setAlert",
      "toggleAlert",
      "setNoticeAction"
    ]),
    /**
     * Kích nút "Thêm mới nhân viên" thì mở form thông tin nhân viên
     * Author: LQTrung (1/11/2022)
     */
    openFormInsert() {
      // Reset lai form roi moi mo ra
      const me = this;
      me.setFormMode(formMode.insert);
      me.toggleProgressLoading();
      me.setDetailEmployee({ Gender: Gender.male });
      setTimeout(() => {
        me.setTitleForm("Thêm mới nhân viên");
        me.toggleProgressLoading();
        me.toggleForm();
      }, 1000);
    },

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
  },
};
</script>
<style scoped>
@import url("../../css/layout/body.css");
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
</style>