<template>
  <div
    class="padding-right-left display-f"
    :class="{
      'button-wrap': buttonBorderWrap === true,
      'border-radius-30': radius30 === true,
      'border-radius-4': radius4 === true,
    }"
    style="position: relative"
  >
    <button
      class="m-button ms-button-primary"
      :class="{
        'ms-button-secondary': secondaryButton === true,
        'border-radius-30': radius30 === true,
        'border-radius-4': radius4 === true,
        'unset-padding': withIcon === true,
        'button-border': buttonBorder === true,
      }"
      :style="{ height: buttonHeight }"
      :disabled="btnDisable"
      type="button"

    >
      {{ btnText }}
    </button>
    <div
      class="m-icon-arrow-dropdown m-icon-16"
      style="margin-left: 4px; align-self: center"
      v-if="withIcon"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    addClass: {
      type: String,
    },
    radius30: {
      type: Boolean,
      default: false,
    },
    radius4: {
      type: Boolean,
      default: false,
    },
    secondaryButton: {
      type: Boolean,
      default: false,
    },
    btnText: {
      type: String,
    },
    btnDisable: {
      type: Boolean,
      default: false,
    },
    buttonHeight: {
      type: String,
      default: "36px",
    },
    withIcon: {
      type: Boolean,
      default: false,
    },
    buttonBorder: {
      type: Boolean,
      default: false,
    },
    buttonBorderWrap: {},
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
@import url("../../css/components/button.css");
.padding-right-left {
  padding: 0 16px;
}
.padding-right-left .display-f {
  height: 34px;
  box-sizing: border-box;
}
.button-wrap {
  border: 1px solid #3b3c3f;
}
.button-wrap:hover {
  background-color: #d2d3d6 !important;
  color: #000;
  cursor: pointer;
}
.button-border {
  border: 1px solid #3b3c3f;
}
.unset-padding {
  padding: unset !important;
}
</style>
