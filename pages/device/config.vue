<template>
  <view class="min-h-screen bg-[#FCF8FB] flex flex-col box-border">
    <!-- 顶部自定义导航栏 (无胶囊设计，毛玻璃效果，44px内容高度，与全局保持一致) -->
    <view
      class="fixed top-0 left-0 right-0 z-[999] bg-[#FCF8FB]/80 backdrop-blur-[24px] flex flex-col shadow-[0_1px_8px_rgba(0,0,0,0.03)]"
      :style="{ paddingTop: statusBarHeight + 'px' }"
    >
      <view
        class="w-full flex items-center px-[20px] box-border"
        :style="{ height: navBarContentHeight + 'px' }"
      >
        <!-- 返回按钮与页面标题 (紧凑编组，匹配 Figma 13:438) -->
        <view class="flex items-center gap-[4px]">
          <view
            class="w-[36px] h-[44px] flex items-center justify-start cursor-pointer active:opacity-60 transition-opacity"
            @tap="handleBack"
          >
            <image class="w-[10px] h-[17px]" src="/static/icons/config-back.svg" mode="aspectFit" />
          </view>
          <text class="text-[18px] leading-[24px] font-medium text-[#1B1B1D]">设备配对 · 配置中心</text>
        </view>
      </view>
    </view>

    <!-- 顶部导航栏占位 -->
    <view :style="{ height: navBarTotalHeight + 'px' }"></view>

    <!-- 主体滚动区域 -->
    <scroll-view scroll-y class="flex-1 w-full" :show-scrollbar="false">
      <view class="w-full pb-[40px] flex flex-col box-border">

        <!-- 顶部硬件设备横幅 (Figma 13:260: pt:4px, pb:8px, px:20px) -->
        <view class="w-full pt-[4px] pb-[8px] px-[20px] box-border">
          <view class="w-full h-[74px] p-[16px] rounded-[16px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex items-center justify-between box-border">
            <view class="flex items-center gap-[8px]">
              <!-- 设备主图标 -->
              <view class="w-[40px] h-[40px] rounded-full bg-[#FFDBC9] flex items-center justify-center flex-shrink-0">
                <image class="w-[18px] h-[18px]" src="/static/icons/config-device-orb.svg" mode="aspectFit" />
              </view>
              <view class="flex flex-col">
                <view class="flex items-center gap-[4px]">
                  <text class="text-[18px] leading-[24px] font-medium text-[#1B1B1D]">{{ deviceName }}</text>
                  <view class="bg-[#EAE7EA] px-[6px] py-[2px] rounded-full flex items-center">
                    <text class="text-[10px] leading-[12px] text-[#554339]">已连接</text>
                  </view>
                </view>
                <text class="text-[13px] leading-[18px] text-[#554339]">蓝牙信号极佳 (-42 dBm) · 固件 v2.4.1</text>
              </view>
            </view>

            <!-- 信号指示徽标 -->
            <view class="w-[40px] h-[40px] rounded-full bg-[#F0EDEF] flex items-center justify-center flex-shrink-0">
              <image class="w-[18px] h-[18px]" src="/static/icons/config-signal-pill.svg" mode="aspectFit" />
            </view>
          </view>
        </view>

        <!-- 卡片主体容器 (Figma 13:280: px:20px, gap:24px) -->
        <view class="w-full px-[20px] flex flex-col gap-[24px] box-border">

          <!-- 卡片 1: 宠物信息与唤醒词 (Figma 13:281) -->
          <view class="w-full rounded-[16px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-[16px] flex flex-col gap-[16px] box-border">
            <!-- 卡片头部 -->
            <view class="flex items-center justify-between">
              <view class="flex items-center gap-[8px]">
                <view class="w-[32px] h-[32px] rounded-full bg-[#FFDBC9] flex items-center justify-center flex-shrink-0">
                  <image class="w-[18px] h-[18px]" src="/static/icons/config-paw-header.svg" mode="aspectFit" />
                </view>
                <view class="flex flex-col">
                  <text class="text-[18px] leading-[24px] font-medium text-[#1B1B1D]">宠物信息与唤醒词</text>
                  <text class="text-[12px] leading-[16px] font-medium text-[#554339]">硬件通过多麦克风阵列实时感知</text>
                </view>
              </view>
              <view class="h-[16px] px-[8px] py-[2px] rounded-full bg-[#F0EDEF] flex items-center gap-[4px]">
                <image class="w-[10px] h-[10px]" src="/static/icons/config-offline-wake.svg" mode="aspectFit" />
                <text class="text-[10px] leading-[12px] font-medium text-[#006A62]">离线唤醒</text>
              </view>
            </view>

            <!-- 宠物信息输入区域 (Figma 13:296: h:72px, p:8px, gap:16px, bg-[#F6F3F5]) -->
            <view class="w-full h-[72px] p-[8px] rounded-[12px] bg-[#F6F3F5] flex items-center gap-[16px] box-border">
              <image
                class="w-[56px] h-[56px] rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex-shrink-0 object-cover"
                src="/static/images/config-pet-avatar.png"
                mode="aspectFill"
              />
              <view class="flex-1 flex flex-col gap-[4px] min-w-0">
                <text class="text-[12px] leading-[16px] font-medium text-[#554339]">宠物名字 / 硬件专属唤醒词</text>
                <!-- 输入框容器 (Figma: h:36px, px:12px, py:6px, rounded:8px, bg-white) -->
                <view class="w-full h-[36px] px-[12px] py-[6px] rounded-[8px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex items-center justify-between box-border">
                  <input
                    class="text-[18px] leading-[24px] font-medium text-[#1B1B1D] flex-1 mr-[8px]"
                    v-model="petName"
                    placeholder="请输入宠物名字"
                    placeholder-class="text-[#A59A94]"
                    maxlength="12"
                  />
                  <image class="w-[16px] h-[16px] flex-shrink-0" src="/static/icons/config-pencil-verified.svg" mode="aspectFit" />
                </view>
              </view>
            </view>

            <!-- 唤醒提示条 (Figma 13:307: p:8px, gap:4px, bg-[#F6F3F5]) -->
            <view class="w-full p-[8px] rounded-[12px] bg-[#F6F3F5] flex items-start gap-[4px] box-border">
              <view class="w-[16px] h-[16px] pt-[2px] flex items-center justify-center flex-shrink-0">
                <image class="w-[16px] h-[16px]" src="/static/icons/config-speech-info.svg" mode="aspectFit" />
              </view>
              <text class="text-[13px] leading-[18px] text-[#554339] flex-1">
                对着设备喊出 “{{ petName || '麦麦' }}” 即可唤醒互动、触发抓拍与声学健康检测。
              </text>
            </view>
          </view>

          <!-- 卡片 2: 声音与音色选择 (Figma 13:312) -->
          <view class="w-full rounded-[16px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-[16px] flex flex-col gap-[16px] box-border">
            <!-- 卡片头部 -->
            <view class="flex items-center justify-between">
              <view class="flex items-center gap-[8px]">
                <view class="w-[32px] h-[32px] rounded-full bg-[#EADDFF] flex items-center justify-center flex-shrink-0">
                  <image class="w-[18px] h-[18px]" src="/static/icons/config-audio-dac.svg" mode="aspectFit" />
                </view>
                <view class="flex flex-col">
                  <text class="text-[18px] leading-[24px] font-medium text-[#1B1B1D]">声音与音色选择</text>
                  <text class="text-[12px] leading-[16px] font-medium text-[#554339]">嵌入式扬声器合成反馈声学库</text>
                </view>
              </view>
              <view class="h-[16px] px-[8px] py-[2px] rounded-full bg-[#EADDFF] flex items-center">
                <text class="text-[10px] leading-[12px] font-medium text-[#685393]">高保真DAC</text>
              </view>
            </view>

            <!-- 音色分段选项 (Figma 13:325: 4个选项, h:38px, rounded:12px) -->
            <view class="grid grid-cols-2 gap-[8px]">
              <view
                v-for="voice in voiceOptions"
                :key="voice.id"
                class="h-[38px] px-[12px] py-[10px] rounded-[12px] flex items-center justify-between box-border cursor-pointer transition-colors"
                :class="activeVoiceId === voice.id
                  ? 'bg-[#994703] text-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]'
                  : 'bg-[#F6F3F5] text-[#554339] active:bg-[#EEEAE8]'"
                @tap="selectVoice(voice.id)"
              >
                <view class="flex items-center gap-[6px]">
                  <text class="text-[14px] leading-[18px] font-medium" :class="activeVoiceId === voice.id ? 'text-white' : 'text-[#554339]'">
                    {{ voice.name }}
                  </text>
                  <!-- 选中态橙色指示圆点 -->
                  <view v-if="activeVoiceId === voice.id" class="w-[6px] h-[6px] rounded-full bg-[#FFDBC9]"></view>
                </view>
                <image
                  class="w-[13px] h-[13px]"
                  :src="activeVoiceId === voice.id ? '/static/icons/config-chip-wave.svg' : '/static/icons/config-chip-play.svg'"
                  mode="aspectFit"
                />
              </view>
            </view>

            <!-- 自定义录音抽屉模块 (Figma 13:348) -->
            <view
              v-if="activeVoiceId === 'custom'"
              class="w-full p-[16px] rounded-[12px] bg-[#F6F3F5] flex flex-col gap-[8px] box-border"
            >
              <!-- 抽屉顶部状态栏 -->
              <view class="flex items-center justify-between">
                <text class="text-[14px] leading-[18px] font-medium text-[#1B1B1D]">已激活专属音色文件</text>
                <view class="h-[16px] px-[8px] py-[2px] rounded-full bg-white flex items-center">
                  <text class="text-[10px] leading-[12px] font-medium text-[#006A62]">已载入固件缓存</text>
                </view>
              </view>

              <!-- 音频播放器条 (Figma: h:60px, p:8px, rounded:12px, bg-white, shadow) -->
              <view class="w-full h-[60px] p-[8px] rounded-[12px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex items-center justify-between gap-[8px] box-border">
                <!-- 播放按钮 -->
                <view
                  class="w-[44px] h-[44px] rounded-full bg-[#FFDBC9] flex items-center justify-center flex-shrink-0 cursor-pointer active:scale-95 transition-transform"
                  @tap="toggleAudioPlay"
                >
                  <image class="w-[14px] h-[14px]" src="/static/icons/config-audio-play.svg" mode="aspectFit" />
                </view>

                <!-- 音频信息与波形条 -->
                <view class="flex-1 flex flex-col justify-center gap-[4px] min-w-0">
                  <view class="flex items-center justify-between">
                    <text class="text-[12px] leading-[16px] font-medium text-[#1B1B1D] truncate mr-[8px]">
                      麦麦真实叫声与呼噜声.aac
                    </text>
                    <text class="text-[10px] leading-[12px] font-semibold text-[#554339] flex-shrink-0">00:15</text>
                  </view>

                  <!-- 10 段声学波形指示器 (像素级对齐 Figma 13:366) -->
                  <view class="w-full h-[16px] flex items-center gap-[4px]">
                    <view class="flex-1 h-[6px] rounded-full bg-[#994703]"></view>
                    <view class="flex-1 h-[12px] rounded-full bg-[#994703]"></view>
                    <view class="flex-1 h-[8px] rounded-full bg-[#994703]"></view>
                    <view class="flex-1 h-[16px] rounded-full bg-[#994703]"></view>
                    <view class="flex-1 h-[10px] rounded-full bg-[#FFDBC9]"></view>
                    <view class="flex-1 h-[14px] rounded-full bg-[#FFDBC9]"></view>
                    <view class="flex-1 h-[6px] rounded-full bg-[#E4E2E4]"></view>
                    <view class="flex-1 h-[10px] rounded-full bg-[#E4E2E4]"></view>
                    <view class="flex-1 h-[4px] rounded-full bg-[#E4E2E4]"></view>
                    <view class="flex-1 h-[12px] rounded-full bg-[#E4E2E4]"></view>
                  </view>
                </view>
              </view>

              <!-- 重新录制与微信选取按钮行 (Figma: pt:4px, gap:8px) -->
              <view class="w-full pt-[4px] flex items-center gap-[8px]">
                <view
                  class="flex-1 h-[36px] rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex items-center justify-center gap-[6px] cursor-pointer active:bg-[#FAF6F3]"
                  @tap="handleRecordVoice"
                >
                  <image class="w-[14px] h-[14px]" src="/static/icons/config-audio-record.svg" mode="aspectFit" />
                  <text class="text-[12px] leading-[16px] font-medium text-[#1B1B1D]">重新录制</text>
                </view>
                <view
                  class="flex-1 h-[36px] rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex items-center justify-center gap-[6px] cursor-pointer active:bg-[#FAF6F3]"
                  @tap="handlePickVoice"
                >
                  <image class="w-[14px] h-[14px]" src="/static/icons/config-audio-folder.svg" mode="aspectFit" />
                  <text class="text-[12px] leading-[16px] font-medium text-[#1B1B1D]">微信音频选取</text>
                </view>
              </view>
            </view>
          </view>

          <!-- 卡片 3: Wi-Fi 网络配网 (Figma 13:384) -->
          <view class="w-full rounded-[16px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-[16px] flex flex-col gap-[16px] box-border">
            <!-- 卡片头部 -->
            <view class="flex items-center justify-between">
              <view class="flex items-center gap-[8px]">
                <view class="w-[32px] h-[32px] rounded-full bg-[#98F3E7] flex items-center justify-center flex-shrink-0">
                  <image class="w-[18px] h-[18px]" src="/static/icons/config-wifi-header.svg" mode="aspectFit" />
                </view>
                <view class="flex flex-col">
                  <text class="text-[18px] leading-[24px] font-semibold text-[#1B1B1D]">Wi-Fi 网络配网</text>
                  <text class="text-[12px] leading-[16px] font-medium text-[#554339]">同步设备云端实时心跳与视频推流</text>
                </view>
              </view>
              <!-- 重新扫描 Wi-Fi 按钮 (Figma: w:24px, h:24px, rounded-full, bg-[#F0EDEF]) -->
              <view
                class="w-[24px] h-[24px] rounded-full bg-[#F0EDEF] flex items-center justify-center cursor-pointer transition-transform duration-300"
                :class="{ 'rotate-180': isRefreshingWifi }"
                @tap="handleRefreshWifi"
              >
                <image class="w-[12px] h-[12px]" src="/static/icons/config-wifi-refresh.svg" mode="aspectFit" />
              </view>
            </view>

            <!-- 目标网络 SSID 下拉框 (Figma 13:398: gap:6px) -->
            <view class="w-full flex flex-col gap-[6px]">
              <text class="text-[12px] leading-[16px] font-medium text-[#554339]">目标网络 (SSID)</text>
              <view
                class="w-full h-[54px] px-[16px] py-[12px] rounded-[12px] bg-[#F6F3F5] shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex items-center justify-between box-border cursor-pointer active:bg-[#EEEAE8]"
                @tap="handleSelectWifi"
              >
                <view class="flex items-center gap-[8px]">
                  <image class="w-[16px] h-[16px]" src="/static/icons/config-wifi-router.svg" mode="aspectFit" />
                  <view class="flex flex-col">
                    <text class="text-[14px] leading-[18px] font-semibold text-[#1B1B1D]">{{ selectedSsid }}</text>
                    <text class="text-[10px] leading-[12px] font-semibold text-[#006A62]">5GHz · WPA3加密 · 信号强</text>
                  </view>
                </view>
                <image class="w-[10px] h-[6px]" src="/static/icons/config-chevron-down.svg" mode="aspectFit" />
              </view>
            </view>

            <!-- Wi-Fi 密码输入框 (Figma 13:412: gap:6px, input h:45px) -->
            <view class="w-full flex flex-col gap-[6px]">
              <text class="text-[12px] leading-[16px] font-medium text-[#554339]">Wi-Fi 密码</text>
              <view class="relative w-full h-[45px]">
                <input
                  class="w-full h-[45px] px-[16px] pr-[48px] py-[12px] rounded-[12px] bg-[#F6F3F5] text-[15px] leading-[21px] text-[#1B1B1D] box-border"
                  :password="!showPassword"
                  v-model="wifiPassword"
                  placeholder="momo2024paws"
                  placeholder-class="text-[#A59A94]"
                />
                <view
                  class="absolute right-[12px] top-1/2 -translate-y-1/2 w-[26px] h-[24px] flex items-center justify-center cursor-pointer"
                  @tap="showPassword = !showPassword"
                >
                  <image
                    class="w-[18px] h-[18px] transition-opacity"
                    :class="showPassword ? 'opacity-100' : 'opacity-40'"
                    src="/static/icons/config-password-eye.svg"
                    mode="aspectFit"
                  />
                </view>
              </view>
            </view>
          </view>

          <!-- 伴侣视觉预览条 (Figma 13:422: gradient #FFDBC9 -> #EADDFF, p:16px, rounded:16px) -->
          <view class="w-full p-[16px] rounded-[16px] bg-gradient-to-r from-[#FFDBC9] to-[#EADDFF] flex items-center justify-between gap-[16px] box-border">
            <view class="flex-1 flex flex-col min-w-0">
              <text class="text-[10px] leading-[12px] font-bold text-[#321200] uppercase tracking-wider">HALOPAWS COMPANION</text>
              <text class="text-[18px] leading-[25px] font-medium text-[#321200] mt-[3px]">
                硬件就绪，{{ petName || '麦麦' }}正在等待{{ '\n' }}初次连结
              </text>
            </view>
            <image
              class="w-[64px] h-[64px] rounded-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex-shrink-0 object-contain"
              src="/static/images/config-companion-preview.png"
              mode="aspectFit"
            />
          </view>

          <!-- 底部操作 CTA (Figma 13:429: pt:4px, gap:4px, button h:48px) -->
          <view class="w-full pt-[4px] flex flex-col items-center gap-[4px] box-border">
            <view
              class="w-full h-[48px] rounded-full bg-[#994703] flex items-center justify-center shadow-[0_4px_6px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.04)] cursor-pointer active:scale-[0.98] transition-transform"
              :class="{ 'opacity-70 pointer-events-none': isSyncing }"
              @tap="handleSaveAndSync"
            >
              <view v-if="isSyncing" class="w-[20px] h-[20px] rounded-full border-2 border-white border-t-transparent animate-spin mr-[8px]"></view>
              <text class="text-[14px] leading-[18px] font-medium text-white">
                {{ isSyncing ? '正在同步参数到设备...' : '保存并同步到设备' }}
              </text>
            </view>
            <text class="text-[13px] leading-[18px] font-medium text-[#554339] text-center px-[8px]">
              将通过蓝牙低功耗 (BLE 5.3) 写入 Wi-Fi 凭证与个性化声学参数
            </text>
          </view>

        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getNavMetrics } from '@/utils/system.js';
import { closeBLEConnection } from '@/utils';

// 获取统一导航栏指标 (高度统一为 44px)
const { statusBarHeight, navBarContentHeight, navBarTotalHeight } = getNavMetrics(44);

// 设备基本信息
const deviceName = ref('HaloPaws Orb V2');
const deviceId = ref('');

// 宠物信息与唤醒词
const petName = ref('麦麦');

// 音色选择预设 (对应 Figma 13:325 设计)
const voiceOptions = [
  { id: 'gentle', name: '温顺幼犬音' },
  { id: 'vitality', name: '活力治愈音' },
  { id: 'calm', name: '沉稳原声' },
  { id: 'custom', name: '自定义录音' }
];
const activeVoiceId = ref('custom'); // 默认选中自定义录音以展示抽屉声学库

// Wi-Fi 配置
const selectedSsid = ref('Home_StarLink_5G');
const wifiPassword = ref('momo2024paws');
const showPassword = ref(false);
const isRefreshingWifi = ref(false);

// 状态控制
const isPlayingAudio = ref(false);
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

// 断开蓝牙连接处理
let isDisconnected = false;
const disconnectBLEOnExit = async () => {
  if (isDisconnected) return;
  isDisconnected = true;

  if (deviceId.value) {
    try {
      await closeBLEConnection(deviceId.value);
      console.log('已断开与设备的 BLE 连接:', deviceId.value);
    } catch (err) {
      console.warn('断开 BLE 连接失败或已断开:', err);
    }
    // 通知设备列表页更新连接状态
    uni.setStorageSync('ble_disconnected_device_id', deviceId.value);
  }
};

// 返回上一页
const handleBack = async () => {
  await disconnectBLEOnExit();
  uni.navigateBack({
    fail: () => {
      uni.switchTab({ url: '/pages/device/index' });
    }
  });
};

// 组件卸载时（例如系统返回键、左滑手势返回等）也确保断开连接
onBeforeUnmount(() => {
  disconnectBLEOnExit();
});

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
