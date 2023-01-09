<template>
  <div class="m-popup">
    <div class="m-content-payment-term">
      <div class="popup-header margin-none">
        <div class="popup-title m-mb-12">
          <div class="popup-title-name">{{ text.addPaymentTerm }}</div>
        </div>
        <div class="popup-close">
          <div
            class="m-icon-24 m-icon-help"
            style="margin-
            right: 8px"
            :title="text.helpToolTip"
          ></div>
          <div
            class="m-icon-24 m-icon-close m-close-add-popup js-close-form"
            :title="text.close"
            @click="closePaymentTermForm"
          ></div>
        </div>
      </div>
      <div class="popup-content padding-none">
        <div class="row-1 display-f m-mb-12">
          <div class="col-1 m-mr-8 m-input-width-30">
            <Input
              :inputLabel="text.code"
              :validateType="'required'"
              :errorMess="errorInput.paymentTermCode"
              v-model="paymentTerm.PaymentTermCode"
            />
          </div>
          <div class="col-2 m-input-width-70">
            <Input
              :inputLabel="text.name"
              :validateType="'required'"
              :errorMess="errorInput.paymentTermName"
              v-model="paymentTerm.PaymentTermName"
            />
          </div>
        </div>
        <div class="row-2"></div>
        <div class="row-3 display-f m-mb-12">
          <div class="col-1 m-input-width-50">
            <div class="m-input-title m-mb-4">{{ text.payWithinDays }}</div>
            <div class="content display-f align-items-center">
              <Input
                :inputWidth="'m-input-width-60'"
                class="m-mr-12"
                v-model="paymentTerm.DueTime"
              />
              <span>Ngày</span>
            </div>
          </div>
          <div class="col-2 m-input-width-50">
            <div class="m-input-title m-mb-4">Thời hạn hưởng chiết khấu</div>
            <div class="content display-f align-items-center">
              <Input
                :inputWidth="'m-input-width-60'"
                class="m-mr-12"
                v-model="paymentTerm.DiscountTime"
              />
              <span>Ngày</span>
            </div>
          </div>
        </div>
        <div class="row-4 width-100">
          <div class="m-input-title m-mb-4">Tỉ lệ hưởng chiết khấu</div>
          <div class="display-f align-items-center">
            <Input
              class="m-input-width-30 m-mr-12"
              v-model="paymentTerm.DiscountRate"
            />
            <span>%</span>
          </div>
        </div>
      </div>
      <div class="m-form-footer">
        <div class="m-form-part-cancel">
          <Button
            :btnText="text.cancel"
            :secondaryButton="true"
            :buttonBorder="true"
            :radius4="true"
            addClass="m-btn"
            @click="closePaymentTermForm"
            class="unset-pading"
            tabindex="22"
          ></Button>
        </div>
        <div class="m-form-part-submit">
          <Button
            :btnText="text.store"
            addClass="m-btn"
            tabindex="21"
            :buttonBorder="true"
            :secondaryButton="true"
            @click.prevent="saveAPaymentTerm"
          ></Button>
          <Button
            :btnText="text.storeAndAdd"
            tabindex="20"
            @click.prevent="saveAndReset"
            class="unset-pading"
          ></Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import resourceVN from "../../resource/resourceVN";
import Input from "../../components/base/BaseInput.vue";
import Button from "../../components/base/BaseButton.vue";
import { mapActions } from "vuex";
import FormMode from "../../enums/formMode";

export default {
  components: {
    Input,
    Button,
  },
  computed: mapGetters(["paymentTerm", "paymentTermMode"]),
  methods: {
    ...mapActions([
      "togglePaymentTermForm",
      "setpaymentTermMode",
      "insertPaymentTerm",
      "toggleProgressLoading",
      "setPaymentTerm",
    ]),
    //Đóng form thêm mới điều khoản thanh toán
    closePaymentTermForm() {
      const me = this;
      me.togglePaymentTermForm();
      me.setPaymentTerm({});
    },
    //Hàm validate dữ liệu nhập vào form
    validatePaymentTermForm() {
      const me = this;
      me.errorInput = {
        paymentTermCode: "",
        paymentTermName: "",
      };
      if (!me.paymentTerm.PaymentTermCode)
        me.errorInput.paymentTermCode = "Mã không để trống";
      if (!me.paymentTerm.PaymentTermName)
        me.errorInput.paymentTermName = "Tên không để trống";
      if (me.errorInput.paymentTermCode || me.errorInput.paymentTermName)
        return false;
      //Nếu validate đúng hết thì trả về true để phục vụ quá trình thêm mới
      return true;
    },
    //Thêm mới điều khoản thanh toán
    saveAPaymentTerm() {
      // trước khi lưu thì validate dữ liệu
      const me = this;
      let isValid = me.validatePaymentTermForm();
      //Chuyển về chế độ Cất
      if (me.paymentTermMode == FormMode.insertAndAdd)
        me.setpaymentTermMode(FormMode.insert);

      if (isValid) {
        if (me.paymentTermMode == FormMode.insert) {
          me.paymentTerm.CreatedBy = "LQTrung";
          me.insertPaymentTerm(me.paymentTerm);
        }
      }
    },
    //Thêm mới điều khoản thanh toán và reset form để thêm mới tiếp mà không cần phải đóng form
    saveAndReset() {
      // trước khi lưu thì validate dữ liệu
      const me = this;
      let isValid = me.validatePaymentTermForm();
      //Chuyển về chế độ Cất và Thêm
      if (me.paymentTermMode == FormMode.insert)
        me.setpaymentTermMode(FormMode.insertAndAdd);

      if (isValid) {
        if (me.paymentTermMode == FormMode.insertAndAdd) {
          me.paymentTerm.CreatedBy = "LQTrung";
          me.insertPaymentTerm(me.paymentTerm);
        }
      }
    },
  },
  data() {
    return {
      text: resourceVN.TEXT,
      errorInput: {
        paymentTermCode: "",
        paymentTermName: "",
      },
    };
  },
};
</script>
<style scoped>
@import url("../../css/components/popup.css");
@import url("../../css/components/tabComponent.css");
.m-content-payment-term {
  position: absolute;
  max-width: calc(100% - 64px);
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 2px;
  width: 600px;
  padding: 20px 32px;
}
</style>