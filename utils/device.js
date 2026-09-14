/**
 * 设备辅助工具函数
 */

/**
 * 判断设备类型
 * @param {Object} device - 蓝牙外设对象
 * @returns {'core' | 'halo' | 'unknown'}
 */
export const getDeviceType = (device) => {
  if (!device) return 'unknown';
  const name = ((device.name || device.localName || '') + '').toLowerCase();
  if (name.includes('core')) return 'core';
  if (name.includes('halo')) return 'halo';
  return 'unknown';
};

/**
 * 默认是 device-unknown.svg，如果名字有 core 或 halo 换到对应图标
 * @param {Object} device
 * @returns {string} 图标资源相对路径
 */
export const getDeviceIcon = (device) => {
  const type = getDeviceType(device);
  if (type === 'core') return '/static/icons/device-core.svg';
  if (type === 'halo') return '/static/icons/device-halo.svg';
  return '/static/icons/device-unknown.svg';
};

/**
 * 对应容器底色样式类
 * @param {Object} device
 * @returns {'bg-peach' | 'bg-lavender' | 'bg-neutral'}
 */
export const getDeviceBgClass = (device) => {
  const type = getDeviceType(device);
  if (type === 'core') return 'bg-peach';
  if (type === 'halo') return 'bg-lavender';
  return 'bg-neutral';
};

/**
 * 友好设备名称
 * @param {Object} device
 * @returns {string}
 */
export const getDeviceDisplayName = (device) => {
  if (!device) return '未知蓝牙设备';
  if (device.name && device.name.trim()) return device.name.trim();
  if (device.localName && device.localName.trim()) return device.localName.trim();
  const idStr = (device.deviceId || '').replace(/:/g, '');
  return idStr ? `BLE_Device_${idStr.slice(-4)}` : '未知蓝牙设备';
};

/**
 * 副标题描述
 * @param {Object} device
 * @returns {string}
 */
export const getDeviceSubtitle = (device) => {
  const type = getDeviceType(device);
  if (type === 'core') {
    return '麦麦的灵犀底座';
  } else if (type === 'halo') {
    return '智能电子宠物 Collar · 固件 v2.4.1';
  }
  return `MAC: ${device?.deviceId ? device.deviceId.slice(-8) : '广播外设'}`;
};

/**
 * 信号强度等级与图标
 * @param {number} rssi
 * @returns {{ icon: string, text: string, isStrong: boolean }}
 */
export const getSignalInfo = (rssi) => {
  const val = typeof rssi === 'number' ? rssi : -75;
  if (val >= -65) {
    return {
      icon: '/static/icons/signal-strong.svg',
      text: `${val}dBm (极强)`,
      isStrong: true
    };
  }
  return {
    icon: '/static/icons/signal-weak.svg',
    text: `${val}dBm (信号较弱)`,
    isStrong: false
  };
};

/**
 * 合并新发现的设备到现有设备列表（根据 deviceId 去重与更新）
 * @param {Array} currentList - 当前设备数组
 * @param {Array} newDevices - 新扫描到的设备数组
 * @returns {Array} 更新后的设备数组
 */
export const mergeDeviceList = (currentList = [], newDevices = []) => {
  if (!Array.isArray(newDevices)) return [...currentList];
  const list = [...currentList];
  newDevices.forEach((dev) => {
    if (!dev || !dev.deviceId) return;
    const existingIndex = list.findIndex(d => d.deviceId === dev.deviceId);
    if (existingIndex > -1) {
      const old = list[existingIndex];
      list[existingIndex] = {
        ...old,
        ...dev,
        name: dev.name || old.name,
        localName: dev.localName || old.localName,
        RSSI: dev.RSSI !== undefined ? dev.RSSI : old.RSSI
      };
    } else {
      list.push({
        deviceId: dev.deviceId,
        name: dev.name || '',
        localName: dev.localName || '',
        RSSI: dev.RSSI !== undefined ? dev.RSSI : -70,
        connected: false
      });
    }
  });
  return list;
};
