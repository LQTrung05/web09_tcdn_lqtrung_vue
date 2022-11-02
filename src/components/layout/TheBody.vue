<template>
  <div class="body">
    <div class="page-content">
      <div class="page-content-header">
        <div class="page-content-title">Nhân viên</div>
        <div class="page-content-insert-btn">
          <!-- <button class="m-button btn-add-epl">Thêm mới nhân viên</button> -->
          <Button
            class="btn-add-epl"
            btnText="Thêm mới nhân viên"
            @click="openFormInsertEmployee"
          ></Button>
        </div>
      </div>
      <div class="page-content-body">
        <div class="table-content">
          <div class="header-table">
            <div class="btn-delete-all">
              <!-- <button class="m-button" id="btn-delete" disabled="">Xóa</button> -->
              <Button
                class="btn-add-epl"
                id="btn-delete"
                btnDisable="true"
                btnText="Xóa"
              ></Button>
            </div>
            <div class="m-search-area">
              <div class="m-search-area-content">
                <input
                  type="text"
                  class="m-border-input-search"
                  placeholder="Tìm theo mã, tên nhân viên"
                />
                <div class="m-icon-16 m-icon-search"></div>
              </div>
              <div class="m-btn-refresh m-icon-24 m-icon-refresh"></div>
            </div>
          </div>
          <!-- Phần bảng danh sách nhân viên -->
          <EmployeesTable apiUrl="https://amis.manhnv.net/api/v1/Employees" />
          <!-- Phần paging -->
          <Paging />
        </div>
      </div>
    </div>
    <!-- Phần popup form thêm mới nhân viên -->
    <FormDetailEmployee :isShow="isShowForm" @showFormEmployee ="showDetailEmployee"  />
  </div>
</template>
<script>
import Button from "../../components/base/BaseButton.vue";
import EmployeesTable from "../base/BaseTable.vue";
import Paging from "../../views/PagingEmployeePage.vue";
import FormDetailEmployee from "../../views/FormDetailEmployee.vue";

export default {
  name: "TheBody",
  components: {
    EmployeesTable,
    Paging,
    Button,
    FormDetailEmployee,
  },
  props: [],
  created() {
    fetch("https://amis.manhnv.net/api/v1/Employees")
      .then((res) => res.json())
      .then((res) => {
        this.employees = res;
      });
  },
  data() {
    return {
      employees: [],
      isShowForm: false,
    };
  },
  methods: {
    /**
     * Kích nút "Thêm mới nhân viên" thì mở form thông tin nhân viên
     * Author: LQTrung (1/11/2022)
     */
    openFormInsertEmployee() {
      this.showDetailEmployee(true);
    },

    /**
     * Hàm hiển thị form thông tin nhân viên theo dạng popup
     * Author: LQTrung (1/11/2022)
     */
    showDetailEmployee(isShow) {
      this.isShowForm = isShow;
    },
  },
};
</script>
<style scoped>
@import url("../../css/layout/body.css");
</style>