<template>
  <div>
    <div class="filter-provider-form-wrapper">
      <div class="width-100">
        <div class="m-row-1 display-f">
          <Combobox
            :widthValue100="'true'"
            :setOverflowY="'true'"
            :lableValue="text.type"
            :dataList="providerTypeListCondition"
            :isShowList="isShowList"
            :marginBottom="true"
            @chooseItem="chooseProviderType"
            :topValue="'1px'"
            :rightValue="'0.5px'"
            class="width-50 m-mr-8"
            v-model="providerTypeCondition"
          >
          </Combobox>
          <ComboboxTable
            :topValue="'1px'"
            :rightValue="'0.5px'"
            :lableValue="text.group"
            :headers="providerGroupHeaders"
            :dataList="providerGroupList"
            :dataColumnList="providerGroupColumnList"
            @chooseItem="chooseProviderGroup"
            class="width-50"
            v-model="providerGroupCondition"
          >
          </ComboboxTable>
        </div>
        <div class="m-row-2 display-f m-mt-8">
          <Combobox
            :marginBottom="true"
            :widthValue100="'true'"
            :setOverflowY="'true'"
            :lableValue="text.liabilityStatus"
            :dataList="liabilityStatusListCondition"
            :isShowList="isShowList"
            @chooseItem="chooseLiabilityStatus"
            :topValue="'1px'"
            :rightValue="'0.5px'"
            class="width-50 m-mr-8"
            v-model="liabilityStatusCondition"
          >
          </Combobox>
          <Combobox
            :marginBottom="true"
            :widthValue100="'true'"
            :setOverflowY="'true'"
            :lableValue="text.status"
            :dataList="statusListCondition"
            :isShowList="isShowList"
            @chooseItem="chooseStatus"
            :topValue="'1px'"
            :rightValue="'0.5px'"
            class="width-50"
            v-model="statusCondition"
          >
          </Combobox>
        </div>
        <div class="m-row-3 display-f width-100 m-mt-8">
          <div class="width-33">
            <ComboboxTable
              :topValue="'1px'"
              :width100="true"
              :rightValue="'1px'"
              :lableValue="text.province"
              :dataList="provinceList"
              :dataColumnList="provinceColumnList"
              @chooseItem="chooseProvince"
              class="m-mr-8"
              v-model="provinceCondition.name"
            >
            </ComboboxTable>
          </div>
          <div class="width-33">
            <Combobox
              :marginBottom="true"
              :widthValue100="'true'"
              :setOverflowY="'true'"
              :lableValue="text.district"
              :dataList="title"
              :isShowList="isShowList"
              @chooseItem="chooseTitle"
              :topValue="'1px'"
              class="m-mr-8"
              v-model="districtCondition.name"
            >
            </Combobox>
          </div>
          <div class="width-33">
            <Combobox
              :marginBottom="true"
              :widthValue100="'true'"
              :setOverflowY="'true'"
              :lableValue="text.village"
              :dataList="title"
              :selectedItem="selectedTitle"
              :isShowList="isShowList"
              @chooseItem="chooseTitle"
              :topValue="'1px'"
              :rightValue="'0.5px'"
              v-model="villageCondition"
            >
            </Combobox>
          </div>
        </div>
        <div class="m-row-4 display-f form-footer">
          <Button
            :btnText="text.reset"
            addClass="m-btn"
            tabindex="21"
            :buttonBorder="true"
            :secondaryButton="true"
            @click.prevent="save"
            class="unset-pading"
          ></Button>
          <Button
            :btnText="text.filter"
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
import Button from "../../components/base/BaseButton.vue";
import Combobox from "../../components/base/BaseCombobox.vue";
import ComboboxTable from "../../components/base/BaseComboboxTable.vue";
import resourceVN from "../../resource/resourceVN";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { Combobox, ComboboxTable, Button },
  computed: {
    ...mapGetters([
      "providerTypeListCondition",
      "providerTypeCondition",
      "providerGroupCondition",
      "liabilityStatusListCondition",
      "liabilityStatusCondition",
      "statusListCondition",
      "statusCondition",
      "provinceCondition",
      "districtCondition",
      "villageCondition",
      "providerGroupList",
      "providerGroupList",
      "provinceList",
    ]),
  },
  created() {
    this.getProvinceList();
  },
  methods: {
    ...mapActions([
      "setProviderGroupCondition",
      "setProviderTypeCondition",
      "setLiabilityStatusCondition",
      "setStatusCondition",
      "setProvinceCondition",
      "getProvinceList",
      "getDistrictList",
    ]),
    //H??m ch???n nh???ng column hi???n th??? l??n combobox nh??m nh?? cung c???p
    providerGroupColumnList(providerGroup) {
      const arr = [
        providerGroup.ProviderGroupCode,
        providerGroup.ProviderGroupName,
      ];
      return arr;
    },
    //Ch???n nh??m nh?? cung c???p mu???n l???c
    chooseProviderGroup(providerGroupCode) {
      this.setProviderGroupCondition(providerGroupCode.ProviderGroupCode);
    },
    //Ch???n lo???i nh?? cung c???p mu???n l???c
    chooseProviderType(providerType) {
      this.setProviderTypeCondition(providerType);
    },
    //Ch???n t??nh tr???ng c??ng n??? ????? l???c
    chooseLiabilityStatus(liabilityStatus) {
      this.setLiabilityStatusCondition(liabilityStatus);
    },
    //Ch???n tr???ng th??i mu???n l???c
    chooseStatus(status) {
      this.setStatusCondition(status);
    },
    //L???y tr?????ng t??n t???nh th??nh ????? hi???n th??? l??n danh s??ch
    provinceColumnList(province) {
      const arr = [
        province.name
      ];
      return arr;
    },
    //Ch???n 1 t???nh th??nh
    chooseProvince(province){
      this.setProvinceCondition(province);
      this.getDistrictList();
    }
  },
  data() {
    return {
      text: resourceVN.TEXT,
      providerGroupHeaders: [
        {
          name: resourceVN.PROVIDER_GROUP.providerGroupCode,
          minWidth: "145px",
        },
        {
          name: resourceVN.PROVIDER_GROUP.providerGroupName,
          minWidth: "200px",
        },
      ],
    };
  },
};
</script>
<style scoped>
.filter-provider-form-wrapper {
  width: 533px;
  position: absolute;
  padding: 16px 20px 20px;
  background-color: #fff;
  border: 1px solid #babec5;
  top: 103%;
  right: -166px;
  z-index: 10;
}
.form-footer {
  padding-top: 20px;
  border-top: 1px solid #babec5;
  margin-top: 20px;
  justify-content: space-between;
}
</style>