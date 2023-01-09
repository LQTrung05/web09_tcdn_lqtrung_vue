<template>
  <div class="layout-process">
    <div class="form-process">
      <div class="process-and-utility-area">
        <div class="process-area">
          <div class="title">NGHIỆP VỤ TIỀN MẶT</div>
          <div class="content-area">
            <div class="content">
              <div class="mi-h-340 mi-process-cash">
                <div class="div-face-button hoverable receive">
                  <div class="title-button">Thu tiền</div>
                </div>
                <div class="div-face-button hoverable payment">
                  <div class="title-button">Chi tiền</div>
                </div>
                <div class="div-face-button hoverable audit">
                  <div class="title-button">Kiểm kê quỹ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dictionary-area flex w-full">
          <div class="dictionary-item hoverable flex-grow">
            <div class="child-ms-tooltip">
              <div class="tooltip-content">
                <div class="dictionary-content">
                  <div class="m-icon-24 mi-process-customer"></div>
                  <div class="text">Khách hàng</div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="dictionary-item hoverable flex-grow"
            @click="openProviderPage"
          >
            <div class="child-ms-tooltip">
              <div class="tooltip-content">
                <div class="dictionary-content">
                  <div class="m-icon-24 mi-process-provider"></div>
                  <div class="text">Nhà cung cấp</div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="dictionary-item hoverable flex-grow"
            @click="openEmployeePage"
          >
            <div class="child-ms-tooltip">
              <div class="tooltip-content">
                <div class="dictionary-content">
                  <div class="m-icon-24 mi-process-employee"></div>
                  <div class="text">Nhân viên</div>
                </div>
              </div>
            </div>
          </div>
          <div class="dictionary-item hoverable flex-grow">
            <div class="child-ms-tooltip">
              <div class="tooltip-content">
                <div class="dictionary-content">
                  <div class="m-icon-24 mi-calculate"></div>
                  <div class="text">Tính tỉ giá xuất quỹ</div>
                </div>
              </div>
            </div>
          </div>
          <div class="dictionary-item hoverable flex-grow">
            <div class="child-ms-tooltip">
              <div class="tooltip-content">
                <div class="dictionary-content">
                  <div class="m-icon-24 mi-setting--active"></div>
                  <div class="text">Tùy chọn</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="report-area">
        <div class="title">BÁO CÁO</div>
        <div class="favorite-report">
          <ul>
            <li>Bảng kê số dư tiền theo ngày</li>
            <li>Dòng tiền</li>
            <li>S03a1-DN: Sổ nhật ký thu tiền</li>
            <li>Sổ kế toán chi tiết quỹ tiền mặt</li>
            <li>S03a2-DN: Sổ nhật ký chi tiền</li>
          </ul>
        </div>
        <div class="footer">Tất cả báo cáo</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openProcessPage(){
        this.$router.push({ name: "processPage"})
    },
    openProviderPage(){
        this.$router.push({ name: "providerPage"})
    },
    openEmployeePage(){
        this.$router.push({ name: "employeePage"})
    }
  },
};
</script>
<style scoped>
.layout-process {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 112px);
  overflow: auto;
}
.form-process {
  display: flex;
  width: 100%;
  justify-content: center;
}
.process-area {
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  width: 690px;
  height: 380px;
}
.dictionary-area {
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  margin-top: 10px;
  height: 70px;
  display: flex;
}
.dictionary-area .dictionary-item {
  display: flex;
  align-items: center;
  justify-content: center;
}
.dictionary-item:not(:last-child) {
  border-right: 1px solid #e5e5e5;
}
.flex-grow {
  flex-grow: 1 !important;
}

.report-area {
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  margin-left: 10px;
  width: 300px;
  height: 460px;
  display: flex;
  flex-direction: column;
  position: relative;
}
.process-area > .title,
.report-area > .title {
  text-transform: uppercase;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-family: notosans-bold;
  border-bottom: 1px solid #e5e5e5;
}
.content {
  position: relative;
}
.mi-process-cash {
  background-image: url("../../assets/img/AnhQuyTrinh.svg");
}
.mi-h-340 {
  height: 340px;
}

.div-face-button {
  width: 90px;
  padding-top: 60px;
  position: absolute;
  transition: all 0.2s ease;
  text-align: center;
}
.hoverable:hover {
  cursor: pointer;
  box-shadow: 4px 4px #babec5;
  box-shadow: 0 3px 6px rgb(0 0 0 / 25%);
}
.receive {
  top: 40px;
  left: 90px;
}
.payment {
  top: 215px;
  left: 90px;
}
.audit {
  top: 125px;
  left: 335px;
  width: 125px !important;
}
.title-button {
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: flex-end;
  padding-bottom: 10px;
}
.dictionary-area .dictionary-item .dictionary-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.report-area .favorite-report ul {
  margin: 0;
  padding: 0 16px;
  list-style-type: disc;
}
.report-area .favorite-report ul li {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #e5e5e5;
  height: 74px;
}
.report-area .favorite-report ul li:before {
  content: "\2022";
  color: #646464;
  font-size: 24px;
  margin-right: 12px;
}
.report-area .favorite-report ul li:hover {
  cursor: pointer;
  color: #0075c0;
}
.report-area .footer {
  border-top: 1px solid #e5e5e5;
  cursor: pointer;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  color: #0075c0;
}
</style>