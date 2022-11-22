<template>
  <div class="body">
    <div class="page-content">
      <div class="page-content-header">
        <div class="page-content-title">Nhân viên</div>
        <div class="page-content-insert-btn">
          <Button
            class="btn-add-epl"
            btnText="Thêm mới nhân viên"
            @click="openFormInsert"
          ></Button>
        </div>
      </div>
      <div class="page-content-body">
        <div class="table-content">
          <div class="header-table">
            <div class="btn-delete-all">
              <Button
                class="btn-add-epl"
                id="btn-delete"
                btnDisable="1"
                btnText="Xóa"
              ></Button>
            </div>
            <div class="m-search-area">
              <div class="m-search-area-content">
                <input
                  type="text"
                  class="m-border-input-search"
                  placeholder="Tìm theo mã, tên nhân viên"
                  v-model="filter.employeeFilter"
                  @keyup="searchEmployee"
                />
                <div class="m-icon-16 m-icon-search"></div>
              </div>
              <!-- Nút refresh lại dữ liệu -->
              <div class="m-btn-refresh m-icon-24 m-icon-refresh" title="Load lại toàn bộ dữ liệu" @click="refreshData"></div>
              <!-- Nút xuất excel danh sách nhân viên -->
              <div class="m-icon-excel m-icon-24 m-icon-excel" title="Xuất file excel danh sách nhân viên" @click="exportExcel"></div>
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
    <FormDetailEmployee v-if="isShowForm"/>
    <!-- Phần thông báo thêm hoặc sửa hoặc xóa thành công -->
    <Notice ></Notice>
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
import ProgressLoading from "../../views/ProgressLoading.vue"
import Alert from "../../views/AlertDialog.vue"
import Gender from "../../enums/gender";
import formMode from "../../enums/formMode"
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
    Alert
  },
  computed:mapGetters([
    "titleForm",
    "isShowForm",
    "filter",
    "formMode"
  ]),
  created() {},
  data() {
    return {
      employees: [],
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
      "exportExcel"
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
      me.setDetailEmployee({Gender:(Gender.male)});
      setTimeout(() => {
        me.setTitleForm("Thêm mới nhân viên");
        me.toggleProgressLoading();
        me.toggleForm();
      }, 1000);

    },
    /**
     * Hàm tìm kiếm nhân viên theo keyword
     */
    searchEmployee(){
            const me = this;
            me.setFilter({
                pageSize: me.filter.pageSize,
                pageNumber: 1,
                employeeFilter: me.filter.employeeFilter
            });
            me.getEmployees();
        },
    /**
     * Hàm load lại dữ liệu
     * Author: LQTrung(10/11/2022)
     */
    refreshData(){
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
</style>