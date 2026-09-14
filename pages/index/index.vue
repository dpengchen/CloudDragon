<template>
  <view class="min-h-screen bg-[#FCF8FB] flex flex-col box-border">
    <!-- 顶部自定义导航栏（沉浸式，适配状态栏与小程序胶囊按钮） -->
    <view class="fixed top-0 left-0 right-0 bg-[#FCF8FB]/95 backdrop-blur-[16px] z-[999] flex flex-col" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="w-full flex items-center justify-between box-border pl-[36rpx]" :style="{ height: navBarContentHeight + 'px', paddingRight: capsuleMarginRight + 'px' }">
        <!-- 页面主标题 -->
        <view class="flex items-center">
          <text class="text-[38rpx] font-bold text-[#1B1B1D] tracking-[-0.5rpx]">Guardian Home</text>
        </view>
      </view>
    </view>

    <!-- 占位避免导航遮挡内容 -->
    <view :style="{ height: navBarTotalHeight + 'px' }"></view>

    <!-- 页面滚动内容主体 -->
    <scroll-view scroll-y class="flex-1 w-full">
      <view class="px-[32rpx] pt-[20rpx] pb-[60rpx] flex flex-col gap-[32rpx]">
        <!-- 卡片 1: 宠物实时守护状态卡片 -->
        <view class="bg-white rounded-[48rpx] p-[32rpx] pb-[28rpx] shadow-[0_12rpx_40rpx_rgba(27,27,29,0.04)] flex flex-col relative">

          <!-- 3D/宠物拟真模型展示区域 (完整设计：渐变底色+金毛萌宠+底部拟态浮层状态胶囊) -->
          <view class="w-full flex justify-center items-center mb-[20rpx]">
            <image 
              class="w-[560rpx] h-[576rpx] rounded-[48rpx]" 
              src="/static/images/pet-visual-full.png" 
              mode="aspectFit" 
            />
          </view>

          <!-- 宠物名称、品种、守护天数 -->
          <view class="mt-[12rpx] flex flex-col gap-[16rpx]">
            <view class="flex items-baseline gap-[16rpx]">
              <text class="text-[44rpx] font-bold text-[#1B1B1D]">麦麦</text>
              <text class="text-[26rpx] text-[#554339]">Golden Retriever</text>
            </view>
            <view class="flex items-center gap-[16rpx]">
              <view class="flex items-center justify-center h-[52rpx] bg-[#FFEAD9] px-[22rpx] rounded-full">
                <text class="text-[24rpx] font-semibold text-[#994703]">已守护 428 天</text>
              </view>
              <view class="flex items-center justify-center h-[52rpx] bg-[#F6F3F5] px-[22rpx] rounded-full gap-[10rpx]">
                <view class="w-[12rpx] h-[12rpx] rounded-full bg-[#E24A4A] shrink-0"></view>
                <text class="text-[24rpx] text-[#554339]">心跳频次 82 bpm</text>
              </view>
            </view>
          </view>

          <!-- 互动操作面板 (轻声唤醒、思念之声、抚摸互动) -->
          <view class="mt-[32rpx] bg-[#F6F3F5]/75 rounded-[36rpx] py-[24rpx] px-[16rpx] flex items-center justify-around">
            <!-- 操作项 1: 轻声唤醒 -->
            <view class="flex flex-col items-center gap-[10rpx] px-[14rpx] py-[10rpx] rounded-[20rpx] transition-colors duration-200" hover-class="bg-white/85" @tap="handleInteraction('唤醒')">
              <view class="w-[72rpx] h-[72rpx] rounded-full bg-[#FFDBC9]/60 flex items-center justify-center shrink-0">
                <image class="w-[32rpx] h-[32rpx]" src="/static/images/action-wake.png" mode="aspectFit" />
              </view>
              <view class="flex flex-col items-center text-center">
                <text class="text-[24rpx] font-semibold text-[#1B1B1D]">轻声唤醒</text>
                <text class="text-[20rpx] text-[#8C7A70] mt-[2rpx]">声波呼吸</text>
              </view>
            </view>

            <view class="w-[2rpx] h-[48rpx] bg-[#E8E2E5]"></view>

            <!-- 操作项 2: 思念之声 -->
            <view class="flex flex-col items-center gap-[10rpx] px-[14rpx] py-[10rpx] rounded-[20rpx] transition-colors duration-200" hover-class="bg-white/85" @tap="handleInteraction('思念')">
              <view class="w-[72rpx] h-[72rpx] rounded-full bg-[#EADDFF]/70 flex items-center justify-center shrink-0">
                <image class="w-[32rpx] h-[32rpx]" src="/static/images/action-sound.png" mode="aspectFit" />
              </view>
              <view class="flex flex-col items-center text-center">
                <text class="text-[24rpx] font-semibold text-[#1B1B1D]">思念之声</text>
                <text class="text-[20rpx] text-[#8C7A70] mt-[2rpx]">回放呼噜声</text>
              </view>
            </view>

            <view class="w-[2rpx] h-[48rpx] bg-[#E8E2E5]"></view>

            <!-- 操作项 3: 抚摸互动 -->
            <view class="flex flex-col items-center gap-[10rpx] px-[14rpx] py-[10rpx] rounded-[20rpx] transition-colors duration-200" hover-class="bg-white/85" @tap="handleInteraction('抚摸')">
              <view class="w-[72rpx] h-[72rpx] rounded-full bg-[#FFDBC9]/60 flex items-center justify-center shrink-0">
                <image class="w-[32rpx] h-[32rpx]" src="/static/images/action-touch.png" mode="aspectFit" />
              </view>
              <view class="flex flex-col items-center text-center">
                <text class="text-[24rpx] font-semibold text-[#1B1B1D]">抚摸互动</text>
                <text class="text-[20rpx] text-[#8C7A70] mt-[2rpx]">触觉振颤</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 卡片 2: 我的陪伴设备组 -->
        <view class="flex flex-col gap-[20rpx]">
          <!-- 标题栏：包含爪印Icon、主标题与嵌入式终端Tag -->
          <view class="flex justify-between items-center px-[4rpx]">
            <view class="flex items-center gap-[14rpx]">
              <image class="w-[40rpx] h-[38rpx] shrink-0" src="/static/images/device-section-icon.png" mode="aspectFit" />
              <text class="text-[36rpx] font-bold text-[#1B1B1D]">我的陪伴设备</text>
              <view class="flex items-center justify-center h-[38rpx] bg-[#F6F3F5] px-[16rpx] rounded-full">
                <text class="text-[20rpx] text-[#554339]">嵌入式终端</text>
              </view>
            </view>
            <!-- 添加新设备圆钮 -->
            <view class="w-[64rpx] h-[64rpx] rounded-full bg-[#ECE8EC] flex items-center justify-center transition-transform duration-150" hover-class="scale-95" @tap="handleAddDevice">
              <text class="text-[38rpx] font-normal text-[#1B1B1D] leading-none -mt-[4rpx]">+</text>
            </view>
          </view>

          <!-- 主设备卡片 (麦麦的数字灵犀盒 Pro) -->
          <view class="bg-white rounded-[48rpx] p-[32rpx] shadow-[0_10rpx_36rpx_rgba(27,27,29,0.03)]">
            <!-- 设备主头部 -->
            <view class="flex justify-between items-center mb-[28rpx]">
              <view class="flex items-center gap-[20rpx] flex-1 min-w-0 mr-[16rpx]">
                <view class="w-[88rpx] h-[88rpx] rounded-[32rpx] bg-[#FFDBC9]/50 flex items-center justify-center shrink-0">
                  <image class="w-[44rpx] h-[38rpx]" src="/static/images/device-box-icon.png" mode="aspectFit" />
                </view>
                <view class="flex flex-col gap-[8rpx] flex-1 min-w-0">
                  <view class="flex items-center gap-[12rpx]">
                    <text class="text-[32rpx] font-bold text-[#1B1B1D] truncate">麦麦的数字灵犀盒</text>
                    <view class="flex items-center justify-center h-[36rpx] bg-[#FFEAD9] px-[14rpx] rounded-[8rpx] shrink-0">
                      <text class="text-[20rpx] font-semibold text-[#994703]">Pro版</text>
                    </view>
                  </view>
                  <text class="text-[22rpx] text-[#554339] truncate block">唤醒词「麦麦」· 实时全息渲染</text>
                </view>
              </view>
              <view class="flex items-center justify-center h-[46rpx] bg-[#D7F2EE] px-[20rpx] rounded-full gap-[10rpx] shrink-0">
                <view class="w-[12rpx] h-[12rpx] bg-[#006A62] rounded-full shrink-0"></view>
                <text class="text-[22rpx] font-semibold text-[#006A62]">已连接</text>
              </view>
            </view>

            <!-- 规格属性 2x2 网格 (包含各自专属Icon) -->
            <view class="grid grid-cols-2 gap-[16rpx]">
              <!-- 格 1: 连接状态 -->
              <view class="bg-[#FAFAFA] rounded-[28rpx] py-[22rpx] px-[20rpx] flex items-center gap-[16rpx] min-w-0">
                <view class="w-[44rpx] h-[44rpx] flex items-center justify-center shrink-0">
                  <image class="w-[36rpx] h-[36rpx]" src="/static/images/status-conn.png" mode="aspectFit" />
                </view>
                <view class="flex flex-col justify-center flex-1 min-w-0">
                  <text class="text-[20rpx] text-[#8C7A70] truncate block">连接状态</text>
                  <text class="text-[24rpx] font-semibold text-[#1B1B1D] mt-[4rpx] truncate block">蓝牙已连接</text>
                </view>
              </view>
              <!-- 格 2: 剩余电量 -->
              <view class="bg-[#FAFAFA] rounded-[28rpx] py-[22rpx] px-[20rpx] flex items-center gap-[16rpx] min-w-0">
                <view class="w-[44rpx] h-[44rpx] flex items-center justify-center shrink-0">
                  <image class="w-[36rpx] h-[36rpx]" src="/static/images/status-battery.png" mode="aspectFit" />
                </view>
                <view class="flex flex-col justify-center flex-1 min-w-0">
                  <text class="text-[20rpx] text-[#8C7A70] truncate block">剩余电量</text>
                  <text class="text-[24rpx] font-semibold text-[#1B1B1D] mt-[4rpx] truncate block">88% · 正常守护中</text>
                </view>
              </view>
              <!-- 格 3: 网络配置 -->
              <view class="bg-[#FAFAFA] rounded-[28rpx] py-[22rpx] px-[20rpx] flex items-center gap-[16rpx] min-w-0">
                <view class="w-[44rpx] h-[44rpx] flex items-center justify-center shrink-0">
                  <image class="w-[36rpx] h-[36rpx]" src="/static/images/status-wifi.png" mode="aspectFit" />
                </view>
                <view class="flex flex-col justify-center flex-1 min-w-0">
                  <text class="text-[20rpx] text-[#8C7A70] truncate block">网络配置</text>
                  <text class="text-[24rpx] font-semibold text-[#1B1B1D] mt-[4rpx] truncate block">Home_Studio_5G</text>
                </view>
              </view>
              <!-- 格 4: 当前音色 -->
              <view class="bg-[#FAFAFA] rounded-[28rpx] py-[22rpx] px-[20rpx] flex items-center gap-[16rpx] min-w-0">
                <view class="w-[44rpx] h-[44rpx] flex items-center justify-center shrink-0">
                  <image class="w-[36rpx] h-[36rpx]" src="/static/images/status-voice.png" mode="aspectFit" />
                </view>
                <view class="flex flex-col justify-center flex-1 min-w-0">
                  <text class="text-[20rpx] text-[#8C7A70] truncate block">当前音色</text>
                  <text class="text-[24rpx] font-semibold text-[#1B1B1D] mt-[4rpx] truncate block">温顺小奶犬</text>
                </view>
              </view>
            </view>
          </view>

          <!-- 次级设备卡片 (星星项圈 Lite) -->
          <view class="bg-white rounded-[48rpx] shadow-[0_10rpx_36rpx_rgba(27,27,29,0.03)] flex justify-between items-center py-[24rpx] px-[32rpx]">
            <view class="flex items-center gap-[20rpx] flex-1 min-w-0 mr-[16rpx]">
              <view class="w-[88rpx] h-[88rpx] rounded-[32rpx] bg-[#EAE7EA] flex items-center justify-center shrink-0">
                <image class="w-[40rpx] h-[38rpx]" src="/static/images/device-collar-icon.png" mode="aspectFit" />
              </view>
              <view class="flex flex-col gap-[8rpx] flex-1 min-w-0">
                <view class="flex items-center gap-[12rpx]">
                  <text class="text-[30rpx] font-bold text-[#1B1B1D] truncate">星星项圈</text>
                  <view class="flex items-center justify-center h-[36rpx] bg-[#EFEBE9] px-[14rpx] rounded-[8rpx] shrink-0">
                    <text class="text-[20rpx] font-semibold text-[#554339]">Lite版</text>
                  </view>
                </view>
                <text class="text-[22rpx] text-[#554339] truncate block">体征温感与低频脉冲</text>
              </view>
            </view>
            <view class="flex flex-col items-end justify-center shrink-0">
              <text class="text-[24rpx] font-medium text-[#554339] truncate">休眠待机</text>
              <text class="text-[20rpx] text-[#8C7A70] mt-[4rpx] truncate">电池 65%</text>
            </view>
          </view>
        </view>

        <!-- 卡片 3: 温馨诗意标语卡片 -->
        <view class="bg-[#F6F3F5] rounded-[40rpx] py-[28rpx] px-[32rpx] flex items-center gap-[24rpx] relative overflow-hidden">
          <view class="w-[64rpx] h-[64rpx] bg-white rounded-full flex items-center justify-center shadow-[0_4rpx_12rpx_rgba(0,0,0,0.04)] shrink-0">
            <image class="w-[32rpx] h-[32rpx]" src="/static/images/quote-icon.png" mode="aspectFit" />
          </view>
          <view class="flex-1 z-[2] flex items-center">
            <text class="text-[24rpx] text-[#1B1B1D] leading-[1.6]">爱的形态在数字星球延续，每次呼唤皆有回响。</text>
          </view>
          <view class="absolute -right-[20rpx] -bottom-[20rpx] w-[140rpx] h-[140rpx] bg-[#FFDBC9]/35 rounded-full blur-[24rpx]"></view>
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
  uni.setStorageSync('auto_scan_device', true);
  uni.switchTab({ url: '/pages/device/index' });
};

const handleNoticeTap = () => {
  uni.showToast({
    title: '暂无未读消息',
    icon: 'none'
  });
};
</script>

