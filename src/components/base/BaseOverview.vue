<template>
  <div class="overview sticky margin">
    <div class="tooltip-first-time" style="display: none">
      <div class="arrow"></div>
      <span>Bấm vào để lọc</span>
    </div>
    <div class="inner-overview flex">
      <div class="w-1/3 pd-t-8 over-view" title="Bấm vào để lọc">
        <div class="dued-debit-overview mouse-poiter">
          <div class="dued-debit-overview-data inner-overview-data">
            <div class="mi funnel-icon"></div>
            <div class="overview-data-number flex">
              <div class="total-money">{{ moneyColumn1 }}</div>
            </div>
            <div class="label-overview">{{ textColumn1 }}</div>
          </div>
        </div>
        <div class="over-view-line"></div>
      </div>
      <div class="w-1/3 px-2 pd-t-8 over-view" title="Bấm vào để lọc">
        <div
          class="total-debit-overview mouse-poiter"
        >
          <div class="total-debit-overview-data inner-overview-data">
            <div class="mi funnel-icon"></div>
            <div class="overview-data-number flex">
              <div class="total-money">{{ moneyColumn2 }}</div>
            </div>
            <div class="label-overview">{{ textColumn2 }}</div>
          </div>
        </div>
        <div class="over-view-line"></div>
      </div>
      <div class="w-1/3 pd-t-8">
        <div class="payment-overview">
          <div class="payment-overview-data inner-overview-data">
            <div class="overview-data-number flex">
              <di class="total-money"> {{ moneyColumn3 }} </di>
            </div>
            <di class="label-overview"> {{ textColumn3 }} </di>
          </div>
        </div>
      </div>
    </div>
    <div
      class="refresh-overview-btn flex items-center justify-center"
      title="Tải lại số liệu tổng hợp"
    >
      <div class="con-ms-tooltip">
        <div class="tooltip-content">
          <div class="mi mi-16 mi-icon-reload-small"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: [
    "moneyColumn1",
    "moneyColumn2",
    "moneyColumn3",
    "textColumn1",
    "textColumn2",
    "textColumn3",
  ],
};
</script>
<style scoped>
.overview {
  color: #fff;
  position: relative;
  margin-top: 13px;
}
.tooltip-first-time {
  position: absolute;
  background-color: #505050;
  width: 119px;
  border-radius: 3px;
  top: 0;
  left: 174px;
  padding: 2px 12px;
}
.arrow {
  bottom: auto;
  top: 97%;
  right: 10px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #505050;
  position: absolute;
  width: 5px;
  height: 5px;
}
.margin {
  margin-left: 24px;
  margin-right: 24px;
}
.sticky {
  position: -webkit-sticky !important;
  position: sticky !important;
}
.flex {
  display: flex !important;
}
.pd-t-8 {
  padding-top: 8px;
}
.w-1\/3 {
  width: 33.33333% !important;
}
.px-2 {
  padding-left: 0.5rem !important;
  padding-right: 0.5rem !important;
}
.dued-debit-overview {
  background: #ff7f2c;
  height: 100%;
}
.mouse-poiter {
  cursor: pointer;
}
.overview .inner-overview .inner-overview-data {
  padding: 4px 10px;
  min-height: var(--overview-height);
  overflow: hidden;
  position: relative;
}
.funnel-icon {
  height: 22px;
  position: absolute;
  width: 18px;
  right: 8px;
  background-position: -1814px -202px;
}

.overview-data-number {
  align-items: baseline;
}
.total-money {
  font-size: 24px;
}
/* .label-overview {
    font-size: 14px;
} */
.total-debit-overview {
  background: #b8bcc3;
  height: 100%;
  position: relative;
}
.payment-overview {
  background: #74cb2f;
  height: 100%;
}
.refresh-overview-btn {
  top: -13px;
  right: -13px;
}
.refresh-overview-btn {
  border: 2px solid #e2e9f2;
  background: #f2f5f8;
  position: absolute;
  width: 26px;
  height: 26px;
  cursor: pointer;
  z-index: 9;
}
.justify-center {
  justify-content: center !important;
}
.items-center {
  align-items: center !important;
}
.con-ms-tooltip .tooltip-conten {
  height: 100%;
}
.mi-icon-reload-small {
  background-position: -1887px -833px;
}

.over-view:hover {
  padding-top: 0;
}
.over-view:hover .over-view-line {
  padding-top: 6px;
  background: #707070;
  opacity: 0.5;
}
.flex {
  display: flex !important;
}
</style>