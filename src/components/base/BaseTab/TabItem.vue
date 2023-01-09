<script setup>
import { inject } from "vue";
// eslint-disable-next-line
/* eslint-disable */
const props = defineProps({
  title: String,
});
const selectedTitle = inject("selectedTitle");
// const emit = defineEmits(["openTabItem"]);
// function btnClick(params) {
//     emit('openTabItem')
// }
</script>

<template>
  <div
    class="tabs__content"
    v-if="selectedTitle === title"
    
  >
    <slot />
  </div>
</template>