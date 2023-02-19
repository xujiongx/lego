<template>
  <div
    v-for="template in list"
    :key="template.text"
    @click="onItemClick(template)"
    class="component"
  >
    <l-text v-bind="template"></l-text>
  </div>
</template>

<script lang="ts">
import { TextComponentProps } from "@/const/defaultProps";
import { defineComponent, PropType } from "vue";
import LText from "@/components/LText.vue";

export default defineComponent({
  name: "components-list",
  props: {
    list: Array as PropType<Partial<TextComponentProps>[]>,
  },
  components: {
    LText,
  },
  emits: ["on-item-click"],
  setup(props, content) {
    const onItemClick = (item: Partial<TextComponentProps>) =>
      content.emit("on-item-click", item);

    return {
      onItemClick,
    };
  },
});
</script>

<style scoped>
.component {
  position: relative;
  height: 50px;
}
.component:hover {
  border: 1px solid #ccc;
}
</style>
