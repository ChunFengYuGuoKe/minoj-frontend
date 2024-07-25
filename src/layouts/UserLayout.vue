<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <!--      <template v-if="!isLayout">-->
      <a-layout-header class="header">
        <a-space>
          <img src="../assets/logo.svg" class="logo" alt="飞了" />
          <div style="font-size: medium">敏 OJ</div>
        </a-space>
      </a-layout-header>
      <!--      </template>-->
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">一锅炖不下</a-layout-footer>
    </a-layout>
  </div>
</template>
<style scoped>
#userLayout {
  text-align: center;
  background-image: url("../assets/frieren.bmp");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 100vh;
  height: 100vh;
  position: relative; /* Ensure relative positioning for the pseudo-element */
}

#userLayout .logo {
  width: 64px;
  height: 64px;
}

#userLayout .header {
  margin-top: 16px;
  /*box-shadow: #eee 1px 1px 5px;*/
}

#userLayout .content {
  padding: 20px;
  margin-bottom: 16px;
}

#userLayout .footer {
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
<script setup lang="ts">
// 判断当前路由是否是登录或注册页面
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const isLayout = computed(() => {
  return route.path === "/user";
});
</script>
