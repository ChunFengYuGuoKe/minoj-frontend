<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
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
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>
        {{ store.state.user?.loginUser?.userName ?? "未登录" }}
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, ref, watch, watchEffect } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";

const store = useStore();
// const loginUser = computed(() => {
//   return store.state.user.loginUser;
// });

// 定义一个键来强制重新渲染菜单
const menuKey = ref(0);

// 可见的导航项
// 使用计算属性，实时更新变量，或者使用watchEffect监听变量
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

// watchEffect(() => {
//   menuKey.value += 1;
//   console.log("computedValue is" + visibleRoutes.value);
// });

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

setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "一锅炖不下",
    userRole: ACCESS_ENUM.ADMIN,
  });
}, 3000);
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
