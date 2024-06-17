import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 检查权限（判断当前用户是否具有某个权限）
 * @param loginUser 当前用户
 * @param needAccess 需要的权限
 * @return boolean 有无权限
 */
const checkAccess = (loginUser: any, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
  // 1. 获取用户权限，如果没有，则表示未登录
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
  console.log("loginUserAccess" + loginUserAccess);
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }
  // 2. 如果用户登录才能访问
  if (needAccess === ACCESS_ENUM.USER) {
    // 如果用户未登录则表示无权限
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }
  // 3. 如果需要管理员权限
  if (needAccess === ACCESS_ENUM.ADMIN) {
    // 如果用非管理员则表示无权限
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }
  return true;
};

export default checkAccess;
