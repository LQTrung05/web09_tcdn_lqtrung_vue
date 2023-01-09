<template>
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
</template>
<script>
import Button from "../../components/base/BaseButton.vue";
import EmployeesTable from "../../views/employee/EmployeesTable.vue";
import Paging from "../../views/employee/PagingEmployeePage.vue";
import FormDetailEmployee from "../../views/employee/FormDetailEmployee.vue";
import Notice from "../../components/base/BaseNotice.vue";
import ProgressLoading from "../../components/base/BaseProgressLoading.vue";

import Alert from "../../views/employee/AlertDialog.vue";
import Gender from "../../enums/gender";
import formMode from "../../enums/formMode";
import resourceVN from "../../resource/resourceVN";
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
    "formMode",
    "alert",
  ]),
  created() {},
  data() {
    return {
      propertyName: resourceVN.PROPERTY_NAME,
      text: resourceVN.TEXT,
      isshow: false,
      alert: {
        title:"",
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
        me.setTitleForm(me.text.insertEmployee);
        me.toggleProgressLoading();
        me.toggleForm();
      }, 1000);
    },

  },
};
</script>
<style scoped>
@import url("../../css/layout/body.css");

</style>