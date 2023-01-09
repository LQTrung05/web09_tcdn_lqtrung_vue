<script setup>
import { useSlots, ref, provide } from "vue";
const slots = useSlots();
const tabTitles = ref(slots.default().map((tab) => tab.props.title));
const selectedTitle = ref(tabTitles.value[0]);
provide("selectedTitle", selectedTitle);
</script>

<template>
  <div class="tabs">
    <ul class="tabs__header">
      <li
        v-for="title in tabTitles"
        :key="title"
        class="tabs__item"
        :class="{ selected: selectedTitle === title }"
        @click="selectedTitle = title"
      >
        {{ title }}
      </li>
    </ul>

    <slot />
  </div>
</template>
<style>
.tabs {
  width: 100%;
  margin: 0 auto;
}
.tabs__header {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: end;
}
.tabs__item {
  cursor: pointer;
  user-select: none;
  height: 26px;
  margin-right:2px;
  padding: 3px 8px;
  border: 1px solid #c9ccd2;
  border-bottom: none;
  border-radius: 2px 2px 0 0;
}
.tabs__item.selected {
  background: #cce4f9;
  height: 32px;
  padding: 6px 8px;

}
.tabs__item:hover{
  color: #2ca01c;
}
.tabs__content {
  min-height: 220px;
  height: 220px;
  display: flex;
  /* display: grid;
  place-items: center; */
  border-radius: 0 0 5px 5px;
  border: 1px solid #babec5;

}
</style>