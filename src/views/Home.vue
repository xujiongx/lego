<template>
  <div class="content-container">
    <template-list :list="testData"></template-list>
    <a-button type="primary" @click="handleClick">跳转</a-button>
    <hello-world></hello-world>
  </div>
</template>

<script lang="ts">
import TemplateList from "../components/TemplateList.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import { GlobalDataProps } from '@/store';
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: "Homne",
  components: {
    TemplateList,
    HelloWorld,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const testData = computed(() => store.state.templates.data);
    console.log("testData", testData);

    const router = useRouter();

    const handleClick = () => {
      router.push({
        name: "template",
        params: {
          id: 3,
        },
      });
    };
    return {
      testData,
      handleClick,
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
  padding: 20px;
}
</style>
