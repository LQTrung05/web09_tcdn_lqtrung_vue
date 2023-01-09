<template>
  <div class="wrap-tab-item">
    <div class="content-tab-item">
      <div class="m-col-1">
        <div class="m-row-1 m-input-title m-mb-4">
          {{ text.location }}
        </div>
        <div class="m-row-2 display-f m-mb-12">
          <div class="m-input-width-50 m-pr-12">
            <Combobox
              :widthValue100="'true'"
              :setOverflowY="'true'"
              :dataList="title"
              :isShowList="isShowList"
              @chooseItem="chooseTitle"
              :topValue="'1px'"
              v-model="provider.Country"

            >
            </Combobox>
          </div>
          <div class="m-input-width-50">
            <Combobox
              :widthValue100="'true'"
              :setOverflowY="'true'"
              :dataList="title"
              :isShowList="isShowList"
              @chooseItem="chooseTitle"
              :topValue="'1px'"
              v-model="provider.Province"
              :placeholderValue="text.province"
            >
            </Combobox>
          </div>
        </div>
        <div class="m-row-3 display-f m-mb-12">
          <div class="m-input-width-50 m-pr-12">
            <Combobox
              :widthValue100="'true'"
              :setOverflowY="'true'"
              :dataList="title"
              :isShowList="isShowList"
              @chooseItem="chooseTitle"
              :topValue="'1px'"
              :placeholderValue="text.district"
              v-model="provider.District"

            >
            </Combobox>
          </div>
          <div class="m-input-width-50">
            <Combobox
              :widthValue100="'true'"
              :setOverflowY="'true'"
              :dataList="title"
              :isShowList="isShowList"
              @chooseItem="chooseTitle"
              :topValue="'1px'"
              :placeholderValue="text.village"
              v-model="provider.Village"

            >
            </Combobox>
          </div>
        </div>
      </div>
      <div class="m-col-2">
        <div class="m-row-1 m-input-title m-mb-4 display-f">
          <div class="row-title m-pr-12">
            {{ text.deliveryAddress }}
          </div>
          <div class="check-box-address">
            <input type="checkbox" name="txtCheckBoxAddress" />
            <label for="txtCheckBoxAddress">{{
              text.SameAsProviderAddress
            }}</label>
          </div>
        </div>
        <div class="m-row-2 m-mb-4 other-addresses-wrap">
          <table class="address-table">
            <tbody>
              <tr v-for="(row, index) in anotherAddresses" :key="index">
                <td>
                  <BaseInput v-model="row.AnotherAddress" />
                </td>
                <td>
                  <div
                    class="icon-delete-row mi-delete mi mi-16"
                    @click="deleteRow"
                  ></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="m-row-3 m-mt-8">
          <div class="action-with-table display-f">
            <BaseButton
              :secondaryButton="true"
              :radius4="true"
              :buttonBorder="true"
              :buttonHeight="'24px'"
              :btnText="'Thêm dòng'"
              class="m-mr-8 unset-pading"
              @click="addRow"
            ></BaseButton>
            <BaseButton
              :secondaryButton="true"
              :buttonBorder="true"
              :radius4="true"
              :buttonHeight="'24px'"
              :btnText="'Xóa hết dòng'"
              class="unset-pading"
              @click="deleteAllRow"
            ></BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Combobox from "../../../components/base/BaseCombobox.vue";
import BaseInput from "../../../components/base/BaseInput.vue";
import BaseButton from "../../../components/base/BaseButton.vue";
import resourceVN from "../../../resource/resourceVN";
export default {
  components: {
    Combobox,
    BaseInput,
    BaseButton,
  },
  created() {
    this.setRows();
  },
  computed: mapGetters(["provider", "anotherAddressList"]),
  watch: {
    anotherAddresses: {
      handler(value) {
        this.$emit("data", value);
      },
      deep: true,
    },
  },
  methods: {
    setRows() {
      const me = this;
      for (const item of me.anotherAddressList) {
        me.anotherAddresses.push(item);
      }
    },
    deleteRow(row) {
      const me = this;
      me.anotherAddresses.splice(row, 1);
    },
    addRow() {
      const me = this;
      me.anotherAddresses.push({});
    },
    deleteAllRow() {
      const me = this;
      me.anotherAddresses.splice(0, me.anotherAddresses.length - 1);
    },
  },
  data() {
    return {
      text: resourceVN.TEXT,
      anotherAddresses: [],
    };
  },
};
</script>

<style scoped>
@import url("../../../css/components/tabComponent.css");
.m-row-1 .m-input-title .m-mb-4 .display-f {
  align-items: center;
}
.check-box-address {
  display: flex;
  align-items: center;
}
.check-box-address > label {
  font-family: notosans-regular;
  margin-left: 6px;
}
.address-table {
  border-spacing: 0;
  width: 100%;
}
.address-table tr {
  height: 44px;
  text-align: left;
}
.address-table tbody tr {
  background-color: #e5f3ff;
}
.address-table tbody tr:hover {
  background-color: #f2f9ff;
  cursor: pointer;
}
.address-table td:first-child {
  border-left: unset;
}
.address-table td {
  padding: 0 10px;
  border-top: 1px solid #babec5;
  border-left: 1px dotted #babec5;
  border-bottom: 1px solid #babec5;
  text-align: -webkit-center;
}
.other-addresses-wrap{
  max-height: 130px;
  overflow-y: auto;
}
</style>