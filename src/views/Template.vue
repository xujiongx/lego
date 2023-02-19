<template>
  <div class="homepage-container">
    <!-- Template{{ $route.params.id }} -->
    Template{{ route.params }}
    <router-link :to="{ name: 'editor', params: { id: route.params.id } }"
      >Go to Editor</router-link
    >
    <div>{{ template.title }}</div>
    <img :src="template.coverImage" :style="{width:'100px'}"/>
    <div>{{ template.author }}</div>
  </div>
</template>

<script lang="ts">
import { computed } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { GlobalDataProps } from '@/store';
import { Template } from '@/store/templates';

export default {
  name: "Template",
  components: {},
  setup() {
    const route = useRoute();
    const store = useStore<GlobalDataProps>();
    console.log(route);
    const template = computed<Template>(() =>
      store.getters.getTemplateById(+route.params.id)
    );
    console.log(template);

    return {
      route,
      template,
    };
  },
};
</script>

<style scoped></style>
