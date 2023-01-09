<template>
  <base-paging
    :totalRecord="totalProvider"
    :totalPage ="totalPage"
    :pageSize="providerFilter.pageSize"
    :recordStart = "((providerFilter.pageNumber - 1) * providerFilter.pageSize + 1)"
    :recordEnd = "lastProvider"
    :pageNumber="providerFilter.pageNumber"
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
    ...mapGetters(["providerFilter", "totalProvider", "totalProviderPage", "lastProvider","totalProvider"]),
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
      "setProviderFilter",
      "getProviderList",
      "setLastProvider",
      "setChooseAllProvider",
      "setProviderIDListDeleted",
    ]),
    toggleList() {
      this.isShowList = !this.isShowList;
    },
    selectNumberRecord(pageSize) {
      const me = this;
      pageSize = pageSize.split(" ")[0];
      me.setProviderFilter({
        pageSize: pageSize,
        pageNumber: 1,
        keywordForFilter: me.providerFilter.keywordForFilter,
      });
      me.getProviderList();
      me.toggleList();
      me.setLastProvider();
      me.setChooseAllProvider(false);
      me.setProviderIDListDeleted([]);
    },
    selectFrontPage() {
      const me = this;
      me.setProviderFilter({
        pageSize: me.providerFilter.pageSize,
        pageNumber: me.providerFilter.pageNumber - 1,
        keywordForFilter: me.providerFilter.keywordForFilter,
      });
      me.getProviderList();
      me.setLastProvider();
      me.setChooseAllProvider(false);
      me.setProviderIDListDeleted([]);
    },
    selectNextPage() {
      const me = this;
      me.setProviderFilter({
        pageSize: me.providerFilter.pageSize,
        pageNumber: me.providerFilter.pageNumber + 1,
        keywordForFilter: me.providerFilter.keywordForFilter,
      });
      me.getProviderList();
      me.setLastProvider();
      me.setChooseAllProvider(false);
      me.setProviderIDListDeleted([]);
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