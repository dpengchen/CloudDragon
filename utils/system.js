/**
 * 系统与导航栏尺寸工具
 */

/**
 * 获取系统状态栏与自定义导航栏的高度信息（参考首页规范）
 * @param {number} [defaultContentHeight=44] - 导航栏内容区默认高度（px），与首页 44px 保持一致
 * @returns {{ statusBarHeight: number, navBarContentHeight: number, navBarTotalHeight: number, capsuleMarginRight: number }}
 */
export const getNavMetrics = (defaultContentHeight = 44) => {
  let statusBarHeight = 20;
  let navBarContentHeight = defaultContentHeight;
  let capsuleMarginRight = 16;

  try {
    const sysInfo = uni.getSystemInfoSync();
    if (sysInfo.statusBarHeight) {
      statusBarHeight = sysInfo.statusBarHeight;
    }

    // #ifdef MP-WEIXIN
    const menuButton = uni.getMenuButtonBoundingClientRect();
    if (menuButton && menuButton.top) {
      navBarContentHeight = menuButton.height + (menuButton.top - statusBarHeight) * 2;
      capsuleMarginRight = (sysInfo.windowWidth - menuButton.left) + 12;
    }
    // #endif
  } catch (e) {
    console.warn('获取系统状态栏高度失败:', e);
  }

  return {
    statusBarHeight,
    navBarContentHeight,
    navBarTotalHeight: statusBarHeight + navBarContentHeight,
    capsuleMarginRight
  };
};

