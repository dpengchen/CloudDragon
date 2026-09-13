<template>
  <view class="page-container">
    <!-- 顶部自定义导航栏（沉浸式，适配状态栏与小程序胶囊按钮） -->
    <view class="custom-navbar" :style="{ paddingTop: statusBarHeight + 'px',  }">
      <view class="navbar-content" :style="{ height: navBarContentHeight + 'px', paddingRight: capsuleMarginRight + 'px' }">
        <!-- 页面主标题 -->
        <view class="navbar-title-wrap">
          <text class="navbar-title">Guardian Home</text>
        </view>
        <!-- 头部右侧操作区（铃铛按钮，已预留小程序胶囊位置） -->
        <view class="navbar-action-wrap">
          <view class="bell-btn" hover-class="btn-hover" @tap="handleNoticeTap">
            <image class="bell-icon-img" src="/static/images/bell-icon.png" mode="aspectFit" />
          </view>
        </view>
      </view>
    </view>

    <!-- 占位避免导航遮挡内容 -->
    <view :style="{ height: navBarTotalHeight + 'px' }"></view>

    <!-- 页面滚动内容主体 -->
    <scroll-view scroll-y class="content-scroll">
      <view class="main-content">
        <!-- 卡片 1: 宠物实时守护状态卡片 -->
        <view class="pet-card">
          <!-- 顶部信息栏：模型状态 & 在线呼吸指示器 -->
          <view class="pet-card-header">
            <view class="model-badge">
              <view class="cube-icon"></view>
              <text class="badge-text">3D 拟真模型 · 守护中</text>
            </view>
            <view class="online-status">
              <view class="pulse-dot"></view>
              <text class="online-text">设备在线 · 呼吸灯同步</text>
            </view>
          </view>

          <!-- 3D/宠物拟真模型展示区域 (完整设计：渐变底色+金毛萌宠+底部拟态浮层状态胶囊) -->
          <view class="pet-visual-wrapper">
            <image 
              class="pet-visual-img" 
              src="/static/images/pet-visual-full.png" 
              mode="aspectFit" 
            />
          </view>

          <!-- 宠物名称、品种、守护天数 -->
          <view class="pet-meta-info">
            <view class="name-row">
              <text class="pet-name">麦麦</text>
              <text class="pet-breed">Golden Retriever</text>
            </view>
            <view class="badge-row">
              <view class="day-badge">
                <text class="day-badge-text">已守护 428 天</text>
              </view>
              <view class="heartbeat-badge">
                <view class="heart-pulse-icon"></view>
                <text class="heartbeat-text">心跳频次 82 bpm</text>
              </view>
            </view>
          </view>

          <!-- 互动操作面板 (轻声唤醒、思念之声、抚摸互动) -->
          <view class="interactive-panel">
            <!-- 操作项 1: 轻声唤醒 -->
            <view class="action-item" hover-class="action-item--hover" @tap="handleInteraction('唤醒')">
              <view class="item-icon-box item-icon--wake">
                <image class="action-icon-img" src="/static/images/action-wake.png" mode="aspectFit" />
              </view>
              <view class="item-text-wrap">
                <text class="item-title">轻声唤醒</text>
                <text class="item-sub">声波呼吸</text>
              </view>
            </view>

            <view class="panel-divider"></view>

            <!-- 操作项 2: 思念之声 -->
            <view class="action-item" hover-class="action-item--hover" @tap="handleInteraction('思念')">
              <view class="item-icon-box item-icon--sound">
                <image class="action-icon-img" src="/static/images/action-sound.png" mode="aspectFit" />
              </view>
              <view class="item-text-wrap">
                <text class="item-title">思念之声</text>
                <text class="item-sub">回放呼噜声</text>
              </view>
            </view>

            <view class="panel-divider"></view>

            <!-- 操作项 3: 抚摸互动 -->
            <view class="action-item" hover-class="action-item--hover" @tap="handleInteraction('抚摸')">
              <view class="item-icon-box item-icon--touch">
                <image class="action-icon-img" src="/static/images/action-touch.png" mode="aspectFit" />
              </view>
              <view class="item-text-wrap">
                <text class="item-title">抚摸互动</text>
                <text class="item-sub">触觉振颤</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 卡片 2: 我的陪伴设备组 -->
        <view class="section-container">
          <!-- 标题栏：包含爪印Icon、主标题与嵌入式终端Tag -->
          <view class="section-header">
            <view class="section-title-wrap">
              <image class="section-badge-icon" src="/static/images/device-section-icon.png" mode="aspectFit" />
              <text class="section-title">我的陪伴设备</text>
              <view class="terminal-badge">
                <text class="terminal-text">嵌入式终端</text>
              </view>
            </view>
            <!-- 添加新设备圆钮 -->
            <view class="add-device-btn" hover-class="btn-hover" @tap="handleAddDevice">
              <text class="add-plus-icon">+</text>
            </view>
          </view>

          <!-- 主设备卡片 (麦麦的数字灵犀盒 Pro) -->
          <view class="device-card device-card--main">
            <!-- 设备主头部 -->
            <view class="device-main-head">
              <view class="device-info-left">
                <view class="device-box-icon-wrap">
                  <image class="device-box-icon" src="/static/images/device-box-icon.png" mode="aspectFit" />
                </view>
                <view class="device-name-col">
                  <view class="device-title-row">
                    <text class="device-name">麦麦的数字灵犀盒</text>
                    <view class="pro-tag"><text class="pro-tag-text">Pro版</text></view>
                  </view>
                  <text class="device-desc">唤醒词「麦麦」· 实时全息渲染</text>
                </view>
              </view>
              <view class="device-status-badge">
                <view class="green-indicator"></view>
                <text class="status-badge-text">已连接</text>
              </view>
            </view>

            <!-- 规格属性 2x2 网格 (包含各自专属Icon) -->
            <view class="device-grid">
              <!-- 格 1: 连接状态 -->
              <view class="grid-item">
                <view class="grid-icon-wrap">
                  <image class="grid-icon" src="/static/images/status-conn.png" mode="aspectFit" />
                </view>
                <view class="grid-text-col">
                  <text class="grid-label">连接状态</text>
                  <text class="grid-value">蓝牙已连接 · 信号极佳</text>
                </view>
              </view>
              <!-- 格 2: 剩余电量 -->
              <view class="grid-item">
                <view class="grid-icon-wrap">
                  <image class="grid-icon" src="/static/images/status-battery.png" mode="aspectFit" />
                </view>
                <view class="grid-text-col">
                  <text class="grid-label">剩余电量</text>
                  <text class="grid-value">88% · 正常守护中</text>
                </view>
              </view>
              <!-- 格 3: 网络配置 -->
              <view class="grid-item">
                <view class="grid-icon-wrap">
                  <image class="grid-icon" src="/static/images/status-wifi.png" mode="aspectFit" />
                </view>
                <view class="grid-text-col">
                  <text class="grid-label">网络配置</text>
                  <text class="grid-value">Home_Studio_5G</text>
                </view>
              </view>
              <!-- 格 4: 当前音色 -->
              <view class="grid-item">
                <view class="grid-icon-wrap">
                  <image class="grid-icon" src="/static/images/status-voice.png" mode="aspectFit" />
                </view>
                <view class="grid-text-col">
                  <text class="grid-label">当前音色</text>
                  <text class="grid-value">温顺小奶犬</text>
                </view>
              </view>
            </view>
          </view>

          <!-- 次级设备卡片 (星星项圈 Lite) -->
          <view class="device-card device-card--sub">
            <view class="device-sub-left">
              <view class="collar-icon-wrap">
                <image class="collar-icon-img" src="/static/images/device-collar-icon.png" mode="aspectFit" />
              </view>
              <view class="sub-info-col">
                <view class="device-title-row">
                  <text class="device-name sub-name">星星项圈</text>
                  <view class="lite-tag"><text class="lite-tag-text">Lite版</text></view>
                </view>
                <text class="device-desc">体征温感与低频脉冲</text>
              </view>
            </view>
            <view class="device-sub-right">
              <text class="sleep-status-text">休眠待机</text>
              <text class="battery-status-text">电池 65%</text>
            </view>
          </view>
        </view>

        <!-- 卡片 3: 温馨诗意标语卡片 -->
        <view class="quote-card">
          <view class="quote-icon-circle">
            <image class="quote-img" src="/static/images/quote-icon.png" mode="aspectFit" />
          </view>
          <view class="quote-text-wrap">
            <text class="quote-content">爱的形态在数字星球延续，每次呼唤皆有回响。</text>
          </view>
          <view class="quote-ambient-blur"></view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 状态栏及胶囊适配
const statusBarHeight = ref(20);
const navBarContentHeight = ref(44);
const navBarTotalHeight = ref(64);
const capsuleMarginRight = ref(16);

onMounted(() => {
  try {
    const sysInfo = uni.getSystemInfoSync();
    if (sysInfo.statusBarHeight) {
      statusBarHeight.value = sysInfo.statusBarHeight;
    }

    // #ifdef MP-WEIXIN
    const menuButton = uni.getMenuButtonBoundingClientRect();
    if (menuButton && menuButton.top) {
      // 胶囊高度与上下 padding 算出的内容高度
      navBarContentHeight.value = menuButton.height + (menuButton.top - statusBarHeight.value) * 2;
      // 胶囊右侧占位（屏幕宽度减去胶囊左边界，留出安全边距）
      capsuleMarginRight.value = (sysInfo.windowWidth - menuButton.left) + 12;
    }
    // #endif

    navBarTotalHeight.value = statusBarHeight.value + navBarContentHeight.value;
  } catch (e) {
    console.error('获取系统信息失败:', e);
  }
});

const handleInteraction = (type) => {
  uni.showToast({
    title: `麦麦收到了你的${type}`,
    icon: 'none'
  });
};

const handleAddDevice = () => {
  uni.showToast({
    title: '正在搜索附近设备...',
    icon: 'none'
  });
};

const handleNoticeTap = () => {
  uni.showToast({
    title: '暂无未读消息',
    icon: 'none'
  });
};
</script>

<style lang="scss" scoped>
/* 调色板与系统常量定义（完全基于 Figma 设计值） */
$bg-main: #FCF8FB;
$text-primary: #1B1B1D;
$text-secondary: #554339;
$text-sub: #8C7A70;
$primary-color: #994703;
$primary-tag-bg: #FFEAD9;
$teal-color: #006A62;
$teal-bg: #D7F2EE;
$card-white: #FFFFFF;
$card-inner-bg: #F6F3F5;
$border-color: #F0EAE7;

.page-container {
  min-height: 100vh;
  background-color: $bg-main;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

/* 顶部自定义导航栏 */
.custom-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(252, 248, 251, 0.94);
  backdrop-filter: blur(16px);
  z-index: 999;
  display: flex;
  flex-direction: column;
}

.navbar-content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding-left: 36rpx;
}

.navbar-title-wrap {
  display: flex;
  align-items: center;
}

.navbar-title {
  font-size: 38rpx;
  font-weight: 700;
  color: $text-primary;
  letter-spacing: -0.5rpx;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.navbar-action-wrap {
  display: flex;
  align-items: center;
}

.bell-btn {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  background-color: $primary-color;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 14rpx rgba(153, 71, 3, 0.28);
  transition: opacity 0.15s ease;
}

.bell-icon-img {
  width: 28rpx;
  height: 28rpx;
}

.btn-hover {
  opacity: 0.85;
  transform: scale(0.96);
}

/* 滚动主容器 */
.content-scroll {
  flex: 1;
  width: 100%;
}

.main-content {
  padding: 20rpx 32rpx 60rpx 32rpx;
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

/* 卡片 1: 宠物展示卡片 */
.pet-card {
  background-color: $card-white;
  border-radius: 48rpx;
  padding: 32rpx 32rpx 28rpx 32rpx;
  box-shadow: 0 12rpx 40rpx rgba(27, 27, 29, 0.04);
  display: flex;
  flex-direction: column;
  position: relative;
}

.pet-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.model-badge {
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.cube-icon {
  width: 16rpx;
  height: 16rpx;
  background: $primary-color;
  transform: rotate(45deg);
  border-radius: 3rpx;
}

.badge-text {
  font-size: 24rpx;
  font-weight: 500;
  color: $text-primary;
}

.online-status {
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.pulse-dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background-color: #00A389;
  box-shadow: 0 0 10rpx rgba(0, 163, 137, 0.6);
}

.online-text {
  font-size: 22rpx;
  color: $teal-color;
  font-weight: 500;
}

/* 宠物完整渲染视觉区域 */
.pet-visual-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20rpx;
}

.pet-visual-img {
  width: 560rpx;
  height: 576rpx;
  border-radius: 48rpx;
}

/* 宠物详细信息 */
.pet-meta-info {
  margin-top: 12rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.name-row {
  display: flex;
  align-items: baseline;
  gap: 16rpx;
}

.pet-name {
  font-size: 44rpx;
  font-weight: 700;
  color: $text-primary;
}

.pet-breed {
  font-size: 26rpx;
  color: $text-secondary;
}

.badge-row {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.day-badge {
  background-color: $primary-tag-bg;
  padding: 8rpx 20rpx;
  border-radius: 999rpx;
}

.day-badge-text {
  font-size: 24rpx;
  font-weight: 600;
  color: $primary-color;
}

.heartbeat-badge {
  background-color: $card-inner-bg;
  padding: 8rpx 20rpx;
  border-radius: 999rpx;
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.heart-pulse-icon {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background-color: #E24A4A;
}

.heartbeat-text {
  font-size: 24rpx;
  color: $text-secondary;
}

/* 底部互动交互胶囊 */
.interactive-panel {
  margin-top: 32rpx;
  background-color: rgba(246, 243, 245, 0.75);
  border-radius: 36rpx;
  padding: 24rpx 16rpx;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 14rpx;
  padding: 10rpx 14rpx;
  border-radius: 20rpx;
  transition: background-color 0.2s ease;
}

.action-item--hover {
  background-color: rgba(255, 255, 255, 0.85);
}

.item-icon-box {
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.item-icon--wake {
  background-color: rgba(255, 219, 201, 0.6);
}

.item-icon--sound {
  background-color: rgba(234, 221, 255, 0.7);
}

.item-icon--touch {
  background-color: rgba(255, 219, 201, 0.6);
}

.action-icon-img {
  width: 32rpx;
  height: 32rpx;
}

.item-text-wrap {
  display: flex;
  flex-direction: column;
}

.item-title {
  font-size: 24rpx;
  font-weight: 600;
  color: $text-primary;
}

.item-sub {
  font-size: 20rpx;
  color: $text-sub;
  margin-top: 2rpx;
}

.panel-divider {
  width: 2rpx;
  height: 48rpx;
  background-color: #E8E2E5;
}

/* 卡片 2: 设备管理区域 */
.section-container {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4rpx;
}

.section-title-wrap {
  display: flex;
  align-items: center;
  gap: 14rpx;
}

.section-badge-icon {
  width: 40rpx;
  height: 38rpx;
}

.section-title {
  font-size: 36rpx;
  font-weight: 700;
  color: $text-primary;
}

.terminal-badge {
  background-color: $card-inner-bg;
  padding: 6rpx 16rpx;
  border-radius: 999rpx;
}

.terminal-text {
  font-size: 20rpx;
  color: $text-secondary;
}

.add-device-btn {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  background-color: #ECE8EC;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease;
}

.add-plus-icon {
  font-size: 38rpx;
  font-weight: 400;
  color: $text-primary;
  line-height: 1;
  margin-top: -4rpx;
}

/* 设备主卡片 */
.device-card {
  background-color: $card-white;
  border-radius: 48rpx;
  padding: 32rpx;
  box-shadow: 0 10rpx 36rpx rgba(27, 27, 29, 0.03);
}

.device-main-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28rpx;
}

.device-info-left {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.device-box-icon-wrap {
  width: 88rpx;
  height: 88rpx;
  border-radius: 32rpx;
  background-color: rgba(255, 219, 201, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.device-box-icon {
  width: 44rpx;
  height: 38rpx;
}

.device-name-col {
  display: flex;
  flex-direction: column;
  gap: 6rpx;
}

.device-title-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.device-name {
  font-size: 32rpx;
  font-weight: 700;
  color: $text-primary;
}

.pro-tag {
  background-color: $primary-tag-bg;
  padding: 4rpx 12rpx;
  border-radius: 8rpx;
}

.pro-tag-text {
  font-size: 20rpx;
  font-weight: 600;
  color: $primary-color;
}

.device-desc {
  font-size: 22rpx;
  color: $text-secondary;
}

.device-status-badge {
  background-color: $teal-bg;
  padding: 8rpx 18rpx;
  border-radius: 999rpx;
  display: flex;
  align-items: center;
  gap: 10rpx;
  flex-shrink: 0;
}

.green-indicator {
  width: 12rpx;
  height: 12rpx;
  background-color: $teal-color;
  border-radius: 50%;
}

.status-badge-text {
  font-size: 22rpx;
  font-weight: 600;
  color: $teal-color;
}

/* 2x2 网格 */
.device-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16rpx;
}

.grid-item {
  background-color: #FAFAFA;
  border-radius: 28rpx;
  padding: 22rpx 20rpx;
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.grid-icon-wrap {
  width: 44rpx;
  height: 44rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.grid-icon {
  width: 36rpx;
  height: 36rpx;
}

.grid-text-col {
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}

.grid-label {
  font-size: 20rpx;
  color: $text-sub;
}

.grid-value {
  font-size: 24rpx;
  font-weight: 600;
  color: $text-primary;
  line-height: 1.3;
}

/* 次级设备 (星星项圈) */
.device-card--sub {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 32rpx;
}

.device-sub-left {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.collar-icon-wrap {
  width: 88rpx;
  height: 88rpx;
  border-radius: 32rpx;
  background-color: #EAE7EA;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.collar-icon-img {
  width: 40rpx;
  height: 38rpx;
}

.sub-info-col {
  display: flex;
  flex-direction: column;
  gap: 6rpx;
}

.sub-name {
  font-size: 30rpx;
}

.lite-tag {
  background-color: #EFEBE9;
  padding: 4rpx 12rpx;
  border-radius: 8rpx;
}

.lite-tag-text {
  font-size: 20rpx;
  font-weight: 600;
  color: $text-secondary;
}

.device-sub-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6rpx;
}

.sleep-status-text {
  font-size: 24rpx;
  font-weight: 500;
  color: $text-secondary;
}

.battery-status-text {
  font-size: 20rpx;
  color: $text-sub;
}

/* 卡片 3: 诗意语录 */
.quote-card {
  background-color: #F6F3F5;
  border-radius: 40rpx;
  padding: 28rpx 32rpx;
  display: flex;
  align-items: center;
  gap: 24rpx;
  position: relative;
  overflow: hidden;
}

.quote-icon-circle {
  width: 64rpx;
  height: 64rpx;
  background-color: #FFFFFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.04);
  flex-shrink: 0;
}

.quote-img {
  width: 32rpx;
  height: 32rpx;
}

.quote-text-wrap {
  flex: 1;
  z-index: 2;
}

.quote-content {
  font-size: 24rpx;
  color: $text-primary;
  line-height: 1.6;
}

.quote-ambient-blur {
  position: absolute;
  right: -20rpx;
  bottom: -20rpx;
  width: 140rpx;
  height: 140rpx;
  background-color: rgba(255, 219, 201, 0.35);
  border-radius: 50%;
  filter: blur(24rpx);
}
</style>
