<template>
  <view class="min-h-screen bg-[#FCF8FB] box-border flex flex-col">
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
          <text class="text-[38rpx] font-bold text-[#1B1B1D] tracking-[-0.5rpx]">个人中心</text>
        </view>
      </view>
    </view>

    <!-- 占位避免导航遮挡 -->
    <view :style="{ height: navBarTotalHeight + 'px' }"></view>

    <!-- 滚动区域 -->
    <scroll-view scroll-y class="flex-1 w-full">
      <view class="px-[36rpx] pt-[24rpx] pb-[60rpx] flex flex-col gap-[28rpx] box-border">

        <!-- 1. 用户个人档案卡片 (User Profile Header Card) -->
        <view class="bg-white rounded-[24rpx] p-[32rpx] shadow-[0_2rpx_8rpx_rgba(0,0,0,0.03)] flex flex-col gap-[24rpx]">
          <view class="flex items-center">
            <!-- 头像与安全守护徽章 -->
            <view class="relative w-[128rpx] h-[128rpx] shrink-0" @tap="handleEditProfile">
              <image class="w-[128rpx] h-[128rpx] rounded-full border-[4rpx] border-white shadow-[0_4rpx_12rpx_rgba(0,0,0,0.08)]" src="/static/images/avatar-user.png" mode="aspectFill" />
              <view class="absolute -right-[4rpx] -bottom-[2rpx] w-[40rpx] h-[40rpx] rounded-full bg-[#006A62] border-[3rpx] border-white flex items-center justify-center">
                <image class="w-[22rpx] h-[22rpx]" src="/static/icons/my-badge-shield.svg" mode="aspectFit" />
              </view>
            </view>

            <!-- 昵称与ID等信息 -->
            <view class="flex-1 ml-[24rpx] flex flex-col gap-[8rpx]" @tap="handleEditProfile">
              <view class="flex items-center gap-[12rpx]">
                <text class="text-[36rpx] font-bold text-[#2A201A]">星河漫步者</text>
                <image class="w-[30rpx] h-[28rpx]" src="/static/icons/my-badge-star.svg" mode="aspectFit" />
              </view>
              <view class="flex items-center gap-[8rpx]">
                <text class="text-[22rpx] text-[#887367]">ID: PET-892019</text>
                <text class="text-[20rpx] text-[#BAA89F]">•</text>
                <text class="text-[22rpx] text-[#887367]">365天深情守护者</text>
              </view>
            </view>

            <!-- 右侧二维码/编辑入口 -->
            <view
              class="w-[64rpx] h-[64rpx] rounded-full bg-[#F6F0EC] flex items-center justify-center shrink-0 transition-opacity duration-150"
              hover-class="opacity-80 scale-95"
              @tap="handleEditProfile"
            >
              <image class="w-[30rpx] h-[30rpx]" src="/static/icons/my-profile-arrow.svg" mode="aspectFit" />
            </view>
          </view>

          <!-- 底部感性守护语录 (Ambient Reverence Status Quote) -->
          <view class="bg-[#FDF7F4] rounded-[16rpx] border border-[#994703]/[0.08] px-[24rpx] py-[18rpx] flex items-center gap-[16rpx]">
            <image class="w-[28rpx] h-[22rpx] shrink-0" src="/static/icons/my-quote.svg" mode="aspectFit" />
            <text class="text-[24rpx] text-[#554339] leading-[1.4] tracking-[0.2rpx]">“思念如星河流动，跨越时间与空间的静默守候。”</text>
          </view>
        </view>

        <!-- 2. 核心指标行 (Key Metrics Row) -->
        <view class="bg-white rounded-[24rpx] py-[28rpx] px-[20rpx] shadow-[0_2rpx_8rpx_rgba(0,0,0,0.03)] flex items-center justify-around">
          <!-- 指标 1 -->
          <view class="flex-1 flex flex-col items-center justify-center py-[8rpx] rounded-[16rpx]">
            <view class="flex items-baseline">
              <text class="text-[44rpx] font-bold text-[#2A201A] font-sans leading-none">3</text>
              <text class="text-[22rpx] font-medium text-[#887367] ml-[4rpx] leading-none">宠</text>
            </view>
            <text class="text-[22rpx] text-[#887367] mt-[8rpx] leading-none">我的爱宠</text>
          </view>

          <view class="w-[1rpx] h-[48rpx] bg-[#F0EAE4]"></view>

          <!-- 指标 2 -->
          <view
            class="flex-1 flex flex-col items-center justify-center py-[8rpx] rounded-[16rpx] transition-colors duration-150"
            hover-class="bg-[#FAF5F2]"
            @tap="handleMemoryLibrary"
          >
            <view class="flex items-baseline">
              <text class="text-[44rpx] font-bold text-[#2A201A] font-sans leading-none">5</text>
              <text class="text-[22rpx] font-medium text-[#887367] ml-[4rpx] leading-none">台</text>
            </view>
            <text class="text-[22rpx] text-[#887367] mt-[8rpx] leading-none">已绑定设备</text>
          </view>

          <view class="w-[1rpx] h-[48rpx] bg-[#F0EAE4]"></view>

          <!-- 指标 3 -->
          <view
            class="flex-1 flex flex-col items-center justify-center py-[8rpx] rounded-[16rpx] transition-colors duration-150"
            hover-class="bg-[#FAF5F2]"
            @tap="handleDeviceNav"
          >
            <view class="flex items-baseline">
              <text class="text-[44rpx] font-bold text-[#2A201A] font-sans leading-none">2</text>
              <text class="text-[22rpx] font-medium text-[#887367] ml-[4rpx] leading-none">条</text>
            </view>
            <text class="text-[22rpx] text-[#887367] mt-[8rpx] leading-none">自定义音色</text>
          </view>
        </view>

        <!-- 3. 设置功能分组区域 (Settings Groups Stack) -->
        <view class="flex flex-col gap-[28rpx]">

          <!-- 分组 1: 宠物星籍档案 -->
          <view class="flex flex-col gap-[14rpx]">
            <view class="flex items-center justify-between px-[8rpx]">
              <text class="text-[24rpx] font-semibold text-[#887367] tracking-[0.5rpx]">宠物星籍档案</text>
              <view class="inline-flex items-center justify-center h-[38rpx] px-[16rpx] rounded-full bg-[#FFF3EC] border border-[#994703]/15 box-border">
                <text class="text-[20rpx] font-medium text-[#994703] leading-none text-center">已同步</text>
              </view>
            </view>
            <view class="bg-white rounded-[24rpx] shadow-[0_2rpx_8rpx_rgba(0,0,0,0.03)] overflow-hidden">
              <!-- Item 1: 毛孩子数字纪念册 -->
              <view
                class="flex items-center py-[26rpx] px-[28rpx] transition-colors duration-150"
                hover-class="bg-[#FAF5F2]"
                @tap="handlePhotoAlbum"
              >
                <view class="w-[64rpx] h-[64rpx] rounded-[16rpx] bg-[#FFDBC9] flex items-center justify-center shrink-0">
                  <image class="w-[36rpx] h-[36rpx]" src="/static/icons/my-album.svg" mode="aspectFit" />
                </view>
                <view class="flex-1 ml-[24rpx] flex flex-col gap-[4rpx]">
                  <text class="text-[30rpx] font-medium text-[#2A201A]">毛孩子数字纪念册</text>
                  <text class="text-[22rpx] text-[#887367] leading-[1.3]">照片、3D模型管理、生辰与生平故事</text>
                </view>
                <image class="w-[14rpx] h-[20rpx] shrink-0 opacity-60" src="/static/icons/my-arrow-right.svg" mode="aspectFit" />
              </view>

              <view class="h-[1rpx] bg-[#F5EFEB] ml-[116rpx]"></view>

              <!-- Item 2: 3D 拟真模型渲染引擎 -->
              <view
                class="flex items-center py-[26rpx] px-[28rpx] transition-colors duration-150"
                hover-class="bg-[#FAF5F2]"
                @tap="handle3DEngine"
              >
                <view class="w-[64rpx] h-[64rpx] rounded-[16rpx] bg-[#EADDFF] flex items-center justify-center shrink-0">
                  <image class="w-[36rpx] h-[36rpx]" src="/static/icons/my-3d-model.svg" mode="aspectFit" />
                </view>
                <view class="flex-1 ml-[24rpx] flex flex-col gap-[4rpx]">
                  <text class="text-[30rpx] font-medium text-[#2A201A]">3D 拟真模型渲染引擎</text>
                  <text class="text-[22rpx] text-[#887367] leading-[1.3]">高画质光影 / 省电平滑</text>
                </view>
                <view class="flex items-center gap-[12rpx]">
                  <text class="text-[22rpx] text-[#685393] font-medium leading-none">超清高光</text>
                  <image class="w-[14rpx] h-[20rpx] shrink-0 opacity-60" src="/static/icons/my-arrow-right.svg" mode="aspectFit" />
                </view>
              </view>
            </view>
          </view>


          <!-- 分组 3: 声音与记忆备份 -->
          <view class="flex flex-col gap-[14rpx]">
            <view class="flex items-center justify-between px-[8rpx]">
              <text class="text-[24rpx] font-semibold text-[#887367] tracking-[0.5rpx]">声音与记忆备份</text>
            </view>
            <view class="bg-white rounded-[24rpx] shadow-[0_2rpx_8rpx_rgba(0,0,0,0.03)] overflow-hidden">
              <!-- Item 1: 声音音色训练实验室 -->
              <view
                class="flex items-center py-[26rpx] px-[28rpx] transition-colors duration-150"
                hover-class="bg-[#FAF5F2]"
                @tap="handleVoiceLab"
              >
                <view class="w-[64rpx] h-[64rpx] rounded-[16rpx] bg-[#FFDBC9] flex items-center justify-center shrink-0">
                  <image class="w-[36rpx] h-[36rpx]" src="/static/icons/my-voice-lab.svg" mode="aspectFit" />
                </view>
                <view class="flex-1 ml-[24rpx] flex flex-col gap-[4rpx]">
                  <text class="text-[30rpx] font-medium text-[#2A201A]">声音音色训练实验室</text>
                  <text class="text-[22rpx] text-[#887367] leading-[1.3]">上传生活音频定制 AI 宠物原声</text>
                </view>
                <view class="flex items-center gap-[12rpx]">
                  <text class="text-[22rpx] text-[#994703] font-medium leading-none">98% 拟合</text>
                  <image class="w-[14rpx] h-[20rpx] shrink-0 opacity-60" src="/static/icons/my-arrow-right.svg" mode="aspectFit" />
                </view>
              </view>

              <view class="h-[1rpx] bg-[#F5EFEB] ml-[116rpx]"></view>

            </view>
          </view>

          <!-- 分组 4: 常见与支持 -->
          <view class="flex flex-col gap-[14rpx]">
            <view class="flex items-center justify-between px-[8rpx]">
              <text class="text-[24rpx] font-semibold text-[#887367] tracking-[0.5rpx]">常见与支持</text>
            </view>
            <view class="bg-white rounded-[24rpx] shadow-[0_2rpx_8rpx_rgba(0,0,0,0.03)] overflow-hidden">
              <!-- Item 1: 硬件连接排错指南 -->
              <view
                class="flex items-center py-[26rpx] px-[28rpx] transition-colors duration-150"
                hover-class="bg-[#FAF5F2]"
                @tap="handleTroubleshoot"
              >
                <view class="w-[64rpx] h-[64rpx] rounded-[16rpx] bg-[#E4E2E4] flex items-center justify-center shrink-0">
                  <image class="w-[36rpx] h-[36rpx]" src="/static/icons/my-troubleshoot.svg" mode="aspectFit" />
                </view>
                <view class="flex-1 ml-[24rpx] flex flex-col gap-[4rpx]">
                  <text class="text-[30rpx] font-medium text-[#2A201A]">硬件连接排错指南</text>
                </view>
                <image class="w-[14rpx] h-[20rpx] shrink-0 opacity-60" src="/static/icons/my-arrow-right.svg" mode="aspectFit" />
              </view>

              <view class="h-[1rpx] bg-[#F5EFEB] ml-[116rpx]"></view>

              <!-- Item 2: 关于宠物星球 -->
              <view
                class="flex items-center py-[26rpx] px-[28rpx] transition-colors duration-150"
                hover-class="bg-[#FAF5F2]"
                @tap="handleAbout"
              >
                <view class="w-[64rpx] h-[64rpx] rounded-[16rpx] bg-[#E4E2E4] flex items-center justify-center shrink-0">
                  <image class="w-[36rpx] h-[36rpx]" src="/static/icons/my-about.svg" mode="aspectFit" />
                </view>
                <view class="flex-1 ml-[24rpx] flex flex-col gap-[4rpx]">
                  <text class="text-[30rpx] font-medium text-[#2A201A]">关于宠物星球</text>
                </view>
                <view class="flex items-center gap-[12rpx]">
                  <text class="text-[24rpx] text-[#887367] leading-none">v1.2.0</text>
                  <image class="w-[14rpx] h-[20rpx] shrink-0 opacity-60" src="/static/icons/my-arrow-right.svg" mode="aspectFit" />
                </view>
              </view>
            </view>
          </view>

        </view>

        <!-- 4. 底部情感与安全落款 (Warm Emotional Sign-off / Storage Footer) -->
        <view class="flex flex-col items-center justify-center gap-[12rpx] pt-[20rpx] pb-[10rpx]">
          <view class="flex items-center gap-[12rpx]">
            <image class="w-[20rpx] h-[26rpx]" src="/static/icons/my-footer-shield.svg" mode="aspectFit" />
            <text class="text-[24rpx] text-[#887367] tracking-[0.2rpx]">每一次回忆，皆已被长久安全守护</text>
          </view>
          <text class="text-[18rpx] text-[#BAA89F] tracking-[0.8rpx]">Pet Planet Companion OS • Apple HIG Calibrated</text>
        </view>

        <!-- 底部预留安全空间避免遮挡 -->
        <view class="h-[80rpx]"></view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getNavMetrics } from '@/utils';

// 获取顶部导航栏安全高度（参考首页规范，初始默认 44px）
const statusBarHeight = ref(20);
const navBarContentHeight = ref(44);
const navBarTotalHeight = ref(64);
const capsuleMarginRight = ref(16);

onMounted(() => {
  const metrics = getNavMetrics();
  statusBarHeight.value = metrics.statusBarHeight;
  navBarContentHeight.value = metrics.navBarContentHeight;
  navBarTotalHeight.value = metrics.navBarTotalHeight;
  capsuleMarginRight.value = metrics.capsuleMarginRight;
});


// 跳转已绑定设备列表
const handleDeviceNav = () => {
  uni.switchTab({
    url: '/pages/device/index'
  });
};

// 各种事件交互反馈
const handleEditProfile = () => {
  uni.showToast({
    title: '星河漫步者 • 档案信息',
    icon: 'none'
  });
};


const handleMemoryLibrary = () => {
  uni.showToast({
    title: '云端记忆库：共 1,280 条回忆已加密归档',
    icon: 'none'
  });
};

const handlePhotoAlbum = () => {
  uni.showToast({
    title: '进入毛孩子数字纪念册',
    icon: 'none'
  });
};

const handle3DEngine = () => {
  uni.showActionSheet({
    itemList: ['超清高光 (推荐)', '省电平衡模式', '极致流畅'],
    success: (res) => {
      const modes = ['超清高光', '省电平衡模式', '极致流畅'];
      uni.showToast({
        title: `已切换至：${modes[res.tapIndex]}`,
        icon: 'none'
      });
    }
  });
};


const handleVoiceLab = () => {
  uni.showToast({
    title: 'AI 宠物原声音色拟合度：98%',
    icon: 'none'
  });
};

const handleTroubleshoot = () => {
  uni.showModal({
    title: '硬件连接排错指南',
    content: '1. 确保设备电量充足\n2. 保持手机蓝牙与定位权限开启\n3. 设备靠近手机并在 1 米以内',
    showCancel: false,
    confirmText: '完成',
    confirmColor: '#994703'
  });
};

const handleAbout = () => {
  uni.showModal({
    title: '关于宠物星球',
    content: '宠物星球 Companion OS\n版本号: v1.2.0 (Build 2025.10)\n秉承 Apple HIG 暖心设计哲学，用心长久守护爱宠记忆。',
    showCancel: false,
    confirmText: '确定',
    confirmColor: '#994703'
  });
};
</script>

