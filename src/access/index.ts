import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  console.log("权限校验开始");
  const loginUser = store.state.user.loginUser;
  console.log("用户是否已登录" + loginUser.isLogin);
  // 如果之前没登陆，自动登录
  if (!loginUser.isLogin) {
    // 加await是为了等用户登录之后，再执行之后的代码
    await store.dispatch("user/getLoginUser");
  }
  // 获取将要访问的页面需要的权限
  const needAccess = (to.meta?.access ?? ACCESS_ENUM.NOT_LOGIN) as string;
  console.log("当前所需权限：" + needAccess);
  // 将访问的页面需要登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 如果没登陆，跳转到登录页
    if (!loginUser.isLogin) {
      // 登录成功后重定向回用户最初想要访问的页面
      console.log("权限校验结束");
      console.log("用户未登录，跳转登录");
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    // 如果已经登录了，但权限不足，跳转到无权限页面
    if (!checkAccess(loginUser, needAccess)) {
      console.log("权限校验结束");
      console.log("用户无权限");
      next("/noAuth");
      return;
    }
  }
  console.log("权限校验结束");
  console.log("用户有权限访问该页面");
  console.log("用户将要访问页面：" + to.path);
  next();
  // console.log(to);
});
