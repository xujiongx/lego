<template>
  <div class="props-table">
    <div v-for="(value, key) in finalProps" :key="key">
      <div v-if="value" class="prop-item">
        <span class="label">{{ value.text }}</span>
        <div class="prop-component">
          <component
            :is="value.component"
            :[value.valueProp]="value.value"
            v-bind="value.extraProps"
            v-on="value.events"
          >
            <component
              :is="value.subComponent"
              v-for="item in value.options"
              :key="item.value"
              :value="item.value"
            >
              <render-vnode :vNode="item.text"></render-vnode>
            </component>
          </component>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { TextComponentProps } from "@/const/defaultProps";
import { mapPropsToFrom } from "@/const/propsMap";
import _ from "lodash";
import { computed, defineComponent, PropType, VNode } from "vue";
import RenderVnode from "./RenderVNode";

interface FromProps {
  component: string;
  subComponent?: string;
  value: string;
  extraProps?: { [key: string]: any };
  text?: string;
  options?: { text: string | VNode; value: any }[];
  valueProp: string;
  eventName: string;
  events: { [key: string]: (value: any) => void };
}

export default defineComponent({
  name: "props-table",
  props: {
    props: {
      type: Object as PropType<TextComponentProps | null>,
      required: true,
    },
  },
  components: { RenderVnode },
  emits: ["change"],
  setup(props, content) {
    const finalProps = computed(() => {
      return _.reduce(
        props.props,
        (result, value, key) => {
          const newKeys = key as keyof TextComponentProps;
          const item = mapPropsToFrom[newKeys];
          if (item) {
            const {
              initalTransform,
              updateTransform,
              valueProp = "value",
              component,
              subComponent,
              options,
              eventName = "change",
              extraProps,
            } = item;
            const newItem: FromProps = {
              component,
              subComponent,
              options,
              value: initalTransform ? initalTransform(value) : value,
              valueProp,
              extraProps,
              eventName,
              events: {
                [eventName]: (e) => {
                  content.emit("change", {
                    key: newKeys,
                    value: updateTransform ? updateTransform(e) : e,
                  });
                },
              },
            };
            result[newKeys] = newItem;
          }
          return result;
        },
        {} as { [key: string]: FromProps }
      );
    });

    return {
      finalProps,
    };
  },
});
</script>

<style scoped>
.prop-item {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}
.label {
  margin-right: 20px;
}
.prop-component {
  min-width: 200px;
}
</style>
