<template>
  <div
    class="edit-warpper"
    @click="onItemClick(id)"
    :class="{ active: active }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "edit-warpper",
  props: {
    id: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      require: false,
    },
  },
  emits: ["set-active"],
  setup(props, content) {
    const onItemClick = (id: string) => {
      content.emit("set-active", id);
    };

    return {
      onItemClick,
    };
  },
});
</script>

<style scoped>
.edit-warpper {
  padding: 0;
  cursor: pointer;
  border: 1px solid transparent;
  user-select: none;
}
.edit-warpper:hover {
  border: 1px dashed #ccc;
}
.edit-warpper.active {
  border: 1px solid #1890ff;
  user-select: none;
  z-index: 1500;
}
</style>
