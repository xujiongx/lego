<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="6" v-for="item in list" :key="item.id">
        <a-card hoverable :style="{ marginBottom: '10px' }">
          <router-link :to="`/template/${item.id}`">
            {{ item.title }}
          </router-link>
          <div>{{ item.author }}</div>
          <img :src="item.coverImage" :style="{ width: '100px' }" />
          <div>{{ item.copiedCount }}</div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { Template } from '@/store/templates';

export default {
  name: "Template",
  props: {
    list: {
      type: Array as PropType<Template[]>,
      require: true,
    },
  },
};
</script>

<style></style>
