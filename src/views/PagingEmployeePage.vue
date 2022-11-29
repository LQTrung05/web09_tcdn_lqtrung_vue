<template>
  <div class="m-paging">
    <div class="m-paging-left">
      {{text.total}}: <b>{{ totalEmployee }}</b>
    </div>
    <div class="m-paging-right">
      <div class="text-number-record">{{text.numberRecordPerPage}}: </div>
      <div class="m-paging-right-option">
      <div class="dropdownlist">
          <div class="page-size">{{filter.pageSize}}</div>
          <div class="icon-choose-page-size m-icon-14 m-icon-chevron-down-bold "
          @click="toggleList">
          </div>
          <div
            v-if="isShowList"
            class="numbers-record-in-a-page bottom-100">
            <div
              class="data-item"
              v-for="(item, index) in options" 
              :key="index"
              @click="selectNumberRecord(item)"
            >
            {{item}}
            <div v-if="item === filter.pageSize " class="m-icon-checkbox-active m-icon-14 m-item-icon-is-choose"></div>
            </div>
          </div>
        </div>
      </div>
      <div style="padding-left: 16px">{{((filter.pageNumber-1)*filter.pageSize +1 )}} - {{lastRecord }} {{text.record}}</div>
      <div class="m-paging-right-page">
        <button
          :disabled="filter.pageNumber == 1"
          :class="{'opacity': filter.pageNumber == 1}"
          class="m-btn-first"
          @click="selectFrontPage">
          <div class="icon-choose-page-size m-icon-14 m-icon-arrow-left "></div>
          </button>
        <!-- <button :class="{'selected': ischoose}">{{filter.pageNumber}}</button> -->
        <button
          :disabled="filter.pageNumber == totalPage"
          :class="{'opacity': filter.pageNumber == totalPage}"
          class="m-btn-last"
          @click="selectNextPage">
          <div class="icon-choose-page-size m-icon-14 m-icon-arrow-right "></div>
          </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import resourceVN from "../resource/resourceVN"
export default {
  computed:{
      ...mapGetters([
      "filter",
      "totalEmployee",
      "totalPage",
      "lastRecord"
    ]),
  },
  data() {
    return {
      isShowList: false,
      ischoose:true,
      options: [
        "10",
        "20",
        "30",
        "50",
        "100",
      ],
      propertyName: resourceVN.PROPERTY_NAME,
      text: resourceVN.TEXT,
      
    };
  },
  methods: {
    ...mapActions([
      "setFilter",
      "getEmployees",
      "setLastRecord",
      "setCheckAllEmployee",
      "setListDeleteEmployee"
    ]),
    toggleList() {
      this.isShowList = !this.isShowList;
    },
    selectNumberRecord(pageSize) {
      const me = this;
      pageSize = pageSize.split(" ")[0];
      me.setFilter({
        pageSize: pageSize,
        pageNumber: 1,
        employeeFilter: me.filter.employeeFilter,
      });
      me.getEmployees();
      me.toggleList();
      me.setLastRecord();
      me.setCheckAllEmployee(false);
      me.setListDeleteEmployee([]);

    },
    selectFrontPage() {
      const me = this;
      me.setFilter({
        pageSize: me.filter.pageSize,
        pageNumber: me.filter.pageNumber - 1,
        employeeFilter: me.filter.employeeFilter,
      });
      me.getEmployees();
      me.setLastRecord();

    },
    selectNextPage(){
            const me = this;
            me.setFilter({
                pageSize: me.filter.pageSize,
                pageNumber: me.filter.pageNumber + 1,
                employeeFilter: me.filter.employeeFilter
            });
            me.getEmployees();
      me.setLastRecord();
    }

  },
};

</script>
<style scoped>
@import url("../css/components/paging.css");
.m-btn-first,.m-btn-last{
  padding: 0 !important;
}
.m-btn-first,.m-btn-last:hover{
  cursor: pointer;
}


</style>