<template>
  <view class="min-h-screen bg-[#FCF8FB] flex flex-col box-border">
    <!-- 顶部自定义导航栏 (无胶囊设计，沉浸式毛玻璃，高度与全局保持 44px 一致) -->
    <view
      class="fixed top-0 left-0 right-0 z-[999] bg-[#FCF8FB]/95 backdrop-blur-[16px] flex flex-col border-b border-[#F0EBE7]/60"
      :style="{ paddingTop: statusBarHeight + 'px' }"
    >
      <view
        class="w-full flex items-center px-[32rpx] box-border"
        :style="{ height: navBarContentHeight + 'px' }"
      >
        <!-- 返回按钮 -->
        <view
          class="w-[68rpx] h-[68rpx] rounded-full bg-white shadow-[0_2rpx_12rpx_rgba(0,0,0,0.04)] border border-[#EFE8E3] flex items-center justify-center cursor-pointer transition-transform active:scale-95"
          hover-class="opacity-80"
          @tap="handleBack"
        >
          <image class="w-[32rpx] h-[32rpx]" src="/static/icons/config-back.svg" mode="aspectFit" />
        </view>

        <!-- 页面标题 -->
        <view class="flex-1 flex items-center justify-center pr-[68rpx]">
          <text class="text-[34rpx] font-bold text-[#1B1B1D] tracking-[-0.5rpx]">配置中心</text>
        </view>
      </view>
    </view>

    <!-- 顶部导航栏占位 -->
    <view :style="{ height: navBarTotalHeight + 'px' }"></view>

    <!-- 主体滚动区域 -->
    <scroll-view scroll-y class="flex-1 w-full" :show-scrollbar="false">
      <view class="px-[32rpx] pt-[24rpx] pb-[100rpx] flex flex-col gap-[28rpx] box-border">

        <!-- 顶部硬件设备横幅 -->
        <view class="bg-white rounded-[36rpx] p-[28rpx] flex items-center justify-between border border-[#F2ECE8] shadow-[0_4rpx_20rpx_rgba(0,0,0,0.02)]">
          <view class="flex items-center gap-[20rpx]">
            <!-- 设备主图标 -->
            <view class="w-[84rpx] h-[84rpx] rounded-[24rpx] bg-[#F6EDDE] flex items-center justify-center shadow-inner">
              <image class="w-[44rpx] h-[44rpx]" src="/static/icons/config-device-orb.svg" mode="aspectFit" />
            </view>
            <view class="flex flex-col gap-[6rpx]">
              <view class="flex items-center gap-[12rpx]">
                <text class="text-[32rpx] font-bold text-[#1B1B1D] leading-none">{{ deviceName }}</text>
                <view class="bg-[#EBF7F2] px-[14rpx] py-[4rpx] rounded-full flex items-center gap-[8rpx]">
                  <view class="w-[10rpx] h-[10rpx] rounded-full bg-[#006A62] animate-pulse"></view>
                  <text class="text-[20rpx] font-semibold text-[#006A62] leading-none">已连接</text>
                </view>
              </view>
              <text class="text-[22rpx] text-[#7F746E] leading-none">蓝牙信号极佳 (-42 dBm) · 固件 v2.4.1</text>
            </view>
          </view>

          <!-- 信号指示徽标 -->
          <view class="w-[68rpx] h-[68rpx] rounded-full bg-[#F0EDEF] flex items-center justify-center">
            <image class="w-[36rpx] h-[36rpx]" src="/static/icons/config-signal-pill.svg" mode="aspectFit" />
          </view>
        </view>

        <!-- 卡片 1: 宠物信息与唤醒词 -->
        <view class="bg-white rounded-[36rpx] p-[32rpx] border border-[#F2ECE8] shadow-[0_4rpx_24rpx_rgba(0,0,0,0.02)] flex flex-col gap-[24rpx]">
          <!-- 卡片头部 -->
          <view class="flex items-center justify-between">
            <view class="flex items-center gap-[16rpx]">
              <view class="w-[60rpx] h-[60rpx] rounded-[20rpx] bg-[#F6EDDE] flex items-center justify-center">
                <image class="w-[32rpx] h-[32rpx]" src="/static/icons/config-paw-header.svg" mode="aspectFit" />
              </view>
              <view class="flex flex-col gap-[4rpx]">
                <text class="text-[28rpx] font-bold text-[#1B1B1D] leading-tight">宠物信息与唤醒词</text>
                <text class="text-[22rpx] text-[#7F746E] leading-tight">硬件通过多麦克风阵列实时感知</text>
              </view>
            </view>
            <view class="bg-[#EBF7F2] px-[16rpx] py-[6rpx] rounded-full flex items-center gap-[8rpx]">
              <image class="w-[16rpx] h-[20rpx]" src="/static/icons/config-offline-wake.svg" mode="aspectFit" />
              <text class="text-[20rpx] font-semibold text-[#006A62] leading-none">离线唤醒</text>
            </view>
          </view>

          <!-- 宠物信息输入区域 -->
          <view class="bg-[#FAF7F5] rounded-[28rpx] p-[20rpx] flex items-center gap-[20rpx] border border-[#EDE4DE]">
            <image
              class="w-[100rpx] h-[100rpx] rounded-[22rpx] border-2 border-white shadow-sm flex-shrink-0"
              src="/static/images/config-pet-avatar.png"
              mode="aspectFill"
            />
            <view class="flex-1 flex flex-col gap-[6rpx]">
              <text class="text-[20rpx] text-[#8C7A70] uppercase font-semibold tracking-wider">宠物名字 / 硬件专属唤醒词</text>
              <view class="flex items-center justify-between">
                <input
                  class="text-[30rpx] font-bold text-[#1B1B1D] flex-1 mr-[12rpx]"
                  v-model="petName"
                  placeholder="请输入宠物名字"
                  placeholder-class="text-[#C4B7AF]"
                  maxlength="12"
                />
                <view class="bg-[#F6EDDE] px-[14rpx] py-[6rpx] rounded-[10rpx] flex items-center gap-[6rpx] flex-shrink-0">
                  <image class="w-[20rpx] h-[20rpx]" src="/static/icons/config-pencil-verified.svg" mode="aspectFit" />
                  <text class="text-[20rpx] font-bold text-[#994703] leading-none">已校验</text>
                </view>
              </view>
            </view>
          </view>

          <!-- 唤醒提示条 -->
          <view class="bg-[#FAF6F3] rounded-[24rpx] p-[20rpx] flex items-start gap-[14rpx] border border-[#EFE8E3]">
            <image class="w-[24rpx] h-[24rpx] mt-[4rpx] flex-shrink-0" src="/static/icons/config-speech-info.svg" mode="aspectFit" />
            <text class="text-[22rpx] text-[#554339] leading-[1.5]">
              对着设备喊出 “{{ petName || '麦麦' }}” 即可唤醒互动、触发抓拍与声学健康检测。
            </text>
          </view>
        </view>

        <!-- 卡片 2: 声音与音色选择 -->
        <view class="bg-white rounded-[36rpx] p-[32rpx] border border-[#F2ECE8] shadow-[0_4rpx_24rpx_rgba(0,0,0,0.02)] flex flex-col gap-[24rpx]">
          <!-- 卡片头部 -->
          <view class="flex items-center justify-between">
            <view class="flex items-center gap-[16rpx]">
              <view class="w-[60rpx] h-[60rpx] rounded-[20rpx] bg-[#F0EDF6] flex items-center justify-center">
                <image class="w-[32rpx] h-[32rpx]" src="/static/icons/config-audio-dac.svg" mode="aspectFit" />
              </view>
              <view class="flex flex-col gap-[4rpx]">
                <text class="text-[28rpx] font-bold text-[#1B1B1D] leading-tight">声音与音色选择</text>
                <text class="text-[22rpx] text-[#7F746E] leading-tight">嵌入式扬声器合成反馈声学库</text>
              </view>
            </view>
            <view class="bg-[#F0EDF6] px-[16rpx] py-[6rpx] rounded-full flex items-center gap-[8rpx]">
              <text class="text-[20rpx] font-semibold text-[#685393] leading-none">高保真DAC</text>
            </view>
          </view>

          <!-- 音色预设网格 (4个选项) -->
          <view class="grid grid-cols-2 gap-[16rpx]">
            <view
              v-for="voice in voiceOptions"
              :key="voice.id"
              class="rounded-[24rpx] px-[24rpx] py-[20rpx] flex items-center justify-between cursor-pointer transition-all"
              :class="activeVoiceId === voice.id
                ? 'bg-[#994703] text-white shadow-md shadow-[#994703]/20'
                : 'bg-[#FAF7F5] border border-[#EDE4DE] text-[#554339] active:bg-[#F2EDE9]'"
              @tap="selectVoice(voice.id)"
            >
              <text class="text-[24rpx] font-bold">{{ voice.name }}</text>
              <image
                class="w-[24rpx] h-[24rpx]"
                :src="activeVoiceId === voice.id ? '/static/icons/config-chip-wave.svg' : '/static/icons/config-chip-play.svg'"
                mode="aspectFit"
              />
            </view>
          </view>

          <!-- 激活专属音色文件抽屉 (当选中自定义录音时展示) -->
          <view
            v-if="activeVoiceId === 'custom'"
            class="bg-[#FAF7F5] rounded-[28rpx] p-[24rpx] border border-[#EDE4DE] flex flex-col gap-[20rpx]"
          >
            <!-- 状态说明行 -->
            <view class="flex items-center justify-between">
              <text class="text-[22rpx] font-bold text-[#1B1B1D]">已激活专属音色文件</text>
              <view class="bg-[#EBF7F2] px-[14rpx] py-[4rpx] rounded-full">
                <text class="text-[20rpx] font-semibold text-[#006A62]">已载入固件缓存</text>
              </view>
            </view>

            <!-- 音频播放条 -->
            <view class="bg-white rounded-[22rpx] p-[16rpx] border border-[#EDE4DE] flex items-center justify-between shadow-sm">
              <view class="flex items-center gap-[16rpx] flex-1 min-w-0 mr-[12rpx]">
                <view
                  class="w-[60rpx] h-[60rpx] rounded-full bg-[#F6EDDE] flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
                  @tap="toggleAudioPlay"
                >
                  <image class="w-[24rpx] h-[24rpx]" src="/static/icons/config-audio-play.svg" mode="aspectFit" />
                </view>
                <view class="flex flex-col min-w-0">
                  <text class="text-[24rpx] font-bold text-[#1B1B1D] truncate">麦麦真实叫声与呼噜声.aac</text>
                  <text class="text-[20rpx] text-[#7F746E]">时长 00:15 · 码率 128kbps</text>
                </view>
              </view>
              <view class="bg-[#F6EDDE] px-[16rpx] py-[6rpx] rounded-[10rpx]">
                <text class="text-[22rpx] font-bold text-[#994703]">00:15</text>
              </view>
            </view>

            <!-- 操作按钮行 -->
            <view class="flex items-center gap-[16rpx]">
              <view
                class="flex-1 py-[16rpx] rounded-[18rpx] bg-white border border-[#E0D7D0] flex items-center justify-center gap-[10rpx] cursor-pointer active:bg-[#FAF6F3]"
                @tap="handleRecordVoice"
              >
                <image class="w-[24rpx] h-[24rpx]" src="/static/icons/config-audio-record.svg" mode="aspectFit" />
                <text class="text-[22rpx] font-semibold text-[#994703]">重新录制</text>
              </view>
              <view
                class="flex-1 py-[16rpx] rounded-[18rpx] bg-white border border-[#E0D7D0] flex items-center justify-center gap-[10rpx] cursor-pointer active:bg-[#FAF6F3]"
                @tap="handlePickVoice"
              >
                <image class="w-[24rpx] h-[24rpx]" src="/static/icons/config-audio-folder.svg" mode="aspectFit" />
                <text class="text-[22rpx] font-semibold text-[#685393]">微信音频选取</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 卡片 3: Wi-Fi 网络配网 -->
        <view class="bg-white rounded-[36rpx] p-[32rpx] border border-[#F2ECE8] shadow-[0_4rpx_24rpx_rgba(0,0,0,0.02)] flex flex-col gap-[24rpx]">
          <!-- 卡片头部 -->
          <view class="flex items-center justify-between">
            <view class="flex items-center gap-[16rpx]">
              <view class="w-[60rpx] h-[60rpx] rounded-[20rpx] bg-[#E6F4F1] flex items-center justify-center">
                <image class="w-[32rpx] h-[32rpx]" src="/static/icons/config-wifi-header.svg" mode="aspectFit" />
              </view>
              <view class="flex flex-col gap-[4rpx]">
                <text class="text-[28rpx] font-bold text-[#1B1B1D] leading-tight">Wi-Fi 网络配网</text>
                <text class="text-[22rpx] text-[#7F746E] leading-tight">同步设备云端实时心跳与视频推流</text>
              </view>
            </view>
            <view
              class="w-[60rpx] h-[60rpx] rounded-[18rpx] bg-[#F0EDEF] flex items-center justify-center cursor-pointer transition-transform duration-300"
              :class="{ 'rotate-180': isRefreshingWifi }"
              @tap="handleRefreshWifi"
            >
              <image class="w-[28rpx] h-[28rpx]" src="/static/icons/config-wifi-refresh.svg" mode="aspectFit" />
            </view>
          </view>

          <!-- 目标网络 SSID 下拉框 -->
          <view class="flex flex-col gap-[10rpx]">
            <text class="text-[20rpx] text-[#8C7A70] uppercase font-semibold tracking-wider">目标网络 (SSID)</text>
            <view
              class="bg-[#FAF7F5] rounded-[24rpx] p-[20rpx] border border-[#EDE4DE] flex items-center justify-between cursor-pointer active:bg-[#F3EDE9]"
              @tap="handleSelectWifi"
            >
              <view class="flex items-center gap-[18rpx]">
                <view class="w-[60rpx] h-[60rpx] rounded-[18rpx] bg-[#F6EDDE] flex items-center justify-center">
                  <image class="w-[30rpx] h-[30rpx]" src="/static/icons/config-wifi-router.svg" mode="aspectFit" />
                </view>
                <view class="flex flex-col gap-[4rpx]">
                  <text class="text-[26rpx] font-bold text-[#1B1B1D] leading-none">{{ selectedSsid }}</text>
                  <text class="text-[20rpx] text-[#006A62] leading-none">5GHz · WPA3加密 · 信号强</text>
                </view>
              </view>
              <image class="w-[24rpx] h-[24rpx]" src="/static/icons/config-chevron-down.svg" mode="aspectFit" />
            </view>
          </view>

          <!-- Wi-Fi 密码输入框 -->
          <view class="flex flex-col gap-[10rpx]">
            <text class="text-[20rpx] text-[#8C7A70] uppercase font-semibold tracking-wider">Wi-Fi 密码</text>
            <view class="bg-[#FAF7F5] rounded-[24rpx] px-[24rpx] py-[20rpx] border border-[#EDE4DE] flex items-center justify-between">
              <input
                class="text-[26rpx] font-medium text-[#1B1B1D] flex-1 mr-[16rpx]"
                :password="!showPassword"
                v-model="wifiPassword"
                placeholder="请输入 Wi-Fi 密码"
                placeholder-class="text-[#C4B7AF]"
              />
              <view class="w-[44rpx] h-[44rpx] flex items-center justify-center cursor-pointer" @tap="showPassword = !showPassword">
                <image
                  class="w-[28rpx] h-[28rpx] transition-opacity"
                  :class="showPassword ? 'opacity-100' : 'opacity-40'"
                  src="/static/icons/config-password-eye.svg"
                  mode="aspectFit"
                />
              </view>
            </view>
          </view>
        </view>

        <!-- 卡片 4: 宠物伴侣视觉预览条 (3D 形象展示) -->
        <view class="bg-gradient-to-r from-[#F6EDDE] via-[#F4E9D8] to-[#F1E3CD] rounded-[32rpx] p-[28rpx] border border-[#E9DFCF] flex items-center justify-between shadow-sm">
          <view class="flex flex-col gap-[6rpx]">
            <text class="text-[18rpx] font-bold tracking-widest text-[#994703] uppercase">HALOPAWS COMPANION</text>
            <text class="text-[26rpx] font-bold text-[#1B1B1D]">硬件就绪，{{ petName || '麦麦' }}正在等待初次连结</text>
            <text class="text-[20rpx] text-[#7F746E]">BLE 5.3 + Wi-Fi 6 双模低延迟流控</text>
          </view>
          <image
            class="w-[110rpx] h-[110rpx] object-contain flex-shrink-0 drop-shadow-md"
            src="/static/images/config-companion-preview.png"
            mode="aspectFit"
          />
        </view>

        <!-- 底部主操作区 -->
        <view class="mt-[12rpx] flex flex-col items-center gap-[16rpx]">
          <view
            class="w-full bg-[#994703] text-white py-[26rpx] rounded-full flex items-center justify-center gap-[12rpx] shadow-[0_12rpx_32rpx_rgba(153,71,3,0.28)] cursor-pointer transition-transform active:scale-[0.98]"
            :class="{ 'opacity-70 pointer-events-none': isSyncing }"
            @tap="handleSaveAndSync"
          >
            <view v-if="isSyncing" class="w-[28rpx] h-[28rpx] rounded-full border-2 border-white border-t-transparent animate-spin"></view>
            <text class="text-[30rpx] font-bold leading-none">{{ isSyncing ? '正在同步参数到设备...' : '保存并同步到设备' }}</text>
          </view>
          <text class="text-[20rpx] text-[#7F746E] text-center">
            将通过蓝牙低功耗 (BLE 5.3) 写入 Wi-Fi 凭证与个性化声学参数
          </text>
        </view>

      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getNavMetrics } from '@/utils/system.js';

// 获取统一导航栏指标 (高度统一为 44px)
const { statusBarHeight, navBarContentHeight, navBarTotalHeight } = getNavMetrics(44);

// 设备基本信息
const deviceName = ref('HaloPaws Orb V2');
const deviceId = ref('');

// 宠物信息与唤醒词
const petName = ref('麦麦');

// 音色选择预设
const voiceOptions = [
  { id: 'gentle', name: '温顺幼犬音' },
  { id: 'vitality', name: '活力治愈音' },
  { id: 'steady', name: '沉稳原声' },
  { id: 'custom', name: '自定义录音' }
];
const activeVoiceId = ref('custom');

// Wi-Fi 配置
const selectedSsid = ref('Home_StarLink_5G');
const wifiPassword = ref('momo2024paws');
const showPassword = ref(true);
const isRefreshingWifi = ref(false);

// 状态控制
const isSyncing = ref(false);

// 页面加载获取设备参数
onLoad((query) => {
  if (query?.name) {
    try {
      deviceName.value = decodeURIComponent(query.name);
    } catch (e) {
      deviceName.value = query.name;
    }
  }
  if (query?.deviceId) {
    deviceId.value = query.deviceId;
  }
});

// 返回上一页
const handleBack = () => {
  uni.navigateBack({
    fail: () => {
      uni.switchTab({ url: '/pages/device/index' });
    }
  });
};

// 切换音色
const selectVoice = (id) => {
  activeVoiceId.value = id;
};

// 播放/暂停音频示例
const toggleAudioPlay = () => {
  uni.showToast({
    title: '播放麦麦音色片段',
    icon: 'none'
  });
};

// 重新录制
const handleRecordVoice = () => {
  uni.showActionSheet({
    itemList: ['开始录音 (长按设备)', '上传已有音频'],
    success: (res) => {
      uni.showToast({
        title: res.tapIndex === 0 ? '录音模块已启动' : '已打开文件选择器',
        icon: 'none'
      });
    }
  });
};

// 微信音频选取
const handlePickVoice = () => {
  uni.showToast({
    title: '已触发音频库导入',
    icon: 'none'
  });
};

// 刷新 Wi-Fi 列表
const handleRefreshWifi = () => {
  if (isRefreshingWifi.value) return;
  isRefreshingWifi.value = true;
  uni.showToast({
    title: '正在扫描周围 Wi-Fi...',
    icon: 'none'
  });
  setTimeout(() => {
    isRefreshingWifi.value = false;
    uni.showToast({
      title: '已刷新可用网络',
      icon: 'none'
    });
  }, 1000);
};

// 选择 Wi-Fi 列表
const handleSelectWifi = () => {
  uni.showActionSheet({
    itemList: ['Home_StarLink_5G (已选)', 'HaloPaws_Lab_IoT', 'Studio_Guest_2.4G'],
    success: (res) => {
      const list = ['Home_StarLink_5G', 'HaloPaws_Lab_IoT', 'Studio_Guest_2.4G'];
      selectedSsid.value = list[res.tapIndex];
    }
  });
};

// 保存并同步到设备
const handleSaveAndSync = () => {
  if (isSyncing.value) return;
  isSyncing.value = true;

  uni.showLoading({
    title: '写入 BLE 特征值...'
  });

  setTimeout(() => {
    uni.hideLoading();
    isSyncing.value = false;
    uni.showToast({
      title: '配置已同步完成',
      icon: 'success'
    });
    setTimeout(() => {
      uni.navigateBack();
    }, 1200);
  }, 1500);
};
</script>

<style scoped>
/* 保证特定环境阴影或过渡平滑 */
</style>
