<template>
  <div class="m-popup">
    <div class="m-content-provider-group">
      <div class="popup-header margin-none">
        <div class="popup-title m-mb-12">
          <div class="popup-title-name">{{ text.AddProviderGroup }}</div>
        </div>
        <div class="popup-close">
          <div
            class="m-icon-24 m-icon-help"
            style="margin-
            right: 8px"
            :title="text.helpToolTip"
          ></div>
          <div
            class="m-icon-24 m-icon-close m-close-add-popup js-close-form"
            :title="text.close"
            @click="closeProviderGroupForm"
          ></div>
        </div>
      </div>
      <div class="popup-content padding-none">
        <div class="row-1 display-f m-mb-12">
          <div class="col-1 m-mr-8 m-input-width-30">
            <Input
              :inputLabel="text.code"
              :validateType="'required'"
              :errorMess="errorInput.providerGroupCode"
              v-model="providerGroup.ProviderGroupCode"
            />
          </div>
          <div class="col-2 m-input-width-70">
            <Input
              :inputLabel="text.name"
              :validateType="'required'"
              :errorMess="errorInput.providerGroupName"
              v-model="providerGroup.ProviderGroupName"
            />
          </div>
        </div>
        <div class="row-2">
          <ComboboxTable
            :topValue="'0.5px'"
            :lableValue="`Thuộc`"
            :headers="providerGroupHeaders"
            :dataList="providerGroupList"
            :dataColumnList="getProviderGroupColumnList"
            :width100="true"
            @toggleAddForm="openProviderGroupForm"
            @chooseItem="chooseParentProviderGroup"
            v-model="parentProviderGroup.ProviderGroupName"
            class="m-mb-12"
          >
          </ComboboxTable>
        </div>
        <div class="row-3">
          <div class="m-input-title m-mb-4">Diễn giải</div>
          <textarea
            cols="1"
            rows="2"
            class="note-tab-item width-100"
            v-model="providerGroup.Description"
          >
          </textarea>
        </div>
      </div>
      <div class="m-form-footer">
        <div class="m-form-part-cancel">
          <Button
            :btnText="text.cancel"
            :secondaryButton="true"
            :buttonBorder="true"
            :radius4="true"
            addClass="m-btn"
            @click="closeProviderGroupForm"
            class="unset-pading"
            tabindex="22"
          ></Button>
        </div>
        <div class="m-form-part-submit">
          <Button
            :btnText="text.store"
            addClass="m-btn"
            tabindex="21"
            :buttonBorder="true"
            :secondaryButton="true"
            @click.prevent="saveProviderGroup"
          ></Button>
          <Button
            :btnText="text.storeAndAdd"
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
import { mapGetters } from "vuex";
import resourceVN from "../../resource/resourceVN";
import Input from "../../components/base/BaseInput.vue";
import Button from "../../components/base/BaseButton.vue";
import ComboboxTable from "../../components/base/BaseComboboxTable.vue";
import FormMode from '../../enums/formMode'
import { mapActions } from "vuex";
export default {
  components: {
    Input,
    Button,
    ComboboxTable,
  },
  data() {
    return {
      text: resourceVN.TEXT,
      providerGroupHeaders: [
        {
          name: resourceVN.PROVIDER_GROUP.providerGroupCode,
          minWidth: "100px",
        },
        {
          name: resourceVN.PROVIDER_GROUP.providerGroupName,
          minWidth: "200px",
        },
      ],
      errorInput:{
        providerGroupCode:"",
        providerGroupName:""
      }
    };
  },
  computed: mapGetters([
    "providerGroup",
    "providerGroupList",
    "parentProviderGroup",
    "providerGroupMode",
  ]),
  methods: {
    ...mapActions([
      "toggleProviderGroupForm",
      "setParentProviderGroup",
      "setProviderGroup",
      "setProviderGroupMode",
      "insertProviderGroup",
    ]),
    //Đóng form thêm mới nhóm nhà cung cấp
    closeProviderGroupForm() {
      const me = this;
      me.toggleProviderGroupForm();
      me.setParentProviderGroup({});
      me.setProviderGroup({});
    },
    //Hàm chọn những column hiển thị lên combobox nhóm nhà cung cấp
    getProviderGroupColumnList(providerGroup) {
      const arr = [
        providerGroup.ProviderGroupCode,
        providerGroup.ProviderGroupName,
      ];
      return arr;
    },
    //Hàm chọn cha của nhóm nhà cung cấp muốn thêm mới
    chooseParentProviderGroup(parentProviderGroup) {
      const me = this;
      me.setParentProviderGroup(parentProviderGroup);
      me.providerGroup.ProviderParentID = parentProviderGroup.ProviderGroupID;
    },
    validateProviderGroupForm(){
      const me = this;
      me.errorInput = {
        providerGroupCode: "",
        providerGroupName: ""
      };
      if(!me.providerGroup.ProviderGroupCode)
        me.errorInput.providerGroupCode="Mã không để trống"
      if(!me.providerGroup.ProviderGroupName)
        me.errorInput.providerGroupName="Tên không để trống"
      if(me.errorInput.providerGroupCode|| me.errorInput.providerGroupName)
        return false;
      return true;
    },
    //Thêm mới một nhóm nhà cung cấp
    saveProviderGroup(){
      // trước khi lưu thì validate dữ liệu
      const me = this;
      let isValid = me.validateProviderGroupForm();
      //Chuyển về chế độ Cất
      if (me.providerGroupMode == FormMode.insertAndAdd) 
        me.setProviderGroupMode(FormMode.insert);

      if (isValid) {
        if (me.providerGroupMode == FormMode.insert) {
          me.providerGroup.CreatedBy = "LQTrung";
          me.insertProviderGroup(me.providerGroup);
        }
      }
    },
    //Thêm mới và reset form để thêm mới tiếp mà không cần đóng form
    saveAndReset(){
      // trước khi lưu thì validate dữ liệu
      const me = this;
      let isValid = me.validateProviderGroupForm();
      //Chuyển về chế độ Cất và reset lại form
      if (me.providerGroupMode == FormMode.insert) 
        me.setProviderGroupMode(FormMode.insertAndAdd);

      if (isValid) {
        if (me.providerGroupMode == FormMode.insertAndAdd) {
          me.providerGroup.CreatedBy = "LQTrung";
          me.insertProviderGroup(me.providerGroup);
          me.setParentProviderGroup({});
        }
      }
    }
  },
};
</script>
<style scoped>
@import url("../../css/components/popup.css");
@import url("../../css/components/tabComponent.css");
.m-content-provider-group {
  position: absolute;
  max-width: calc(100% - 64px);
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 2px;
  width: 600px;
  padding: 20px 32px;
}
textarea {
  resize: none;
  padding: 6px;
  overflow-y: hidden;
}
</style>