<template>
  <div :class="inputWidth" :style="{width: valueInputWidth}">
    <div v-if="inputLabel" class="display-f m-mb-4" >
      <div class="m-input-title" :title="labelToolTip" >
        {{ inputLabel }}
      </div>
      <div v-if="validateType == 'required'" class="m-icon-require">&nbsp;*</div>
    </div>
    <input
      :type="inputType"
      class="m-input-form"
      :class="{
        'm-input-form-error': errorMess,
        'input-date': inputType == 'date',
        'text-align-right': textAlignRight== true
      }"
      @input="$emit('update:modelValue',$event.target.value)"
      :value="modelValue"
      :tabindex="tabIndex"
      :maxlength="maxlength"
      :placeholder="placeholderValue"
    />
    
    <div v-if="errorMess" class="err-message">
      {{ errorMess }}
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    inputLabel: {
      type:String
     },
     errorMess: {
      type:String
     },
     inputWidth: {
      type:String
     },
     validateType: {
      type:String
     },
     modelValue: {
     },
     inputType: {
     },
     tabIndex: {
     },
     placeHolder: {
      type:String
     },
     labelToolTip: {
      type:String
     },
     maxlength:{

     },
     placeholderValue:{},
     valueInputWidth:{},
     textAlignRight:{
      type:Boolean,
      default:false
     },
     bankAccountList:{},


  },
  emits: ["update:modelValue"],
  
  methods: {
  },
  data() {
    return {
    };
  },
  
};
</script>