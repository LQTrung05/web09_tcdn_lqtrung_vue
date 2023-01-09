<template>
  <base-paging
    :totalRecord="totalEmployee"
    :totalPage ="totalPage"
    :pageSize="filter.pageSize"
    :recordStart = "((filter.pageNumber - 1) * filter.pageSize + 1)"
    :recordEnd = "lastRecord"
    :pageNumber="filter.pageNumber"
    :isShowList="isShowList"
    @toggleList = "toggleList"
    @selectNumberRecord = "selectNumberRecord"
    @selectFrontPage = "selectFrontPage"
    @selectNextPage= "selectNextPage"
  ></base-paging>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import resourceVN from "../../resource/resourceVN";
import BasePaging from "../../components/base/BasePaging.vue";
export default {
  components: {
    BasePaging,
  },
  computed: {
    ...mapGetters(["filter", "totalEmployee", "totalPage", "lastRecord"]),
  },
  data() {
    return {
      isShowList: false,
      ischoose: true,
      options: ["10", "20", "30", "50", "100"],
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
      "setListDeleteEmployee",
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
      me.setCheckAllEmployee(false);
      me.setListDeleteEmployee([]);
    },
    selectNextPage() {
      const me = this;
      me.setFilter({
        pageSize: me.filter.pageSize,
        pageNumber: me.filter.pageNumber + 1,
        employeeFilter: me.filter.employeeFilter,
      });
      me.getEmployees();
      me.setLastRecord();
      me.setCheckAllEmployee(false);
      me.setListDeleteEmployee([]);
    },
  },
};
</script>
<style scoped>
@import url("../../css/components/paging.css");
.m-btn-first,
.m-btn-last {
  padding: 0 !important;
}
.m-btn-first,
.m-btn-last:hover {
  cursor: pointer;
}
</style>