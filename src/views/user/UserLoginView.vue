<template>
  <div id="userLoginView">
    <h2>用户登录</h2>
    <a-form
      style="max-width: 360px; margin: 0 auto"
      auto-label-width
      label-align="left"
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账户">
        <a-input v-model="form.userAccount" placeholder="请输入账户" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于 8 位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          style="width: 100px; border-radius: 5px"
          html-type="submit"
          >登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const router = useRouter();
const store = useStore();

/**
 * 提交表单执行信息
 * @param data
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登陆失败，" + res.msg);
  }
  alert(JSON.stringify(form));
};
</script>
