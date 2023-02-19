<template>
  <div class="homepage-container">
    <a-layout :style="{ background: '#fff' }">
      <a-layout-header class="header">
        <router-link to="/">
          <div class="page-title">海报编辑</div>
        </router-link>
      </a-layout-header>
      <a-layout-content class="home-layout">
        <a-row :gutter="20">
          <a-col :span="8">
            <components-list
              :list="defaultTextTemplates"
              @onItemClick="addItem"
            />
          </a-col>
          <a-col :span="8" :style="{ position: 'relative' }">
            画布区域
            <!-- <div
              v-for="component in components"
              :key="component.id"
              :style="{ position: 'relative', height: '40px' }"
            >
              <component :is="component.name" v-bind="component.props" />
              <a-button type="primary" @click="deleteItem(component.id)"
                >删除</a-button
              >
            </div> -->

            <edit-wrapper
              v-for="component in components"
              :key="component.id"
              :id="component.id"
              @setActive="setActive(component.id)"
              :active="component.id === (currentElement && currentElement.id)"
              :style="{
                position: 'absolute',
                left: component.props.left,
                top: component.props.top,
                width: component.props.width,
                height: component.props.height,
              }"
            >
              <component :is="component.name" v-bind="component.props" />
            </edit-wrapper>
          </a-col>
          <a-col :span="8">
            组件属性
            <props-table
              v-if="currentElement"
              :props="currentElement.props"
              @change="updateItem"
            ></props-table>
            <div>{{ currentElement && currentElement.props }}</div>
          </a-col>
        </a-row>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { GlobalDataProps } from "@/store";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import LText from "@/components/LText.vue";
import { defaultTextTemplates } from "@/const/defaultTemplates";
import ComponentsList from "@/components/ComponentsList.vue";
import { TextComponentProps } from "@/const/defaultProps";
import EditWrapper from "@/components/EditWrapper.vue";
import { ComponentData } from "@/store/editor";
import PropsTable from "@/components/PropsTable.vue";
export default {
  name: "Homne",
  components: { LText, ComponentsList, EditWrapper, PropsTable },
  setup() {
    const store = useStore<GlobalDataProps>();
    const components = computed(() => store.state.editor.components);
    const currentElement = computed<ComponentData | null>(
      () => store.getters.getCurrentElement
    );

    const addItem = (item: Partial<TextComponentProps>) =>
      store.commit("add", item);

    const deleteItem = (id: string) => {
      store.commit("delete", { id });
    };

    const setActive = (id: string) => {
      store.commit("setActive", id);
    };
    const updateItem = (data: { key: string; value: string }) => {
      const { key, value } = data;
      store.commit("update", { key, value });
    };

    return {
      components,
      addItem,
      deleteItem,
      defaultTextTemplates,
      setActive,
      currentElement,
      updateItem,
    };
  },
};
</script>

<style scoped>
.header {
}
.page-title {
  color: #fff;
}
.content-container {
}
</style>
