<template>
  <div class="alert-wrapper" v-if="isShowAlert">
    <div class="alert-dialog">
      <div class="alert-title">
        <div class="name-title">{{ alert.title }}</div>
        <div
          class="icon-close-alert icon-closs m-icon-close-notice m-icon-16"
          @click="closeAlert"
        ></div>
      </div>
      <div class="alert-dialog-header">
        <div class="alert-dialog-header-text">{{ alert.message }}</div>
      </div>

      <div v-if="alert.type == 'confirmDelete'" class="alert-dialog-body">
        <BaseButton
          :btnText="text.no"
          :secondaryButton = "true"
          addClass="m-btn"
          @click="closeAlert"
        ></BaseButton>
        <div class="alert-dialog-body-right">
          <BaseButton
            :btnText="text.yes"
            @click="chooseHowToDelete"
          ></BaseButton>
        </div>
      </div>

      <div v-if="alert.type == 'danger'" class="alert-dialog-body">
        <div class="alert-dialog-body-left"></div>
        <div class="alert-dialog-body-right">
          <BaseButton :btnText="text.agree" @click="closeAlert"></BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import BaseButton from "../../components/base/BaseButton.vue";
import resourceVN from "../../resource/resourceVN";
// import NoticeAction from "../../enums/noticeAction";
export default {
  computed: mapGetters(["alert", "isShowAlert", "noticeAction"]),
  components: {
    BaseButton,
  },
  emits:["chooseHowToDelete"],
  methods: {
    chooseHowToDelete(){
      this.$emit("chooseHowToDelete");
    },
    ...mapActions(["toggleAlert", "deleteEmployee", "deleteBatchEmployee"]),

    /**
     * Hàm chọn xóa 1 nhân viên hay xóa nhiều nhân viên
     * Athor: LQTrung (9/11/2022)
     */
    // chooseHowToDelete() {
    //   const me = this;
    //   if (me.noticeAction == NoticeAction.deleteAEmployee) me.deleteEmployee();
    //   else if (me.noticeAction == NoticeAction.deleteBatchEmployee)
    //     me.deleteBatchEmployee();
    // },
    //Hàm đóng cửa sổ cảnh báo
    //Athor: LQTrung (1/11/2022)
    closeAlert() {
      this.toggleAlert();
    },
  },
  data() {
    return {
      text: resourceVN.TEXT,
    };
  },
};
</script>
<style scoped>
@import url("../../css/components/dialog.css");

</style>