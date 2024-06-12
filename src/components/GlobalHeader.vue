<template>
  <div id="globalHeader">
    <a-menu
      mode="horizontal"
      :selected-keys="selectedKeys"
      @menu-item-click="doMenuClick"
    >
      <a-menu-item
        key="0"
        :style="{ padding: 0, marginRight: '38px' }"
        disabled
      >
        <div class="title-bar">
          <img class="logo" src="../assets/logo.svg" alt="敏 OJ" />
          <div class="title">敏 OJ</div>
        </div>
      </a-menu-item>
      <a-menu-item v-for="item in routes" :key="item.path">
        {{ item.name }}
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { ref } from "vue";

// 默认主页，ref是动态响应式变量
const selectedKeys = ref(["/"]);

const router = useRouter();
// 路由跳转后，更新选中的变量
router.afterEach((to) => {
  selectedKeys.value = [to.path];
});

// 点击菜单执行跳转的方法
const doMenuClick = (key: string) => {
  router.push({ path: key });
};
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: black;
  margin-left: 10px;
}

.logo {
  height: 50px;
  width: 50px;
}
</style>
