<template>
  <div class="wrap-tab-item">
    <div class="content-tab-item">
      <div class="width-100">
        <div class="m-row-1 display-f width-100">
          <div class="m-col-1">
            <div class="m-row-1 m-input-title m-mb-4">
              {{ text.contact }}
            </div>
            <div class="m-row-2 display-f">
              <div class="m-input-width-30 m-pr-6">
                <Combobox
                  :widthValue100="'true'"
                  :setOverflowY="'true'"
                  :dataList="title"
                  :isShowList="isShowList"
                  @chooseItem="chooseTitle"
                  :topValue="'1px'"
                  :placeholderValue="text.title"
                  v-model="provider.Prefix"
                >
                </Combobox>
              </div>
              <Input
                :inputWidth="'m-input-width-70'"
                :placeholderValue="text.fullName"
                v-model="provider.ContactFullname"
              />
            </div>
            <div class="m-row-3">
              <Input
                class="m-mt-8"
                :inputWidth="'m-input-width-100'"
                :placeholderValue="'Email'"
                v-model="provider.ContactEmail"
              />
            </div>
            <div class="m-row-4">
              <Input
                class="m-mt-8"
                :inputWidth="'m-input-width-50'"
                :placeholderValue="text.phoneNumber"
                v-model="provider.ContactPhone"
              />
            </div>
          </div>
          <div class="m-col-2" v-if="!provider.IsCustomer">
            <div
              class="m-row-1 m-input-title m-mb-4"
              :title="propertyName.legalRepresentativeTooltip"
            >
              {{ propertyName.legalRepresentative }}
            </div>
            <div>
              <Input
                class="m-mb-24"
                :inputType="'text'"
                :inputWidth="'m-input-width-100'"
                :placeholderValue="text.legalRepresentative"
                v-model="provider.LegalRepresentative"
              />
            </div>
          </div>
          <div class="m-col-2" v-else>
            <div class="m-input-width-100 display-f">
              <Input
                :inputLabel="text.eInvoiceRecipient"
                class="m-pr-6"
                :inputType="'text'"
                :inputWidth="'m-input-width-100'"
                :placeholderValue="text.fullName"
                v-model="provider.FullNameInvoiceRecipient"
              />
            </div>
            <div class="m-input-width-100 display-f">
              <Input
                :title="propertyName.legalRepresentativeTooltip"
                class="m-pr-6 m-mt-8"
                :inputType="'text'"
                :inputWidth="'m-input-width-100'"
                :placeholderValue="text.emailInvoice"
                v-model="provider.EmailInvoiceRecipient"
              />
            </div>
            <div class="m-input-width-100 display-f">
              <Input
                :title="propertyName.legalRepresentativeTooltip"
                class="m-pr-6 m-mt-8"
                :inputType="'text'"
                :inputWidth="'m-input-width-50'"
                :placeholderValue="text.phoneNumber"
                v-model="provider.PhoneInvoiceRecipient"
              />
            </div>
          </div>
        </div>
        <div class="m-row-2 m-col-1 m-mt-8" v-if="provider.IsCustomer">
          <div
            class="m-row-1 m-input-title m-mb-4"
            :title="propertyName.legalRepresentativeTooltip"
          >
            {{ propertyName.legalRepresentative }}
          </div>
          <div>
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
import { mapGetters } from "vuex";
import Combobox from "../../../components/base/BaseCombobox.vue";
import Input from "../../../components/base/BaseInput.vue";
import resourceVN from "../../../resource/resourceVN";

export default {
  components: {
    Input,
    Combobox,
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