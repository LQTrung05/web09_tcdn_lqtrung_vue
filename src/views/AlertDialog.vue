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
import { mapGetters, mapActions } from "vuex";
import BaseButton from "../components/base/BaseButton.vue";
export default {
  computed: mapGetters([
    "alert",
    "isShowAlert",
  ]),
  components: {
    BaseButton,
  },
  methods: {
    ...mapActions([   
        "toggleAlert",
        "deleteEmployee"
    ]),
    //Hàm đóng cửa sổ cảnh báo
    //Athor: LQTrung (1/11/2022)
    closeAlert() {
      this.toggleAlert();
    },
    
  },
};
</script>
<style scoped>
@import url("../css/components/dialog.css");
</style>