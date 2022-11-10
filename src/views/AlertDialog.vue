<template>
  <div class="alert-wrapper" v-if="isShowAlert">
    <div class="alert-dialog">
      <div class="alert-dialog-header">
        <div class="alert-dialog-header-icon">
          <div
            v-if="alert.type == 'confirmDelete' || alert.type == 'danger'"
            class="m-icon-warning m-icon-48"
          ></div>
        </div>
        <div class="alert-dialog-header-text">{{ alert.message }}</div>
      </div>
      <div v-if="alert.type == 'confirmDelete'" class="alert-dialog-body">
        <BaseButton
          btnText="Không"
          addClass="m-btn"
          @click="closeAlert"
        ></BaseButton>
        <div class="alert-dialog-body-right">
          <BaseButton btnText="Có" @click="deleteEmployee"></BaseButton>
        </div>
      </div>

      <div v-if="alert.type == 'danger'" class="alert-dialog-body">
        <div class="alert-dialog-body-left"></div>
        <div class="alert-dialog-body-right">
          <BaseButton btnText="Đồng ý" @click="closeAlert"></BaseButton>
        </div>
      </div>

      <!-- <BaseButton btnText="Hủy" addClass="m-btn" @click="closeAlert"></BaseButton>
                <div class="alert-dialog-body-right">
                    <div class="alert-dialog-button m-mr-8">
                    <BaseButton btnText="Không" addClass="m-btn "></BaseButton>
                    </div>
                    <BaseButton btnText="Có"></BaseButton>

                </div> -->
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
import BaseButton from "../components/base/BaseButton.vue";
export default {
  computed: mapState({
    alert: (state) => state.alert,
    isShowAlert: (state) => state.isShowAlert,
    employee: (state) => state.employee,
    titleNotice: (state) => state.titleNotice,
  }),
  components: {
    BaseButton,
  },
  methods: {
    ...mapActions(["setAlert"]),
    ...mapActions(["toggleAlert"]),
    ...mapActions(["toggleProgressLoading"]),
    ...mapActions(["setTitleNotice"]),
    ...mapActions(["getEmployees"]),
    ...mapActions(["toggleNoticeMessage"]),
    closeAlert() {
      this.toggleAlert();
    },
    deleteEmployee() {
      console.log(this.employee);
      axios
        .delete(
          `https://amis.manhnv.net/api/v1/Employees/${this.employee.EmployeeId}`
        )
        .then(() => {
          const me = this;
          me.toggleAlert();
          me.toggleProgressLoading();
          //Load lại dữ liệu
          me.getEmployees();
          me.setTitleNotice("Xóa thành công");
          setTimeout(() => {
            me.toggleProgressLoading();
            //Bật thông báo sửa thành công
            me.toggleNoticeMessage();
          }, 1000);
          setTimeout(() => {
            me.toggleNoticeMessage();
          }, 5000);
        });
    },
  },
};
</script>
<style scoped>
@import url("../css/components/dialog.css");
</style>