<template>
  <div class="wrap-tab-item">
    <div class="content-individual-tab-item">
      <div class="m-row-1 display-f width-100 m-mb-4">
        <div class="m-col-1">
          <div class="m-row-1 m-input-title m-mb-4">
            {{ text.contactInformation }}
          </div>
          <div class="m-row-2">
            <Input
              class="m-mt-8"
              :inputWidth="'m-input-width-100'"
              :placeholderValue="'Email'"
              v-model="provider.EmailOfIndividual"
            />
          </div>
          <div class="m-row-3">
            <Input
              class="m-mt-8"
              :inputWidth="'m-input-width-50'"
              :placeholderValue="text.phoneNumber"
              v-model="provider.PhoneOfIndividual"
            />
          </div>
          <div class="m-row-4">
            <Input
              class="m-mt-8"
              :inputWidth="'m-input-width-50'"
              :placeholderValue="text.landPhone"
              v-model="provider.LandPhoneOfIndividual"
            />
          </div>
        </div>
        <div class="m-col-2">
          <div
            class="m-row-1 m-input-title m-mb-4"
            :title="text.personalIDInformationTooltip"
          >
            {{ text.personalIDInformation }}
          </div>
          <div class="m-row-2">
            <Input
              class="m-mt-8"
              :inputType="'text'"
              :inputWidth="'m-input-width-50'"
              :placeholderValue="'Số CMND/Thẻ căn cước'"
              v-model="provider.IdentityNumber"

            />
          </div>
          <div class="m-row-3">
            <Input
              class="m-mt-8"
              :inputType="'date'"
              :inputWidth="'m-input-width-50'"
              :placeholderValue="'Ngày cấp'"
              v-model="provider.IdentityDate"
            />
          </div>
          <div class="m-row-4">
            <Input
              class="m-mt-8"
              :inputType="'text'"
              :inputWidth="'m-input-width-100'"
              :placeholderValue="'Nơi cấp'"
              v-model="provider.IdentityPlace"
            />
          </div>
        </div>
      </div>
      <div class="m-row-2 display-f width-100">
        <div class="m-col-1">
          <div class="m-row-1 m-input-title m-mb-4" :title="propertyName.legalRepresentativeTooltip">
            {{ propertyName.legalRepresentative }}
          </div>
          <div class="m-row-2">
            <Input
              :inputType="'text'"
              :inputWidth="'m-input-width-100'"
              :placeholderValue="text.legalRepresentative"
              v-model="provider.LegalRepresentative"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Input from "../../../components/base/BaseInput.vue";
import resourceVN from "../../../resource/resourceVN";
export default {
  components: {
    Input,
  },
  computed: mapGetters(["provider"]),
  methods: {
    chooseTitle(selectedTitle) {
      const me = this;
      me.selectedTitle = selectedTitle;
      console.log("title");
    },
  },
  data() {
    return {
      title: ["Anh", "Chị", "Bà", "Bạn", "Miss", "Mr", "Mrs", "Ông"],
      selectedTitle: "",
      propertyName: resourceVN.PROPERTY_NAME_OF_PROVIDER,
      text: resourceVN.TEXT,
    };
  },
};
</script>
<style scoped>
@import url("../../../css/components/tabComponent.css");
</style>