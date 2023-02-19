<template>
  <div class="homepage-container" v-if="withHeader">
    <a-layout :style="{ background: '#fff' }">
      <a-layout-header class="header">
        <router-link to="/">
          <div class="page-title">慕课乐高</div>
        </router-link>
        <a-button type="primary" v-if="!user.isLogin" @click="login">登录</a-button>
        <a-dropdown-button v-if="user.isLogin">
          <router-link to="/setting">{{user.userName}}</router-link>
          <template #overlay>
            <a-menu>
              <a-menu-item key="0" @click="logout"> 登出 </a-menu-item>
              <a-menu-item key="2"> 我的 </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown-button>
      </a-layout-header>
      <a-layout-content class="home-layout">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer> @版权所有 </a-layout-footer>
    </a-layout>
  </div>
  <div class="homepage-container" v-else><router-view></router-view></div>
</template>

<script lang="ts">
import { message } from "ant-design-vue";
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { GlobalDataProps } from "./store";

export default defineComponent({
  name: "App",
  setup() {
    const route = useRoute();
    const withHeader = computed(() => route.meta.withHeader);
    const store = useStore<GlobalDataProps>();
    const user = computed(() => store.state.user.data);

    const login=()=>{
      store.commit('login')
      message.success('登录成功',2)
    }
    const logout=()=>{
      store.commit('logout')
      
    }

    return {
      withHeader,
      user,
      login,
      logout
    };
  },
});
</script>

<style scoped>
.header {
  display: flex;
  color: #fff;
}
.page-title {
  color: #fff;
  margin-right: 100px;
}
</style>
