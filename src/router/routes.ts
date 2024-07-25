import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/ExampleView.vue";
import AdminView from "@/views/AdminView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    meta: {
      hideInMenu: true,
    },
    // children: [
    //   {
    //     path: "/user/login",
    //     name: "用户登录",
    //     component: UserLoginView,
    //   },
    //   {
    //     path: "/user/register",
    //     name: "用户注册",
    //     component: UserRegisterView,
    //   },
    // ],
  },
  {
    path: "/user/login",
    name: "用户登录",
    component: UserLoginView,
  },
  {
    path: "/user/register",
    name: "用户注册",
    component: UserRegisterView,
  },
  {
    path: "/",
    name: "芙宁娜",
    component: HomeView,
  },
  {
    path: "/",
    name: "早柚",
    component: HomeView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/noAuth",
    name: "那维莱特",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/admin",
    name: "芙宁娜的老公",
    component: AdminView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/about",
    name: "阿蕾奇诺",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];
