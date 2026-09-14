/**
 * UniApp 蓝牙 BLE 基础管理工具
 */

/**
 * 初始化蓝牙适配器
 * @returns {Promise<Object>}
 */
export const openBluetoothAdapter = () => {
  return new Promise((resolve, reject) => {
    uni.openBluetoothAdapter({
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    });
  });
};

/**
 * 关闭蓝牙适配器
 * @returns {Promise<Object>}
 */
export const closeBluetoothAdapter = () => {
  return new Promise((resolve, reject) => {
    uni.closeBluetoothAdapter({
      success: (res) => resolve(res),
      fail: (err) => reject(err),
      complete: () => resolve()
    });
  });
};

/**
 * 开始搜寻附近的蓝牙外围设备
 * @param {Object} [options]
 * @param {boolean} [options.allowDuplicatesKey=false] - 是否允许重复上报同一设备
 * @param {Array<string>} [options.services] - 过滤特定服务的 UUID
 * @returns {Promise<Object>}
 */
export const startBluetoothDiscovery = (options = {}) => {
  return new Promise((resolve, reject) => {
    uni.startBluetoothDevicesDiscovery({
      allowDuplicatesKey: options.allowDuplicatesKey ?? false,
      services: options.services,
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    });
  });
};

/**
 * 停止搜寻附近的蓝牙外围设备
 * @returns {Promise<Object>}
 */
export const stopBluetoothDiscovery = () => {
  return new Promise((resolve) => {
    uni.stopBluetoothDevicesDiscovery({
      complete: (res) => resolve(res)
    });
  });
};

/**
 * 获取在蓝牙模块生效期间所有已发现的蓝牙设备
 * @returns {Promise<Array>}
 */
export const getBluetoothDevices = () => {
  return new Promise((resolve, reject) => {
    uni.getBluetoothDevices({
      success: (res) => resolve(res.devices || []),
      fail: (err) => reject(err)
    });
  });
};

/**
 * 监听寻找到新设备的事件
 * @param {Function} callback - 回调函数接收新设备数组
 */
export const onBluetoothDeviceFound = (callback) => {
  uni.onBluetoothDeviceFound((res) => {
    if (res && res.devices && typeof callback === 'function') {
      callback(res.devices);
    }
  });
};

/**
 * 连接低功耗蓝牙设备
 * @param {string} deviceId - 蓝牙设备 ID
 * @param {number} [timeout=10000] - 超时时间
 * @returns {Promise<Object>}
 */
export const createBLEConnection = (deviceId, timeout = 10000) => {
  return new Promise((resolve, reject) => {
    uni.createBLEConnection({
      deviceId,
      timeout,
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    });
  });
};

/**
 * 断开与低功耗蓝牙设备的连接
 * @param {string} deviceId - 蓝牙设备 ID
 * @returns {Promise<Object>}
 */
export const closeBLEConnection = (deviceId) => {
  return new Promise((resolve, reject) => {
    uni.closeBLEConnection({
      deviceId,
      success: (res) => resolve(res),
      fail: (err) => reject(err),
      complete: () => resolve()
    });
  });
};
