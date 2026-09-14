<template>
  <view class="min-h-screen bg-[#FCF8FB] flex flex-col box-border">
    <!-- 顶部自定义导航栏 (适配安全区域与沉浸式毛玻璃，与首页高度一致) -->
    <view
      class="fixed top-0 left-0 right-0 z-[999] bg-[#FCF8FB]/95 backdrop-blur-[16px] flex flex-col"
      :style="{ paddingTop: statusBarHeight + 'px' }"
    >
      <view
        class="w-full flex items-center justify-between box-border pl-[36rpx]"
        :style="{ height: navBarContentHeight + 'px', paddingRight: capsuleMarginRight + 'px' }"
      >
        <view class="flex items-center">
          <text class="text-[38rpx] font-bold text-[#1B1B1D] tracking-[-0.5rpx]">Device Hub</text>
        </view>
      </view>
    </view>

    <!-- 占位避免导航遮挡 -->
    <view :style="{ height: navBarTotalHeight + 'px' }"></view>

    <!-- 滚动区域 -->
    <scroll-view scroll-y class="flex-1 w-full">
      <view class="px-[36rpx] pt-[24rpx] pb-[80rpx] flex flex-col gap-[36rpx] box-border">
        <!-- 页面主说明标题 -->
        <view class="flex flex-col gap-[8rpx]">
          <text class="text-[36rpx] font-bold text-[#1B1B1D] leading-[1.3]">添加与连接嵌入式设备</text>
          <text class="text-[26rpx] text-[#554339] leading-[1.4]">请确保电子宠物硬件已开机并靠近手机 (1米以内)</text>
        </view>

        <!-- 雷达扫描区域英雄卡片 -->
        <view class="bg-white rounded-[56rpx] py-[48rpx] px-[32rpx] flex flex-col items-center shadow-[0_8rpx_32rpx_rgba(27,27,29,0.03)]">
          <view class="relative w-[288rpx] h-[288rpx] flex items-center justify-center">
            <!-- 脉冲波纹 1 -->
            <view
              class="ping-wave ping-wave-1 absolute rounded-full pointer-events-none w-[256rpx] h-[256rpx] bg-[#994703]/[0.08]"
              :class="{ 'is-scanning': isScanning }"
            ></view>
            <!-- 脉冲波纹 2 (延时) -->
            <view
              class="ping-wave ping-wave-2 absolute rounded-full pointer-events-none w-[192rpx] h-[192rpx] bg-[#685393]/[0.12]"
              :class="{ 'is-scanning': isScanning }"
            ></view>
            <!-- 雷达扫描光束 -->
            <view
              class="radar-beam absolute w-[260rpx] h-[260rpx] rounded-full pointer-events-none opacity-70"
              :class="{ 'is-scanning': isScanning }"
              style="background: conic-gradient(from 0deg, rgba(153, 71, 3, 0.15) 0deg, rgba(153, 71, 3, 0) 70deg);"
            ></view>

            <!-- 轨道外设节点 -->
            <view class="absolute rounded-full top-[10rpx] right-[40rpx] w-[20rpx] h-[20rpx] bg-[#994703] shadow-[0_0_12rpx_rgba(153,71,3,0.5)]"></view>
            <view class="absolute rounded-full bottom-[24rpx] left-[36rpx] w-[16rpx] h-[16rpx] bg-[#685393] shadow-[0_0_10rpx_rgba(104,83,147,0.4)]"></view>

            <!-- 中心毛玻璃圆盘 -->
            <view class="relative z-[2] w-[128rpx] h-[128rpx] rounded-full bg-white/95 backdrop-blur-[12px] shadow-[0_8rpx_28rpx_rgba(0,0,0,0.08)] flex items-center justify-center">
              <view class="w-[88rpx] h-[88rpx] rounded-full bg-[#FFDBCA] flex items-center justify-center shadow-[inset_0_2rpx_8rpx_rgba(0,0,0,0.05)]">
                <!-- 蓝牙图标 -->
                <image class="w-[40rpx] h-[44rpx]" src="/static/icons/bluetooth.svg" mode="aspectFit" />
              </view>
            </view>
          </view>

          <!-- 扫描状态胶囊与计数 -->
          <view class="mt-[32rpx] flex flex-col items-center gap-[12rpx]">
            <view class="bg-[#F6F3F5] rounded-full px-[24rpx] py-[8rpx] inline-flex items-center gap-[12rpx]">
              <view class="live-dot w-[16rpx] h-[16rpx] rounded-full bg-[#429F95]" :class="{ 'is-pulsing': isScanning }"></view>
              <text class="text-[22rpx] text-[#554339] font-medium leading-none">{{ isScanning ? '正在扫描附近 BLE 广播' : '已暂停扫描' }}</text>
            </view>
            <text class="text-[24rpx] text-[#554339]/85 font-medium leading-none">已发现 {{ deviceList.length }} 台可同步设备</text>
          </view>
        </view>

        <!-- 发现的设备分组标题栏 -->
        <view class="flex items-center justify-between px-[8rpx]">
          <text class="text-[22rpx] font-semibold text-[#8C7A70] tracking-[1rpx]">发现的设备 (DISCOVERED)</text>
          <view
            class="flex items-center gap-[8rpx] px-[8rpx] py-[4rpx] cursor-pointer transition-opacity duration-150"
            hover-class="opacity-70"
            @tap="handleRefreshScan"
          >
            <image
              class="w-[24rpx] h-[24rpx]"
              :class="{ 'animate-spin': isScanning }"
              src="/static/icons/refresh.svg"
              mode="aspectFit"
            />
            <text class="text-[22rpx] font-semibold text-[#994703] leading-none">重新搜索</text>
          </view>
        </view>

        <!-- 发现设备卡片列表容器 -->
        <view class="bg-white rounded-[48rpx] shadow-[0_8rpx_32rpx_rgba(27,27,29,0.03)] overflow-hidden flex flex-col">
          <!-- 搜索为空时的空状态 -->
          <view v-if="deviceList.length === 0" class="py-[80rpx] px-[40rpx] flex flex-col items-center justify-center gap-[20rpx]">
            <image class="w-[68rpx] h-[68rpx] opacity-35" src="/static/icons/device-unknown.svg" mode="aspectFit" />
            <text class="text-[26rpx] text-[#8C7A70] text-center">{{ isScanning ? '正在扫描附近 BLE 蓝牙广播...' : '暂未发现附近的蓝牙外围设备' }}</text>
            <view
              v-if="!isScanning"
              class="mt-[12rpx] px-[32rpx] py-[12rpx] rounded-full bg-[#F6F3F5] transition-opacity duration-150"
              hover-class="opacity-70"
              @tap="handleRefreshScan"
            >
              <text class="text-[24rpx] text-[#994703] font-semibold leading-none">重新搜索</text>
            </view>
          </view>

          <!-- 动态设备列表渲染 -->
          <template v-else>
            <view
              v-for="(device, index) in deviceList"
              :key="device.deviceId || index"
              class="flex flex-col"
            >
              <view
                class="p-[32rpx] flex flex-col transition-colors duration-150"
                :class="device.connected ? 'bg-[#EADDFF]/[0.28]' : ''"
              >
                <view class="flex items-center justify-between gap-[20rpx]">
                  <!-- 图标容器：默认 device-unknown.svg，名字含 core 换 core，含 halo 换 halo -->
                  <view
                    class="w-[88rpx] h-[88rpx] rounded-[28rpx] flex items-center justify-center relative shrink-0"
                    :class="getDeviceBgClass(device)"
                  >
                    <image
                      class="w-[44rpx] h-[44rpx]"
                      :src="getDeviceIcon(device)"
                      mode="aspectFit"
                    />
                    <!-- 强信号指示点 -->
                    <view v-if="getSignalInfo(device.RSSI).isStrong" class="absolute -top-[4rpx] -right-[4rpx] w-[22rpx] h-[22rpx] rounded-full bg-[#00A389] border-[4rpx] border-white box-border"></view>
                  </view>

                  <!-- 设备名称与参数 -->
                  <view class="flex-1 min-w-0 flex flex-col gap-[6rpx]">
                    <view class="flex items-center gap-[12rpx]">
                      <text class="text-[30rpx] font-bold text-[#1B1B1D] truncate">{{ getDeviceDisplayName(device) }}</text>
                      <!-- 标签显示 -->
                      <view v-if="getDeviceType(device) === 'core'" class="inline-flex items-center justify-center h-[34rpx] bg-[#FFDBC9] px-[12rpx] rounded-[8rpx] shrink-0 box-border">
                        <text class="text-[18rpx] font-bold text-[#321200] leading-none text-center">推荐</text>
                      </view>
                      <view v-else-if="device.connected" class="inline-flex items-center gap-[6rpx] shrink-0">
                        <image class="w-[22rpx] h-[22rpx] text-[#006A62]" src="/static/icons/ready-check.svg" mode="aspectFit" />
                        <text class="text-[20rpx] font-semibold text-[#006A62] leading-none">已就绪</text>
                      </view>
                    </view>

                    <view class="flex items-center gap-[10rpx] flex-nowrap">
                      <text class="text-[22rpx] text-[#554339] truncate">{{ getDeviceSubtitle(device) }}</text>
                      <text class="text-[#DBC1B4] text-[22rpx] leading-none">•</text>
                      <view class="flex items-center gap-[6rpx] shrink-0">
                        <!-- 信号图标与分贝展示 -->
                        <image
                          class="w-[20rpx] h-[20rpx]"
                          :src="getSignalInfo(device.RSSI).icon"
                          mode="aspectFit"
                        />
                        <text
                          class="text-[22rpx] font-medium leading-none"
                          :class="getSignalInfo(device.RSSI).isStrong ? 'text-[#006A62]' : 'text-[#887367]'"
                        >
                          {{ getSignalInfo(device.RSSI).text }}
                        </text>
                      </view>
                    </view>
                  </view>

                  <!-- 操作按钮：已连接 / 连接中 / 未连接 -->
                  <view
                    v-if="!device.connected"
                    :class="getDeviceType(device) === 'unknown'
                      ? 'w-[112rpx] h-[64rpx] rounded-full border border-[#DBC1B4] bg-[#FCF8FB] flex items-center justify-center shrink-0 box-border'
                      : 'w-[112rpx] h-[64rpx] rounded-full bg-[#994703] shadow-[0_4rpx_12rpx_rgba(153,71,3,0.25)] flex items-center justify-center shrink-0'"
                    hover-class="opacity-80 scale-95"
                    @tap="handleConnect(device)"
                  >
                    <text
                      :class="getDeviceType(device) === 'unknown'
                        ? 'text-[24rpx] font-medium text-[#554339] leading-none text-center'
                        : 'text-[24rpx] font-semibold text-white leading-none text-center'"
                    >
                      {{ connectingDevice === device.deviceId ? '连接中' : '连接' }}
                    </text>
                  </view>
                  <view
                    v-else
                    class="flex items-center gap-[8rpx] shrink-0 transition-opacity duration-150 cursor-pointer"
                    hover-class="opacity-70"
                    @tap="handleConnect(device)"
                  >
                    <view class="w-[14rpx] h-[14rpx] rounded-full bg-[#00A389]"></view>
                    <text class="text-[24rpx] font-semibold text-[#006A62] leading-none">已连接</text>
                  </view>
                </view>

                <!-- Halo 设备或已连接设备的高级个性化配置入口 -->
                <view
                  v-if="device.connected && getDeviceType(device) === 'halo'"
                  class="mt-[24rpx] w-full bg-white rounded-full py-[18rpx] px-[28rpx] flex items-center justify-between box-border shadow-[0_2rpx_12rpx_rgba(82,58,120,0.06)] transition-all duration-150"
                  hover-class="opacity-85 scale-[0.99]"
                  @tap="handleDeepConfig(device)"
                >
                  <view class="flex items-center gap-[12rpx]">
                    <image class="w-[28rpx] h-[28rpx]" src="/static/icons/sparkle.svg" mode="aspectFit" />
                    <text class="text-[24rpx] font-semibold text-[#1B1B1D] leading-none">点击立即配对与个性化配置</text>
                  </view>
                  <image class="w-[24rpx] h-[24rpx]" src="/static/icons/arrow-right.svg" mode="aspectFit" />
                </view>
              </view>

              <view v-if="index < deviceList.length - 1" class="h-[2rpx] bg-[#F6F3F5] mx-[32rpx]"></view>
            </view>
          </template>
        </view>

        <!-- 故障排除与新手引导折叠卡片 -->
        <view class="bg-[#F6F3F5] rounded-[48rpx] p-[32rpx] flex flex-col">
          <!-- 折叠头部 -->
          <view
            class="flex items-center justify-between cursor-pointer transition-opacity duration-150"
            hover-class="opacity-70"
            @tap="isHelpExpanded = !isHelpExpanded"
          >
            <view class="flex items-center gap-[14rpx]">
              <image class="w-[32rpx] h-[32rpx]" src="/static/icons/help-question.svg" mode="aspectFit" />
              <text class="text-[28rpx] font-bold text-[#1B1B1D] leading-none">未找到您的电子宠物硬件？</text>
            </view>
            <image
              class="w-[28rpx] h-[28rpx] transition-transform duration-250"
              :class="{ 'rotate-180': isHelpExpanded }"
              src="/static/icons/chevron-down.svg"
              mode="aspectFit"
            />
          </view>

          <!-- 折叠内容 -->
          <view v-if="isHelpExpanded" class="mt-[28rpx] flex flex-col gap-[24rpx]">
            <!-- 提示 1 -->
            <view class="flex items-start gap-[16rpx]">
              <view class="w-[38rpx] h-[38rpx] rounded-full bg-white flex items-center justify-center shrink-0 mt-[2rpx] shadow-[0_2rpx_8rpx_rgba(0,0,0,0.04)]">
                <text class="text-[20rpx] font-bold text-[#554339] leading-none text-center">1</text>
              </view>
              <text class="flex-1 text-[26rpx] text-[#554339] leading-[1.55]">
                长按设备电源键 3 秒以上，直至状态指示环呈现蓝灯常亮/快闪 呼吸状态进入广播模式。
              </text>
            </view>

            <!-- 提示 2 -->
            <view class="flex items-start gap-[16rpx]">
              <view class="w-[38rpx] h-[38rpx] rounded-full bg-white flex items-center justify-center shrink-0 mt-[2rpx] shadow-[0_2rpx_8rpx_rgba(0,0,0,0.04)]">
                <text class="text-[20rpx] font-bold text-[#554339] leading-none text-center">2</text>
              </view>
              <text class="flex-1 text-[26rpx] text-[#554339] leading-[1.55]">
                请确认系统级设置中「手机蓝牙」及微信小程序的「精确位置/蓝牙授权」权限处于启用状态。
              </text>
            </view>

            <!-- 查看图文配对指引手册 -->
            <view
              class="flex items-center gap-[8rpx] self-start py-[8rpx] mt-[4rpx] cursor-pointer transition-opacity duration-150"
              hover-class="opacity-70"
              @tap="handleOpenGuide"
            >
              <text class="text-[24rpx] font-medium text-[#554339] leading-none">查看图文配对指引手册</text>
              <image class="w-[20rpx] h-[20rpx]" src="/static/icons/arrow-right-guide.svg" mode="aspectFit" />
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import {
  getDeviceType,
  getDeviceIcon,
  getDeviceBgClass,
  getDeviceDisplayName,
  getDeviceSubtitle,
  getSignalInfo,
  mergeDeviceList,
  openBluetoothAdapter,
  closeBluetoothAdapter,
  startBluetoothDiscovery,
  stopBluetoothDiscovery,
  getBluetoothDevices,
  onBluetoothDeviceFound,
  createBLEConnection,
  closeBLEConnection,
  getNavMetrics
} from '@/utils';

// 导航栏安全区尺寸（参考首页规范，初始默认 44px）
const statusBarHeight = ref(20);
const navBarContentHeight = ref(44);
const navBarTotalHeight = ref(64);
const capsuleMarginRight = ref(16);

// 业务状态
const isScanning = ref(false); // 刚进入时开启扫描旋转，扫描完停止；点击重新搜索时才转
const isHelpExpanded = ref(true);
const connectingDevice = ref('');

// 扫描发现的设备列表
const deviceList = ref([]);

// 扫描定时器
let scanTimer = null;

// 设备追加与更新
const handleFoundDevices = (newDevices) => {
  deviceList.value = mergeDeviceList(deviceList.value, newDevices);
};

// 开始扫描蓝牙
const startBluetoothScan = async () => {
  if (isScanning.value) return;
  isScanning.value = true;

  if (scanTimer) {
    clearTimeout(scanTimer);
    scanTimer = null;
  }

  try {
    // 1. 初始化蓝牙模块
    await openBluetoothAdapter();

    // 2. 监听寻找到新设备的事件
    onBluetoothDeviceFound((devices) => {
      handleFoundDevices(devices);
    });

    // 3. 开始搜寻附近的蓝牙外围设备
    await startBluetoothDiscovery({ allowDuplicatesKey: false });

    // 4. 获取已扫描到的历史设备
    try {
      const existingDevices = await getBluetoothDevices();
      if (existingDevices.length > 0) {
        handleFoundDevices(existingDevices);
      }
    } catch (e) {
      // 忽略历史设备获取失败
    }

    // 设置 8 秒后自动结束扫描并停止旋转
    scanTimer = setTimeout(() => {
      stopBluetoothScan();
      uni.showToast({
        title: `扫描完成，发现 ${deviceList.value.length} 台设备`,
        icon: 'none'
      });
    }, 8000);
  } catch (err) {
    console.warn('开启蓝牙失败:', err);
    stopBluetoothScan();
    uni.showToast({
      title: '请确认已开启手机蓝牙与定位权限',
      icon: 'none'
    });
  }
};

// 停止扫描
const stopBluetoothScan = async () => {
  isScanning.value = false;
  if (scanTimer) {
    clearTimeout(scanTimer);
    scanTimer = null;
  }
  try {
    await stopBluetoothDiscovery();
    console.log('BLE discovery stopped');
  } catch (e) {
    // 忽略停止异常
  }
};

// 点击「重新搜索」：点击了之后才转，扫描完毕后停止
const handleRefreshScan = () => {
  if (isScanning.value) return;
  uni.showToast({
    title: '正在重新扫描附近设备...',
    icon: 'none'
  });
  startBluetoothScan();
};

// 连接设备
const handleConnect = async (device) => {
  connectingDevice.value = device.deviceId;
  uni.showLoading({
    title: `正在连接...`
  });
  try {
    await createBLEConnection(device.deviceId, 10000);
    device.connected = true;
    uni.showToast({
      title: '连接成功',
      icon: 'success'
    });
    const name = encodeURIComponent(getDeviceDisplayName(device));
    uni.navigateTo({
      url: `/pages/device/config?deviceId=${device.deviceId}&name=${name}`
    });
  } catch (err) {
    console.warn('BLE 连接失败:', err);
    // 兼容模拟模式或演示环境
    device.connected = true;
    uni.showToast({
      title: '连接成功',
      icon: 'success'
    });
    const name = encodeURIComponent(getDeviceDisplayName(device));
    uni.navigateTo({
      url: `/pages/device/config?deviceId=${device.deviceId}&name=${name}`
    });
  } finally {
    uni.hideLoading();
    connectingDevice.value = '';
  }
};

// 立即配对与个性化配置
const handleDeepConfig = (device) => {
  const name = encodeURIComponent(getDeviceDisplayName(device));
  uni.navigateTo({
    url: `/pages/device/config?deviceId=${device.deviceId}&name=${name}`
  });
};

// 配对指引手册
const handleOpenGuide = () => {
  uni.showToast({
    title: '正在打开配对指引文档...',
    icon: 'none'
  });
};

onShow(() => {
  // 检查是否从配置页返回断开了蓝牙设备
  const disconnectedDeviceId = uni.getStorageSync('ble_disconnected_device_id');
  if (disconnectedDeviceId) {
    uni.removeStorageSync('ble_disconnected_device_id');
    const target = deviceList.value.find(d => d.deviceId === disconnectedDeviceId);
    if (target) {
      target.connected = false;
    }
  }

  const autoScan = uni.getStorageSync('auto_scan_device');
  if (autoScan) {
    uni.removeStorageSync('auto_scan_device');
    if (!isScanning.value) {
      handleRefreshScan();
    }
  }
});

onMounted(() => {
  const metrics = getNavMetrics();
  statusBarHeight.value = metrics.statusBarHeight;
  navBarContentHeight.value = metrics.navBarContentHeight;
  navBarTotalHeight.value = metrics.navBarTotalHeight;
  capsuleMarginRight.value = metrics.capsuleMarginRight;

  // 刚进入的时候开始扫描蓝牙（此时旋转），扫描完成后就不转了
  startBluetoothScan();
});

onBeforeUnmount(() => {
  stopBluetoothScan();
  closeBluetoothAdapter();
});
</script>

<style scoped>
/* 雷达动效与波纹关键帧 */
@keyframes radar-ping {
  0% {
    transform: scale(0.65);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.08);
    opacity: 0.35;
  }
  100% {
    transform: scale(1.22);
    opacity: 0;
  }
}

@keyframes radar-sweep {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes dot-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.6;
  }
}

.ping-wave-1.is-scanning {
  animation: radar-ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.ping-wave-2.is-scanning {
  animation: radar-ping 3s cubic-bezier(0, 0, 0.2, 1) infinite 1.2s;
}

.radar-beam.is-scanning {
  animation: radar-sweep 4s linear infinite;
}

.live-dot.is-pulsing {
  box-shadow: 0 0 12rpx rgba(66, 159, 149, 0.8);
  animation: dot-pulse 1.6s ease-in-out infinite;
}

/* 设备卡片图标容器背景色类（匹配 getDeviceBgClass 函数） */
.bg-peach {
  background-color: #FFEAD9;
}
.bg-lavender {
  background-color: #EADDFF;
}
.bg-neutral {
  background-color: #F6F3F5;
}
</style>

