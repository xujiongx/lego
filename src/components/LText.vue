<template>
  <component :is="tag" :style="{...styleProps,position:'relative'}" class="l-text-component" @click="handleClick">
    {{ text }}
  </component>
</template>

<script lang="ts">
import {
  textDefaultProps,
  textStylesPropsNames,
  transformToComponentProps,
} from "@/const/defaultProps";
import useComponentCommon from "@/hooks/useComponentCommon";
import { defineComponent } from "@vue/runtime-core";

const defaultProps = transformToComponentProps(textDefaultProps);
export default defineComponent({
  name: "l-text",
  props: {
    tag: {
      type: String,
      default: "div",
    },
    ...defaultProps,
  },
  setup(props) {
    const { styleProps, handleClick } = useComponentCommon(
      props,
      textStylesPropsNames
    );

    return {
      styleProps,
      handleClick
    };
  },
});
</script>

<style>
h2.l-text-component,
p.l-text-component {
  margin-bottom: 0;
}
button.l-text-component {
  padding: 5px 10px;
  cursor: pointer;
}
</style>
